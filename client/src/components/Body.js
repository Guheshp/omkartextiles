import React, { useState } from 'react'
import useFetchCategories from '../customhooks/useFetchCategories'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import { IoIosMenu } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const Body = () => {
    const { categories, load } = useFetchCategories()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // console.log("categories", categories)

    if (load) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;
    if (!categories) return null

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="relative">
            {categories && categories.length > 0 ? (
                <div className="flex min-h-screen flex-col lg:flex-row">
                    {/* Mobile Hamburger Icon */}
                    <div className="lg:hidden ">

                        <button
                            onClick={toggleSidebar}
                            className="p-4 text-lg text-gray-600"
                        >

                            <IoIosMenu />
                        </button>

                    </div>

                    {/* Sidebar Overlay (Mobile) */}
                    <div
                        className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} fixed bg-white z-50 lg:relative lg:flex lg:flex-col lg:w-64`}
                    >
                        {sidebarOpen && <button
                            onClick={toggleSidebar}
                            className="p-4 text-lg text-red-600"
                        >
                            <MdOutlineCancel />
                        </button>}
                        <SideBar categories={categories} />
                    </div>

                    {/* Main Content */}
                    <div className={`flex-grow w-full ${sidebarOpen ? 'opacity-50' : 'opacity-100'}`}>
                        <Outlet />
                    </div>
                </div>
            ) : (
                <p>No Product found</p>
            )}
        </div>
    )
}

export default Body
