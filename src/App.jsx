import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import AuthPopup from "./components/auth/AuthPopup";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,
    });
  }, []);
  return (
    <>
      <main className=" bg-gray-200 min-h-screen ">
        {location.pathname !== "/" ? <Navbar /> : <></>}
        <Outlet />
        <Footer />
        <AuthPopup />
      </main>
    </>
  );
}
