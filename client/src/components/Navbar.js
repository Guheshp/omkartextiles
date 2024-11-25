import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
const Navbar = () => {
    return (
        <div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left px-4 sm:px-6 lg:px-10 py-2 bg-color1">

                <div className="hidden md:flex flex-col md:flex-row gap-1 md:gap-1 items-center text-center md:text-left">

                    <p className="text-xs sm:text-sm md:text-base flex items-center gap-1">
                        <MdEmail className="text-sm sm:text-base" />
                        <span className="text-sm">Email:</span>
                        <span className="text-gray-600 text-sm">guheshpanlagall@gmail.com | </span>
                    </p>

                    <p className="text-xs sm:text-sm md:text-base flex items-center gap-1">
                        <IoCall className="text-sm sm:text-base" />
                        <span className="text-sm">Phone:</span>
                        <span className="text-gray-600 text-sm">8867050481 | </span>
                    </p>

                    <p className="text-xs sm:text-sm md:text-base flex items-center gap-1">
                        <FaLocationDot className="text-sm sm:text-base" />
                        <span className="text-sm">Location:</span>
                        <span className="text-gray-600 text-sm">Talokot</span>
                    </p>
                </div>

                <div className="flex justify-center md:justify-end space-x-4">
                    <Link
                        to="https://www.instagram.com/weddingcluster_official/"
                        target="_blank"
                        aria-label="Instagram"
                    >
                        <FaInstagram className="text-pink-600 hover:text-pink-700 text-lg sm:text-xl md:text-2xl" />
                    </Link>
                    <Link
                        to="https://www.facebook.com/weddingcluster/"
                        target="_blank"
                        aria-label="Facebook"
                    >
                        <FaFacebook className="text-blue-800 hover:text-blue-900 text-lg sm:text-xl md:text-2xl" />
                    </Link>
                    <Link
                        to="https://www.linkedin.com/in/wedding-cluster-a9673a2b9/"
                        target="_blank"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="text-blue-600 hover:text-blue-700 text-lg sm:text-xl md:text-2xl" />
                    </Link>
                    <Link
                        to="https://www.youtube.com/@weddingcluster1"
                        target="_blank"
                        aria-label="YouTube"
                    >
                        <FaYoutube className="text-red-600 hover:text-red-700 text-lg sm:text-xl md:text-2xl" />
                    </Link>
                </div>
            </div>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none gap-3">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Navbar