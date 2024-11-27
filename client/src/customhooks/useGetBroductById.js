import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useGetBroductById = (id) => {

    const [load, setLoad] = useState(false)
    const [productData, setProductData] = useState([])

    const fetchProductsByID = async () => {
        setLoad(true)
        try {
            const res = await axios.get(BASE_URL + `getproductbyid/${id}`)
            const data = res?.data?.data
            setProductData(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchProductsByID();
        }
    }, [id]);

    return { load, productData }
}

export default useGetBroductById
