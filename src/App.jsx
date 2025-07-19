import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import AuthPopup from "./components/auth/AuthPopup";
import AOS from "aos";
import "aos/dist/aos.css";
import { StoreContext } from "./context/StoreContext";

export default function App() {
  const { userLocation, getAndStoreUserLocation } = useContext(StoreContext);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,
    });

    if (!userLocation) {
      getAndStoreUserLocation(); // Only fetch if not already stored
    }
  }, []);
  return (
    <>
      <main className=" bg-gray-200 min-h-screen ">
        <section className="h-[100px] fixed top-4 left-0 z-20 w-full ">
          <Navbar />
        </section>
        <Outlet />
        <Footer />
        <AuthPopup />
      </main>
    </>
  );
}
