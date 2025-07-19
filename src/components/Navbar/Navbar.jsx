import { Avatar, Burger, Button, Drawer, Indicator, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { notifications } from "@mantine/notifications";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IconHome,
  IconMail,
  IconShoppingCart,
  IconToolsKitchen3,
  IconTrendingUp,
} from "@tabler/icons-react";

// import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
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
      color: "green", // You can change the color to blue or any other color that signifies the logout status
      withBorder: true,
      radius: "md",
    });
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

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
    <>
      <nav
        data-aos="zoom-in-down"
        data-aos-duration="1500"
        className="   container w-full bg-white mx-auto rounded-3xl shadow-md  h-[80px]  flex items-center justify-between z-50 px-4 lg:px-16"
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
                onClick={() => handleNavigation("headerSection", navigate)}
                className="text-black font-semibold text-lg hover:text-primaryColor duration-300 cursor-pointer"
              >
                Home
              </h4>
            </div>

            {/* Menu Section  */}
            <div className="flex gap-2 items-center">
              <h4
                onClick={() => handleNavigation("exploreMenu", navigate)}
                className="text-black font-semibold text-lg hover:text-primaryColor duration-300 cursor-pointer"
              >
                Menu
              </h4>
            </div>

            {/* Contact Section  */}
            <div className="flex gap-2 items-center">
              <h4
                // onClick={() => handleNavigation("contact")}
                className="text-black font-semibold text-lg hover:text-primaryColor duration-300 cursor-pointer"
              >
                Contact Us
              </h4>
            </div>

            {/* My Order Section   */}
            {isLoggedIn && (
              <div className="flex gap-2 items-center">
                <h4
                  onClick={() => navigate("/myOrders")}
                  className="text-black font-semibold text-lg hover:text-primaryColor duration-300 cursor-pointer"
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
            {cartItems.length > 0 ? (
              <Indicator
                inline
                label={cartItems.length}
                color="green"
                processing
                size={16}
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
                  <IconShoppingCart
                    size={30}
                    className="hover:!scale-110  text-black cursor-pointer transition-all duration-300"
                  />
                </Avatar>
              </Indicator>
            ) : (
              <Avatar
                onClick={() => {
                  navigateToCart();
                  scrollTo(0, 0);
                }}
                size="md"
                radius="xl"
                variant="transparent"
              >
                <IconShoppingCart
                  size={30}
                  className="hover:!scale-110  text-black cursor-pointer transition-all duration-300"
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
              variant="filled"
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
              variant="filled"
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
            color={"#222831"}
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
          <Drawer.Header>
            <Drawer.CloseButton fw={"bolder"} size={"xl"} />
          </Drawer.Header>
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
    </>
  );
}
