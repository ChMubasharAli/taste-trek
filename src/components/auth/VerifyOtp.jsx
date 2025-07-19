import React, { useContext, useState } from "react";
import { Button, PinInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(StoreContext);

  // extracting email from the location
  const { email } = location.state || {};
  //   state to store email address
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const handleVerifyOpt = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/verify-signup-otp`,
        {
          otp,
          email,
        }
      );
      if (response.data.success) {
        notifications.show({
          title: "OTP verified",
          message: `${
            response?.data?.message + "You are logged in " ||
            "Email verified successfy. You are logged in  "
          }`,
          position: "top-right",
          autoClose: 4000,
          color: "green",
          withBorder: true,
          radius: "md",
        });

        login(response.data.token, response.data.data);

        // navigate to verify otp page
        navigate(-1, scrollTo(0, 0));
      }
    } catch (error) {
      setLoading(false);
      notifications.show({
        title: "Error",
        message: `${error?.response?.data?.message || "Some thing went wrong"}`,
        position: "top-right",
        autoClose: 4000,
        color: "red",
        withBorder: true,
        radius: "md",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-[70vh] flex flex-col items-center justify-center  ">
      <div className="bg-white max-w-xl w-full rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
            Verify OTP
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 ">
          {/* -----------------Input for OTP------------------  */}
          <PinInput
            size="xl"
            placeholder="-"
            radius={"md"}
            value={otp}
            length={6}
            onChange={setOtp} // Directly set otp state here
          />

          <Button
            onClick={handleVerifyOpt}
            loading={loading}
            disabled={loading}
            loaderProps={{ type: "dots" }}
            size="md"
            variant="filled"
            color="green"
            radius={"md"}
            fullWidth
          >
            Verify
          </Button>
        </div>
      </div>
    </section>
  );
}
