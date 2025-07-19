import { useContext, useState } from "react";
import { Wallet, CreditCard } from "lucide-react";
import { Button } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export default function PaymentComp() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(null);

  const location = useLocation();
  const {
    alternatePhone,
    specialInstructions,
    deliveryMethod,
    formData,
    additionalDetail,
  } = location.state || {};

  const { cartItems, userData } = useContext(StoreContext);

  // Payload for Pickup Order
  const pickupPayload = {
    userId: userData._id,
    packages: cartItems,
    deliveryMethod: deliveryMethod,
    paymentMethod: selectedMethod,
    phone: alternatePhone,
    alternatePhone: alternatePhone,
    specialInstructions: specialInstructions,
  };

  const deliveryPayload = {
    userId: userData._id,
    packages: cartItems,
    deliveryMethod: formData?.deliveryMethod,
    paymentMethod: selectedMethod,
    phone: formData?.phone,
    alternatePhone: additionalDetail?.alternatePhone,
    specialInstructions: additionalDetail?.specialInstructions,
    location: {
      street: formData?.street,
      city: formData?.city,
      state: formData?.state,
      zipcode: formData?.zipcode,
      country: formData?.country,
    },
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (deliveryMethod === "pickup") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/orderPlacement`,
          pickupPayload
        );
        if (response?.data?.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          notifications.show({
            title: "Order Placed",
            message: "Your order has beed placed successfully",
            position: "top-right",
            autoClose: 4000,
            color: "green", // Yellow for warning
            withBorder: true,
            radius: "md",
          });
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/orderPlacement`,
          deliveryPayload
        );
        if (response?.data?.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          notifications.show({
            title: "Order Placed",
            message: "Your order has beed placed successfully",
            position: "top-right",
            autoClose: 4000,
            color: "green", // Yellow for warning
            withBorder: true,
            radius: "md",
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto p-4 min-h-[70vh] py-32 ">
      <div className="mb-6 sm:mb-8">
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-wide"
        >
          Choose Payment Method
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4"></div>
      </div>

      <div className=" max-w-3xl mx-auto">
        {/* Payment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Cash on Delivery */}
          <div
            onClick={() => setSelectedMethod("cash")}
            className={`relative cursor-pointer rounded-2xl border-2 shadow-md h-80 flex items-center justify-center bg-white p-6 transition-all duration-200 ${
              selectedMethod === "cash"
                ? "border-primaryColor bg-green-50 shadow-lg"
                : "border-gray-200 hover:border-primaryColor hover:bg-green-50 hover:shadow-lg"
            }`}
          >
            <div className="text-center">
              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedMethod === "cash"
                    ? "bg-primaryColor"
                    : "group-hover:bg-primaryColor"
                }`}
              >
                <Wallet
                  className={`w-8 h-8 transition-colors duration-300 ${
                    selectedMethod === "cash"
                      ? "text-white"
                      : "text-gray-600 group-hover:text-white"
                  }`}
                />
              </div>

              {/* Title */}
              <h3
                className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                  selectedMethod === "cash"
                    ? "text-primaryColor"
                    : "text-gray-900 group-hover:text-primaryColor"
                }`}
              >
                Cash on Delivery
              </h3>

              {/* Description */}
              <p
                className={`text-sm mb-4 transition-colors duration-300 ${
                  selectedMethod === "cash"
                    ? "text-primaryColor"
                    : "text-gray-600 group-hover:text-primaryColor"
                }`}
              >
                Pay in cash when your order arrives
              </p>
            </div>
          </div>

          {/* Online Payment */}
          <div
            onClick={() => setSelectedMethod("online")}
            className={`relative cursor-pointer rounded-2xl shadow-md bg-white h-80 flex items-center justify-center border-2 p-6 transition-all duration-200 ${
              selectedMethod === "online"
                ? "border-primaryColor bg-green-50 shadow-lg"
                : "border-gray-200 hover:border-primaryColor hover:bg-green-50 hover:shadow-lg"
            }`}
          >
            <div className="text-center">
              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedMethod === "online"
                    ? "bg-primaryColor"
                    : "group-hover:bg-primaryColor"
                }`}
              >
                <CreditCard
                  className={`w-8 h-8 transition-colors duration-300 ${
                    selectedMethod === "online"
                      ? "text-white"
                      : "text-gray-600 group-hover:text-white"
                  }`}
                />
              </div>

              {/* Title */}
              <h3
                className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                  selectedMethod === "online"
                    ? "text-primaryColor"
                    : "text-gray-900 group-hover:text-primaryColor"
                }`}
              >
                Online Payment
              </h3>

              {/* Description */}
              <p
                className={`text-sm mb-4 transition-colors duration-300 ${
                  selectedMethod === "online"
                    ? "text-primaryColor"
                    : "text-gray-600 group-hover:text-primaryColor"
                }`}
              >
                Pay securely with credit/debit card
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        {selectedMethod && (
          <div className="text-center   ">
            <Button
              loading={loading}
              loaderProps={{ type: "dots" }}
              size="lg"
              px={"xl"}
              radius={"md"}
              variant="filled"
              color="green"
              c={"white"}
              onClick={handleConfirm}
            >
              Confirm Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
