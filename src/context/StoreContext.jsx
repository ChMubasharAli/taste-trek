import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { useDisclosure } from "@mantine/hooks";
// Creating context with a default value of an empty array for food_list
const StoreContext = createContext({
  isLoggedIn: Boolean,
  food_list: [],
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

  // find the total sum of the items ammount that user add to the cart
  const totalItemAmmount = cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem?.quantity;
  }, 0);

  // manine disclousre for open and close login and signup modal
  const [opened, { open, close }] = useDisclosure(false);

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
        return [...prevState, { ...item, quantity: 1 }];
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
    isLoggedIn,
    userData,
    food_list,
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
