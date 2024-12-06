import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ConfirmationPopup from "../../common/ConfirmationPopup";
import { toast } from "react-toastify";
import { getRequest, postRequest } from '../../Requests/Request';  // Assuming `postRequest` is defined in your `request.js` file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiShoppingCart } from "react-icons/fi";
import RulesConfirmation from "../RulesConfirmation";

const SingleProductOverview = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cartResponse, setCartResponse] = useState(null);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        // Fetch product data by slug
        const response = await getRequest(`/product/${slug}`);
        console.log(response.body[0]);
        setSingleProduct(response.body[0]);
      } catch (err) {
        setError("Error fetching product data.");
        toast.error("Error fetching product data.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSingleProduct();
    }
  }, [slug , setCartResponse , cartResponse]);

  const handleAddToCart = async (id) => {
    try {
      const response = await postRequest("/product/add-to-cart", { productId: id });
      setCartResponse(response)
      toast.success(response?.message || "Item added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Error adding to cart:", error);
    }
  };

  const images = singleProduct ? singleProduct?.images : [];

  const handleBookNowClick = (sellerId, productId) => {
    setSelectedSellerId(sellerId);
    setSelectedProductId(productId);
    setShowConfirmPopup(true);
  };

  const handleConfirmConfirmation = async () => {
    try {
      // Make API call to create a deal
      const response = await postRequest("/deal/create-deal", {
        sellerId: selectedSellerId,
        productId: selectedProductId,
      });

      if (response.success) {
        toast.success("Deal confirmed!");
        navigate('/user-dashboard/manage-deals')

      } else {
        toast.error("Error creating deal.");
      }
    } catch (err) {
      toast.error("Error creating deal.");
    } finally {
      setShowConfirmPopup(false);
    }
  };

  const handleConfirmCancel = () => {
    setShowConfirmPopup(false);
  };

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-white cursor-pointer"
      onClick={onClick}
    >
      <IoIosArrowForward size={30} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-white cursor-pointer"
      onClick={onClick}
    >
      <IoIosArrowBack size={30} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: images.length > 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Product Image Slider */}
          <div className="lg:col-span-7 shadow-xl rounded-lg overflow-hidden relative">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <img
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    className="max-w-full h-[70vh] object-cover rounded-md"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl rounded-lg p-8 flex flex-col justify-between relative overflow-hidden border border-blue-100 hover:border-blue-200 transition-all">
            <div className="absolute top-0 left-0 w-20 h-20 bg-blue-600 opacity-20 rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-600 opacity-20 rounded-tl-full"></div>

            <div className="mb-6 z-10">
              <h1 className="text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                {singleProduct.title || "Product Title"}
              </h1>
              <p className="text-3xl font-bold text-blue-600 mb-4 flex items-center space-x-2">
                <span>${singleProduct?.price}</span>
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Location: {singleProduct?.location || "Location"}
              </p>
              <p className="text-md text-gray-600 mb-6 leading-relaxed">
                {singleProduct?.description || "This is a great product!"}
              </p>
              <p className="text-md text-gray-600 mb-6 leading-relaxed">
                Seller: {singleProduct?.userId?.name}
              </p>
              <p className="text-md text-gray-600 mb-6 leading-relaxed">
                Phone: {singleProduct?.userId?.phone}
              </p>
            </div>

            <div className="z-10 flex justify-between space-x-10">
              <button
                onClick={() =>
                  handleBookNowClick(singleProduct?.userId, singleProduct?._id)
                }
                className="w-full  bg-yellow-600 text-white font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105"
              >
                <AiOutlineShoppingCart size={24} /> Book Now
              </button>
              {/* <button
                className="w-full  bg-yellow-600 text-white font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105"
               onClick={() => 

                handleAddToCart(singleProduct?._id)
               }
              >
                <FiShoppingCart className="text-white w-4 h-4 mr-1 cursor-pointer" size={24}/> Add To Cart

              </button> */}
            </div>
          </div>
        </div>
      </div>

      {showConfirmPopup && (
        <RulesConfirmation
          isVisible={showConfirmPopup}
          onConfirmConfirmation={handleConfirmConfirmation}
          onConfirmCancel={handleConfirmCancel}
        />
      )}
    </>
  );
};

export default SingleProductOverview;
