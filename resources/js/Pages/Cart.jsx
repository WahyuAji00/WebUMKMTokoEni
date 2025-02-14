import React from "react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";

export default function Cart() {
    return (
        <div data-theme="light">
            <title>Cart</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="h-screen bg-gradient-to-b from-green-500 to-green-800">
                <ParticlesBackground />
                <div className="text-center text-white">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-20 md:pt-28 mb-5">Cart</h1>
                    <p className="mb-3 font-bold">
                        Nikmati belanja Alat Tulis Kantor dengan mudah. Tinjau kembali pesanan Anda sebelum checkout!
                    </p>
                </div>
                <div className="flex justify-center items-center mt-14">
                    <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg">

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
