import {
  Avatar,
  Button,
  Center,
  Divider,
  Loader,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
// import { menu_list } from "../assets/assets";s
import useApi from "../hooks/useApi";
import { IconToolsKitchen3 } from "@tabler/icons-react";

export default function ExploreMenu({ category, setCategory }) {
  const { data, error, loading, request } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      await request(`{${import.meta.env.VITE_API_URL}/api/categories`);
    };

    fetchData();
  }, []);
  return (
    <section id="exploreMenu" className="container mx-auto lg:pt-24 py-10 ">
      {/* {JSON.stringify(data?.data, null, 2)} */}
      <Title
        data-aos="fade-up"
        ta={"center"}
        classNames={{
          root: "lg:!text-[3rem] !text-primaryColor !tracking-wider ",
        }}
      >
        Explore Our Menu
      </Title>

      <Text
        data-aos="fade-up"
        lineClamp={3}
        my={"md"}
        ta={"center"}
        size="lg"
        classNames={{
          root: "!max-w-3xl !mx-auto !text-gray-500  !tracking-wider ",
        }}
      >
        Discover our diverse menu, offering tempting dishes crafted to
        perfection. Our goal is to satisfy your cravings and elevate every meal.{" "}
      </Text>

      {loading && (
        <div className="flex justify-center">
          <Loader type="bars" color="#ff6347" />
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 rounded-md font-bold text-lg py-4 bg-red-100 border-l-4 border-red-500 shadow-md">
          Failed to load food items. Please refresh the page.
        </div>
      )}

      <ScrollArea
        data-aos="fade-up"
        offsetScrollbars
        scrollbarSize={8}
        scrollbars="x"
        classNames={{
          root: "max-w-[122rem] !min-h-[90px] bg-secondaryColor !rounded-full px-4 ",
          thumb: "!bg-primaryColor",
          scrollbar: "!bg-gray-300 !h-3 rounded-full",
        }}
      >
        <div className="flex h-[90px]  gap-10 items-center  justify-evenly py-4 ">
          {/* all items button  */}
          <Button
            variant={category === "All" ? "filled" : "light"}
            color="green"
            radius={"xl"}
            onClick={() => setCategory("All")}
            leftSection={
              <Avatar
                classNames={{ root: "!bg-primaryColor !rounded-full" }}
                color="green"
                variant="light"
                radius="sm"
              >
                <IconToolsKitchen3 color="white" size={20} />
              </Avatar>
            }
            classNames={{
              root: ` hover:!scale-105 !transition-all !duration-300 !cursor-pointer !min-w-44  ${
                category === "All" ? "border-5 border-primaryColor " : ""
              }  `,
            }}
            size={"lg"}
          >
            All Items
          </Button>
          {data?.data?.map((menu) => (
            <div
              className="flex flex-col items-center gap-3  "
              key={menu.menu_name}
            >
              <Button
                variant={category === menu.name ? "filled" : "light"}
                color="green"
                radius={"xl"}
                leftSection={
                  <Avatar
                    src={menu.image}
                    alt="it's me"
                    // className="animate-spin"
                  />
                }
                onClick={() =>
                  setCategory((prevState) =>
                    prevState === menu.name ? "All" : menu.name
                  )
                }
                classNames={{
                  root: ` hover:!scale-105 !min-w-40 !transition-all !duration-300 !cursor-pointer  ${
                    category === menu.name
                      ? "border-5 border-primaryColor "
                      : ""
                  }  `,
                }}
                size={"lg"}
              >
                {menu?.name}
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
