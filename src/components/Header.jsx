import { Avatar, Burger, Button, Drawer, Indicator, Text } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import flyingBurgerTransparent from "../assets/flyingBurgerTransparent.webp";
import flyingNoodlesTransparent from "../assets/flyingNoodlesTransparent.webp";
import flyingVegetablesTransparent from "../assets/flyingVegetablesTransparent.webp";
import { useEffect } from "react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import {
  IconHome,
  IconMail,
  IconShoppingCart,
  IconToolsKitchen3,
  IconTrendingUp,
} from "@tabler/icons-react";

export default function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of food images for the carousel
  const foodImages = [
    flyingBurgerTransparent,
    flyingNoodlesTransparent,
    flyingVegetablesTransparent,
  ];

  useEffect(() => {
    notifications.show({
      title: "Notice",
      message:
        "Please Log in to track your orders. You can continue without logging in, but order history won't be available.",
      position: "bottom-right",
      autoClose: 10000,
      color: "red", // Yellow for informational/warning messages
      withBorder: true,
      radius: "md",
    });
  }, []);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === foodImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [foodImages.length]);

  return (
    <div
      id="headerSection"
      className=" h-[80vh] lg:h-screen  bg-gradient-to-br from-gray-900 via-green-900 to-gray-900"
    >
      {/* Navigation Header */}

      {/* Hero Section */}
      <div className=" flex   h-full lg:grid lg:grid-cols-2  container mx-auto   lg:py-32 ">
        {/* Left Content */}
        <div className=" flex items-center   h-full">
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
