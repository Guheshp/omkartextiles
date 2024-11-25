import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'
import axios from 'axios'

const useCategories = (id) => {
    console.log("id,,,", id)
    const [category, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCategories = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(BASE_URL + `getallproductsbycategoryId/${id}`)
            const data = res?.data?.data
            setCategories(data)
            console.log(data)
        } catch (err) {
            setError('Error fetching categories');
            console.error(err)
        } finally {
            setLoading(false);
        }
    }


    return { fetchCategories, category, loading, error }
}

export default useCategories
