import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Button, Checkbox, Input, Modal, PasswordInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
// import useApi from "../../hooks/useApi";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthPopup() {
  const {
    opened: modalOpened,
    close: modalClose,
    login,
  } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("login");

  const [loading, setLoading] = useState(false);

  //   state to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: "",
  });

  // const { data, error, loading, request } = useApi();

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if the email is valid or not
    if (formData.email.trim() === "" || !formData.email.includes("@")) {
      notifications.show({
        title: "Email required",
        message: "Please enter a valid email address.",
        position: "top-right",
        autoClose: 4000,
        color: "yellow", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      return; // Exit early if email is empty
    }

    // Check if the password is empty
    if (formData.password.trim() === "" || formData.password.length < 8) {
      notifications.show({
        title: "Password required",
        message: "Password must be at least 8 characters long.",
        position: "top-right",
        autoClose: 4000,
        color: "yellow", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      return; // Exit early if password is empty
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        formData
      );
      if (response.data.success) {
        notifications.show({
          title: "Login success",
          message: `${response?.data?.data?.message || "You are logged in "}`,
          position: "top-right",
          autoClose: 4000,
          color: "green",
          withBorder: true,
          radius: "md",
        });

        login(response.data.token, response.data.data);
        setFormData({
          name: "",
          email: "",
          password: "",
          acceptTerms: false,
        });
        modalClose();
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

  // Funtion to handle Signup
  const handleSignup = async () => {
    // Check if the name is empty
    if (formData.name.trim() === "") {
      notifications.show({
        title: "Name Required",
        message: "Please enter your name to continue.",
        position: "top-right",
        autoClose: 4000,
        color: "yellow", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      return; // Exit early if name is empty
    }

    // Check if the email is valid or not
    if (formData.email.trim() === "" || !formData.email.includes("@")) {
      notifications.show({
        title: "Email required",
        message: "Please enter a valid email address.",
        position: "top-right",
        autoClose: 4000,
        color: "yellow", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      return; // Exit early if email is empty
    }

    // Check if the password is empty
    if (formData.password.trim() === "" || formData.password.length < 8) {
      notifications.show({
        title: "Password required",
        message: "Password must be at least 8 characters long.",
        position: "top-right",
        autoClose: 4000,
        color: "yellow", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      return; // Exit early if password is empty
    }

    // Check if the user has accepted the terms
    if (!formData.acceptTerms) {
      notifications.show({
        title: "Terms Acceptance Required",
        message: "Please accept the terms and conditions to proceed.",
        position: "top-right",
        autoClose: 4000,
        color: "yellow", // Yellow for warning
        withBorder: true,
        radius: "md",
      });
      return; // Exit early if terms are not accepted
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        formData
      );
      if (response.data.success) {
        notifications.show({
          title: "Signup success",
          message: `${
            response?.data?.data?.message ||
            "User created successfully. Please verify your email with the OTP sent."
          }`,
          position: "top-right",
          autoClose: 4000,
          color: "green",
          withBorder: true,
          radius: "md",
        });

        // navigate to verify otp page
        setFormData({
          name: "",
          email: "",
          password: "",
          acceptTerms: false,
        });
        setCurrentState("login");
        navigate(
          "/verifyOtp",
          { state: { email: response.data.data.email } },
          scrollTo(0, 0)
        );
        modalClose();
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

    // Navigate to the verify otp page if user created successfully
    // navigate("/verifyOtp", { state: { email: data.email } });
  };

  return (
    <Modal.Root
      opened={modalOpened}
      onClose={modalClose}
      closeOnClickOutside={false}
      centered
    >
      <Modal.Overlay />

      <Modal.Content p={"sm"} radius={"lg"}>
        <Modal.Header>
          <Modal.Title fw={600} className="!text-2xl">
            {currentState === "login" ? "Login" : "Signup"}
          </Modal.Title>

          <Modal.CloseButton
            size="lg"
            classNames={{
              close:
                "hover:!scale-110 !transition-all duration-300 hover:!text-primaryColor hover:!border hover:!border-primaryColor",
            }}
          />
        </Modal.Header>

        <Modal.Body classNames={{ body: "!flex !flex-col !gap-4" }}>
          {/* {JSON.stringify(data, null, 2)} */}
          {/* -----------------Input for Name------------------  */}
          {currentState !== "login" && (
            <Input.Wrapper
              withAsterisk
              classNames={{ label: "!mb-1" }}
              label="Name "
            >
              <Input
                onChange={(event) =>
                  setFormData({ ...formData, name: event.currentTarget.value })
                }
                value={formData.name}
                radius={"md"}
                size="md"
                placeholder="Enter your name..."
              />
            </Input.Wrapper>
          )}

          {/* -----------------Input for Email------------------  */}
          <Input.Wrapper
            withAsterisk
            classNames={{ label: "!mb-1" }}
            label="Email "
          >
            <Input
              onChange={(event) =>
                setFormData({ ...formData, email: event.currentTarget.value })
              }
              value={formData.email}
              radius={"md"}
              size="md"
              placeholder="Enter your email..."
              leftSection={<IconAt size={16} />}
            />
          </Input.Wrapper>

          {/* -----------------Input for Password------------------  */}
          <PasswordInput
            withAsterisk
            onChange={(event) =>
              setFormData({ ...formData, password: event.currentTarget.value })
            }
            value={formData.password}
            size="md"
            radius={"md"}
            label="Password "
            placeholder="Enter your password"
          />

          {currentState === "signup" && (
            <Checkbox
              label="By continuing, i agree the terms of use & privacy policy"
              checked={formData.acceptTerms}
              value={formData.acceptTerms}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  acceptTerms: event.currentTarget.checked,
                })
              }
            />
          )}

          {currentState === "login" ? (
            <Button
              loading={loading}
              disabled={loading}
              loaderProps={{ type: "dots" }}
              onClick={handleLogin}
              size="md"
              variant="filled"
              color="green"
              radius={"md"}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleSignup}
              size="md"
              variant="filled"
              color="green"
              radius={"md"}
              loading={loading}
              disabled={loading}
              loaderProps={{ type: "dots" }}
            >
              Signup
            </Button>
          )}

          {currentState === "login" ? (
            <p className="">
              Create a new account?{" "}
              <span
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    acceptTerms: false,
                  });
                  setCurrentState("signup");
                }}
                className="text-primaryColor cursor-pointer "
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-center">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    acceptTerms: false,
                  });
                  setCurrentState("login");
                }}
                className="text-primaryColor cursor-pointer "
              >
                Login here
              </span>
            </p>
          )}

          {currentState === "login" && (
            <p className="">
              Forget Your Password?{" "}
              <span className="text-primaryColor cursor-pointer ">
                Click here
              </span>
            </p>
          )}

          {/* Section For Forgot Password  */}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
