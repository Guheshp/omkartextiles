import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetBroductById from '../customhooks/useGetBroductById';
import SingleProductImages from './SingleProductImages';
import SingleProductDetails from './SingleProductDetails';
import SameCategory from './SameCategory';
import useCategories from '../customhooks/useCategories';
import { useDispatch, useSelector } from 'react-redux';
import { closeToggle } from '../redux/slices/sideBarSlice';

const SingleProduct = () => {
    const { id } = useParams();
    const { productData, load } = useGetBroductById(id);
    const categoryId = productData?.categoryId?._id;

    const { fetchCategories, category, loading, error } = useCategories();
    // console.log("category...", category)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(closeToggle())
        if (categoryId) {
            fetchCategories(categoryId);
        }
    }, [categoryId]);

    if (load || loading) {
        return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;
    }

    if (error) {
        return <h1 className="text-center text-xl text-red-500 font-semibold my-5">Failed to load category data.</h1>;
    }

    if (!productData) {
        return <h1 className="text-center text-xl font-semibold my-5">Product not found</h1>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="py-2 px-4 border-b border-gray-300 mb-2 sm:px-5 sm:py-3">
                <h1 className="text-[12px] font-medium sm:text-base lg:text-sm"></h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <SingleProductImages productData={productData} />
                </div>
                <div>
                    <SingleProductDetails productData={productData} />
                </div>
            </div>
            <div className='my-12'>
                <h1 className='text-xl font-bold pb-3'>YOU MAY ALSO LOVE!</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {category && category.length > 0 ? (
                        category?.slice(0, 5).map((data) => (
                            <SameCategory key={data._id} category={data} />
                        ))
                    ) : (
                        <p>Product with this category not found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
