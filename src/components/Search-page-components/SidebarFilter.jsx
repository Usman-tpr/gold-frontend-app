import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineArrowDownward } from "react-icons/md";
import { getRequest } from '../../Requests/Request';
import axios from 'axios';

const SidebarFilter = ({ setSubCategory }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("q");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        // Update this URL as needed to match your actual API endpoint
        const response = await getRequest(`/subCategory/get/${category}`);
        setSubCategories(response.body || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchSubCategories();
    }
  }, [category]);

  const handleSetCategory = (subCategory) => {
    setSubCategory(subCategory);
  };

  return (
    <div className='flex flex-col p-2'>
      <p className='font-base me-auto'>Related Categories</p>
      <MdOutlineArrowDownward className='mx-auto mb-2'/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        subCategories.map((subCategory) => (
          <button
            key={subCategory.id}
            className='text-gray-700 font-serif hover:text-red-950'
            onClick={() => handleSetCategory(subCategory.name)}
          >
            {subCategory.name}
          </button>
        ))
      )}
    </div>
  );
};

export default SidebarFilter;
