import React from "react";
import ReactDOM from "react-dom"; // Import for modal functionality

const ConfirmationPopup = ({ isVisible, onConfirmConfirmation, onConfirmCancel }) => {
  const handleClose = () => {
    onConfirmCancel();
  };

  return isVisible ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md px-8 py-5 max-w-xs md:max-w-lg">
        <h2 className="text-sm md:text-lg font-bold tracking-wider text-start mb-4">
          Confirm?
        </h2>
        <p className="text-sm md:text-base text-gray-700 mb-6">
          Are you sure you want to Confirm this item?
        </p>
        <div className="flex flex-row-reverse justify-center gap-5">
          <button
            className="px-4 py-1 md:px-6 md:py-2 text-sm md:text-base tracking-wide rounded-md bg-white hover:bg-[#f9fafb] border border-[#828282] text-black font-medium focus:outline-none"
            onClick={handleClose}
          >
            No, cancel
          </button>
          <button
            className="px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-md tracking-wide bg-yellow-500 hover:opacity-75 text-white font-medium focus:outline-none"
            onClick={onConfirmConfirmation}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  ) : null; // Render nothing if not visible
};

export default ConfirmationPopup;
