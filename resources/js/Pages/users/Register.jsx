import { useForm } from "@inertiajs/react";
import React from "react";

export default function Register() {
    const {data, setData,   post, processing, errors} = useForm ({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post('/registerTokoEni');
    }

    return (
        <div data-theme="light">
            <title>Register Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />

            <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url(https://www.mbizmarket.co.id/news/wp-content/uploads/2022/06/Untitled-design-2.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-lg backdrop-filter backdrop-blur-2xl">
                    <div className="text-center font-bold text-2xl md:text-4xl mb-6">
                        <h2>Register</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-lg font-medium">Name</label>
                            <input type="text" className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-600" placeholder="Enter Your Name" id="username" name="username" value={data.name} onChange={(event) => setData("name", event.target.value)} required />
                            {errors.name && <div className="text-white">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-lg font-medium">Email</label>
                            <input type="email" className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-600" placeholder="Enter Your Email Address" id="email" name="email" value={data.email} onChange={(event) => setData("email", event.target.value)} required />
                            {errors.email && <div className="text-white">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-lg font-medium">Password</label>
                            <input type="password" className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-600" placeholder="Enter Your Password" id="password" name="password" value={data.password} onChange={(event) => setData("password", event.target.value)} required />
                            {errors.password && <div className="text-white">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="block text-lg font-medium">Confirm Password</label>
                            <input type="password" className="mt-1 mb-7 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-600" placeholder="Enter Your Confirmed Password" id="password_confirmation" name="password_confirmation" value={data.password_confirmation} onChange={(event) => setData("password_confirmation", event.target.value)} required />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">{processing ? "Registering..." : "Sign Up"}</button>
                        <div className="text-center mt-5">
                            <span>Already have an account? </span><a href="/loginTokoEni" className="text-blue-700 underline">Login here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
