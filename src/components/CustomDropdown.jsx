import { useState } from "react";

export function AddOnsDropdown({ addOnsMenu, addons }) {
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);
  return (
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
              {addOnsMenu?.map((addon, index) => {
                const addOnsItem = addons.find(
                  (cartItem) => cartItem?._id === addon?._id
                );

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">{addon.image}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {addon.name}
                        </h4>
                        <p className="text-green-600 text-sm font-medium">
                          +Rs {addon.price}
                        </p>
                      </div>
                    </div>

                    {/* ADD Button or Quantity Controls */}
                    {addOnsItem?._id !== addon?._id ? (
                      <button
                        //   onClick={() => addToAddOnsCart(addon)}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          // onClick={() =>
                          //   decreaseItemQuantityToAddOnsCart(
                          //     addon
                          //   )
                          // }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 font-medium bg-white text-sm">
                          {addOnsItem.quantity}
                        </span>
                        <button
                          // onClick={() => addToAddOnsCart(addon)}
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
  );
}

export function DropdownSection({
  label = "",
  options = [],
  onSelect,
  selectedValue = null,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (value) => {
    onSelect(value);
    closeDropdown();
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-left flex items-center justify-between hover:bg-gray-50"
        >
          <span className="text-gray-700 truncate">
            {selectedValue
              ? options.find((opt) => opt.value === selectedValue)?.label
              : "Select an option"}
          </span>
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
            <div className="p-4 space-y-4">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedValue === option.value
                      ? "bg-green-50 border-green-200"
                      : ""
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
