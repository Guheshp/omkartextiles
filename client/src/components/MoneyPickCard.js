import React from 'react'
import { IMAGE_BASE_URL } from '../utils/Constants'
import { Link } from 'react-router-dom'

const MoneyPickCard = ({ moneyPickData }) => {
    return (

        <div className='relative'>
            <Link to={`/collections/${moneyPickData?._id}`}>
                <img
                    className='h-96 hover:cursor-pointer hover:opacity-80'
                    src={IMAGE_BASE_URL + moneyPickData?.categoryImage} alt="" />
            </Link>
            <p className="absolute bottom-4 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg font-semibold"
            >{moneyPickData?.name}</p>
        </div>
    )
}

export default MoneyPickCard
