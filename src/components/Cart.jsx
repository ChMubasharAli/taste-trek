import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Button, ScrollArea } from "@mantine/core";
import {
  IconCircleMinus,
  IconCirclePlus,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    decreaseItemQuantity,
    addToCart,
    removeFullItemFromCart,
    totalItemAmmount,
  } = useContext(StoreContext);

  if (cartItems.length <= 0) {
    return (
      <section className=" min-h-[70vh] py-24">
        <h1 className="text-center text-2xl font-bold">Cart is Empty</h1>
      </section>
    );
  }

  return (
    <section className=" min-h-[70vh] py-24">
      <ScrollArea offsetScrollbars scrollbarSize={8}>
        <table className="w-full text-left border-collapse ">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="p-2">Items</th>
              <th className="p-2">Title</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Total</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md shadow-md "
                  />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2 flex  items-end h-[60px] gap-1 md:gap-3">
                  <IconCircleMinus
                    className="cursor-pointer hover:scale-110 transition-all duration-300"
                    onClick={() => decreaseItemQuantity(item)}
                    stroke={2}
                    color="#FF6347"
                  />
                  {item.quantity}
                  <IconCirclePlus
                    className="cursor-pointer hover:scale-110 transition-all duration-300"
                    onClick={() => addToCart(item)}
                    stroke={2}
                    color="#FF6347"
                  />
                </td>
                <td className="p-2">${item.price * item.quantity}</td>
                <td className="p-2 flex items-center justify-center">
                  <span
                    onClick={() => removeFullItemFromCart(item)}
                    className="bg-red-500  cursor-pointer h-10 w-8 flex items-center justify-center rounded-md "
                  >
                    <IconTrash
                      className="hover:scale-110 transition-all duration-300 text-white hover:text-black"
                      stroke={2}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>

      <div className="mt-6 flex   justify-between items-start">
        <div className="max-w-xl w-full">
          <h2 className="text-xl font-bold">Cart Totals</h2>
          <div className="flex justify-between max-w-xl my-4 border-b py-1">
            <span className="mr-2">Subtotal</span>
            <span>${totalItemAmmount}</span>
          </div>
          <div className="flex justify-between max-w-xl my-4 border-b py-1">
            <span className="mr-2">Delivery Fee</span>
            <span>$5</span>
          </div>
          <div className="flex justify-between max-w-xl my-4 border-b py-1">
            <span className="mr-2">Ammount To Pay</span>
            <span>${totalItemAmmount + 5}</span>
          </div>
          <Button
            size="md"
            my={"md"}
            variant="filled"
            color="#FF6347"
            radius={"md"}
            classNames={{ root: "!w-fit" }}
            onClick={() => {
              navigate("/checkout", scrollTo(0, 0));
            }}
          >
            Proceed To Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
