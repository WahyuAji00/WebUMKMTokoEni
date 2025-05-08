import React, { useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";

export default function Order() {
    const { customer, cart = [] } = usePage().props; // Ambil data customer dan cart dari props
    const checkedCart = cart.filter(item => item.is_checked); // Menyaring hanya item yang di centang
    const total_price = checkedCart.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0), 0); // Menjumlah total item yang dicentang

    const { data, setData, post, processing } = useForm({
        name: customer?.name || "",
        phone: customer?.phone || "",
        address: customer?.address || "",
        payment_method: "",
        checked_items: checkedCart.map(item => item.id),
        payment_proof: null,
        total_price: total_price,
    });

    useEffect(() => {
        setData("name", customer?.name || "");
        setData("phone", customer?.phone || "");
        setData("address", customer?.address || "");
        setData("total_price", total_price);
    }, [customer, total_price]);

    useEffect(() => {
        return () => {
            fetch("/resetCheckedStatus", {
                method: "PATCH",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                    "Content-Type": "application/json",
                },
            }).catch((error) => console.error("Error resetting checked status:", error));
        };
    }, []);

    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/orderTokoEni", {
            onSuccess: () => {
                fetch("/resetCheckedStatus", {
                    method: "PATCH",
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                        "Content-Type": "application/json",
                    },
                }).then(() => {
                    alert("Order sudah dibuat!");
                    window.location.href = "/";
                });
            },
        });
    };

    return (
        <div data-theme="light">
            <title>Order Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-yellow-800 pb-14">
                <ParticlesBackground />
                <div className="text-center text-white relative z-10">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-16 md:pt-20 mb-5">Order</h1>
                </div>
                <div className="flex justify-center items-center mt-14">
                    <div className="p-4 md:p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg border-4 border-white">
                        <h2 className="text-white text-lg md:text-3xl font-semibold mb-4 underline">Customer Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-white text-sm font-bold mb-2">Customer Name</label>
                                <input type="text" name="name" className="input input-bordered w-full" value={data.name} readOnly />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-bold mb-2">Phone Number</label>
                                <input type="text" name="phone" className="input input-bordered w-full" maxLength={12} value={data.phone} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-bold mb-2">Address</label>
                                <textarea name="address" className="textarea textarea-bordered w-full" value={data.address} onChange={handleInputChange} required />
                            </div>
                            <h2 className="text-white text-lg md:text-3xl font-semibold pt-6 underline">Order Details</h2>
                            {checkedCart.length > 0 ? (
                                checkedCart.map((item) => (
                                    <div key={item.id} className="space-y-2 border-b pb-4 mb-4 border-white">
                                        <div>
                                            <label className="block text-white text-sm font-bold mb-2">Product Name</label>
                                            <input type="text" className="input input-bordered w-full" value={item.product?.name || "Unknown Product"} readOnly />
                                        </div>
                                        <div>
                                            <label className="block text-white text-sm font-bold mb-2">Quantity</label>
                                            <input type="number" className="input input-bordered w-full" value={item.quantity || 0} readOnly />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white text-center">Tidak ada item yang dipilih.</p>
                            )}
                            <div>
                                <label className="block text-white text-sm font-bold mb-2">Total Price</label>
                                <input type="text" className="input input-bordered w-full" value={`Rp ${total_price}`} readOnly />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-bold mb-2">Payment Method</label>
                                <select name="payment_method" className="select select-bordered w-full" value={data.payment_method} onChange={handleInputChange} required>
                                    <option value="">Pilih Metode Pembayaran</option>
                                    <option value="QRIS">QRIS</option>
                                    <option value="Pickup">Pickup</option>
                                </select>
                            </div>
                            {data.payment_method === "QRIS" && (
                                <div className="text-center">
                                    <label className="block text-white text-sm font-bold pb-4">Scan QR untuk Pembayaran</label>
                                    <img src="/images/QRISTokoEni.jpg" alt="QR Code" className="w-40 md:w-60 mx-auto mb-2" />
                                    <p className="text-white text-sm pb-5 pt-3">Silakan scan kode QR di atas untuk melakukan pembayaran.</p>
                                    <input
                                        type="file"
                                        name="payment_proof"
                                        className="file-input w-full"
                                        onChange={(e) => setData("payment_proof", e.target.files[0])}
                                    />
                                </div>
                            )}
                            <div className="flex justify-end">
                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    {processing ? "Processing..." : "Submit Order"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
