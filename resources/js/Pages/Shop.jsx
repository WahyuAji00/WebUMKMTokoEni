import React from "react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";

export default function Shop() {
    return (
        <div data-theme="light">
            <title>Shop</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="h-screen bg-gradient-to-b from-blue-500 to-blue-800">
                <ParticlesBackground />
                <div className="text-center text-white">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-20 md:pt-28 mb-5">Products</h1>
                    <p className="mb-3 font-bold">
                        Temukan berbagai Alat Tulis Kantor berkualitas untuk menunjang produktivitas Anda setiap hari!
                    </p>
                </div>
                <div className="flex items-center justify-center mt-14">
                    <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg">
                        {/* Dropdown Category */}
                        <div className="dropdown dropdown-right">
                            <div tabIndex={0} role="button" className="btn btn-neutral m-1">Category</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
                                <li><a>Pen</a></li>
                                <li><a>Pencil</a></li>
                                <li><a>Notebook</a></li>
                                <li><a>Eraser</a></li>
                                <li><a>Marker</a></li>
                                <li><a>Other</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
