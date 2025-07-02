import { Avatar, ScrollArea, Title } from "@mantine/core";
import React from "react";

const MyOrders = () => {
  const orders = [
    {
      id: 1,
      title: "Greek salad x 2, Peri Peri Rolls x 3",
      price: "$65.00",
      itemCount: 2,
      status: "Food Processing",
      imgUrl:
        "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg",
    },
  ];

  return (
    <>
      <section className=" lg:pt-24 flex flex-col gap-10">
        {/* {JSON.stringify(data?.data, null, 2)} */}
        <Title
          classNames={{
            root: "lg:!text-[3rem] !text-secondaryColor !tracking-wider ",
          }}
        >
          My Orders
        </Title>

        {/* {loading && (
          <div className="flex justify-center">
            <Loader type="bars" color="#ff6347" />
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 rounded-md font-bold text-lg py-4 bg-red-100 border-l-4 border-red-500 shadow-md">
            Failed to load food items. Please refresh the page.
          </div>
        )} */}

        <ScrollArea
          h={200}
          offsetScrollbars
          scrollbarSize={8}
          scrollbars="x"
          classNames={{
            root: "max-w-[122rem] lg:!min-h-[50vh]",
            thumb: "!bg-[#ff6347]",
            scrollbar: "!bg-gray-300 !h-2 rounded-full",
          }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded p-4 mb-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-1">
                <img
                  src={order.imgUrl}
                  alt={order.title}
                  className="w-16 h-16 object-cover rounded-md shadow-md "
                />
                <div>
                  <p className="text-sm">{order.title}</p>
                </div>
              </div>
              <div className="text-sm">{order.price}</div>
              <div className="text-sm">Items {order.itemCount}</div>
              <div className="text-sm text-red-500 flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                {order.status}
              </div>
            </div>
          ))}
        </ScrollArea>
      </section>
    </>
  );
};

export default MyOrders;
