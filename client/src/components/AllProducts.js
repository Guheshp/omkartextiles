import React from 'react';
import useAllProducts from '../customhooks/useAllProducts';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const { allProducts, load } = useAllProducts();
    console.log('allProducts', allProducts);

    if (load) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allProducts && allProducts.length > 0 &&
                    allProducts.map((data, index) => (
                        <ProductCard key={index} product={data} />
                    ))}
            </div>
        </div>
    );
};

export default AllProducts;
