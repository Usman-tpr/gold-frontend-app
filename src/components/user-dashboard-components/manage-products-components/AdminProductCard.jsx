import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { stringConcat } from '../../../functions/helperFuntions';
import { deleteRequest } from '../../../Requests/Request';
import { toast } from 'react-toastify';

export default function AdminProductCard({ item , setDeleted }) {
  const [showPopup, setShowPopup] = useState(false);
  const handleDelete = async (id) =>{
    try {
      const response = await deleteRequest(`/product/delete/${id}`)
      toast.success("deleted Successfully");
      setDeleted(true)
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <>
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
          {item.desc}
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
            onClick={()=> setShowPopup(true)}
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>

       {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-64 md:w-80 lg:w-96 relative">
            <button
              className="absolute top-2 z-10 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowPopup(false)}
            >
              <IoClose className="w-5 h-5" />
            </button>

            <div className="relative overflow-hidden rounded-t-lg">
              {item?.images[0] && (
                <img
                  src={item?.images[0] || `/assets/images/alt-img.webp`}
                  className="w-full h-[140px] md:h-[170px] xl:h-[200px] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  alt={item.name}
                />
              )}
            </div>
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-700 mb-4">
              {stringConcat(item.desc, 100)}
            </p>

            <button
              onClick={() => handleDelete(item._id)}
              className="w-full bg-yellow-600 text-white py-2 rounded-md font-medium hover:bg-yellow-300 transition"
            >
              Delete Product
            </button>
          </div>
        </div>
      )}
  </>
  );
}
