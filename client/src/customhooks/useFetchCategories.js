import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useFetchCategories = () => {
    const [categories, setCategories] = useState([])
    const [load, setLoad] = useState(true)

    const fetchCategories = async () => {
        setLoad(true);
        try {
            const res = await axios.get(BASE_URL + 'getallcategorieswithproduct')
            const data = res?.data?.data
            setCategories(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoad(false);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return { categories, load };
}

export default useFetchCategories
