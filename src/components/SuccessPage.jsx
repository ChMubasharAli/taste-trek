// import { useSearchParams } from "react-router-dom";

import { Container, Loader } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(StoreContext);

  const queryParams = new URLSearchParams(location.search);

  const session_id = queryParams.get("session_id");

  useEffect(() => {
    const paymentSuccess = async () => {
      notifications.show({
        title: "Payment Successfull",
        message: "Your will be redirected to your order page soon....",
        position: "top-right",
        autoClose: 4000,
        color: "green", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/payment-success?session_id=${session_id}`
        );

        if (response.data.success) {
          navigate("/myOrders", scrollTo(0, 0));
          clearCart();
        }
      } catch (error) {
        console.log("Error Occure while sending the session_id ", error);
      }
    };
    paymentSuccess();
  }, []);

  return (
    <main className="min-h-[70vh] py-32 flex items-center justify-center  w-full">
      {/* Text content with higher z-index */}
      <Container
        style={{ zIndex: 2 }} // Higher than overlay
        className="h-full w-full flex flex-col justify-center items-center text-center relative"
        size="xl"
      >
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg overflow-hidden">
          <div className="bg-green-50 text-center py-6">
            <h1 className="text-2xl font-bold text-black">Thank You</h1>
          </div>

          <div className="flex flex-col  items-center justify-center py-10">
            <div className="w-24 h-24 rounded-full bg-primaryColor flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-800">
              Successful Payment
            </h2>

            <p className="text-sm flex items-center justify-center gap-2  text-gray-500 mt-2">
              You will be redirected soo{" "}
              <Loader color="dark" size={"sm"} type="dots" />
            </p>
          </div>

          <div className="bg-green-50 text-center py-6">
            <p className="text-sm text-black">
              You have been successfully charged for this transaction.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default SuccessPage;
