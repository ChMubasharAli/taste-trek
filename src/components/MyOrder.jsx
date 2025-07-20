"use client";

import { Package, Clock, CheckCircle, Truck, CookingPot } from "lucide-react";
import useApi from "../hooks/useApi";
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Loader } from "@mantine/core";

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "ready":
      return <CheckCircle className="w-4 h-4 text-blue-500" />;
    case "preparing":
      return <CookingPot className="w-4 h-4 text-orange-500" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "cancelled":
      return <Package className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "text-green-600 bg-green-50 border-green-200";
    case "ready":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "preparing":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "pending":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "cancelled":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export default function MyOrdersComponent() {
  const { userData } = useContext(StoreContext);
  const { data, loading, request } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      await request(
        `${import.meta.env.VITE_API_URL}/api/getOrders/${userData._id}`
      );
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto py-32 px-4">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-wide">
            Your Orders
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Track and manage your food orders
          </p>
          <div className="flex items-center justify-center">
            <Loader color="#40C057" type="bars" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-32 px-4">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-wide">
          Your Orders
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4"></div>
        <p className="text-gray-600 text-lg">
          Track and manage your food orders
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4 sm:space-y-6">
        {/* Order Statistics */}
        {data?.data.length > 0 && (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {
                  data.data.filter(
                    (order) => order.status.toLowerCase() === "delivered"
                  ).length
                }
              </p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CookingPot className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {
                  data.data.filter(
                    (order) => order.status.toLowerCase() === "preparing"
                  ).length
                }
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {
                  data.data.filter(
                    (order) => order.status.toLowerCase() === "pending"
                  ).length
                }
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {data.data.length}
              </p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        )}
        {data?.data.length <= 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start ordering your favorite food!
            </p>
          </div>
        ) : (
          data?.data?.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-200"
            >
              {/* Mobile Layout */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Order Image and Basic Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-shrink-0">
                    <img
                      src={order?.imageUrl || "/placeholder.svg"}
                      alt={order?.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {order?.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {order?.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span>{order?.date}</span>
                      <span>•</span>
                      <span>{order?.time}</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-green-600">
                      {order?.price}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  {/* Item Count - Hidden on mobile, shown on desktop */}
                  <div className="hidden sm:block text-center">
                    <p className="text-sm text-gray-500 mb-1">Items</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order?.quantity}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium ${getStatusColor(
                        order?.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="hidden sm:inline">{order?.status}</span>
                      <span className="sm:hidden">{order?.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile-only additional info */}
              <div className="sm:hidden mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Items:</span>
                  <span className="font-semibold text-gray-900">
                    {order?.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
