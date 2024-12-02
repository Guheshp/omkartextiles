import React, { useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useFetchAllProductsByMoneyPickbyid = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCategories = async (id) => {
        // console.log("id,,", id)
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(BASE_URL + `getallproductsbycategoryId/${id}`)
            const data = res?.data?.data
            setCategories(data)
            setCategoryProductCount(res?.data?.totalProducts)

        } catch (err) {
            setError('Error fetching categories');
            console.error(err)
        } finally {
            setLoading(false);
        }
    }


    return { fetchCategories, categoryProductCount, category, loading, error }
}

export default useFetchAllProductsByMoneyPickbyid
