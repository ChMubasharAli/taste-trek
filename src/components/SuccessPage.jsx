// import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { BackgroundImage, Container, Loader, Overlay } from "@mantine/core";
import { StoreContext } from "../context/StoreContext";

function SuccessPage() {
  //   const [searchParams] = useSearchParams();
  //   const sessionId = searchParams.get(id);
  //   const navigate = useNavigate();
  const [isSuccess] = useState(true);
  const { isLoggedIn } = useContext(StoreContext);

  return (
    <main className="min-h-[70vh]  flex items-center justify-center  w-full">
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
              {isSuccess ? (
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
              ) : (
                <Loader color="white" type="bars" />
              )}
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-800">
              Successful Payment
            </h2>
            {isSuccess && (
              <p className="text-sm text-gray-500 mt-2">
                {isLoggedIn
                  ? "You will be redirected to the dashboard soon… "
                  : "You will be redirected to login soon…"}
              </p>
            )}
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
