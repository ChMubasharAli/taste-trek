import React, { useContext, useState } from "react";
import { TextInput, Button, ScrollArea, Input } from "@mantine/core";
import { StoreContext } from "../../context/StoreContext";
import { IconAt } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

const CheckoutComponent = () => {
  const { userData, cartItems, totalItemAmmount, clearCart } =
    useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  //   state to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  let payload = {
    user: userData._id,
    items: cartItems,
    totalAmount: totalItemAmmount,
    deliveryCharge: 5.0,
    shippingAddress: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zipcode,
      country: formData.country,
    },
    userDetails: {
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
    },
    deliveryMethod: "delivery", // Either "delivery" or "pickup"
    paymentMethod: "online", // Payment method used by the user (e.g., "credit_card", "paypal")
    orderStatus: "pending", // Order status (default is "pending")
    paymentStatus: "unpaid", // Payment status (default is "unpaid")
    deliveryStatus: "not delivered",
  };

  const placeOrder = async () => {
    // Loop through formData to check for empty or spaces-only fields
    for (const field in formData) {
      if (!formData[field].trim() === "") {
        // Check if the field is empty or only contains spaces
        notifications.show({
          title: "Fields Required",
          message: `Please fill in the following fields: ${field}.`,
          position: "top-right",
          autoClose: 4000,
          color: "yellow", // Yellow for warning
          withBorder: true,
          radius: "md",
        });
        return; // Exit early if any field is empty or contains only spaces
      }
    }

    // place order
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orderPlacement`,
        payload
      );

      if (response) {
        notifications.show({
          title: "Order Placed",
          message: `Your order has been placed successfully.`,
          position: "top-right",
          autoClose: 4000,
          color: "green", // Yellow for warning
          withBorder: true,
          radius: "md",
        });

        clearCart();
      }
    } catch (error) {
      setLoading(false);
      console.log("error message is ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="container mx-auto py-24 flex flex-col lg:flex-row justify-between gap-6 ">
        {/* ---------------Left Section----------------------  */}
        <section className="grid grid-cols-1 gap-y-3 max-w-2xl w-full">
          <h2 className="text-2xl font-bold  tracking-wider">
            Delivery Information
          </h2>

          {/* -----------------Inputs for Name------------------  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input.Wrapper
              withAsterisk
              classNames={{ label: "!mb-1" }}
              label="First Name: "
            >
              <Input
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    firstName: event.currentTarget.value,
                  })
                }
                radius={"md"}
                size="md"
                placeholder="First name"
              />
            </Input.Wrapper>

            <Input.Wrapper
              withAsterisk
              classNames={{ label: "!mb-1" }}
              label="Last Name: "
            >
              <Input
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    lastName: event.currentTarget.value,
                  })
                }
                radius={"md"}
                size="md"
                placeholder="Last name"
              />
            </Input.Wrapper>
          </div>

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
              radius={"md"}
              size="md"
              placeholder="Email address"
              leftSection={<IconAt size={16} />}
            />
          </Input.Wrapper>

          {/* -----------------Inputs for City & State------------------  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Input.Wrapper
              withAsterisk
              classNames={{ label: "!mb-1" }}
              label="City: "
            >
              <Input
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    city: event.currentTarget.value,
                  })
                }
                radius={"md"}
                size="md"
                placeholder="City"
              />
            </Input.Wrapper>

            <Input.Wrapper
              withAsterisk
              classNames={{ label: "!mb-1" }}
              label="State: "
            >
              <Input
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    state: event.currentTarget.value,
                  })
                }
                radius={"md"}
                size="md"
                placeholder="State"
              />
            </Input.Wrapper>
          </div>

          {/* -----------------Input for Street------------------  */}

          <Input.Wrapper
            withAsterisk
            classNames={{ label: "!mb-1" }}
            label="Street "
          >
            <Input
              onChange={(event) =>
                setFormData({ ...formData, street: event.currentTarget.value })
              }
              radius={"md"}
              size="md"
              placeholder="Street"
            />
          </Input.Wrapper>

          {/* -----------------Inputs for Zipcode & Country------------------  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m">
            <Input.Wrapper
              withAsterisk
              classNames={{ label: "!mb-1" }}
              label="Zip code "
            >
              <Input
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    zipcode: event.currentTarget.value,
                  })
                }
                radius={"md"}
                size="md"
                placeholder="Zipcode"
              />
            </Input.Wrapper>

            <Input.Wrapper
              withAsterisk
              classNames={{ label: "!mb-1" }}
              label="Country "
            >
              <Input
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    country: event.currentTarget.value,
                  })
                }
                radius={"md"}
                size="md"
                placeholder="Country"
              />
            </Input.Wrapper>
          </div>

          {/* -----------------Input for Phone------------------  */}

          <Input.Wrapper
            withAsterisk
            classNames={{ label: "!mb-1" }}
            label="Phone : "
          >
            <Input
              onChange={(event) =>
                setFormData({ ...formData, phone: event.currentTarget.value })
              }
              radius={"md"}
              size="md"
              placeholder="Phone"
            />
          </Input.Wrapper>
        </section>

        {/* ---------------Right Section----------------------  */}

        <section className=" flex  max-w-lg w-full justify-between ">
          <div className=" w-full">
            <h2 className="text-xl font-bold">Cart Totals</h2>
            <div className="flex justify-between  my-4 border-b py-1">
              <span className="mr-2">Subtotal</span>
              <span>${totalItemAmmount}</span>
            </div>
            <div className="flex justify-between  my-4 border-b py-1">
              <span className="mr-2">Delivery Fee</span>
              <span>$5</span>
            </div>
            <div className="flex justify-between  my-4 border-b py-1">
              <span className="mr-2">Ammount To Pay</span>
              <span>${totalItemAmmount + 5}</span>
            </div>
            <Button
              size="md"
              loading={loading}
              disabled={loading}
              loaderProps={{ type: "dots" }}
              my={"md"}
              variant="filled"
              color="#FF6347"
              radius={"md"}
              classNames={{ root: "!w-fit" }}
              onClick={placeOrder}
            >
              Proceed To Payment
            </Button>
          </div>
        </section>
      </section>
    </>
  );
};

export default CheckoutComponent;
