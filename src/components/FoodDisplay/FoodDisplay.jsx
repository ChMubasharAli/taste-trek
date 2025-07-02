import { Loader, Text, Title } from "@mantine/core";
import { StoreContext } from "../../context/StoreContext";
import FoodItemCard from "./FoodItemCard";
import { useContext, useEffect } from "react";
import useApi from "../../hooks/useApi";

export default function FoodDisplay({ category }) {
  const { data, error, loading, request } = useApi();

  const { food_list } = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      await request(`{${import.meta.env.VITE_API_URL}/api/foodList`);
    };

    fetchData();
  }, []);

  return (
    <section className=" container mx-auto flex flex-col gap-10 lg:pb-24">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <div data-aos="fade-up">
                <FoodItemCard key={item._id} item={item} />;
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
