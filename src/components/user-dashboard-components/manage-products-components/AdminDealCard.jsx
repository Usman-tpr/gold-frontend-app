import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ConfirmationPopup from '../../../common/ConfirmationPopup';
import { deleteRequest } from '../../../Requests/Request'; // Assuming you have a deleteRequest function

const AdminDealCard = React.memo(({ item, seller, dealId , setDeleted }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleCancel = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmConfirmation = async () => {
    try {
      const token = localStorage.getItem("Gold_token");
      if (token) {
        await deleteRequest(`/deal/${dealId}`, token);  // Call deleteRequest with the deal ID
        alert('Deal deleted successfully!');
        setDeleted(true)
      }
    } catch (error) {
      console.error("Error deleting deal:", error);
      alert('Failed to delete deal');
    } finally {
      setShowConfirmPopup(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="w-full h-48 bg-gray-100 flex items-center overflow-hidden">
          <img
            src={item?.images[0] || '/placeholder-image.png'}
            alt={item?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {item?.title}
          </h2>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item?.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-200 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
              {item?.category || 'Category'}
            </span>
            <span className="text-sm text-gray-500">{item?.location}</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Seller Details:</h2>
          <div className="flex items-center justify-between mb-4">
            Name
            <span className="text-sm text-gray-500">{seller?.name}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            Phone
            <span className="text-sm text-gray-500">{seller?.phone}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            Location
            <span className="text-sm text-gray-500">{seller?.location}</span>
          </div>

          <div className="flex justify-between space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center justify-center w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <FaTrash className="mr-1" /> Cancel Booking
            </button>
          </div>
        </div>
      </div>

      {showConfirmPopup && (
        <ConfirmationPopup
          isVisible={showConfirmPopup}
          onConfirmConfirmation={handleConfirmConfirmation}
          onConfirmCancel={() => setShowConfirmPopup(false)}
        />
      )}
    </>
  );
});

export default AdminDealCard;
