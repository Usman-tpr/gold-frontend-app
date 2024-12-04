import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-20">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">About JewelleryHub</h2>
            <p className="text-sm">
              At JewelleryShop, we offer a wide range of elegant and high-quality
              jewelry to suit every occasion. Our mission is to make your
              special moments shine.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-yellow-600">Home</a></li>
              <li><a href="#shop" className="hover:text-yellow-600">Shop</a></li>
              <li><a href="#about" className="hover:text-yellow-600">About Us</a></li>
              <li><a href="#contact" className="hover:text-yellow-600">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:support@jewelleryshop.com" className="hover:text-yellow-600">support@jewelleryshop.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-yellow-600">+1 234 567 890</a></li>
              <li>Address: 123 Gold Street, Jewel City</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 JewelleryShop. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-600">Facebook</a>
            <a href="#" className="hover:text-yellow-600">Twitter</a>
            <a href="#" className="hover:text-yellow-600">Instagram</a>
            <a href="#" className="hover:text-yellow-600">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
