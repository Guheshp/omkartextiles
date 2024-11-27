import React from 'react'
import { useParams } from 'react-router-dom'
import useGetBroductById from '../customhooks/useGetBroductById'
import SingleProductImages from './SingleProductImages'
import SingleProductDetails from './SingleProductDetails'


const SingleProduct = () => {
    const { id } = useParams()
    const { productData, load } = useGetBroductById(id)
    console.log(productData)
    if (load) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="py-2 px-4 border-b border-gray-300 mb-2 sm:px-5 sm:py-3">
                <h1 className="text-[12px] font-medium sm:text-base lg:text-sm"> Products</h1>
            </div>
            <div className="grid grid-cols-2 grid-flow-col gap-4">
                <div>
                    <SingleProductImages productData={productData} />
                </div>
                <div>
                    <SingleProductDetails productData={productData} />
                </div>
            </div>


        </div>
    )
}

export default SingleProduct
