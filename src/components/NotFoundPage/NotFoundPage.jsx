import { Button, Image, Text, Title } from "@mantine/core";
import errorPageImage from "../../assets/errorPageImage.svg"; // Path to your image
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex items-center  my-10 justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900">
                404
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
                Oops! Page not found
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                {
                  "The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL."
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="md"
                variant="filled"
                color="#FF6347"
                radius={"md"}
                onClick={() => {
                  navigate("/", scrollTo(0, 0));
                }}
              >
                Go Home
              </Button>
              <Button
                size="md"
                variant="outline"
                color="#FF6347"
                radius={"md"}
                onClick={() => {
                  navigate(-1, scrollTo(0, 0));
                }}
              >
                Go Back
              </Button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={errorPageImage}
                alt="404 Error Illustration"
                className="w-full max-w-md h-auto object-contain lg:scale-125"
              />
              {/* Optional decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-200 rounded-full opacity-40"></div>
              <div className="absolute top-1/2 -left-8 w-6 h-6 bg-pink-200 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
