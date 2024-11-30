import React from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeCart } from '../redux/slices/cartSlice';
import { IMAGE_BASE_URL } from '../utils/Constants';

const CartProducts = ({ cartProducts }) => {

    const dispatch = useDispatch()

    const removeProductFromCart = (id) => {
        dispatch(removeCart(cartProducts?._id))
    }

    const cartItems = useSelector((state) => state.cart.items);
    const product = cartItems.find(item => item._id === cartProducts._id);

    const handleIncrement = () => {
        dispatch(incrementQuantity(cartProducts?._id));
    };

    const handleRemove = () => {
        dispatch(decrementQuantity(cartProducts?._id));
    };
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
        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-2 border">
            <div className="w-full md:w-auto">
                <img
                    className="w-32  object-cover border"
                    src={IMAGE_BASE_URL + cartProducts?.images?.[0]?.url}
                    alt={cartProducts?.images?.[0]?.altText || "Product Image"}
                />
            </div>

            <div className="flex flex-col justify-between flex-1 py-4 pr-4">
                <p className="text-lg font-medium">{cartProducts?.name || "Product Name"}</p>

                <div className="flex flex-wrap justify-between items-center mt-2">
                    <div className="w-full sm:w-auto">
                        <p className="font-semibold text-sm sm:text-base">Quantity <span className='text-[12px] font-thin '>(Total Stocks: <span className='font-medium'>{cartProducts?.stock}</span>)</span></p>
                        {/* <div className="py-2 flex items-center">
                            <button className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100">
                                -
                            </button>
                            <button className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100" onClick={() => removeProductFromCart(cartProducts?._id)}>
                                <AiTwotoneDelete className='m-1' />
                            </button>
                            <span className="border-t border-b px-4 py-2">1</span>
                            <button className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-100">
                                +
                            </button>
                        </div> */}


                        <div className="py-2 flex items-center">
                            {product.quantity > 1 ?

                                (<button
                                    className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100"
                                    onClick={handleRemove}
                                    disabled={product?.quantity <= 1}
                                >
                                    -
                                </button>
                                ) : (
                                    <button
                                        className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100"
                                        onClick={removeProductFromCart}
                                    >
                                        <AiTwotoneDelete className="m-1" />
                                    </button>
                                )
                            }


                            <span className="border-t border-b px-4 py-2">{product?.quantity || 0}</span>

                            <button
                                className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-100"
                                onClick={handleIncrement}
                            >
                                +
                            </button>
                        </div>

                    </div>

                    <div className="w-full sm:w-auto text-right mt-4 sm:mt-0">
                        <p className="text-lg font-bold text-black">
                            {formatPrice(totalAmount(cartProducts?.price, cartProducts?.discount))}
                        </p>
                        <div className="flex justify-end items-center text-sm text-gray-400 gap-1">
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
