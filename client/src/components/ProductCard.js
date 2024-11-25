import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { BsBagCheckFill } from 'react-icons/bs';

const ProductCard = ({ product }) => {
    console.log(product);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
    };

    return (
        <div className="rounded-lg p-4 hover:shadow-lg transition duration-200 max-w-xs bg-white">
            {/* Image Section */}
            <img
                className="w-full h-64 object-cover rounded-md"
                src="https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"
                alt={product?.images?.[0]?.altText || 'Product Image'}
            />

            {/* Product Details */}
            <div className="mt-4 text-center">
                <p>{product?.categoryId?.name || "N/A"}</p>
                <h3 className="text-mg text-gray-900 font-semibold">{product?.name}</h3>
                <p className="text-mg text-black">Rs. {formatPrice(product?.price)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
