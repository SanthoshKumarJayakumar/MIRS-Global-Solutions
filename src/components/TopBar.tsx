import React, { useState, useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlTopBar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlTopBar);
      return () => {
        window.removeEventListener("scroll", controlTopBar);
      };
    }
  }, [lastScrollY]);

  return (
    <div
      className={`bg-blue-900 text-white py-2 px-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto">
        {/* 📱 Mobile View → Only Icons */}
        <div className="sm:hidden flex justify-center">
          <div className="grid grid-cols-5 gap-6 mx-auto">
            <a
              href="tel:8610401452"
              className="flex items-center justify-center w-10 h-10 hover:text-blue-200 transition-colors"
            >
              <Phone size={20} />
            </a>
            <a
              href="mailto:mirsglobalsolutions@gmail.com"
              className="flex items-center justify-center w-10 h-10 hover:text-blue-200 transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://wa.me/918610401452"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 hover:text-green-300 transition-colors"
            >
              <FaWhatsapp size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 hover:text-blue-300 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 hover:text-pink-300 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* 💻 Desktop / Tablet View → Number + Email + Icons */}
        <div className="hidden sm:flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <a
              href="tel:8610401452"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <Phone size={16} />
              <span>8610401452</span> {/* 8220481711 */}
            </a>
            <a
              href="mailto:mirsglobalsolutions@gmail.com"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <Mail size={16} />
              <span>mirsglobalsolutions@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/918610401452"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
            >
              <FaWhatsapp size={16} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300 transition-colors"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaFacebook size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
