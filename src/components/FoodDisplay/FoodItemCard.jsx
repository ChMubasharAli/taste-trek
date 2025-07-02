"use client";

import { useContext } from "react";
import { Card, Image, Text, Group, Rating, Title, Button } from "@mantine/core";
import {
  IconCircleMinus,
  IconCirclePlus,
  IconShoppingCart,
} from "@tabler/icons-react";
import { StoreContext } from "../../context/StoreContext";
import { notifications } from "@mantine/notifications";

export default function FoodItemCard({ item }) {
  // --------------Destructuring the Item Details-----------------------
  const { _id, name, price, description, image } = item;

  //   getting data from the Store Context
  const { cartItems, addToCart, decreaseItemQuantity, isLoggedIn, open } =
    useContext(StoreContext);

  const foodItem = cartItems.find((cartItem) => cartItem._id === _id);

  return (
    <Card
      shadow="xl"
      padding={0}
      radius="xl"
      withBorder
      className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-gray-200 hover:border-orange-300 relative"
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fafafa 100%)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-400 to-red-400 opacity-10 rounded-bl-full"></div>

      {/* Image Section */}
      <Card.Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

        <Image
          src={image || "/placeholder.svg"}
          classNames={{
            root: "!h-56 relative overflow-hidden",
            figure: "!h-full",
            imageWrapper: "!h-full",
          }}
          alt="item-image"
          className="group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Floating price badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
            <Title order={4} className="!text-white !font-bold !m-0">
              ${price}
            </Title>
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
          <Rating value={3.5} fractions={2} color="#f59e0b" size="sm" />
        </div>
      </Card.Section>

      {/* Content Section */}
      <section className="flex flex-col h-full justify-between p-6 bg-gradient-to-b from-white to-gray-50/50">
        {/* Header Info */}
        <div className="mb-4">
          <Group justify="space-between" mt="md" mb="xs">
            <Text
              size="xl"
              fw={600}
              className="!text-gray-800 !leading-tight group-hover:!text-orange-600 transition-colors duration-300"
              style={{ color: "#1f2937" }}
            >
              {name}
            </Text>
          </Group>

          <Text
            lineClamp={2}
            size="sm"
            className="!text-gray-600 !leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            {description}
          </Text>
        </div>

        {/* Action Section */}
        <div className="mt-auto">
          <Group justify="space-between" mt="md" mb="xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Text size="xs" className="!text-green-600 !font-medium">
                Available Now
              </Text>
            </div>
          </Group>

          {foodItem?._id !== _id ? (
            <Button
              onClick={() => {
                isLoggedIn
                  ? addToCart(item)
                  : (notifications.show({
                      title: "Please Log In",
                      message: "Please log in first to add items to your cart.",
                      position: "top-right",
                      color: "red",
                      withBorder: true,
                      radius: "md",
                    }),
                    open());
              }}
              size="md"
              variant="filled"
              radius="xl"
              className="!w-full !h-12 !font-semibold !text-white !border-0 hover:!scale-[1.02] !transition-all !duration-300 !shadow-lg hover:!shadow-xl"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
              }}
              rightSection={<IconShoppingCart stroke={2} size={18} />}
            >
              Add to Cart
            </Button>
          ) : (
            <div className="space-y-3">
              {/* Quantity Controls */}
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 shadow-inner">
                <button
                  onClick={() => decreaseItemQuantity(item)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-red-300 group/btn"
                >
                  <IconCircleMinus
                    className="text-red-500 group-hover/btn:text-red-600 transition-colors duration-200"
                    stroke={2}
                    size={20}
                  />
                </button>

                <div className="flex flex-col items-center">
                  <Text size="xs" className="!text-gray-500 !font-medium mb-1">
                    Quantity
                  </Text>
                  <div className="flex items-center justify-center min-w-[50px] h-10 bg-white rounded-xl shadow-sm border border-gray-200">
                    <Text fw={600} size="lg" className="!text-gray-800">
                      {foodItem?.quantity}
                    </Text>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-green-300 group/btn"
                >
                  <IconCirclePlus
                    className="text-green-500 group-hover/btn:text-green-600 transition-colors duration-200"
                    stroke={2}
                    size={20}
                  />
                </button>
              </div>

              {/* Total Display */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                <div className="flex justify-between items-center">
                  <Text size="sm" className="!text-green-700 !font-medium">
                    Total Amount:
                  </Text>
                  <Text size="lg" fw={700} className="!text-green-800">
                    ${(price * foodItem?.quantity).toFixed(2)}
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Card>
  );
}
