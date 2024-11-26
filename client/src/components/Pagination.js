import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

const Pagination = ({ products, page, setPage }) => {
    const totalPage = Math.ceil(products?.length / 10);

    const setPageAction = (select) => {
        if (select >= 1 && select <= totalPage && select !== page) {
            setPage(select);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const renderPageNumbers = () => {
        if (totalPage <= 3) {
            return [...Array(totalPage)].map((_, i) => (
                <button
                    key={i}
                    className={`p-2 font-bold rounded-full ${page === i + 1
                        ? "bg-darkcolor1 text-white"
                        : "bg-color1 text-black cursor-pointer"
                        }`}
                    onClick={() => setPageAction(i + 1)}
                >
                    {i + 1}
                </button>
            ));
        } else {
            const pageButtons = [];

            if (page > 0) {
                pageButtons.push(
                    <button
                        key={1}
                        className={`p-2 font-bold rounded-full ${page === 1 ? "bg-darkcolor1 text-white" : "bg-color1 text-black cursor-pointer"
                            }`}
                        onClick={() => setPageAction(1)}
                    >
                        1
                    </button>
                );
            }

            if (page > 2) {
                pageButtons.push(
                    <span key="left-ellipsis" className="p-2 text-gray-500">
                        ...
                    </span>
                );
            }

            const middlePages = [page - 1, page, page + 1].filter((p) => p > 1 && p < totalPage);

            middlePages.forEach((p) => {
                pageButtons.push(
                    <button
                        key={p}
                        className={`p-2 font-bold rounded-full ${page === p
                            ? "bg-darkcolor1 text-white"
                            : "bg-color1 text-black cursor-pointer"
                            }`}
                        onClick={() => setPageAction(p)}
                    >
                        {p}
                    </button>
                );
            });

            if (page < totalPage - 1) {
                pageButtons.push(
                    <span key="right-ellipsis" className="p-2 text-gray-500">
                        ...
                    </span>
                );
            }

            pageButtons.push(
                <button
                    key={totalPage}
                    className={`p-2 font-bold rounded-full ${page === totalPage
                        ? "bg-darkcolor1 text-white"
                        : "bg-color1 text-black cursor-pointer"
                        }`}
                    onClick={() => setPageAction(totalPage)}
                >
                    {totalPage}
                </button>
            );

            return pageButtons;
        }
    };

    return (
        <div>
            {products?.length > 0 && totalPage > 0 && (
                <div className="flex items-center justify-center space-x-2">
                    {/* Previous Button */}
                    <button
                        className={`p-2 font-bold rounded-full ${page <= 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-black cursor-pointer"
                            }`}
                        onClick={() => setPageAction(page - 1)}
                        disabled={page <= 1}
                    >
                        <FaArrowLeftLong />
                    </button>

                    {/* Page Numbers */}
                    {renderPageNumbers()}

                    {/* Next Button */}
                    <button
                        className={`p-2 font-bold rounded-full ${page >= totalPage
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-black cursor-pointer"
                            }`}
                        onClick={() => setPageAction(page + 1)}
                        disabled={page >= totalPage}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pagination;
