"use client";

import { Package, Clock, CheckCircle, Truck } from "lucide-react";

// Mock data for demonstration
const orders = [
  {
    id: 1,
    imgUrl: "/placeholder.svg?height=80&width=80",
    title: "Krunch Combo with Extra Cheese",
    price: "Rs 450",
    itemCount: 2,
    status: "Delivered",
    orderDate: "2024-01-15",
    orderTime: "2:30 PM",
  },
  {
    id: 2,
    imgUrl: "/placeholder.svg?height=80&width=80",
    title: "Zinger Burger Meal",
    price: "Rs 320",
    itemCount: 1,
    status: "In Progress",
    orderDate: "2024-01-16",
    orderTime: "1:15 PM",
  },
  {
    id: 3,
    imgUrl: "/placeholder.svg?height=80&width=80",
    title: "Family Feast Deal",
    price: "Rs 1200",
    itemCount: 5,
    status: "Pending",
    orderDate: "2024-01-16",
    orderTime: "3:45 PM",
  },
  {
    id: 4,
    imgUrl: "/placeholder.svg?height=80&width=80",
    title: "Chicken Wings Bucket",
    price: "Rs 680",
    itemCount: 3,
    status: "Delivered",
    orderDate: "2024-01-14",
    orderTime: "7:20 PM",
  },
  {
    id: 5,
    imgUrl: "/placeholder.svg?height=80&width=80",
    title: "Veggie Delight Combo",
    price: "Rs 380",
    itemCount: 2,
    status: "Cancelled",
    orderDate: "2024-01-13",
    orderTime: "12:10 PM",
  },
];

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "in progress":
      return <Truck className="w-4 h-4 text-blue-500" />;
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
    case "in progress":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "pending":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "cancelled":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export default function MyOrdersComponent() {
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
        {orders.length === 0 ? (
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
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-200"
            >
              {/* Mobile Layout */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Order Image and Basic Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-shrink-0">
                    <img
                      src={order.imgUrl || "/placeholder.svg"}
                      alt={order.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {order.itemCount}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {order.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span>{order.orderDate}</span>
                      <span>•</span>
                      <span>{order.orderTime}</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-green-600">
                      {order.price}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  {/* Item Count - Hidden on mobile, shown on desktop */}
                  <div className="hidden sm:block text-center">
                    <p className="text-sm text-gray-500 mb-1">Items</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.itemCount}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="hidden sm:inline">{order.status}</span>
                      <span className="sm:hidden">{order.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile-only additional info */}
              <div className="sm:hidden mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Items:</span>
                  <span className="font-semibold text-gray-900">
                    {order.itemCount}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Statistics */}
      {orders.length > 0 && (
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {
                orders.filter(
                  (order) => order.status.toLowerCase() === "delivered"
                ).length
              }
            </p>
            <p className="text-sm text-gray-600">Delivered</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {
                orders.filter(
                  (order) => order.status.toLowerCase() === "in progress"
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
                orders.filter(
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
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
        </div>
      )}
    </section>
  );
}
