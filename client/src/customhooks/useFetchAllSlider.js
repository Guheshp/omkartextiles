import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const useFetchAllSlider = () => {

    const [sliderData, setSliderData] = useState([])

    const fetchSlider = async () => {
        try {
            const res = await axios.get(BASE_URL + "getallslider")
            const data = res?.data?.data
            setSliderData(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchSlider()
    }, [])

    return { sliderData }
}

export default useFetchAllSlider
