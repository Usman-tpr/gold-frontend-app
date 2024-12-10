import React, { useState } from "react";
import { stringConcat } from "../functions/helperFuntions";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // Import cart icon from react-icons
import { IoClose } from "react-icons/io5"; // Import close icon from react-icons
import { toast } from "react-toastify";
import { postRequest } from "../Requests/Request"; // Import postRequest from Request.js

export default function ProductCard({ item }) {
  const [showPopup, setShowPopup] = useState(false);
  const [cartResponse, setCartResponse] = useState(null);

  const handleAddToCart = async (id) => {
    try {
      const response = await postRequest("/product/add-to-cart", { productId: id });
      console.log("add to cart response" , response)
      setCartResponse(response);
      toast.success(response?.message || "Item added to cart successfully!");
      setShowPopup(false);
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <div className="relative border w-[140px] md:w-[180px] xl:w-[220px] rounded-lg shadow-md transition-shadow hover:shadow-lg overflow-hidden">
        <Link to={`/${item.slug}`}>
          <div className="relative overflow-hidden rounded-t-lg">
            {item?.images[0] && (
              <img
                src={item?.images[0] || `/assets/images/alt-img.webp`}
                className="w-full h-[140px] md:h-[170px] xl:h-[200px] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                alt={item.name}
              />
            )}
          </div>
        </Link>

        <Link to={`/${item.slug}`} className="p-2 flex flex-col gap-1">
          <h2 className="font-semibold text-[10px] md:text-xs xl:text-sm line-clamp-1">
            {stringConcat(item.title, 18)}
          </h2>

          <div className="flex items-center justify-between text-[8px] md:text-[9px] xl:text-[10px] text-gray-500 space-x-1">
            <div>
              <span className="bg-blue-100 text-blue-500 px-1 py-0.5 rounded-full">
                {item.category}
              </span>
              <span className="bg-gray-100 text-gray-600 px-1 py-0.5 rounded-full">
                {item.subCategory}
              </span>
            </div>
            <div
              className="relative flex justify-end"
              // onClick={(event) => {
              //   event.stopPropagation(); 
              //   setShowPopup(true);
              // }}
            >
              <FiShoppingCart className="text-black w-4 h-4 mr-1 cursor-pointer" />
            </div>
          </div>

          <div className="text-[8px] md:text-[9px] xl:text-[10px] text-gray-500">
            {item.location} - {item.date}
          </div>

          <div className="flex justify-between items-center mt-1">
            <div className="text-base md:text-md font-semibold text-black">
              Rs.{item.price}.00
            </div>
            <div className="flex flex-col items-end text-[8px] md:text-[9px] xl:text-[10px] text-gray-600">
              <span className="font-medium">Condition: {item.condition}</span>
              <span>Weight: {item.weight}g</span>
            </div>
          </div>

          {item.description && (
            <p className="text-[8px] md:text-[9px] xl:text-[10px] text-gray-600 line-clamp-2 mt-1">
              {stringConcat(item.description, 40)}
            </p>
          )}
        </Link>
      </div>

    
    </>
  );
}
