import React, { useState } from "react";
import Header from "../../components/Header";
import ExploreMenu from "../../components/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import WhyChooseSection from "../../components/WhyChooseSection";

export default function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <WhyChooseSection />
    </div>
  );
}
