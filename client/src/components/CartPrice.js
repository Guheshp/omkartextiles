import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeToggle } from '../redux/slices/sideBarSlice'
import { Link } from 'react-router-dom'
import { BsShieldFillCheck } from "react-icons/bs";

const CartPrice = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(closeToggle())
    }, [])

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const cartProducts = useSelector((store) => store.cart.items)
    console.log("cartProducts", cartProducts)
    const { totalCartPrice, totalDiscount } = cartProducts.reduce(
        (acc, product) => {
            const discountAmount = (product.price * (product.discount || 0)) / 100;
            const discountedPrice = product.price - discountAmount;
            const quantity = product.quantity || 1;

            acc.totalCartPrice += discountedPrice * quantity;
            acc.totalDiscount += discountAmount * quantity;

            return acc;
        },
        { totalCartPrice: 0, totalDiscount: 0 }
    );

    const totalAmount = cartProducts.reduce((total, product) => {
        return total + product.price;
    }, 0);
    return (
        <div className="max-w-md mx-auto">
            <div className="border border-darkcolor1 p-4 bg-white max-w-md md:max-w-lg lg:max-w-xl">
                <h1 className="text-md font-semibold text-gray-800 mb-2">Order Details</h1>
                <hr />
                <div className="py-2">
                    <p className="text-gray-600 mb-2 flex justify-between">
                        Price ({cartProducts.length} items): <span>{formatPrice(totalAmount)}</span>
                    </p>
                    <p className="text-gray-600 mb-2 flex justify-between">
                        Discount: <span className="text-green-600">-{formatPrice(totalDiscount)}</span>
                    </p>
                    <p className="text-gray-600 mb-2 flex justify-between">
                        Delivery charges: <span className="text-green-600">Free</span>
                    </p>
                </div>
                <hr />
                <p className="text-md font-semibold text-gray-800 my-4 flex justify-between">
                    Total Amount: <span>{formatPrice(totalCartPrice)}</span>
                </p>
                <hr />
                <p className="text-gray-500 text-center">
                    You will save <span className="font-semibold text-green-700">{formatPrice(totalDiscount)}</span> on this order.
                </p>
            </div>
            <div className="bg-darkcolor1 p-1">
                <div className="p-2 text-white text-center border border-darkcolor1 hover:border-white">
                    <Link className="font-semibold">PROCEED TO SHIPPING</Link>
                </div>
            </div>
            <div className="mt-3 px-2">
                <p className="text-sm flex justify-between items-center gap-2 font-semibold text-gray-400">
                    <BsShieldFillCheck className="size-10" />
                    Safe and Secure Payments. Easy returns. 100% Authentic products.
                </p>
            </div>
        </div>

    )
}

export default CartPrice
