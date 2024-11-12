import React, { useEffect, useState } from "react";
import BreadCrums from "../../../common/BreadCrums";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, searchProduct } from "../../../store/userSlice";
import Loader from "../../../common/Loader";
import AdminProductCard from "./AdminProductCard";

export default function AllProducts() {
    const dispatch = useDispatch();
    const { loading, message, error, data, statusCode } = useSelector(
      (state) => state.user
    );

    const [searchQuery, setSearchQuery] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        dispatch(getProducts());
      }, []);


      const handleSearch = (e) => {
        const query = e.target.value.trim();
        setSearchQuery(query);
    
    
        if (searchTimeout) {
          clearTimeout(searchTimeout);
        }
    
        if (e.key === "Enter") {
          if (query === "") {
            dispatch(getProducts());
          } else {
            dispatch(searchProduct(query));
          }
        } else {
          const timeout = setTimeout(() => {
            if (query === "") {
              dispatch(getProducts());
            } else {
              dispatch(searchProduct(query));
            }
          }, 1000);
    
          setSearchTimeout(timeout);
        }
      };

  return (
    <>
      <div className="">
        <div className="flex justify-between  items-center py-5">
          <BreadCrums
            breadCrum={[
              {
                name: "User Dashboard",
                // path: "/admin-dashboard/",
              },
              {
                name: "Manage Products",
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
            to="add-product"
          >
            Add Product
          </Link>
        </div>
        <div className="relative flex items-center w-full">
          <img
            src="/assets/icons/search.svg"
            alt=""
            className="absolute left-3 text-[#C19A6B]"
          />
          <input
            className="w-full py-2 md:py-2 pl-10 rounded-lg bg-white border border-[#EBF0ED] focus:outline-none text-[#6B6B6B] font-[500] text-[14px]"
            type="search"
            placeholder="Search Products"
            onChange={handleSearch}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className=" py-4 mt-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.data?.body?.length > 0
              ? data?.data?.body?.map((item) => (
                  <AdminProductCard key={item._id} item={item} />
                ))
              : "No Products Found"}
          </div>
        )}
      </div>
    </>
  );
}
