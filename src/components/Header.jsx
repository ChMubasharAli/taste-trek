import { Avatar, Burger, Button, Drawer, Indicator, Text } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import flyingBurgerTransparent from "../assets/flyingBurgerTransparent.webp";
import flyingNoodlesTransparent from "../assets/flyingNoodlesTransparent.webp";
import flyingVegetablesTransparent from "../assets/flyingVegetablesTransparent.webp";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHome,
  IconMail,
  IconShoppingCart,
  IconToolsKitchen3,
  IconTrendingUp,
} from "@tabler/icons-react";

export default function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [opened, { close, toggle }] = useDisclosure();

  const {
    open: modalOpen,
    cartItems,
    isLoggedIn,
    logout,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    return notifications.show({
      title: "Logged out",
      message: "You have successfully logged out. See you next time!",
      position: "top-right",
      autoClose: 4000, // Longer autoClose time, as it’s a logout message
      color: "blue", // You can change the color to blue or any other color that signifies the logout status
      withBorder: true,
      radius: "md",
    });
  };

  const navigateToCart = () => {
    if (cartItems.length <= 0 && !isLoggedIn) {
      modalOpen();
      return notifications.show({
        title: "Your Cart is Empty",
        message: "Please Login to add items to your cart to proceed.",
        position: "top-right",
        // autoClose: 1000,
        color: "red",
        withBorder: true,
        radius: "md",
      });
    }
    if (cartItems.length <= 0 && isLoggedIn) {
      return notifications.show({
        title: "Your Cart is Empty",
        message: "Please  add items to your cart to proceed.",
        position: "top-right",
        // autoClose: 1000,
        color: "red",
        withBorder: true,
        radius: "md",
      });
    }
    navigate("/cart");
  };

  // Array of food images for the carousel
  const foodImages = [
    flyingBurgerTransparent,
    flyingNoodlesTransparent,
    flyingVegetablesTransparent,
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === foodImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [foodImages.length]);

  // --------------------Sroll Animation Starts from Here--------------

  const { search } = useLocation();

  // Check if there's a section in the query params
  const queryParams = new URLSearchParams(search);
  const sectionFromQuery = queryParams.get("section");

  useEffect(() => {
    if (sectionFromQuery) {
      // When the component is mounted, scroll to the section based on the query param
      const element = document.getElementById(sectionFromQuery);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [sectionFromQuery]);

  const handleNavigation = (section, navigate) => {
    const { pathname } = window.location;

    if (pathname === "/") {
      // If already on the homepage, scroll directly
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on a different page, navigate to home with section query
      navigate(`/?section=${section}`);
    }
  };

  // --------------------Sroll Animation Ends Here-------------------

  return (
    <div className="min-h-[80vh]  bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      {/* Navigation Header */}
      <nav
        data-aos="zoom-in-up"
        data-aos-duration="700"
        data-aos-delay="100"
        className="   container mx-auto    h-[100px] flex items-center justify-between z-50"
      >
        {/* Logo Section  */}
        <section className="z-50">
          <h1
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            className="text-2xl cursor-pointer font-bold text-primaryColor"
          >
            <span className="font-extrabold text-4xl">T</span>aste{" "}
            <span className="font-extrabold text-4xl">T</span>rek
          </h1>
        </section>
        {/* This Navigation menu section will be visible on Large screens */}
        <section className="hidden lg:block ">
          <div className="flex gap-10">
            {/* Home Section  */}
            <div className="flex gap-2 items-center">
              <h4
                // onClick={() => handleNavigation("about")}
                className="text-secondaryColor text-sm hover:text-primaryColor duration-300 cursor-pointer"
              >
                Home
              </h4>
            </div>

            {/* Menu Section  */}
            <div className="flex gap-2 items-center">
              <h4
                onClick={() => handleNavigation("exploreMenu", navigate)}
                className="text-secondaryColor text-sm hover:text-primaryColor duration-300 cursor-pointer"
              >
                Menu
              </h4>
            </div>

            {/* Contact Section  */}
            <div className="flex gap-2 items-center">
              <h4
                // onClick={() => handleNavigation("contact")}
                className="text-secondaryColor text-sm hover:text-primaryColor duration-300 cursor-pointer"
              >
                Contact Us
              </h4>
            </div>

            {/* My Order Section   */}
            {isLoggedIn && (
              <div className="flex gap-2 items-center">
                <h4
                  onClick={() => navigate("/myOrders")}
                  className="text-secondaryColor text-sm hover:text-primaryColor duration-300 cursor-pointer"
                >
                  My Order
                </h4>
              </div>
            )}
          </div>
        </section>

        {/* This Login and cart section will be visible on Large screens */}

        <section className="hidden lg:flex items-center  gap-10">
          <div>
            {/* <IconShoppingCart stroke={2} /> */}
            {cartItems.length > 0 && isLoggedIn ? (
              <Indicator
                processing
                className="hover:!scale-110 cursor-pointer transition-all duration-300 "
                color="green"
                c={"dark"}
                label={cartItems.length}
                size={18}
                radius={"lg"}
              >
                <Avatar
                  onClick={() => {
                    navigateToCart();
                    scrollTo(0, 0);
                  }}
                  size="md"
                  radius="xl"
                  variant="transparent"
                >
                  {" "}
                  <IconShoppingCart size={30} />
                </Avatar>
              </Indicator>
            ) : (
              <Avatar
                onClick={navigateToCart}
                size="md"
                radius="xl"
                variant="transparent"
              >
                <IconShoppingCart
                  size={30}
                  className="hover:!scale-110 cursor-pointer transition-all duration-300"
                />
              </Avatar>
            )}
          </div>

          {/* Login and logout button section  */}
          {isLoggedIn ? (
            <Button
              size="md"
              px={"xl"}
              radius={"md"}
              variant="outline"
              color="green"
              c={"white"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              size="md"
              px={"xl"}
              radius={"md"}
              variant="outline"
              color="green"
              c={"white"}
              onClick={modalOpen}
            >
              Login
            </Button>
          )}
        </section>

        {/* Burger menu - increased z-index */}

        <section className="flex items-center gap-8 lg:hidden z-50">
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
            size="md"
            lineSize={4}
            color={opened ? "#222831" : "#fcfefe"}
          />
        </section>
      </nav>

      {/* Drawer with lower z-index */}
      <Drawer.Root
        opened={opened}
        zIndex={40}
        onClose={close}
        size="xl"
        position="right"
      >
        {/* <Drawer.Overlay /> */}
        <Drawer.Content bg="#fcfefe">
          <Drawer.Body className="flex mt-[100px] h-[70%] justify-evenly">
            <div className="flex flex-col w-full ml-8 justify-evenly  text-2xl">
              {/* Home Section  */}
              <Button
                variant="light"
                color="green"
                radius={"xl"}
                classNames={{
                  root: " hover:!scale-105 !transition-all !duration-300 !min-w-50 !mx-auto !cursor-pointer ",
                }}
                size={"md"}
                leftSection={<IconHome stroke={2} color="green" size={20} />}
              >
                Home
              </Button>

              {/* Menu Section  */}
              <Button
                variant="light"
                color="green"
                radius={"xl"}
                classNames={{
                  root: " hover:!scale-105 !transition-all !duration-300 !min-w-50 !mx-auto !cursor-pointer ",
                }}
                size={"md"}
                px={"xl"}
                leftSection={
                  <IconToolsKitchen3 stroke={2} color="green" size={20} />
                }
              >
                Menu
              </Button>

              {/* About Section  */}
              <Button
                variant="light"
                color="green"
                radius={"xl"}
                classNames={{
                  root: " hover:!scale-105 !transition-all !duration-300 !min-w-50 !mx-auto !cursor-pointer ",
                }}
                size={"md"}
                px={"xl"}
                leftSection={<IconMail stroke={2} color="green" size={20} />}
              >
                Contact us
              </Button>

              {/* My Order  Section  */}
              {isLoggedIn && (
                <Button
                  variant="light"
                  color="green"
                  radius={"xl"}
                  classNames={{
                    root: " hover:!scale-105 !transition-all !duration-300 !min-w-50 !mx-auto !cursor-pointer ",
                  }}
                  size={"md"}
                  px={"xl"}
                  leftSection={
                    <IconTrendingUp stroke={2} color="green" size={20} />
                  }
                >
                  My Order
                </Button>
              )}

              {/* Cart Order Section  */}
              <Button
                variant="filled"
                color="green"
                radius={"xl"}
                classNames={{
                  root: " hover:!scale-105 !transition-all !duration-300 !min-w-50 !mx-auto !cursor-pointer ",
                }}
                size={"md"}
                px={"xl"}
                leftSection={
                  <IconShoppingCart stroke={2} color="green" size={20} />
                }
              >
                My Cart
              </Button>
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2  container mx-auto   py-12  lg:py-24 ">
        {/* Left Content */}
        <div className=" flex items-center  h-full">
          <div className="flex-1 max-w-2xl">
            <p
              data-aos="fade-up"
              data-aos-delay="800"
              className="text-primaryColor text-sm font-medium mb-4 tracking-wide"
            >
              Discover Delight at Fastfood TNC
            </p>

            <h1
              data-aos="fade-up"
              data-aos-delay="1000"
              className="text-white text-4xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Your Go-To Spot for{" "}
              <span className="block">Quick and Tasty Eats!</span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="1200"
              className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg"
            >
              Where quick eats and quality collide, crafting a taste sensation.
              Speed meets flavor in every bite, promising a culinary journey
              that's as swift as it is delicious.
            </p>

            <Button
              data-aos="fade-up"
              data-aos-delay="1400"
              size="lg"
              px={"xl"}
              radius={"md"}
              variant="filled"
              color="green"
              c={"white"}
              rightSection={<ArrowRight />}
            >
              Order Now
            </Button>
          </div>
        </div>

        {/* Right Content - Image Carousel */}
        <div
          data-aos="fade-up"
          data-aos-delay="1000"
          className="lg:flex justify-center items-center relative hidden"
        >
          <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px] ">
            {/* Carousel Container */}
            <div className="relativel  w-full h-full ">
              {foodImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out transform  ${
                    index === currentImageIndex
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-110 rotate-12"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Food item ${index + 1}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ))}

              {/* Overlay gradient */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div> */}
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-8 -right-8 w-6 h-6 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
            <div className="absolute top-1/4 -left-10 w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-300 shadow-lg"></div>
            <div className="absolute bottom-1/4 -right-12 w-8 h-8 bg-red-400 rounded-full animate-bounce delay-700 shadow-lg"></div>
            <div className="absolute -bottom-6 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-1000 shadow-lg"></div>

            {/* Carousel indicators */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {foodImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-yellow-400 scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Glowing ring effect */}
            <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full border-2 border-orange-400/20 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
