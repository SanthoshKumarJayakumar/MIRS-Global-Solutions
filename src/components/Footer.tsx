import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const services = [
    'Data Entry Services',
    'Data Processing Services',
    'Publication Services',
    'Data Conversion Services',
    'Web Content Writing',
    'Research Paper Writing',
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">MIRS Global Solutions</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Pioneer in information technology-enabled services, providing high-quality project solutions since 2022.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://wa.me/918610401452" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaWhatsapp size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a href="/services" className="text-gray-300 hover:text-white transition-colors block">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors block">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors block">About Us</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white transition-colors block">Services</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors block">Blog</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-white transition-colors block">Careers</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors block">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 justify-center md:justify-start">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300 text-sm">548/1, Anna Nagar, Kitchipalayam, Salem-636015</span>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Phone className="text-blue-400 flex-shrink-0" size={18} />
                <div className="text-gray-300 text-sm">
                  <a href="tel:8610401452" className="hover:text-white transition-colors">8610401452</a> / 
                  <a href="tel:8220481711" className="hover:text-white transition-colors ml-1">8220481711</a>
                </div>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Mail className="text-blue-400 flex-shrink-0" size={18} />
                <a 
                  href="mailto:mirsglobalsolutions@gmail.com" 
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  mirsglobalsolutions@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 MIRS Global Solutions. All rights reserved. | Proprietor: S. Iniya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;