import React from 'react'
import { Link } from 'react-router-dom'

const NewArrivalCard = ({ product }) => {
    const totalAmount = (amount, discount) => {
        if (!amount || !discount) return amount;
        const discountAmount = (amount * discount) / 100;
        return amount - discountAmount;
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="rounded-lg hover:shadow-lg transition duration-200 max-w-xs  w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-sm">
            <Link to={`/products/${product?._id}`}>
                <img
                    className="w-full object-cover rounded-md"
                    src="https://royalanarkali.com/wp-content/uploads/2024/03/Adorable-Blue-Color-Lichi-Silk-Gold-And-Silver-Zari-Weaving-Saree-scaled.jpeg"
                    alt={product?.images?.[0]?.altText || 'Product Image'}
                />
                <div className="mt-4 px-2">
                    <p className="text-[10px] font-light text-black">
                        {product?.categoryId?.name}
                    </p>
                    <p className="text-[16px] font-light text-black">
                        {product?.name}
                    </p>

                    <div className="flex mt-2 gap-3 items-center">
                        <p className="text-sm font-bold text-black">
                            {formatPrice(totalAmount(product?.price, product?.discount))}
                        </p>
                        <del className="text-gray-400">
                            <p className="text-[13px] text-gray-400">{formatPrice(product?.price)}</p>
                        </del>
                        <p className="text-[13px] text-red-400">({product?.discount}% off)</p>
                    </div>
                </div>
                <div className="text-center">
                    <button className="p-1 px-2 border border-gray-500 m-3 bg-color1 font-medium rounded hover:bg-darkcolor1 hover:text-white">
                        Add to cart
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default NewArrivalCard
