import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Button, Modal, ScrollArea } from "@mantine/core";
import {
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Truck, MapPin, Phone, FileText } from "lucide-react";
import FoodItemCard from "./FoodDisplay/FoodItemCard";
import { notifications } from "@mantine/notifications";

const Cart = () => {
  const [opened, { open: deliveryPopupOpen, close: deliveryPopupClose }] =
    useDisclosure(false);

  const [pickupInfo, setPickupInfo] = useState({
    alternatePhone: "",
    specialInstructions: "",
  });
  const [visiblePhoneSection, setVisiblePhoneSection] = useState(false);

  const navigate = useNavigate();
  const {
    isLoggedIn,
    cartItems,
    foodPackage,
    open,
    decreaseItemQuantity,
    addToCart,
    removeFullItemFromCart,
    totalItemAmmount,
  } = useContext(StoreContext);

  // fucntion to confirem the delivery method
  const proceedToCheckout = () => {
    if (!isLoggedIn) {
      return open();
    }
    deliveryPopupOpen();
  };

  // fucntion to confirem the Food Order
  const confirmOrder = () => {
    if (pickupInfo.alternatePhone.trim() === "") {
      notifications.show({
        title: "Phone number required",
        message: "Please enter a valid phone number",
        position: "top-right",
        autoClose: 4000,
        color: "yellow", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      return; // Exit early if email is empty
    }
    navigate(
      "/payment",
      { state: { ...pickupInfo, deliveryMethod: "pickup" } },
      scrollTo(0, 0)
    );
    deliveryPopupClose();
  };

  if (cartItems.length === 0) {
    return (
      <section className="container mx-auto min-h-[70vh] py-32 px-4">
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <IconShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Add some delicious items to get started!
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="container mx-auto">
      <section className="  py-32 px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1
            data-aos="fade-up"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-wide"
          >
            Your Cart
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4"></div>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-gray-600 text-sm sm:text-base"
          >
            {cartItems.length} items in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="flex-1 lg:flex-[2]">
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 10}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Mobile Layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Image and Basic Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg sm:rounded-xl shadow-md"
                        />
                        <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-green-600 font-bold text-lg sm:text-xl">
                          $ {item.basePrice}
                        </p>
                      </div>

                      {/* Remove Button - Top Right on Mobile */}
                      <button
                        onClick={() => removeFullItemFromCart(item)}
                        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 sm:hidden"
                      >
                        <IconTrash className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-green-50 rounded-lg sm:rounded-xl border border-green-200">
                        <button
                          onClick={() => decreaseItemQuantity(item)}
                          className="p-2 sm:p-3 text-green-600 hover:bg-green-100 rounded-l-lg sm:rounded-l-xl transition-colors touch-manipulation"
                        >
                          <IconMinus className="w-4 h-4" />
                        </button>
                        <span className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-green-800 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-2 sm:p-3 text-green-600 hover:bg-green-100 rounded-r-lg sm:rounded-r-xl transition-colors touch-manipulation"
                        >
                          <IconPlus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg sm:text-xl font-bold text-gray-900">
                          $ {item.basePrice * item.quantity + item.totalPrice}
                        </p>
                      </div>

                      {/* Remove Button - Hidden on Mobile, Shown on Desktop */}
                      <button
                        onClick={() => removeFullItemFromCart(item)}
                        className="hidden sm:block p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                      >
                        <IconTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            className="w-full lg:w-80 lg:flex-shrink-0"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm lg:sticky lg:top-32">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm sm:text-base">
                    Subtotal
                  </span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    $ {totalItemAmmount}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm sm:text-base">
                    Delivery Fee
                  </span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    $ 5
                  </span>
                </div>

                {/* <div className="flex justify-between items-center py-2 sm:py-3 border-b-2 border-green-200">
                  <span className="text-gray-600 text-sm sm:text-base">
                    Tax (5%)
                  </span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    $ {Math.round(totalItemAmmount * 0.05)}
                  </span>
                </div> */}

                <div className="flex justify-between items-center py-3 sm:py-4">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    $ {totalItemAmmount + 5}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  px={"xl"}
                  radius={"md"}
                  variant="filled"
                  color="green"
                  c={"white"}
                  fullWidth
                  onClick={proceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------also like section-------------  */}
      <section className="flex flex-col gap-8 pb-32">
        <div>
          <h1
            data-aos="fade-up"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-wide"
          >
            You May Also Like
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {foodPackage?.slice(0, 4)?.map((item) => {
            return (
              <div key={item._id} data-aos="fade-up">
                <FoodItemCard item={item} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Delivery of pickup modal  */}
      <Modal.Root
        centered
        closeOnClickOutside={false}
        opened={opened}
        onClose={deliveryPopupClose}
        size={visiblePhoneSection ? "md" : "lg"}
      >
        <Modal.Overlay />
        <Modal.Content
          radius={"lg"}
          // classNames={{ content: "!max-w-3xl !w-full" }}
        >
          <Modal.Header classNames={{ header: "!shadow-md" }}>
            <Modal.Title
              classNames={{ title: "!text-3xl !font-bold  !text-gray-800" }}
            >
              {visiblePhoneSection ? "Your Information" : "Choose Option"}
            </Modal.Title>
            <Modal.CloseButton size={"lg"} />
          </Modal.Header>
          <Modal.Body>
            {!visiblePhoneSection ? (
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 ">
                  {/* Delivery Option */}
                  <div
                    onClick={() => {
                      navigate("/checkout", scrollTo(0, 0));
                      deliveryPopupClose();
                    }}
                    className={`relative group cursor-pointer rounded-2xl border-2 hover:border-primaryColor hover:bg-green-50 p-6 transition-all duration-200 hover:shadow-lg `}
                  >
                    <div className="text-center">
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:bg-primaryColor transition-all duration-300
                          
                      `}
                      >
                        <Truck
                          className={`w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-300"
                        `}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-bold mb-2 text-gray-900 group-hover:text-primaryColor transition-colors duration-300 `}
                      >
                        Delivery
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm mb-4 text-gray-600 group-hover:text-primaryColor transition-colors duration-300 
                      `}
                      >
                        Get your food delivered to your doorstep
                      </p>

                      {/* Features */}
                      {/* <div className="space-y-2">
                      <div
                        className={`flex items-center justify-center gap-2 text-sm text-gray-600
                        `}
                      >
                        <Clock className="w-4 h-4" />
                        <span>30-45 mins</span>
                      </div>
                      <div
                        className={`flex items-center justify-center gap-2 text-sm text-gray-600
                        `}
                      >
                        <span className="font-medium">Delivery Fee: Rs 5</span>
                      </div>
                    </div> */}
                    </div>
                  </div>

                  {/* Pickup Option */}
                  <div
                    onClick={() => setVisiblePhoneSection(true)}
                    className={`relative group cursor-pointer rounded-2xl border-2 hover:border-primaryColor hover:bg-green-50 p-6 transition-all duration-200 hover:shadow-lg `}
                  >
                    <div className="text-center">
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:bg-primaryColor transition-all duration-300
                          
                      `}
                      >
                        <MapPin
                          className={`w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-300"
                        `}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-bold mb-2 text-gray-900 group-hover:text-primaryColor transition-colors duration-300 `}
                      >
                        Pickup
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm mb-4 text-gray-600 group-hover:text-primaryColor transition-colors duration-300 
                      `}
                      >
                        Collect your order from our restaurant
                      </p>

                      {/* Features */}
                      {/* <div className="space-y-2">
                      <div
                        className={`flex items-center justify-center gap-2 text-sm text-gray-600
                        `}
                      >
                        <Clock className="w-4 h-4" />
                        <span>30-45 mins</span>
                      </div>
                      <div
                        className={`flex items-center justify-center gap-2 text-sm text-gray-600
                        `}
                      >
                        <span className="font-medium">Delivery Fee: Rs 5</span>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">💡</span>
                    </div>
                    <div>
                      <p className="text-green-800 font-semibold text-sm">
                        Quick Tip
                      </p>
                      <p className="text-green-700 text-xs">
                        Choose pickup to save on delivery fees and get your food
                        faster!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full  flex-col items-center p-4 justify-center  gap-6 ">
                {/* Special Instructions */}
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Instructions{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                    <textarea
                      placeholder="Any special delivery instructions..."
                      value={pickupInfo.specialInstructions}
                      onChange={(e) =>
                        setPickupInfo({
                          ...pickupInfo,
                          specialInstructions: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full p-4 pl-12 border-2 border-gray-200 outline-none rounded-xl focus:ring-3 focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                    />
                  </div>
                </div>
                {/* -----------------Input for Phone Number------------------  */}
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={pickupInfo.alternatePhone}
                      onChange={(e) =>
                        setPickupInfo({
                          ...pickupInfo,
                          alternatePhone: e.target.value,
                        })
                      }
                      className="w-full p-3 pl-12 border-2 border-gray-200 outline-none rounded-xl focus:ring-3 focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>

                <Button
                  onClick={confirmOrder}
                  size="lg"
                  fullWidth
                  variant="filled"
                  color="green"
                  radius={"md"}
                >
                  Proceed To Payment
                </Button>
              </div>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </main>
  );
};

export default Cart;
