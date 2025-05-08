import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { Link } from "@inertiajs/react";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";

export default function Home() {
    // Menyimpan data dari API
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);

    // Mengambil data dari API Laravel saat pertama kali komponen dimuat
    useEffect(() => {
        // Ambil data product dari API
        fetch("http://127.0.0.1:8000/api/products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });

        // Ambil data type dari API
        fetch("http://127.0.0.1:8000/api/types")
            .then(response => response.json())
            .then(data => {
                setTypes(data);
            })
            .catch(error => {
                console.error("Error fetching types:", error);
            });
    }, []);

    return (
        <div data-theme="light">
            <title>Home Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="bg-gradient-to-b from-blue-500 to-blue-800 pb-20">
                <ParticlesBackground />
                <div className="relative min-h-screen hero flex z-10" style={{ backgroundImage: "url(https://static.jakmall.id/2019/06/images/products/group/banners/6ade0b/original/alat-tulis-kantor.jpg)" }}>
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

                <div className="category pb-40">
                    <h1 className="font-bold text-white justify-center text-2xl md:text-4xl pt-28 flex relative z-10">Type List</h1>
                    <div className="pt-8">
                        <div className="flex items-center justify-center">
                            <div className="p-2 rounded-3xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg border-4 border-white">
                                {types.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4">
                                        {types.map((type, index) => (
                                            <div key={index} className="bg-gray-200 text-center py-3 rounded-xl shadow-md">
                                                <span className="block truncate max-w-full text-ellipsis whitespace-nowrap font-bold text-black">
                                                    {type}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-white text-2xl pt-10 pb-10 font-bold">No types available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product">
                    <h1 className="font-bold text-white justify-center text-2xl md:text-4xl pt-5 flex relative z-10">Our Product</h1>
                    <div className="pt-8">
                        <div className="flex items-center justify-center">
                            <div className="p-2 rounded-3xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg border-4 border-white">
                                {products.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4">
                                        {products.map((product, index) => (
                                            <div key={index}>
                                                <Link href={`/shopTokoEni/detailProduct/${encodeURIComponent(product.name)}`} className="mx-auto">
                                                    <img src={`http://127.0.0.1:8000/storage/${product.image}`} alt={product.name} className="rounded-t-xl w-full h-auto" />
                                                </Link>
                                                <div className="px-2 rounded-b-xl bg-gray-200 text-center py-3">
                                                    <Link href={`/shoptokoEni/detailProduct/${encodeURIComponent(product.name)}`} className="text-black text-sm font-bold no-underline block">
                                                        <span className="block truncate max-w-full text-ellipsis whitespace-nowrap">{product.name}</span>
                                                    </Link>
                                                    <h6 className="text-orange-500 text-xs font-semibold">
                                                        IDR {new Intl.NumberFormat("id-ID").format(product.price)}
                                                    </h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-white text-2xl pt-10 pb-6 font-bold">No products available</p>
                                )}
                                <div className="flex justify-center pt-4">
                                    <Link href="/shopTokoEni">
                                        <button className="btn font-bold btn-neutral text-white px-4 py-2 rounded-md mb-6">
                                            Show More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
