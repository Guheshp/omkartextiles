import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useFetchAllMoneyPick = () => {
    const [moneyPickData, setMoneyPickData] = useState([])
    const [load, setLoad] = useState(false)

    const handelFetch = async () => {
        setLoad(true)
        try {
            const res = await axios.get(BASE_URL + "getallmoneypick")
            const data = res?.data?.data
            setMoneyPickData(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        handelFetch()
    }, [])

    return { moneyPickData, load }
}

export default useFetchAllMoneyPick
