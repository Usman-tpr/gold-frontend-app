import React from 'react';
import { Link } from 'react-router-dom';
import SearchDropdown from '../Search-page-components/SearchDropdown';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh] bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/256643/pexels-photo-256643.jpeg?auto=compress&cs=tinysrgb&w=600')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 sm:px-8">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Find Your Perfect Jewelry</h1>
        <p className="text-lg sm:text-xl text-white mb-8">
          Discover and sell exclusive jewelry pieces, whether new or vintage.
        </p>

        {/* CTA Buttons */}
        <div className="flex space-x-4 mb-8">
          {/* <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300">
            Shop Now
          </button> */}
          <Link to='/user-dashboard/manage-product/add-product' className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition duration-300">
            Sell Your Jewelry
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-lg flex items-center bg-white rounded-md shadow-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search for jewelry..."
            className="flex-grow px-6 py-3 text-gray-700 outline-none"
          />
          <button to='/search' className="px-6 py-3 bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition duration-300">
            Search
          </button>
        </div>
      </div>
      {/* <SearchDropdown /> */}
    </section>
  );
};

export default HeroSection;
