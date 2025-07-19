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
import { AtSign } from "lucide-react";

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
      <div className="bg-white max-w-xl w-full rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
            Reset Your Password
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
        </div>

        <div className="flex w-full  flex-col items-center justify-center gap-6 ">
          {/* -----------------Input for Email------------------  */}

          <div className="w-full">
            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                // value={formData.email}
                // onChange={(e) =>
                //   setFormData({ ...formData, email: e.target.value })
                // }
                className="w-full p-3 pl-12 border-2 border-gray-200 outline-none rounded-xl focus:ring-3 focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          </div>

          <Button
            onClick={handleForgetPassword}
            size="lg"
            fullWidth
            variant="filled"
            color="green"
            radius={"md"}
          >
            Submit
          </Button>
        </div>
      </div>
    </section>
    // <section className="h-[70vh] flex flex-col items-center justify-center  ">
    //   <div className="max-w-lg rounded-2xl p-4 shadow-md w-full flex flex-col items-center gap-y-6">
    //     <Title ta="center" order={2}>
    //       Reset Your Password
    //     </Title>

    //     {/* -----------------Input for Email------------------  */}
    //     <Input.Wrapper
    //       withAsterisk
    //       classNames={{ label: "!mb-1" }}
    //       label="Email "
    //     >
    //       <Input
    //         onChange={(event) => setEmail(event.currentTarget.value)}
    //         radius={"md"}
    //         size="md"
    //         placeholder="Enter your email..."
    //         leftSection={<IconAt size={16} />}
    //       />
    //     </Input.Wrapper>

    //     <Button
    //       onClick={handleForgetPassword}
    //       size="md"
    //       variant="filled"
    //       color="#FF6347"
    //       radius={"md"}
    //     >
    //       Submit
    //     </Button>
    //   </div>
    // </section>
  );
}
