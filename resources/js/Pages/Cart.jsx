import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Cart() {
    const { carts } = usePage().props;
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (carts.length > 0) {
            setCartItems(carts);
            setSelectedItems(carts.filter(item => item.is_checked).map(item => item.id)); // Load checked items
        }
    }, [carts]);

    const handleCheckboxChange = async (id) => {
        const newCheckedState = !selectedItems.includes(id);

        if (!newCheckedState && selectedItems.length === 1) {
            setSelectedItems([]);
        } else if (newCheckedState && selectedItems.length === 0) {
            setSelectedItems([id]);
        } else {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
            return;
        }

        try {
            const response = await fetch(`/cartTokoEni/updateChecked/${id}`, { // <-- Pastikan id masuk ke URL
                method: "PATCH",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_checked: newCheckedState ? 1 : 0 }),
            });

            if (!response.ok) {
                throw new Error("Failed to update checked status");
            }

            const data = await response.json();
            console.log("Update success:", data);
        } catch (error) {
            console.error("Error updating checked status:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems
            .filter(item => selectedItems.includes(item.id))
            .reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const updateCartItemQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
            const response = await fetch(`/cartTokoEni/update/${id}`, {
                method: "PUT",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (!response.ok) {
                throw new Error("Failed to update quantity");
            }

            const updatedItem = await response.json();

            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: updatedItem.cart.quantity } : item
            ));
        } catch (error) {
            console.error("Error updating item quantity:", error.message);
        }
    };

    const handleRemoveFromCart = async (id) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
            const response = await fetch(`/cartTokoEni/remove/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (!response.ok) {
                throw new Error("Gagal menghapus item dari cart");
            }

            // Hapus item dari state lokal
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            setSelectedItems(prevSelected => prevSelected.filter(selectedId => selectedId !== id));
        } catch (error) {
            console.error("Error deleting cart item:", error.message);
        }
    };

    return (
        <div data-theme="light">
            <title>Cart Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-800 pb-10">
                <ParticlesBackground />
                <div className="text-center text-white">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-16 md:pt-20 mb-5">Cart</h1>
                </div>
                <div className="flex justify-center items-center mt-10">
                    <div className="p-4 md:p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl border-4 border-white backdrop-filter backdrop-blur-lg">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-white font-bold text-lg py-10">
                                Anda tidak memiliki produk dalam Cart
                            </div>
                        ) : (
                            <div className="max-h-screen overflow-y-auto">
                                <table className="table w-full text-white">
                                    <thead>
                                        <tr className="text-white text-base md:text-lg">
                                            <th>Item</th>
                                            <th>No</th>
                                            <th>Product</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-info"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td className="p-2 md:p-3 flex items-center text-white">
                                                    <button className="px-2 py-1 rounded-l btn btn-neutral" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                                                        -
                                                    </button>
                                                    <span className="px-3">{item.quantity}</span>
                                                    <button className="px-2 py-1 rounded-r btn btn-primary" onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                                                        +
                                                    </button>
                                                </td>
                                                <td>IDR {item.price.toLocaleString("id-ID")}</td>
                                                <td>IDR {(item.price * item.quantity).toLocaleString("id-ID")}</td>
                                                <td className="p-2 md:p-3">
                                                    <button onClick={() => handleRemoveFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-red-700 transition">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="sticky bottom-0 w-full bg-green-800 p-4 text-white text-right shadow-xl">
                                    <p className="font-bold">
                                        Total Harga: Rp. {calculateTotal().toLocaleString("id-ID")},00
                                    </p>
                                    <Link href={`/orderTokoEni?selected=${selectedItems[0]}`}>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-3 font-bold"
                                            disabled={selectedItems.length !== 1}
                                        >
                                            Checkout ({selectedItems.length} Produk)
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="text-lg font-bold text-red-600">Hanya boleh memilih satu produk untuk checkout!</p>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setShowAlert(false)}>Tutup</button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
