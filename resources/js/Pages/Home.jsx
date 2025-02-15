import React from "react";
import Navbar from "./Components/Navbar";
import { Link } from "@inertiajs/react";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";

export default function Home() {
    return (
        <div data-theme="light">
            <title>Home Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="bg-gradient-to-b from-blue-500 to-blue-800 pb-20">
                <ParticlesBackground />
                {/* Hero Screen */}
                <div className="relative min-h-screen hero flex z-10" style={{ backgroundImage: "url(https://static.jakmall.id/2019/06/images/products/group/banners/6ade0b/original/alat-tulis-kantor.jpg)",}}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="text-center hero-content text-white">
                        <div>
                            <h1 className="mb-5 text-5xl font-bold">Welcome to Toko Eni</h1>
                            <p className="max-w-md mb-3">
                                Temukan berbagai alat tulis kantor, perlengkapan sekolah, hingga bahan untuk membuat prakarya.
                                Dari pensil, bolpoin, penggaris, kertas warna, cat air, dan lain-lain.
                                Kami menyediakan semua kebutuhan kreatif dan produktif Anda!
                            </p>
                            <h3 className="mb-5 text-lg font-semibold">Belanja Sekarang dan Wujudkan Kreativitasmu!</h3>
                            <Link href="/shopTokoEni" className="btn glass">Shop Now</Link>
                        </div>
                    </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center mt-10 text-black relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>


                {/* Category */}
                <div className="category pb-40">
                    <h1 className="font-bold text-white justify-center text-2xl md:text-4xl r pt-5 flex relative z-10">Category</h1>
                    <div className="pt-8">
                        <div className="flex items-center justify-center">
                            <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg">

                            </div>
                        </div>
                    </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center mt-5 text-black relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>

                {/* Product */}
                <div className="product">
                    <h1 className="font-bold text-white justify-center text-2xl md:text-4xl pt-5 flex relative z-10">Product</h1>
                    <div className="pt-8">
                        <div className="flex items-center justify-center">
                            <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
