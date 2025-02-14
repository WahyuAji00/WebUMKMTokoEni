import React from "react";

export default function  Login() {
    return (
        <div data-theme="light">
            <title>Login</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />

            <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url(https://www.mbizmarket.co.id/news/wp-content/uploads/2022/06/Untitled-design-2.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-lg backdrop-filter backdrop-blur-lg">
                    <div className="text-center font-bold text-2xl md:text-4xl mb-6">
                        <h1>Login</h1>
                    </div>
                    <form action="" className="space-y-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-lg font-medium">Name</label>
                            <input type="text" className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring=blue-600" placeholder="Enter Your Name" id="username" name="username" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-lg font-medium">Password</label>
                            <input type="password" className="mt-1 mb-7 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring=blue-600" placeholder="Enter Your Password" id="password" name="password" required />
                        </div>
                        <div className="form-control mb-3">
                            <label className="label cursor-pointer flex items-center">
                                <input type="checkbox" className="checkbox mr-2 w-4 h-4" />
                                <span className="label-text text-lg">Remember me</span>
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Sign In</button>
                        <div class="text-center mt-5">
                            <span>Don't have an account? </span><a href="/registerTokoEni" className="text-blue-700 underline">Register here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
