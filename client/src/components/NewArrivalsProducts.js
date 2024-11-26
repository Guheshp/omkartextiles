
import React from 'react'
import useFetchNewArrivals from '../customhooks/useFetchNewArrivals'
import ProductCard, { NewArrivals } from './ProductCard'
import NewArrivalCard from './NewArrivalCard'

const NewArrivalsProducts = () => {
    const { fetchNewArrivals, newArrivals, loading } = useFetchNewArrivals()
    const allProducts = newArrivals && newArrivals?.data
    const totalProducts = newArrivals?.totalProducts

    if (loading) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;

    return (
        <div className="container mx-auto px-4 ">
            <div className="py-2 px-4 border-b border-gray-300 mb-2 sm:px-5 sm:py-3">
                <h1 className="text-[12px] font-medium sm:text-base lg:text-sm">{totalProducts} Products</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allProducts && allProducts.length > 0 &&
                    allProducts.map((data, index) => (
                        <React.Fragment key={index}>
                            {data?.newArrival ? (
                                <NewArrivals product={data} />
                            ) : (
                                <NewArrivalCard product={data} />
                            )}
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default NewArrivalsProducts
