import React, { useState } from 'react';
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { IMAGE_BASE_URL } from '../utils/Constants'; // Assuming IMAGE_BASE_URL is declared in Constants

const SingleProductImages = ({ productData }) => {

    const images = productData?.images;
    const [mainImage, setMainImage] = useState(IMAGE_BASE_URL + images[0]?.url);
    const [zoomData, setZoomData] = useState({ backgroundPosition: '0% 0%', isZooming: false });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomData({
            backgroundPosition: `${x}% ${y}%`,
            isZooming: true,
        });
    };

    const handleMouseLeave = () => {
        setZoomData({ backgroundPosition: '0% 0%', isZooming: false });
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <div className="hidden md:flex flex-col md:flex-row gap-4 items-center md:items-start">
                <div className="flex flex-row md:flex-col justify-center items-center gap-2 p-2">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            className={`w-24 sm:w-32 md:w-[55%] cursor-pointer border-2 rounded-md transition-all
                            ${mainImage === IMAGE_BASE_URL + image?.url
                                    ? 'border-blue-500 scale-105 shadow-xl'
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                            src={IMAGE_BASE_URL + image?.url}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setMainImage(IMAGE_BASE_URL + image?.url)}
                        />
                    ))}
                </div>

                <img
                    className="relative w-full cursor-pointer sm:w-[90%] md:w-[70%] border-2 border-gray-300 rounded-md"
                    src={mainImage}
                    alt="Main"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                />

            </div>

            {zoomData.isZooming && (
                <div
                    className="absolute top-20 left-[50%] w-96 h-96 border-2 border-gray-300 rounded-md bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${mainImage})`,
                        backgroundPosition: zoomData.backgroundPosition,
                        backgroundSize: '200%',
                    }}
                ></div>
            )}

            {/* Mobile View */}
            <div className="flex flex-col items-center gap-4 w-full md:hidden">
                <img
                    className="w-full max-w-md border-2 border-gray-300 rounded-md"
                    src={IMAGE_BASE_URL + images[currentIndex]?.url}
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
    );
};

export default SingleProductImages;



{/* {productData && (
                productData?.images?.map((data, index) => (
                    <img key={index} src={data?.url} alt="productimage" />
                ))
            )} */}