import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  PasswordInput,
  Title,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { StoreContext } from "../../context/StoreContext";

export default function ForgetPassword() {
  const handleForgetPassword = async () => {
    notifications.show({
      title: "Password Sent",
      message: "A password has been sent to your email.",
      position: "top-right",
      color: "blue", // Info color
      withBorder: true,
      radius: "md",
    });
  };

  //   state to store email address
  const [email, setEmail] = useState("");

  return (
    <section className="h-[70vh] flex flex-col items-center justify-center  ">
      <div className="max-w-lg rounded-2xl p-4 shadow-md w-full flex flex-col items-center gap-y-6">
        <Title ta="center" order={2}>
          Reset Your Password
        </Title>

        {/* -----------------Input for Email------------------  */}
        <Input.Wrapper
          withAsterisk
          classNames={{ label: "!mb-1" }}
          label="Email "
        >
          <Input
            onChange={(event) => setEmail(event.currentTarget.value)}
            radius={"md"}
            size="md"
            placeholder="Enter your email..."
            leftSection={<IconAt size={16} />}
          />
        </Input.Wrapper>

        <Button
          onClick={handleForgetPassword}
          size="md"
          variant="filled"
          color="#FF6347"
          radius={"md"}
        >
          Submit
        </Button>
      </div>
    </section>
  );
}
