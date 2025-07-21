import { useContext, useState } from "react";
import { Button } from "@mantine/core";
import { StoreContext } from "../../context/StoreContext";
import { notifications } from "@mantine/notifications";
import { AtSign, FileText, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutComponent = () => {
  const { totalItemAmmount } = useContext(StoreContext);

  const navigate = useNavigate();

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
    deliveryMethod: "delivery",
  });

  const [additionalDetail, setAdditionalDetail] = useState({
    alternatePhone: "",
    specialInstructions: "",
  });

  const proceedToPayment = () => {
    // Loop through formData to check for empty or spaces-only fields
    for (const field in formData) {
      if (!formData[field] || formData[field].trim() === "") {
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
    navigate(
      "/payment",
      {
        state: { formData, additionalDetail },
      },
      scrollTo(0, 0)
    );
  };

  return (
    <main className="py-32">
      <section className="container mx-auto py-32 flex flex-col  lg:flex-row justify-between gap-8 lg:gap-12">
        {/* Left Section - Delivery Information */}

        <section className="flex-1 max-w-2xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Delivery Information
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-none focus:ring-3 focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Street address"
                    value={formData.street}
                    onChange={(e) =>
                      setFormData({ ...formData, street: e.target.value })
                    }
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Zipcode & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Zip code"
                    value={formData.zipcode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipcode: e.target.value })
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section - Additional Info & Order Summary */}
        <section className="w-full lg:w-96 lg:flex-shrink-0 space-y-6">
          {/* Additional Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Additional Information
            </h3>

            <div className="space-y-4">
              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Instructions{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    placeholder="Any special delivery instructions..."
                    value={additionalDetail.specialInstructions}
                    onChange={(e) =>
                      setAdditionalDetail({
                        ...additionalDetail,
                        specialInstructions: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  />
                </div>
              </div>

              {/* Alternate Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Alternate Phone{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="Alternate phone number"
                    value={additionalDetail.alternatePhone}
                    onChange={(e) =>
                      setAdditionalDetail({
                        ...additionalDetail,
                        alternatePhone: e.target.value,
                      })
                    }
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-3 focus:outline-none focus:border-none focus:ring-green-300 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  Rs {totalItemAmmount}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold text-gray-900">Rs 5</span>
              </div>

              {/* <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-semibold text-gray-900">
                  Rs {Math.round(totalItemAmmount * 0.05)}
                </span>
              </div> */}

              <div className="flex justify-between items-center py-4 border-t-2 border-green-200">
                <span className="text-xl font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-green-600">
                  Rs {totalItemAmmount + 5}
                </span>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={proceedToPayment}
              size="lg"
              px={"xl"}
              radius={"md"}
              variant="filled"
              color="green"
              c={"white"}
              fullWidth
            >
              Proceed to Payment
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default CheckoutComponent;
