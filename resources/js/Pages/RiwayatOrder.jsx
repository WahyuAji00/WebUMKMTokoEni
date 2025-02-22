import React from "react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";

export default function RiwayatOrder() {
    return (
        <div data-theme="light">
            <title>Riwayat Order Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-purple-500 to-purple-800 pb-14">
                <ParticlesBackground />
                <div className="text-center text-white relative z-10">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-16 md:pt-20 mb-5">Riwayat Order</h1>
                </div>
            </div>

            <Footer />
        </div>
    )
}
