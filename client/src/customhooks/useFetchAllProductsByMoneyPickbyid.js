import React, { useState } from 'react'
import { BASE_URL } from '../utils/Constants'
import axios from 'axios'

const useFetchAllProductsByMoneyPickbyid = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [countProducts, setCountProducts] = useState(null)

    const fetchMoneyPickById = async (id) => {
        // console.log("id,,", id)
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(BASE_URL + `getallproductsbymoneypicks/${id}`)
            const data = res?.data?.data
            setProducts(data)
            setCountProducts(res?.data?.totalProducts)

        } catch (err) {
            setError('Error fetching categories');
            console.error(err)
        } finally {
            setLoading(false);
        }
    }

    return { fetchMoneyPickById, products, countProducts, loading, error }
}

export default useFetchAllProductsByMoneyPickbyid
