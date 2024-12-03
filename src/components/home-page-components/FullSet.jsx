import React, { useEffect, useState } from 'react'
import { getRequest } from '../../Requests/Request'
import ProductCard from '../../common/ProductCard'

const FullSet = () => {
    const [data , setData ] = useState([])
    useEffect(()=>{
       const fetchData = async () =>{
        try {
            const res = await getRequest("/product/full-set");

            console.log(res)
            setData(res.body)
        } catch (error) {
            
        }
       }
       fetchData()
    } , [])
  return (
   <>
      <div className=" mb-8 my-20 mx-20">
          <h2 className="text-2xl font-bold text-gray-800">Browse Full Groom Set</h2>
        </div>
        <div className="flex items-center gap-9 xl:gap-7 mx-20">
              {data && data?.slice(0, 4).map((product) => (
                <div
                  // to={`/${product.slug}`}
                  className="flex-none"
                  key={product._id}
                >
                  <ProductCard item={product} />
                </div>
              ))}
            </div>
   </>
  )
}

export default FullSet