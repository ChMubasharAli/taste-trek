import { Loader, Text, Title } from "@mantine/core";
import { StoreContext } from "../../context/StoreContext";
import FoodItemCard from "./FoodItemCard";
import { useContext } from "react";

export default function FoodDisplay({ category }) {
  const { foodPackage, loadingPackages, errorPackages } =
    useContext(StoreContext);

  return (
    <section className=" container mx-auto flex flex-col gap-10 lg:pb-24">
      {loadingPackages && (
        <div className="flex justify-center">
          <Loader type="bars" color="#40C057" />
        </div>
      )}
      {errorPackages && (
        <div className="text-center text-red-600 rounded-md font-bold text-lg py-4 bg-red-100 border-l-4 border-red-500 shadow-md">
          Failed to load food items. Please refresh the page.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {foodPackage?.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <div key={item._id} data-aos="fade-up">
                <FoodItemCard item={item} />
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
