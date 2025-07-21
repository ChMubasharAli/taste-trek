import React, { createContext, useCallback, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { useDisclosure } from "@mantine/hooks";
// Creating context with a default value of an empty array for food_list
const StoreContext = createContext({
  userLocation: null,
  getAndStoreUserLocation: () => {},
  isLoggedIn: Boolean,
  package_list: [],
  foodPackage: [],
  loadingPackages: false,
  errorPackages: null,
  addOnsMenu: [],
  cartItems: [],
  userData: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeFullItemFromCart: () => {},
  decreaseItemQuantity: () => {},
  totalItemAmmount: 0,
  opened: false,
  open: () => {},
  close: () => {},
  login: () => {},
  logout: () => {},
  clearCart: () => {},
});

const StoreContextProvider = ({ children }) => {
  // Initialize cartItems with localStorage or default to an empty array
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart items from localStorage if available
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // State to track user login or not
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("token") !== null; // If token exists, user is logged in
  });

  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null; // Retrieve user data from localStorage
  });

  // Load userLocation from localStorage if it exists
  const [userLocation, setUserLocation] = useState(() => {
    const savedLocation = localStorage.getItem("userLocation");
    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  // state to fetch the food package
  const [foodPackage, setFoodPackage] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [errorPackages, setErrorPackages] = useState(null);

  // state to fetch the addons menu
  const [addOnsMenu, setAddOnsMenu] = useState([]);

  // find the total sum of the items ammount that user add to the cart
  const totalItemAmmount = cartItems.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      (currentItem.basePrice * currentItem?.quantity + currentItem.totalPrice)
    );
  }, 0);

  // manine disclousre for open and close login and signup modal
  const [opened, { open, close }] = useDisclosure(false);

  // Fetch food  packages function
  const fetchPackages = useCallback(async () => {
    setLoadingPackages(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/getAllPackage`
      );
      if (!response.ok) throw new Error("Failed to fetch packages");
      const data = await response.json();
      setFoodPackage(data.packages);
    } catch (error) {
      setErrorPackages(error.message);
    } finally {
      setLoadingPackages(false);
    }
  }, []);

  // Fetch packages on mount
  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Fetch Addons Menu function
  const fetchAddOnsMenu = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/getItemAddOn`
      );
      if (!response.ok) throw new Error("Failed to fetch packages");
      const data = await response.json();
      setAddOnsMenu(data.data);
    } catch (error) {
      console.log("Error while fetching the AddOnsMenu ", error);
    }
  }, []);

  // Fetch packages on mount
  useEffect(() => {
    fetchAddOnsMenu();
  }, [fetchAddOnsMenu]);

  // Function to log the user in
  const login = (token, user) => {
    localStorage.setItem("token", token); // Store the token
    localStorage.setItem("userData", JSON.stringify(user)); // Store user data
    localStorage.setItem("isLoggedIn", "true"); // Mark the user as logged in in localStorage

    setIsLoggedIn(true); // Set isLoggedIn state to true
    setUserData(user); // Set user data in the state
  };

  // Function to log the user out
  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("userData"); // Remove user data from localStorage
    localStorage.setItem("isLoggedIn", "false"); // Update isLoggedIn status in localStorage
  };

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems((prevState) => {
      if (prevState.some((cartItem) => cartItem._id === item._id)) {
        return prevState.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevState, { ...item }];
      }
    });
  };

  // Remove from Cart Functionality
  const decreaseItemQuantity = (item) => {
    setCartItems((prevState) => {
      if (prevState.some((cartItem) => cartItem._id === item._id)) {
        return prevState
          .map((cartItem) =>
            cartItem._id === item._id
              ? cartItem.quantity > 1
                ? { ...cartItem, quantity: cartItem.quantity - 1 } // Decrease quantity
                : null // Remove item if quantity reaches 0
              : cartItem
          )
          .filter((cartItem) => cartItem !== null); // Remove items marked for removal
      }
      return prevState;
    });
  };

  // Function to get location using Geolocation API and store it
  const getAndStoreUserLocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        localStorage.setItem("userLocation", JSON.stringify(location));
      },
      (error) => {
        console.warn("Location error:", error.message);
      }
    );
  };

  // Function to remove a full item from the cart
  const removeFullItemFromCart = (item) => {
    setCartItems((prevState) => {
      return prevState.filter((cartItem) => cartItem._id !== item._id);
    });
  };

  // Function to clear cart and remove from localStorage
  const clearCart = () => {
    setCartItems([]); // Reset cartItems state
    localStorage.removeItem("cartItems"); // Remove cartItems from localStorage
  };

  const contextValue = {
    userLocation,
    getAndStoreUserLocation,
    isLoggedIn,
    userData,
    food_list,
    foodPackage,
    loadingPackages,
    errorPackages,
    addOnsMenu,
    cartItems,
    totalItemAmmount,
    setCartItems,
    addToCart,
    removeFullItemFromCart,
    decreaseItemQuantity,
    opened,
    open,
    close,
    login,
    logout,
    clearCart,
  };

  // useEffect to store cartItems in localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems"); // Remove from localStorage if cart is empty
    }
  }, [cartItems]); // Runs every time cartItems changes

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };
