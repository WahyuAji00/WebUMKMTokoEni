import React from "react";
import Navbar from "../Components/Navbar";
import ParticlesBackground from "../Components/ParticlesBackground";

export default function Profile() {
    return (
        <div data-theme="light">
            <title>Profile</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="h-screen bg-gradient-to-b from-blue-500 to-blue-800">
                <ParticlesBackground />
                <div className="text-center text-white">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-16 md:pt-20 mb-5">Profile</h1>
                    <p className="max-w-xs md:max-w-xl mx-auto mb-3 font-bold">
                        Menemani setiap langkah bisnis dan kreativitas Anda dengan Alat Tulis Kantor yang lengkap dan inovatif.
                    </p>
                </div>
                <div className="flex justify-center items-center mt-14">
                    <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg">

                    </div>
                </div>
            </div>
        </div>
    )
}
