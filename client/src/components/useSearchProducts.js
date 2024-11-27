import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useSearchProducts = () => {

    const [query, setQuery] = useState("")
    const [searchedProducts, setSearchedProducts] = useState([])

    const handleSearchProducts = async () => {
        try {
            const res = await axios.get(BASE_URL + `getallproduct?limit=100&search=${query}`)
            const data = res?.data?.data
            setSearchedProducts(data)
            // console.log("searchedData", data)
        } catch (error) {
            console.error(error)
        }
    }
    return { query, searchedProducts, setQuery, handleSearchProducts }
}

export default useSearchProducts
