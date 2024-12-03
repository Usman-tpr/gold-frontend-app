import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30 ">
            <div className="w-96 bg-white h-full shadow-lg relative overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    <FaTimes size={20} />
                </button>
                <h2 className="text-lg font-semibold p-4 border-b">Your Favorite</h2>
                <div className="p-4">
                    {data?.length ? (
                        data.map((item, index) => (
                            <Link
                                to={`/${item.productId?.slug}`}
                                key={index}
                                className="flex gap-3 p-2 border-b"
                                onClick={onClose}
                            >
                                <div>
                                    <img src={item?.productId?.images[0]}
                                        className='w-24 h-24'
                                        alt="" />
                                </div>
                                <div className='text-sm text-gray-700'>
                                    <p>Title: {item.productId?.title}</p>
                                    <p>Price : {item.productId?.price} /-</p>
                                    <p>Category : {item.productId?.category}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Your cart is empty</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;
