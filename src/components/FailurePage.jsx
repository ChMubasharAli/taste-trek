import { BackgroundImage, Container, Loader, Overlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FailurePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const session_id = queryParams.get("session_id");

  useEffect(() => {
    const paymentSuccess = async () => {
      notifications.show({
        title: "Payment Failed",
        message: "Place your order again...",
        position: "top-right",
        autoClose: 7000,
        color: "red", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/payment-failure?session_id=${session_id}`
        );

        if (response.data.success) {
          navigate("/cart", scrollTo(0, 0));
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
            <h1 className="text-2xl font-bold text-black">Payment Failed</h1>
          </div>

          <div className="flex flex-col  items-center justify-center py-10">
            <div className="w-24 h-24 rounded-full bg-red-400 flex items-center justify-center">
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-800">
              Place Your Order Again
            </h2>

            <p className="text-sm flex items-center justify-center gap-2  text-gray-500 mt-2">
              You will be redirected to CART page{" "}
              <Loader color="red" size={"sm"} type="dots" />
            </p>
          </div>

          <div className="bg-green-50 text-center p-6">
            <p className="text-sm  text-red-400">
              Your payment could not be proceed this time. Please try again or
              contact support it the issue percsist
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default FailurePage;
