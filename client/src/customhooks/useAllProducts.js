import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useAllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    const [load, setLoad] = useState(false)

    const fetchAllProducts = async () => {
        setLoad(true)
        try {
            const res = await axios.get(BASE_URL + "getallproduct")
            const data = res?.data?.data
            setAllProducts(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])
    return { allProducts, load }
}

export default useAllProducts
