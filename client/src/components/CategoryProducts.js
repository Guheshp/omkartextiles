import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCategories from '../customhooks/useCategories';
import AllProductsByCategory from './AllProductsByCategory';

const CategoryProducts = () => {
    const { id } = useParams();

    const { fetchCategories, category = [], loading, categoryProductCount } = useCategories();

    const sortedProducts = category?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    useEffect(() => {
        if (id) {
            fetchCategories(id);
        }
    }, [id]);

    if (loading || category?.length < 0) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="py-2 px-4 border-b border-gray-300 mb-2 sm:px-5 sm:py-3">
                <h1 className="text-[12px] font-medium sm:text-base lg:text-sm">{categoryProductCount} Products</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedProducts && sortedProducts.length > 0 ? (
                    sortedProducts.map((data, index) => (
                        <AllProductsByCategory key={index} product={data} />
                    ))
                ) : (
                    <p>Product not found with this category</p>
                )}
            </div>
        </div>
    );
};

export default CategoryProducts;
