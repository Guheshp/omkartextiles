import React from 'react'
import useFetchCategories from '../customhooks/useFetchCategories'
import SideBar from './SideBar'
import AllProducts from './AllProducts'
import { Outlet } from 'react-router-dom'

const Body = () => {
    const { categories, load } = useFetchCategories()
    console.log("categories", categories)

    if (load) return <h1>loading </h1>
    if (!categories) return null

    return (
        <div>
            {categories && categories.length > 0 ? (
                <div className="flex min-h-screen">
                    <SideBar categories={categories} />
                    <div className="flex-grow p-4 w-full">
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
