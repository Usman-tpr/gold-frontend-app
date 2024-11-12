import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../../store/userSlice';

const SearchDropdown = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const { loading, message, error, data, statusCode } = useSelector(
        (state) => state.user
      );
      const dispatch = useDispatch()
    
      // useEffect( () => {
      //    dispatch(searchProduct())
      // })

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative inline-block text-left w-64">
      <button
        onClick={toggleDropdown}
        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
      >
        {selectedOption ? selectedOption : 'Select an option'}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {data.length ? (
            data.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
