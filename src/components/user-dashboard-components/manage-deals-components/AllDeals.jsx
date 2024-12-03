import React, { useEffect, useState } from 'react';
import BreadCrums from '../../../common/BreadCrums';
import Loader from '../../../common/Loader';
import AdminDealCard from '../manage-products-components/AdminDealCard';
import { getRequest } from '../../../Requests/Request'; // Assuming this is your custom request function

const AllDeals = () => {
  const [loading, setLoading] = useState(true);
  const [myDeals, setMyDeals] = useState([]);
  const [deleted , setDeleted ] = useState(false)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const token = localStorage.getItem("Gold_token");
        if (token) {
          const response = await getRequest("/deal/my-deals", token);
          console.log(response.deal)
          setMyDeals(response?.deal || []);
        }
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
        setDeleted(false)
      }
    };

    fetchDeals();
  }, [deleted]); // Empty dependency array ensures this runs only once on component mount

  return (
    <>
      <div className='py-5'>
        <BreadCrums
          breadCrum={[
            { name: 'User Dashboard' },
            { name: 'Manage Deals' },
          ]}
        />
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
        />
      </div>

      <div className="py-4 mt-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myDeals?.length > 0
              ? myDeals.map((item) => (
                  <AdminDealCard
                    key={item._id}
                    item={item?.productId}
                    seller={item?.sellerId}
                    dealId={item._id}
                    setDeleted={setDeleted}
                  />
                ))
              : 'No Products Found'}
          </div>
        )}
      </div>
    </>
  );
};

export default AllDeals;
