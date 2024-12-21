import React, { useEffect } from 'react'
import Collections from './Collections'
import { useParams } from 'react-router-dom'
import useFetchAllProductsByMoneyPickbyid from '../customhooks/useFetchAllProductsByMoneyPickbyid'

const UnderPrice = () => {
    const { id } = useParams()
    // console.log(id)
    const { fetchMoneyPickById, products, loading } = useFetchAllProductsByMoneyPickbyid(id)

    // console.log("products", products)

    useEffect(() => {
        if (id) {
            fetchMoneyPickById(id)
        }
    }, [id])

    if (loading) return <h1 className="text-center text-xl font-semibold my-5">Loading...</h1>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products && products?.length > 0 ?
                (products?.map((data, index) => (
                    <Collections product={data} />
                ))) : (null)
            }
        </div>
    )
}

export default UnderPrice
