import React from 'react'

const CartProducts = ({ cartProducts }) => {

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
        <div className="flex gap-4 p-4 border-b">

            <div>
                <img
                    className="w-36 object-cover border rounded-md"
                    src="https://royalanarkali.com/wp-content/uploads/2024/03/Adorable-Blue-Color-Lichi-Silk-Gold-And-Silver-Zari-Weaving-Saree-scaled.jpeg"
                    alt={cartProducts?.images?.[0]?.altText || "Product Image"}
                />
            </div>

            <div className="flex flex-col justify-between flex-1">
                <p className="text-lg font-medium">{cartProducts?.name || "Product Name"}</p>

                <div className="flex justify-between items-center mt-2">
                    <div>
                        <p className="font-semibold text-sm sm:text-base">Quantity</p>
                        <div className="py-2 flex items-center">
                            <button className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100">
                                -
                            </button>
                            <span className="border-t border-b px-4 py-2">1</span>
                            <button className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-100">
                                +
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-bold text-black">
                            {formatPrice(totalAmount(cartProducts?.price, cartProducts?.discount))}
                        </p>
                        <div className="flex items-center text-sm text-gray-400 gap-1">
                            <del>{formatPrice(cartProducts?.price)}</del>
                            <p className="text-red-500">({cartProducts?.discount}% off)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CartProducts
