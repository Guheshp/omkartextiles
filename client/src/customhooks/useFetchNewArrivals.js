import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useFetchNewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchNewArrivals = async () => {
        setLoading(true)
        try {
            const res = await fetch(BASE_URL + "newarrivals")
            const json = await res.json()
            const data = json
            setNewArrivals(data)
            console.log("newarrivasl", data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNewArrivals()
    }, [])

    return { fetchNewArrivals, newArrivals, loading }
}

export default useFetchNewArrivals
