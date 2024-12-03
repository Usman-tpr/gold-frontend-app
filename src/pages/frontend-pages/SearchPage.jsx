import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BreadCrums from '../../common/BreadCrums';
import SidebarFilter from '../../components/Search-page-components/SidebarFilter';
import ProductCard from '../../common/ProductCard';
import { getRequest } from '../../Requests/Request';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [subCategory, setSubCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('q');

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await getRequest(`product/search?q=${query}`); // Update port if necessary
      // console.log("the search resposne" , response.data)
      setProducts(response.data?.body || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts(searchQuery || subCategory || category);
  };

  useEffect(() => {

    if(searchQuery){
      fetchProducts(searchQuery);
    }
    else{
      fetchProducts(subCategory || category);

    }
  }, [category, subCategory , setSearchQuery]);

  return (
    <>
      <div className="mx-20 my-10">
        <div
          className="relative w-full max-w-lg flex flex-col items-center bg-white rounded-md shadow-lg overflow-hidden mx-auto"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search for jewelry..."
              className="flex-grow px-6 py-3 text-gray-700 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="px-6 py-3 bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Dropdown for search results */}
          {showDropdown && products.length > 0 && (
            <div className="absolute top-full w-full bg-white shadow-lg rounded-md">
              {products.map((item) => (
                <div key={item._id} className="p-3 cursor-pointer">
                  <h1 className="text-start">{item.category}</h1>
                </div>
              ))}
            </div>
          )}
        </div>

        <BreadCrums
          breadCrum={[
            {
              name: 'Home',
              path: '/',
            },
            {
              name: 'Search Results',
            },
          ]}
        />

        <div className="flex justify-between">
          <div className="w-1/5 flex items-start ">
            <SidebarFilter setSubCategory={setSubCategory} />
          </div>

          <div className="w-2/3 flex flex-wrap items-center gap-9 xl:gap-7">
            {loading ? (
              <p>Loading products...</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <Link className="flex-none" key={product._id}>
                  <ProductCard item={product} />
                </Link>
              ))
            ) : (
              <p className="mx-28 mt-28">No Products found for this....</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
