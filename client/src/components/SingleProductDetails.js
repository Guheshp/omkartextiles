import React from 'react'
import { Link } from 'react-router-dom';
import { RiSecurePaymentFill } from "react-icons/ri";
import { SlBadge } from "react-icons/sl";
import { PiShippingContainerDuotone } from "react-icons/pi";
import { MdContentCopy } from "react-icons/md";

const SingleProductDetails = ({ productData }) => {

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
        <div className="p-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium">{productData?.name}</h1>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-3">
                <p className="text-lg sm:text-xl font-bold text-black">
                    {formatPrice(totalAmount(productData?.price, productData?.discount))}
                </p>
                <del className="text-gray-400">
                    <p className="text-sm sm:text-md">{formatPrice(productData?.price)}</p>
                </del>
                <p className="text-sm sm:text-md text-red-400">
                    ({productData?.discount}% off)
                </p>
            </div>
            <p className="text-xs sm:text-sm mt-1">Inclusive of all taxes. Free Shipping above ₹1500.</p>

            <div className="border my-3 px-2 py-2">
                <p className="text-xs sm:text-sm">
                    UPI & Card Payment Accepted <span>Powered by Razorpay</span>
                </p>
            </div>
            <div className="my-5">
                <hr />
                <div className="space-y-2">
                    <p className="flex items-center gap-2 text-xs sm:text-sm my-1">
                        <RiSecurePaymentFill className="text-lg" />
                        Authentic & Quality Assured
                    </p>
                    <p className="flex items-center gap-2 text-xs sm:text-sm my-1">
                        <SlBadge className="text-lg" />
                        100% money back guarantee
                        <span className="text-blue-500 cursor-pointer">*Learn more</span>
                    </p>
                    <p className="flex items-center gap-2 text-xs sm:text-sm my-1">
                        <PiShippingContainerDuotone className="text-lg" />
                        Free Shipping & Returns
                        <span className="text-blue-500 cursor-pointer">*Learn more</span>
                    </p>
                </div>
                <hr />
            </div>
            <div>
                <p className="font-semibold text-sm sm:text-base">Quantity</p>
                <div className="py-3 flex items-center">
                    <button className="border p-2 sm:p-2">-</button>
                    <span className="border px-4 py-2 sm:py-2">1</span>
                    <button className="border p-2 sm:p-2">+</button>
                </div>
            </div>

            <div className="my-4 flex flex-col sm:flex-row gap-3">
                <Link className="border border-black p-3 sm:px-[69px] text-sm sm:text-md rounded-xl bg-color1 hover:bg-darkcolor1 font-semibold hover:text-white text-center">
                    Add to Cart
                </Link>
                <Link className="border p-3 sm:px-[69px] text-white text-sm sm:text-md border-black rounded-xl bg-darkcolor1 hover:bg-opacity-95 font-semibold text-center">
                    Buy Now
                </Link>
            </div>
            <hr />

            <div className="py-3">
                <p className="font-semibold text-sm sm:text-base">BEST COUPON FOR YOU</p>

                <div className="flex flex-col sm:flex-row border gap-4 sm:gap-5 justify-between rounded-xl p-3">

                    <div className="flex-1">
                        <p className="text-sm sm:text-base font-bold">Flat 15% off above ₹9999/-</p>
                        <p className="text-xs sm:text-sm">Discount applicable at checkout</p>
                    </div>

                    <div className="border border-dotted border-black m-2 sm:m-0 p-2 sm:p-3 rounded-md flex items-center justify-center">
                        <p className="flex items-center gap-2 text-sm sm:text-base">
                            OMKAR98765 <MdContentCopy className="cursor-pointer" />
                        </p>
                    </div>
                </div>
            </div>


            <div className="mt-7 bg-color1 p-4">
                <p className="text-center text-sm font-semibold">YOUR SAFETY IS OUR PRIORITY</p>
                <div className="flex flex-col sm:flex-row justify-around items-center p-3 gap-4">
                    <div className="text-center">
                        <img className="rounded-full w-16 sm:w-24 mx-auto" src="https://www.karagiri.com/cdn/shop/files/easy_returns_1_120x.jpg?v=1653044934" alt="" />
                        <p className="text-xs sm:text-sm">Easy Returns</p>
                    </div>
                    <div className="text-center">
                        <img className="rounded-full w-16 sm:w-24 mx-auto" src="https://www.karagiri.com/cdn/shop/files/no_contact_delivery_120x.jpg?v=1653043426" alt="" />
                        <p className="text-xs sm:text-sm">No Contact Delivery</p>
                    </div>
                    <div className="text-center">
                        <img className="rounded-full w-16 sm:w-24 mx-auto" src="https://www.karagiri.com/cdn/shop/files/safe-and-clean-packaging_120x.jpg?v=1653043452" alt="" />
                        <p className="text-xs sm:text-sm">Safe & Clean Packaging</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleProductDetails
