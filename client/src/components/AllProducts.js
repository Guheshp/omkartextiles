import React from 'react';
import useAllProducts from '../customhooks/useAllProducts';
import ProductCard, { NewArrivals } from './ProductCard';
import Pagination from './Pagination';

const AllProducts = () => {
    const { allProducts, load, totalProducts, page, setPage } = useAllProducts();
    console.log('allProducts', allProducts);

    if (load) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;

    return (
        <div className="container mx-auto px-4 ">
            <div className="py-2 px-4 border-b border-gray-300 mb-2 sm:px-5 sm:py-3">
                <h1 className="text-[12px] font-medium sm:text-base lg:text-sm">{totalProducts} Products</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allProducts && allProducts.length > 0 &&
                    allProducts?.sort((a, b) => b._id - a._id)?.slice((page - 1) * 12, page * 12)?.map((data, index) => (
                        <React.Fragment key={index}>
                            {data?.newArrival ? (
                                <NewArrivals product={data} />
                            ) : (
                                <ProductCard product={data} />
                            )}
                        </React.Fragment>
                    ))
                }
            </div>

            <div className='text-center my-10'>
                <Pagination products={allProducts} page={page} setPage={setPage} />
            </div>
        </div>


    );
};

export default AllProducts;
