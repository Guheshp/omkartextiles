import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import useCategories from '../customhooks/useCategories';
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({ categories }) => {
    // console.log("categories", categories);

    const location = useLocation()

    const { fetchCategories, category, loading } = useCategories();
    // console.log("category..", category);
    const [productTypeToggle, setProductTypeToggle] = useState(false)
    const [newArrivalsToggle, setNewArrivalsToggle] = useState(false)

    const productType = () => {
        setProductTypeToggle(!productTypeToggle)
    }

    const newArrivals = () => {
        setNewArrivalsToggle(!newArrivalsToggle)
    }


    return (
        <div className="w-60 min-h-screen">
            <h2 className="text-xl font-semibold mb-4 px-2">Filters</h2>

            <div className={`mb-1`} onClick={newArrivals}>
                <Link to={"/"} className={`flex justify-between font-medium border-b-[0.7px] border-gray-500 px-2 items-center bg-color1 hover:bg-darkcolor1 hover:text-white ${location.pathname === `/` ? "bg-darkcolor1 text-white" : ""}`}>
                    <p className='py-1 text-[15px]'>All Products</p>
                </Link>
            </div>

            <div className={`mb-1`} onClick={newArrivals}>
                <Link to={"/newarrivals"} className={`flex justify-between font-medium border-b-[0.7px] border-gray-500 px-2 items-center bg-color1 hover:bg-darkcolor1 hover:text-white ${location.pathname === `/newarrivals` ? "bg-darkcolor1 text-white" : ""}`}>
                    <p className='py-1 text-[15px]'>New Arrivals</p>
                </Link>
            </div>

            <div className={`mb-1 flex justify-between font-medium border-b-[0.7px] border-gray-500 px-2 items-center bg-color1 hover:bg-darkcolor1 hover:text-white ${productTypeToggle ? "bg-darkcolor1 text-white" : ""}`} onClick={productType}>
                <p className='py-1  text-[15px]'>Product type</p>
                <IoIosArrowDown
                    className={`text-sm mx-2 transition-transform duration-300 ${productTypeToggle ? "rotate-180" : ""}`}
                />
            </div>
            {productTypeToggle && (
                <div className='mt-1'>
                    {categories && categories.map((data, index) => (
                        <div key={data?._id}>
                            <div className=' '>
                                <Link to={`/products/${data?._id}`}
                                    className={`${location.pathname === `/products/${data?._id}` ? 'text-white bg-darkcolor1 flex gap-2 py-1 px-2 border-b-[0.7px] font-medium text-sm border-gray-500' : 'text-black hover:bg-darkcolor1 hover:text-white bg-color1 flex  gap-2 py-1 px-2 border-b-[0.7px] font-medium text-sm border-gray-500'
                                        }`}
                                >
                                    <p>{data?.name}</p>
                                    <p className='text-sm'>({data?.totalProducts})</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}



        </div>
    );
};

export default SideBar;
