import React, { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmed_password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmed_password) {
            setError('Password and Confirm Password must be the same');
            return;
        }
        setError("");
        alert("Register Success!");
    };

    return (
        <div data-theme="light">
            <title>Register</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />

            <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url(https://www.mbizmarket.co.id/news/wp-content/uploads/2022/06/Untitled-design-2.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-lg backdrop-filter backdrop-blur-2xl">
                    <div className="text-center font-bold text-2xl md:text-4xl mb-6">
                        <h2>Register</h2>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <form onSubmit={handleSubmit} action="" className="space-y-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-lg font-medium">Name</label>
                            <input type="text" value={form.name} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-600" placeholder="Enter Your Name" id="username" name="username" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-lg font-medium">Email</label>
                            <input type="email" value={form.email} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-600" placeholder="Enter Your Email Address" id="email" name="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-lg font-medium">Password</label>
                            <input type="password" value={form.password} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-600" placeholder="Enter Your Password" id="password" name="password" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-lg font-medium">Confirm Password</label>
                            <input type="password" value={form.confirmed_password} onChange={handleChange} className="mt-1 mb-7 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-600" placeholder="Enter Your Confirmed Password" id="confirmed_password" name="confirmed_password" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Sign Up</button>
                        <div className="text-center mt-5">
                            <span>Already have an account? </span><a href="/loginTokoEni" className="text-blue-700 underline">Login here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
