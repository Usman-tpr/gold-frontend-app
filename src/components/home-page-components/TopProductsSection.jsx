import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductCard from "../../common/ProductCard";


const TopProductsSection = ({homeData}) => {

  return (
    <div className="px-4 lg:px-8 mt-10 xl:px-[67px] flex flex-col gap-8">
                  <h1 className="font-bold text-md md:text-2xl">Recently Added</h1>

      {homeData?.map((item) => (
        item?.products?.length > 0 && (
          <div key={item.id} className="flex flex-col gap-3">
            {/* <div className="flex justify-between items-center">
              <h2 className="font-bold text-md md:text-2xl">
                {item.category}
              </h2>
              <Link to={`/search?q=${item.category}`}>
                <p className="text-[#1983FF] flex items-center gap-1 me-9 sm:me-0">
                  <span className="font-semibold text-md md:text-xl ">View More</span>{" "}
                  <AiOutlineRight className="font-bold text-xl" />
                </p>
              </Link>
            </div> */}

            {/* Product Cards Section */}
            <div className="flex flex-wrap items-center gap-9 xl:gap-7">
              {item.products.slice(0, 4).map((product) => (
                <div
                  // to={`/${product.slug}`}
                  className="flex-none"
                  key={product._id}
                >
                  <ProductCard item={product} />
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default TopProductsSection;
