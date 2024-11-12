import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductCard from "../../common/ProductCard";

// Sample data generation
// const generateSampleData = () => {
//     return [
//       {
//         id: 1,
//         category: { name: "Jewelry", slug: "jewelry" },
//         products: [
//           { 
//             _id: "1", 
//             slug: "ring-1", 
//             name: "Diamond Ring", 
//             img: "https://images.pexels.com/photos/1050312/pexels-photo-1050312.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-01", 
//             city: "New York", 
//             country: "USA", 
//             price: 1200 
//           },
//           { 
//             _id: "2", 
//             slug: "necklace-1", 
//             name: "Gold Necklace", 
//             img: "https://images.pexels.com/photos/1247021/pexels-photo-1247021.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-02", 
//             city: "Los Angeles", 
//             country: "USA", 
//             price: 1500 
//           },
//           { 
//             _id: "3", 
//             slug: "bracelet-1", 
//             name: "Silver Bracelet", 
//             img: "https://images.pexels.com/photos/1050312/pexels-photo-1050312.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-03", 
//             city: "Chicago", 
//             country: "USA", 
//             price: 800 
//           },
//           { 
//             _id: "4", 
//             slug: "earring-1", 
//             name: "Emerald Earrings", 
//             img: "https://images.pexels.com/photos/1247021/pexels-photo-1247021.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-04", 
//             city: "Miami", 
//             country: "USA", 
//             price: 900 
//           },
//           { 
//             _id: "5", 
//             slug: "ring-2", 
//             name: "Sapphire Ring", 
//             img: "https://images.pexels.com/photos/1342526/pexels-photo-1342526.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-05", 
//             city: "San Francisco", 
//             country: "USA", 
//             price: 1100 
//           },
//         ],
//       },
//       {
//         id: 2,
//         category: { name: "Watches", slug: "watches" },
//         products: [
//           { 
//             _id: "6", 
//             slug: "watch-1", 
//             name: "Luxury Watch", 
//             img: "https://images.pexels.com/photos/3739880/pexels-photo-3739880.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-06", 
//             city: "Tokyo", 
//             country: "Japan", 
//             price: 2500 
//           },
//           { 
//             _id: "7", 
//             slug: "watch-2", 
//             name: "Sports Watch", 
//             img: "https://images.pexels.com/photos/1091715/pexels-photo-1091715.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-07", 
//             city: "London", 
//             country: "UK", 
//             price: 900 
//           },
//           { 
//             _id: "8", 
//             slug: "watch-3", 
//             name: "Classic Watch", 
//             img: "https://images.pexels.com/photos/3739880/pexels-photo-3739880.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-08", 
//             city: "Berlin", 
//             country: "Germany", 
//             price: 1200 
//           },
//           { 
//             _id: "9", 
//             slug: "watch-4", 
//             name: "Smart Watch", 
//             img: "https://images.pexels.com/photos/4525955/pexels-photo-4525955.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-09", 
//             city: "Paris", 
//             country: "France", 
//             price: 300 
//           },
//           { 
//             _id: "10", 
//             slug: "watch-5", 
//             name: "Digital Watch", 
//             img: "https://images.pexels.com/photos/2101031/pexels-photo-2101031.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-10", 
//             city: "Madrid", 
//             country: "Spain", 
//             price: 450 
//           },
//         ],
//       },
//       {
//         id: 3,
//         category: { name: "Bags", slug: "bags" },
//         products: [
//           { 
//             _id: "11", 
//             slug: "bag-1", 
//             name: "Leather Handbag", 
//             img: "https://images.pexels.com/photos/1676410/pexels-photo-1676410.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-11", 
//             city: "Rome", 
//             country: "Italy", 
//             price: 800 
//           },
//           { 
//             _id: "12", 
//             slug: "bag-2", 
//             name: "Canvas Backpack", 
//             img: "https://images.pexels.com/photos/1617716/pexels-photo-1617716.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-12", 
//             city: "Amsterdam", 
//             country: "Netherlands", 
//             price: 600 
//           },
//           { 
//             _id: "13", 
//             slug: "bag-3", 
//             name: "Clutch Bag", 
//             img: "https://images.pexels.com/photos/1551787/pexels-photo-1551787.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-13", 
//             city: "Lisbon", 
//             country: "Portugal", 
//             price: 400 
//           },
//           { 
//             _id: "14", 
//             slug: "bag-4", 
//             name: "Travel Bag", 
//             img: "https://images.pexels.com/photos/1345845/pexels-photo-1345845.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-14", 
//             city: "Copenhagen", 
//             country: "Denmark", 
//             price: 700 
//           },
//           { 
//             _id: "15", 
//             slug: "bag-5", 
//             name: "Tote Bag", 
//             img: "https://images.pexels.com/photos/2465367/pexels-photo-2465367.jpeg?auto=compress&cs=tinysrgb&w=600", 
//             date: "2024-10-15", 
//             city: "Stockholm", 
//             country: "Sweden", 
//             price: 350 
//           },
//         ],
//       },
//     ];
//   };
  
const SearchedProductsCard = ({product}) => {
  // const data = generateSampleData();
  console.log("the product" , product)

  return (
    <div className="px-4 lg:px-8 xl:px-[57px] flex flex-col gap-8 bg-gray-50">
      {product?.map((item) => (
          <div key={item.id} className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-2xl md:text-3xl">
                {item.category}
              </h2>
              <Link to={`/ad-market-place/auction/${item.category.slug}`}>
                <p className="text-[#1983FF] flex items-center gap-1">
                  <span className="font-semibold text-xl">View More</span>{" "}
                  <AiOutlineRight className="font-bold text-xl" />
                </p>
              </Link>
            </div>

            {/* Product Cards Section */}
            <div className="flex items-center gap-9 xl:gap-7">
              {/* {item.products.slice(0, 4).map((product) => ( */}
                <Link
                  to={`/ad-market-place/auction/single-product/${product.slug}`}
                  className="flex-none"
                  key={product._id}
                >
                  <ProductCard item={product} />
                </Link>
            {/* //   ))} */}
            </div>
          </div>

      ))}
    </div>
  );
};

export default SearchedProductsCard;
