import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import ParticlesBackground from "../Components/ParticlesBackground";

export default function Profile({ customer }) {
    const getOrDefault = (value, message) => {
        return value ? value : message;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: customer?.name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
        address: customer?.address || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            if (!/[^0-9]/.test(value)) {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/profileCustomer", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedCustomer = await response.json();
            console.log("Profile updated successfully", updatedCustomer);

            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div data-theme="light">
            <title>Profile</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 pb-5">
                <ParticlesBackground />
                <div className="text-center text-white relative z-10">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-16 md:pt-20 mb-5">Profile</h1>
                    <p className="max-w-xs md:max-w-xl mx-auto mb-3 font-bold">
                        Menemani setiap langkah bisnis dan kreativitas Anda dengan Alat Tulis Kantor yang lengkap dan inovatif.
                    </p>
                </div>
                <div className="flex justify-center mt-8">
                    <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg border-4 border-white flex flex-col justify-center items-center">
                        <div className="w-32 md:w-52 flex justify-center items-center">
                            <img
                                alt="Profile User"
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                        <div className="text-white text-center mt-10 mb-2">
                            <h2 className="text-xl font-bold">{customer?.name || "Nama tidak tersedia"}</h2>
                            <p className="text-sm pt-3">{customer?.email || "Email tidak tersedia"}</p>
                            <p className="text-sm pt-3">{getOrDefault(customer.phone, "Lengkapi data dengan memasukkan No. Phone")}</p>
                            <p className="text-sm pt-3">{getOrDefault(customer.address, "Lengkapi data dengan memasukkan Alamat")}</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-primary m-1 w-full text-lg font-bold py-3 mt-5 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Edit Profile */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal modal-open">
                        <div className="modal-box w-11/12 max-w-2xl">
                            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input input-bordered" />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input input-bordered" />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Phone</span>
                                    </label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="input input-bordered" placeholder="Masukkan Nomor Handphone" maxLength={15} />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <textarea name="address" value={formData.address} onChange={handleInputChange} className="input input-bordered" placeholder="Masukkan Alamat" />
                                </div>

                                <div className="modal-action">
                                    <button type="button" className="btn btn-error" onClick={() => setIsModalOpen(false)} >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
