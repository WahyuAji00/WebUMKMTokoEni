import { useForm } from "@inertiajs/react";
import React from "react";

export default function  Login() {
    const {data, setData, post, processing, errors} = useForm ({
        email: "",
        password: "",
        remember: false,
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        post('/loginTokoEni')
    }

    return (
        <div data-theme="light">
            <title>Login Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />

            <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url(https://www.mbizmarket.co.id/news/wp-content/uploads/2022/06/Untitled-design-2.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-lg backdrop-filter backdrop-blur-lg">
                    <div className="text-center font-bold text-2xl md:text-4xl mb-6">
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-lg font-medium">Email</label>
                            <input type="email" className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring=blue-600" placeholder="Enter Your Email" id="email" name="email" value={data.email} onChange={(event) => setData('email', event.target.value)} required />
                            {errors.email && <div className="text-white">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-lg font-medium">Password</label>
                            <input type="password" className="mt-1 mb-7 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring=blue-600" placeholder="Enter Your Password" id="password" name="password" value={data.password} onChange={(event) => setData('password', event.target.value)} required />
                        </div>
                        <div className="form-control mb-3">
                            <label className="label cursor-pointer flex items-center">
                                <input type="checkbox" className="checkbox mr-2 w-4 h-4" name="remember" id="remember" checked={data.remember} onChange={(event) => setData('remember', event.target.checked)} />
                                <span className="label-text text-lg">Remember me</span>
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">{processing ? 'Logging In...' : 'Login'}</button>
                        <div className="text-center mt-5">
                            <span>Don't have an account? </span><a href="/registerTokoEni" className="text-blue-700 underline">Register here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
