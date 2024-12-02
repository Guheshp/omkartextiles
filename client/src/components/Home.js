import React from 'react'
import useFetchAllMoneyPick from '../customhooks/useFetchAllMoneyPick'
import MoneyPickCard from './MoneyPickCard'

const Home = () => {
    const { moneyPickData, load } = useFetchAllMoneyPick()
    console.log("moneyPickData", moneyPickData)

    if (load) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;
    if (!moneyPickData) return null

    return (
        <div className='mt-10'>
            <div className='flex gap-3'>
                {moneyPickData && moneyPickData?.map((data, index) => (

                    <MoneyPickCard moneyPickData={data} />
                ))}
            </div>

        </div>
    )
}

export default Home
