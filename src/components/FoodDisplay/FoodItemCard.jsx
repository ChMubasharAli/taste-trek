import { useContext, useState } from "react";
import { Card, Image, Text, Group, Title, Button, Modal } from "@mantine/core";
import {
  IconCheck,
  IconCircleMinus,
  IconCirclePlus,
  IconShoppingCart,
} from "@tabler/icons-react";
import { StoreContext } from "../../context/StoreContext";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export default function FoodItemCard({ item }) {
  // --------------Destructuring the Item Details-----------------------
  const { _id, name, basePrice, description, image, components } = item;

  // comming from mantine
  const [opened, { open: cartModalOpen, close: cartModalClose }] =
    useDisclosure(false);

  const [isAddonsOpen, setIsAddonsOpen] = useState(false);

  const [addons, setAddons] = useState([]);
  const [mainItem, setMainItem] = useState({
    quantity: 1,
    selectedItems: [],
  });

  //   getting data from the Store Context
  const { cartItems, addToCart, addOnsMenu } = useContext(StoreContext);

  const foodItem = cartItems.find((cartItem) => cartItem._id === _id);

  // Function to add an item to the AddOns
  const addToAddOnsCart = (item) => {
    setAddons((prevState) => {
      if (prevState.some((addOnsItem) => addOnsItem._id === item._id)) {
        return prevState.map((addOnsItem) =>
          addOnsItem._id === item._id
            ? { ...addOnsItem, quantity: addOnsItem.quantity + 1 }
            : addOnsItem
        );
      } else {
        return [...prevState, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove from Cart Functionality
  const decreaseItemQuantityToAddOnsCart = (item) => {
    setAddons((prevState) => {
      const existingItem = prevState.find(
        (cartItem) => cartItem._id === item._id
      );
      if (!existingItem) return prevState;

      return existingItem.quantity > 1
        ? prevState.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        : prevState.filter((cartItem) => cartItem._id !== item._id);
    });
  };

  // find the total sum of addOnsItems
  const totalAddOnsItemAmount = addons.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem?.quantity;
  }, 0);

  // Initialize selected components when modal opens
  const initializeModal = () => {
    cartModalOpen();
    setMainItem({
      ...item,
      quantity: 1,
      selectedItems: components.map((group) => group.item[0]),
    });
    setAddons([]);
  };

  // Handle component selection change
  const handleComponentChange = (groupIndex, itemId) => {
    setMainItem((prev) => {
      const newselectedItems = [...prev.selectedItems];
      const selectedItem = components[groupIndex].item.find(
        (item) => item._id === itemId
      );
      newselectedItems[groupIndex] = selectedItem;
      return { ...prev, selectedItems: newselectedItems };
    });
  };

  // Calculate total price (ONLY base price + add-ons)
  const calculateTotalPrice = () => {
    return (
      (mainItem.basePrice || 0) * (mainItem.quantity || 1) +
      totalAddOnsItemAmount
    );
  };

  // Prepare item for cart
  const prepareCartItem = () => {
    console.log("Main Item is ", mainItem);
    return {
      ...mainItem,
      addOns: [...addons],
      totalPrice: calculateTotalPrice(),
    };
  };

  return (
    <>
      <Card
        shadow="xl"
        padding={0}
        radius="xl"
        withBorder
        className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 !bg-white !border-gray-200 hover:!border-primaryColor relative"
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
                ${basePrice}
              </Title>
            </div>
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
                className="!text-gray-800 !leading-tight group-hover:!text-primaryColor transition-colors duration-300"
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
                onClick={initializeModal}
                size="md"
                variant="filled"
                radius="xl"
                className="!w-full !h-12 !font-semibold !text-white !border-0 hover:!scale-[1.02] !transition-all !duration-300 !shadow-lg hover:!shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
                }}
                rightSection={<IconShoppingCart stroke={2} size={18} />}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                onClick={() => {
                  notifications.show({
                    title: "Already Added",
                    message: "Item is already in your cart",
                    position: "top-right",
                    color: "red",
                    withBorder: true,
                    radius: "md",
                  });
                }}
                size="md"
                variant="filled"
                radius="xl"
                className="!w-full !h-12 !font-semibold !text-white !border-0 hover:!scale-[1.02] !transition-all !duration-300 !shadow-lg hover:!shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
                }}
                rightSection={<IconCheck stroke={5} size={18} />}
              >
                Added
              </Button>
            )}
          </div>
        </section>

        {/* Subtle bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primaryColor opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>

      <Modal.Root
        centered
        closeOnClickOutside={false}
        opened={opened}
        onClose={cartModalClose}
        size={"xl"}
      >
        <Modal.Overlay />
        <Modal.Content radius={"lg"}>
          <Modal.Header>
            <Modal.Title className="!text-3xl !font-bold !text-gray-800">
              Customize Your Combo
            </Modal.Title>
            <Modal.CloseButton size={"lg"} />
          </Modal.Header>
          <Modal.Body>
            <section className="">
              <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
                {/* Left Section */}
                <div className="  py-8 rounded-2xl ">
                  {/* Choose Your Option Section  */}
                  {components?.map((option, index) => (
                    <div key={index} className="mb-6">
                      <label className="block  text-gray-700 font-semibold mb-3 text-lg">
                        Select your choice
                      </label>
                      <select
                        value={mainItem.selectedItems?.[index]?._id || ""}
                        onChange={(event) =>
                          handleComponentChange(index, event.target.value)
                        }
                        className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-3 focus:ring-green-300 focus:outline-none transition-all duration-200 bg-green-50 hover:bg-green-100 cursor-pointer"
                      >
                        {option.item.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  {/* add ons section  */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Ons (Optional)
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setIsAddonsOpen(!isAddonsOpen)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-left flex items-center justify-between hover:bg-gray-50"
                      >
                        <span className="text-gray-700">Select Add Ons</span>
                        <span
                          className={`transform transition-transform ${
                            isAddonsOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>

                      {/* Add Ons Dropdown Content */}
                      {isAddonsOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                          <div className="p-4 space-y-4">
                            {addOnsMenu?.map((addon) => {
                              const addOnsItem = addons.find(
                                (cartItem) => cartItem?._id === addon?._id
                              );

                              return (
                                <div
                                  key={addon._id}
                                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                      <img
                                        src={addon.image}
                                        alt="addons-image"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900">
                                        {addon.name}
                                      </h4>
                                      <p className="text-green-600 text-sm font-medium">
                                        $ {addon.price}
                                      </p>
                                    </div>
                                  </div>

                                  {/* ADD Button or Quantity Controls */}
                                  {addOnsItem?._id !== addon?._id ? (
                                    <button
                                      onClick={() => addToAddOnsCart(addon)}
                                      className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                                    >
                                      ADD
                                    </button>
                                  ) : (
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                      <button
                                        onClick={() =>
                                          decreaseItemQuantityToAddOnsCart(
                                            addon
                                          )
                                        }
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                      >
                                        −
                                      </button>
                                      <span className="px-3 py-1 font-medium bg-white text-sm">
                                        {addOnsItem.quantity}
                                      </span>
                                      <button
                                        onClick={() => addToAddOnsCart(addon)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                      >
                                        +
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="  py-8 ">
                  <div className="flex flex-col items-center">
                    {/* Image Container */}
                    <div className="relative mb-8 w-full">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-dashed border-green-300 rounded-2xl w-full h-56 flex items-center justify-center relative overflow-hidden">
                        <img
                          src={image}
                          alt={name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <section className="flex flex-col gap-8  w-full">
                      {/* Description */}
                      <div>
                        <p className="text-gray-800 font-semibold mb-2">
                          Your Selection:
                        </p>
                        <ul className="list-disc pl-5">
                          <li className="text-gray-700">{name}</li>
                          {mainItem.selectedItems?.map((comp, idx) => (
                            <li key={idx} className="text-gray-700">
                              {comp.name}
                            </li>
                          ))}
                          {addons.map((addon) => (
                            <li key={addon._id} className="text-gray-700">
                              {addon.name} (x{addon.quantity}) (+$
                              {addon.price * addon.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between   w-full ">
                        {/* Price */}
                        <p className="text-3xl font-bold  text-green-700">
                          ${calculateTotalPrice()}
                        </p>

                        <div className="flex items-center justify-between  gap-4 ">
                          <button
                            disabled={mainItem?.quantity <= 1}
                            onClick={() =>
                              setMainItem((prevState) => ({
                                ...prevState,
                                quantity: prevState.quantity - 1,
                              }))
                            }
                            className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-red-300 group/btn"
                          >
                            <IconCircleMinus
                              className="text-red-500 group-hover/btn:text-red-600 transition-colors duration-200"
                              stroke={2}
                              size={20}
                            />
                          </button>

                          <Text fw={600} size="lg" className="!text-gray-800">
                            {mainItem.quantity || 1}
                          </Text>

                          <button
                            onClick={() =>
                              setMainItem((prevState) => ({
                                ...prevState,
                                quantity: prevState.quantity + 1,
                              }))
                            }
                            className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-green-300 group/btn"
                          >
                            <IconCirclePlus
                              className="text-green-500 group-hover/btn:text-green-600 transition-colors duration-200"
                              stroke={2}
                              size={20}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => {
                          addToCart(prepareCartItem());
                          cartModalClose();
                          notifications.show({
                            title: "Added to Cart",
                            message: `${name} has been added to your cart`,
                            color: "green",
                          });
                          console.log(
                            "Prepared Cart Item is ",
                            prepareCartItem()
                          );

                          console.log("Cart Items Are ", cartItems);
                        }}
                        size="md"
                        variant="filled"
                        radius="lg"
                        className=" !h-12 !font-semibold !text-white !border-0 hover:!scale-[1.02] !transition-all !duration-300 !shadow-lg hover:!shadow-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                          boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
                        }}
                        rightSection={<IconShoppingCart stroke={2} size={18} />}
                      >
                        Add to Cart
                      </Button>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
