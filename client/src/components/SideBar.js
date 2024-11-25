import React from 'react';
import { FaChevronUp } from "react-icons/fa";

const SideBar = ({ categories }) => {
    console.log("categories", categories);

    return (
        <div className=" w-56 min-h-screen">
            <h2 className="text-xl font-semibold mb-4 px-2">Filters</h2>
            <div className="space-y-">
                {categories && categories?.map((data, index) => (
                    <div className='flex justify-between border-b-[0.7px] border-black items-center hover:bg-darkcolor1 hover:text-white'>
                        <p key={index} className=" p-2 text-sm font-medium cursor-pointer transition-all duration-300 ">
                            {data?.name}
                        </p>
                        <FaChevronUp className='size-3 text-sm mx-2' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideBar;
