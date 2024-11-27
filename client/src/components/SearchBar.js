import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import useSearchProducts from './useSearchProducts';

const SearchBar = () => {

    const { query, searchedProducts, setQuery, handleSearchProducts } = useSearchProducts()

    const [showSuggestion, setShowSuggestion] = useState(false)

    const handleSearch = () => {
        if (query.trim()) {
            handleSearchProducts()
            setQuery("")
            setShowSuggestion(false)
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                handleSearchProducts();
            }
        }, 200)
        return () => {
            clearTimeout(timer)
        }
    }, [query])

    return (
        <div>
            <div className="flex items-center bg-color1 mx-3 gap-2 border rounded-lg border-black p-1 sm:max-w-xs md:max-w-md lg:max-w-lg">
                <input
                    type="text"
                    className="flex-1 p-2 text-sm border-none outline-none placeholder-gray-500"
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowSuggestion(true)}
                    onBlur={() => setShowSuggestion(false)}
                />
                <button className="text-xl p-2 text-black bg-transparent hover:bg-gray-200 rounded-lg" onClick={handleSearch}>
                    <CiSearch />
                </button>
            </div>

            {query?.length > 0 && showSuggestion && (
                <div className="absolute z-20 text-black bg-color1 bg-opacity-85 p-2 w-64 border border-gray-300 rounded-md shadow-md mx-2">

                    {searchedProducts?.slice(0, 10)?.map((data) => (
                        <div key={data?._id} className="p-2 hover:bg-darkcolor1 cursor-pointer rounded-md hover:text-white">
                            <p>{data?.name}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default SearchBar;


