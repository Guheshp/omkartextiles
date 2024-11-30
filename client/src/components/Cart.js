import React from 'react'
import { useSelector } from 'react-redux'
import CartProducts from './CartProducts'
import CartPrice from './CartPrice'
import { Link } from 'react-router-dom'

const Cart = () => {
    const cartCount = useSelector((store) => store.cart.items)
    const cartProducts = useSelector((store) => store.cart.items)

    if (cartProducts == []) return <h1>No items in cart</h1>

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="py-2 px-4 border-b border-gray-300 mb-2 sm:px-5 sm:py-3">
                <h1 className="text-[12px]  font-semibold sm:text-base lg:text-xl ">Your Carts <span className='text-sm'>({cartCount?.length > 1 ? `${cartCount?.length} items` : `${cartCount?.length} item`})</span></h1>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-8 gap-4">
                <div className="col-span-4 md:col-span-6 ">
                    {cartProducts && cartProducts?.length > 0 ? (
                        <div>
                            {cartProducts?.map((data, index) => (
                                <CartProducts cartProducts={data} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-lg font-medium text-gray-600 mb-4">No Items in Cart</p>
                            <p className="text-md text-gray-400 mb-4">Your cart is currently empty. Add some items to your cart now.</p>
                            <Link
                                to="/"
                                className="inline-block px-6 py-2 bg-darkcolor1  text-white font-semibold rounded-lg hover:bg-darkcolor1 hover:bg-opacity-80 transition"
                            >
                                View Products
                            </Link>
                        </div>
                    )}
                </div>
                <div className="col-span-3 md:col-span-2 ">
                    <CartPrice />
                </div>
            </div>

        </div>
    )
}

export default Cart
