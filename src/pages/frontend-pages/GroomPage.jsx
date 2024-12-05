import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BreadCrums from "../../common/BreadCrums";
import ProductCard from "../../common/ProductCard";
import { getRequest } from "../../Requests/Request";

const GroomPage = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(""); // Track selected filter
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("q");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getRequest(`product/full-set`);
      console.log("The search response", response);
      setProducts(response?.body);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLowtoHigh = () => {
    const lowToHigh = [...products].sort((a, b) => a.price - b.price);
    setProducts(lowToHigh);
    setSelectedFilter("Low to High Price"); // Set selected filter
  };

  const handleHighToLow = () => {
    const highToLow = [...products].sort((a, b) => b.price - a.price);
    setProducts(highToLow);
    setSelectedFilter("High to Low Price"); // Set selected filter
  };

  const handleFilterClick = (filterName) => {
    setSelectedFilter(filterName);
    // Add logic for filter actions here (e.g., filter by material like Gold, Silver, etc.)
    console.log(`${filterName} clicked`);
  };

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
            >
              Search
            </button>
          </div>

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
              name: "Home",
              path: "/",
            },
            {
              name: "All Products",
            },
          ]}
        />

        <div className="flex justify-between">
          <div className="w-1/5 flex items-start flex-col space-y-2">
            <h1 className="mt-3 border-b-2 border-black">Smart Filter</h1>
            <h1
              className={`mt-4 cursor-pointer ${
                selectedFilter === "Low to High Price" ? "border-b border-black" : "text-blue-950"
              } hover:text-yellow-600`}
              onClick={handleLowtoHigh}
            >
              Low to High Price
            </h1>
            <h1
              className={`cursor-pointer ${
                selectedFilter === "High to Low Price" ? "border-b border-black" : "text-blue-950"
              } hover:text-yellow-600`}
              onClick={handleHighToLow}
            >
              High to Low Price
            </h1>
            <h1
              className={`cursor-pointer ${
                selectedFilter === "Gold" ? "border-b border-black" : "text-blue-950"
              } hover:text-yellow-600`}
              onClick={() => handleFilterClick("Gold")}
            >
              Gold
            </h1>
            <h1
              className={`cursor-pointer ${
                selectedFilter === "Silver" ? "border-b border-black" : "text-blue-950"
              } hover:text-yellow-600`}
              onClick={() => handleFilterClick("Silver")}
            >
              Silver
            </h1>
            <h1
              className={`cursor-pointer ${
                selectedFilter === "Platinum" ? "border-b border-black" : "text-blue-950"
              } hover:text-yellow-600`}
              onClick={() => handleFilterClick("Platinum")}
            >
              Platinum
            </h1>
            <h1
              className={`cursor-pointer ${
                selectedFilter === "22k Karat Gold" ? "border-b border-black" : "text-blue-950"
              } hover:text-yellow-600`}
              onClick={() => handleFilterClick("22k Karat Gold")}
            >
              22k Karat Gold
            </h1>
          </div>

          <div className="w-4/5  flex flex-wrap items-center gap-9 xl:gap-7">
            {loading ? (
              <p className="mx-auto">Loading products...</p>
            ) : products?.length > 0 ? (
              products?.map((product) => (
                <Link className="flex-none" key={product._id}>
                  <ProductCard item={product} />
                </Link>
              ))
            ) : (
              <p className="mx-28 mt-28">No Products found for this...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroomPage;
