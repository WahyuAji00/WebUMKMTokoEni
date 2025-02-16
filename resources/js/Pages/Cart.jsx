import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div data-theme="light">
            <title>Cart Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="h-screen bg-gradient-to-b from-green-500 to-green-800">
                <ParticlesBackground />
                <div className="text-center text-white">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-16 md:pt-20 mb-5">Cart</h1>
                    <p className="max-w-xs md:max-w-sm mx-auto mb-3 font-bold">
                        Nikmati belanja Alat Tulis Kantor dengan mudah. Tinjau kembali pesanan Anda sebelum checkout!
                    </p>
                </div>
                <div className="flex justify-center items-center mt-14">
                    <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg border-4 border-white">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-white font-bold text-lg py-10">
                                Anda tidak memiliki produk yang disimpan dalam Cart
                            </div>
                        ) : (
                            <table className="table w-full text-white">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Produk</th>
                                        <th>Qty</th>
                                        <th>Harga</th>
                                        <th>Total</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>IDR {item.price.toLocaleString()}</td>
                                            <td>IDR {(item.price * item.quantity).toLocaleString()}</td>
                                            <td>
                                                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition">
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
