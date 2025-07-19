import React from "react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className=" bg-green-50 text-gray-500 py-12  px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-primaryColor">
              <span className="font-extrabold text-4xl">T</span>aste{" "}
              <span className="font-extrabold text-4xl">T</span>rek
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              Satisfy your cravings with expertly crafted dishes made from fresh
              ingredients. From quick bites to special meals, we bring the best
              flavors right to your door.
            </p>
            <div className="flex space-x-4 pt-4">
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-primaryColor transition-colors cursor-pointer">
                <IconBrandFacebook
                  size={20}
                  className="text-gray-500 hover:text-primaryColor transition-colors"
                />
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-primaryColor transition-colors cursor-pointer">
                <IconBrandTwitter
                  size={20}
                  className="text-gray-500 hover:text-primaryColor transition-colors"
                />
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-primaryColor transition-colors cursor-pointer">
                <IconBrandLinkedin
                  size={20}
                  className="text-gray-500 hover:text-primaryColor transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-primaryColor transition-colors duration-300 text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-primaryColor transition-colors duration-300 text-sm"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-primaryColor transition-colors duration-300 text-sm"
                >
                  Delivery
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black">GET IN TOUCH</h3>
            <div className="space-y-3">
              <p className="text-gray-500 text-sm">+1-212-456-7890</p>
              <p className="text-gray-500 text-sm">contact@tastetrek.com</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 pt-6">
          <p className="text-center text-gray-500 text-sm">
            Copyright 2024 © TasteTrek.com - All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
