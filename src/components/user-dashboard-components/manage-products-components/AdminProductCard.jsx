import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function AdminProductCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Full-Width Product Image */}
      <div className="w-full h-48 bg-gray-100 flex items-center overflow-hidden">
        <img
          src={item?.images[0] || '/placeholder-image.png'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {item.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Category & Location */}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-200 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
            {item.category || 'Category'}
          </span>
          <span className="text-sm text-gray-500">{item.location}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-2">
          <button
            className="flex items-center justify-center w-full text-white bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <FaEdit className="mr-1" /> Edit
          </button>

          <button
            className="flex items-center justify-center w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
