import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getRequest } from '../Requests/Request'; // Assuming you have getRequest method in request.js
import CartModal from './CartModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(null); // Store cart details
  const [userDetails, setUserDetails] = useState(null); // Store user details

  const token = localStorage.getItem("Gold_token");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fetch user details and cart data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          // Fetch user details
          const userResponse = await getRequest("/user");
          setUserDetails(userResponse.body); // Store the user details in state

          // Fetch cart data
          const cartResponse = await getRequest("/product/get-my-carts");
          setCart(cartResponse); // Store the cart data in state
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-800 flex items-center">
            <img src="/assets/logo/logo.png" className='h-14 w-14 rounded-full' alt="" />
              Jewery<span className="text-yellow-500">Shop</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to='/' className="text-gray-700 relative group">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to='/shop' className="text-gray-700 relative group">
              Shop
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to='/groom' className="text-gray-700 relative group">
              Groom Sets
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to='/' className="text-gray-700 relative group">
              Jwellery On Rent
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to='/' className="text-gray-700 relative group">
              Blogs
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
         
          
          


          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to={token ? '/user-dashboard' : '/user-onboarding'}
              className="text-gray-700 hover:text-yellow-500 transition duration-300"
            >
              {token ? userDetails?.name : 'Login'}
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-yellow-500 transition duration-300"
            >
              <FaShoppingCart size={20} />
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart?.products?.length || 0} {/* Display the number of items in the cart */}
              </span>
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
          <a href="#" className="block py-2 text-gray-700 hover:text-yellow-500">
            Home
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-yellow-500">
            Shop
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-yellow-500">
            About
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-yellow-500">
            Contact
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-yellow-500">
            Login
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-yellow-500">
            Cart (3)
          </a>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} data={cart?.products} />
    </nav>
  );
};

export default Navbar;
