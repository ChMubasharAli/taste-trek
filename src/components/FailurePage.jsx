import { BackgroundImage, Container, Overlay } from "@mantine/core";
import { useLocation } from "react-router-dom";

function FailurePage() {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       navigate("/owner-plans"); // Redirect to login page after 10 seconds
  //     }, 5000);

  //     return () => clearTimeout(timer); // Clean up the timer
  //   });

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const session_id = queryParams.get("session_id");
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
              Transection Unsuccessful
            </h2>

            {/* ---------------------------------------------------------session id shwon -------------------------------------------------- */}
            <span className="text-xl text-primaryColor font-bold">
              Session Id :{" "}
            </span>

            {session_id}
            {/* ---------------------------------------------------------session id shwon -------------------------------------------------- */}
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
