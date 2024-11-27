import React, { useState } from 'react'
import { DUMMY_IMG, DUMMY_IMG1, DUMMY_IMG2, DUMMY_IMG3, DUMMY_IMG4 } from '../utils/Constants'
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

const SingleProductImages = ({ productData }) => {
    const images = [DUMMY_IMG1, DUMMY_IMG2, DUMMY_IMG3, DUMMY_IMG4];
    const [mainImage, setMainImage] = useState(images[0]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    return (
        <div>
            {/* Desktop View */}
            <div className="hidden md:flex flex-col md:flex-row gap-4 items-center md:items-start">
                {/* Side list of images */}
                <div className="flex flex-row md:flex-col gap-2">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            className={`w-24 sm:w-32 md:w-[75%] cursor-pointer border-2 rounded-md transition-all
                            ${mainImage === image
                                    ? 'border-blue-500 scale-105 shadow-xl'
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setMainImage(image)}
                        />
                    ))}
                </div>

                {/* Main image display */}
                <img
                    className="w-full sm:w-[90%] md:w-[75%] border-2 border-gray-300 rounded-md"
                    src={mainImage}
                    alt="Main"
                />
            </div>

            {/* Mobile View */}
            <div className="flex flex-col items-center gap-4 w-full md:hidden">
                <img
                    className="w-full max-w-md border-2 border-gray-300 rounded-md"
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                />

                <div className="flex justify-between w-full max-w-md">
                    <button
                        className="p-2 bg-darkcolor1 text-white rounded-md hover:bg-color1 hover:text-black transition-all"
                        onClick={handlePrev}
                    >
                        <GrLinkPrevious />
                    </button>
                    <button
                        className="p-2 bg-darkcolor1 text-white rounded-md hover:bg-color1 hover:text-black transition-all"
                        onClick={handleNext}
                    >
                        <GrLinkNext />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleProductImages


{/* {productData && (
                productData?.images?.map((data, index) => (
                    <img key={index} src={data?.url} alt="productimage" />
                ))
            )} */}