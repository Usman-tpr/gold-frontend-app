import React, { useEffect, useState } from 'react'
import UserDashboardLayout from '../../../layout/UserDashboardLayout'
import { getRequest } from '../../../Requests/Request';
import { FaTrash } from 'react-icons/fa6';
import BreadCrums from '../../../common/BreadCrums';
import { Link } from 'react-router-dom';

const ManageCart = () => {
    const [item, setItem] = useState("")
    // Fetch  cart data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch cart data
                const cartResponse = await getRequest("/product/get-my-carts");
                console.log(cartResponse)
                setItem(cartResponse.products); // Store the cart data in state

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <UserDashboardLayout>
             <div className="flex justify-between  items-center py-5">
          <BreadCrums
            breadCrum={[
              {
                name: "User Dashboard",
                // path: "/admin-dashboard/",
              },
              {
                name: "Manage Cart",
                // path: "/admin-dashboard/manage-companies",
              },
              //   {
              //     name: "Add Products",
              //     // path: "/admin-dashboard/manage-companies/add-company",
              //   },
            ]}
          />
          <Link 
            className="rounded-md font-semibold text-xs md:text-sm py-2 px-3 md:px-3 md:py-2 hover:opacity-75 text-white bg-yellow-500"
            to="/"
          >
            Add to Cart
          </Link>
        </div>
            <div className='flex flex-wrap gap-10'>
                {
                    item && item?.map((item) => (
                        <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {/* Full-Width Product Image */}
                            <div className="w-full h-48 bg-gray-100 flex items-center overflow-hidden">
                                <img
                                    src={item?.productId?.images[0] || '/placeholder-image.png'}
                                    alt={item?.productId?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="p-4">
                                {/* Product Title */}
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                                    {item?.productId?.title}
                                </h2>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {item?.productId?.desc}
                                </p>

                                {/* Category & Location */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="bg-blue-200 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                                        {item?.productId?.category || 'Category'}
                                    </span>
                                    <span className="text-sm text-gray-500">{item?.productId?.location}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex ">
                                    <button
                                        className="flex items-center justify-center w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        <FaTrash className="mr-1" />  Remove From Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </UserDashboardLayout>
    )
}

export default ManageCart