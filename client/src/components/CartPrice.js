import React from 'react'
import { useSelector } from 'react-redux'

const CartPrice = () => {
    const cartProducts = useSelector((store) => store.cart.items)
    console.log("cartProducts", cartProducts)
    const totalCartPrice = cartProducts.reduce((total, product) => {
        const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;
        return total + discountedPrice * (product.quantity || 1);
    }, 0);
    return (
        <div>
            <p>Total products </p>
            <p>Total Amount{totalCartPrice} </p>
        </div>
    )
}

export default CartPrice
