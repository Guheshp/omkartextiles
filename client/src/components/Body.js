import React, { useEffect, useState } from 'react'
import useFetchCategories from '../customhooks/useFetchCategories'
import SideBar from './SideBar'
import { Outlet, useLocation } from 'react-router-dom'
import { IoIosMenu } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import SearchBar from './SearchBar';
import useAllProducts from '../customhooks/useAllProducts';
import { WHATS_APP_ICON } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { closeToggle, trueToggle } from '../redux/slices/sideBarSlice';
import Slider from './Slider';
import useFetchAllSlider from '../customhooks/useFetchAllSlider';

const Body = () => {
    const { categories, load } = useFetchCategories()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()
    const isSideBar = useSelector((store) => store.sideBarToggle.sideBar)
    const { sliderData } = useFetchAllSlider()

    const location = useLocation()
    const homePage = location.pathname === "/";

    useEffect(() => {
        dispatch(closeToggle())
    }, [])

    // console.log("categories", categories)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
        { sidebarOpen ? dispatch(closeToggle()) : dispatch(trueToggle()) }
    }

    if (load) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;
    if (!sliderData) return null
    if (!categories) return null

    return (
        <div className="relative">
            {/* Mobile Search Bar and Hamburger Menu */}
            <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-white z-10">
                <button
                    onClick={toggleSidebar}
                    className="text-lg text-gray-600"
                    aria-label="Open Sidebar"
                >
                    <IoIosMenu />
                </button>
                <SearchBar />
            </div>

            {/* Slider Section */}

            {homePage ? sliderData && sliderData.length > 0 ? (
                <div className="w-full">
                    <Slider sliderData={sliderData} />
                </div>
            ) : (
                <p className="text-center text-gray-600">No slider data available</p>
            ) : null}

            {/* Main Layout */}
            {categories && categories.length > 0 ? (
                <div className="flex min-h-screen flex-col lg:flex-row">
                    {isSideBar && (
                        <div
                            className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                                } lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:w-64`}
                        >
                            <button
                                onClick={toggleSidebar}
                                className="p-4 text-lg text-red-600 lg:hidden"
                                aria-label="Close Sidebar"
                            >
                                <MdOutlineCancel />
                            </button>
                            <SideBar categories={categories} />
                        </div>
                    )}

                    {/* Main Content */}
                    <div className={`flex-grow w-full ${sidebarOpen ? 'opacity-50' : 'opacity-100'}`}>
                        <Outlet />
                        <div className="md:fixed md:bottom-5 md:right-6 md:z-20 md:bg-green-500 md:text-white md:rounded-full md:shadow-lg md:cursor-pointer">
                            <img className="w-16" src={WHATS_APP_ICON} alt="WhatsApp Icon" />
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">No products found</p>
            )}
        </div>

    )
}

export default Body
