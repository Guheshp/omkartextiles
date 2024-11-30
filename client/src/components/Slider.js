import React, { useEffect, useState } from 'react'
import { IMAGE_BASE_URL } from '../utils/Constants'

const Slider = ({ sliderData }) => {
    console.log("sliderData", sliderData)
    const data = sliderData && sliderData[0]
    const dataImage = sliderData && sliderData[0]?.image

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (dataImage && dataImage.length > 1) {

            const intervalId = setInterval(() => {
                setCurrentSlide((prevSlide) =>
                    prevSlide === dataImage.length - 1 ? 0 : prevSlide + 1
                );
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [dataImage]);


    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === dataImage.length - 1 ? 0 : prevSlide + 1
        );
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? dataImage.length - 1 : prevSlide - 1
        );
    };
    return (
        <div className="h-4/6 relative overflow-hidden">
            {dataImage.length > 0 ? (
                <div className="carousel-item w-full h-full flex flex-col items-center justify-center transition-opacity duration-700">
                    <img
                        className="w-full h-full object-cover"
                        src={`${IMAGE_BASE_URL}${dataImage[currentSlide]}`}
                        alt={`Slide ${currentSlide + 1}`}
                    />

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 mb-2 text-center p-6 bg-opacity-50 bg-black rounded max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl hidden sm:block">

                        <div className="mb-2">
                            <h1 className="text-lg sm:text-xl font-bold text-white mb-1">{data?.title}</h1>
                            <p className="text-sm sm:text-base text-white">{data?.description}</p>
                        </div>

                    </div>

                </div>
            ) : (
                <h2 className="text-lg sm:text-xl text-center">No images available</h2>
            )}

            <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            >
                Prev
            </button>
            <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            >
                Next
            </button>
        </div>
    )
}

export default Slider
