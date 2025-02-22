import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import { Link } from "@inertiajs/react";
import Footer from "./Components/Footer";
import { router } from "@inertiajs/react";

export default function DetailProduct({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [availableStock, setAvailableStock] = useState(product?.stock || 0);
    const [alert, setAlert] = useState(null);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if(!isNaN(value) && value >= 1 && value <= product.stock) {
            setQuantity(value);
            setAvailableStock(product.stock - value);
        }
    };

    const handleAddToCart = () => {
        router.post('/cartTokoEni',
            { product_id: product.id, quantity: quantity }, {
                onSuccess: () => {
                    setAlert({ type: "success", message: "Produk berhasil ditambahkan ke keranjang!" });
                    setTimeout(() => setAlert(null), 3000);
                }, onError: () => {
                    setAlert({ type: "error", message: "Gagal menambahkan produk ke keranjang!" });
                    setTimeout(() => setAlert(null), 3000);
                }
            });
    };


    return (
        <div data-theme="light">
            <title>Detail Produk</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-800 pb-10">
                <ParticlesBackground />
                <div className="flex items-center justify-center pt-24">
                    <div className="p-8 rounded-3xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg border-4 border-white">
                        {/* Alert Notification */}
                        {alert && (
                            <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"} shadow-xl mb-4`}>
                                <div className="font-bold text-white">
                                    <span>{alert.message}</span>
                                </div>
                            </div>
                        )}

                        {/* Breadcrumb */}
                        <div className="text-white text-sm md:text-base mb-14">
                            <Link href="/shopTokoEni" className="hover:underline font-bold">Shop</Link> &gt;
                            <span className="ml-1 text-gray-300">{product?.name || "Product Detail"}</span>
                        </div>
                        {/* Product Detail */}
                        <div className="flex flex-col md:flex-row gap-6 mb-5">
                            <div className="flex-1">
                                <img src={`/storage/${product.image}`} alt={product.name} className="w-48 md:w-96 mx-auto rounded-xl shadow-lg" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-white md:text-3xl ">{product.name}</h1>
                                <hr className="my-4 border-black border-b-4" />
                                <h3 className="text-lg md:text-xl font-bold text-white">IDR {product.price.toLocaleString("id-ID", { minimumFractionDigits: 3 })}</h3>
                                {/* Quantity Selector */}
                                <div className="mt-4 flex items-center gap-4">
                                    <h5 className="text-lg font-bold text-white">Qty:</h5>
                                    <input type="number" value={quantity} min="1" max={product.stock} onChange={handleQuantityChange} className="w-20 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring=blue-600"/>
                                </div>
                                {/* Add to Cart Button */}
                                <div className="mt-6">
                                    <button className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-900" onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>
                                </div>

                                <hr className="my-4 border-black border-b-4" />
                                <div className="text-white">
                                    <strong>Description:</strong>
                                    <p className="mt-2 leading-relaxed">{product.description}</p>
                                </div>
                                <p className="text-white mt-2"><strong>Stock:</strong> {availableStock}</p>
                                <p className="text-white mt-2"><strong>Type:</strong> {product.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
