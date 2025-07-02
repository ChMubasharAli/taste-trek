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
      const response = await axios.post("/api/verify-signup-otp", {
        otp,
        email,
      });
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
        navigate("/", scrollTo(0, 0));
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
      <div className="max-w-lg rounded-2xl p-4 shadow-md w-full flex flex-col gap-y-6 items-center">
        {/* {JSON.stringify(otp, null, 2)} */}
        <Title ta="center" order={2}>
          Verify Your OTP
        </Title>

        {/* -----------------Input for OTP------------------  */}
        <PinInput
          classNames={{ input: "!border !border-2 !border-secondaryColor" }}
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
          color="#FF6347"
          radius={"md"}
          fullWidth
        >
          Verify
        </Button>
      </div>
    </section>
  );
}
