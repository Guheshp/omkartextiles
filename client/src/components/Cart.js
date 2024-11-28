import React from 'react'
import { useSelector } from 'react-redux'
import CartProducts from './CartProducts'
import CartPrice from './CartPrice'

const Cart = () => {
    const cartCount = useSelector((store) => store.cart.items)
    const cartProducts = useSelector((store) => store.cart.items)
    // console.log("cartProducts", cartProducts)

    if (cartProducts == []) return <h1>No items in cart</h1>

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="py-2 px-4 border-b border-gray-300 mb-2 sm:px-5 sm:py-3">
                <h1 className="text-[12px] font-medium sm:text-base lg:text-sm">Your Cart({cartCount?.length > 1 ? `${cartCount?.length} items` : `${cartCount?.length} item`})</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    {cartProducts && cartProducts?.length > 0 ? (
                        <div>
                            {cartProducts?.map((data, index) => (
                                <CartProducts cartProducts={data} />
                            ))}
                        </div>
                    ) : (<p>No Items in cart</p>)}
                </div>
                <div>
                    <CartPrice />
                </div>
            </div>

        </div>
    )
}

export default Cart
