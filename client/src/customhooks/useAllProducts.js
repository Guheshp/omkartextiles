import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useAllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    const [totalProducts, srtTotalProducts] = useState(null)
    const [load, setLoad] = useState(false)
    const [page, setPage] = useState(1)

    const fetchAllProducts = async () => {
        setLoad(true)
        try {
            const res = await axios.get(BASE_URL + "getallproduct?limit=100")
            const data = res?.data?.data
            const totalProducts = res?.data?.totalProducts
            srtTotalProducts(totalProducts)
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
    return { allProducts, totalProducts, load, page, setPage }
}

export default useAllProducts
