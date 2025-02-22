import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Navbar() {
    const { auth, carts= [] } = usePage().props;

    const [cartData, setCartData] = useState({
        totalItems: 0,
        subtotal: 0,
    });

    useEffect(() => {
        if (Array.isArray(carts)) {
            const totalItems = carts.reduce((sum, item) => sum + (item.quantity || 0), 0);
            const subtotal = carts.reduce((sum, item) => sum + (item.quantity || 0) * (parseFloat(item.price) || 0), 0);
            setCartData({ totalItems, subtotal });
        } else {
            setCartData({ totalItems: 0, subtotal: 0 });
        }
    }, [carts]);

    const handleLogout = (event) => {
        event.preventDefault();
        Inertia.post("/logoutTokoEni");
    };

    return (
        <nav className="fixed navbar z-50 backdrop-filter backdrop-blur-xl">
            <div className="navbar-start">
                {/* Dropdown Navbar */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-64 p-2 absolute shadow">
                        {/* Home in Dropdown */}
                        <li className="text-base">
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                Home
                            </Link>
                        </li>

                        {/* Shop in Dropdown */}
                        <li className="text-base">
                            <Link href="/shopTokoEni" className="{btn ${auth.customer ? 'disabled' : ''}}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                Shop
                            </Link>
                        </li>

                        {/* About in Dropdown */}
                        <li className="text-base">
                            <Link href="/aboutTokoEni" className="{btn ${auth.customer ? '' : 'disabled'}}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link href="/" className="text-2xl font-bold text-white ml-3">Toko Eni</Link>
            </div>
            <div className="navbar-end">
                {/* Dropdown Cart */}
                <div className="mr-3 dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="text-white indicator">
                            {cartData.totalItems > 0 && (
                                <span className="badge">{cartData.totalItems}</span>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                    <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">{cartData.totalItems} Products</span>
                            {/* <span className="text-info">Subtotal: Rp. {cartData.subtotal > 0 ? cartData.subtotal.toLocaleString("id-ID") + ",00" : "NaN,00"}</span>  */}
                            <div className="card-actions">
                                <Link href="/cartTokoEni" className="btn btn-primary btn-block">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dropdown Profile User */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Profile User" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {/* Profile in Dropdown */}
                        <li className="text-base">
                            <Link href="/profileCustomer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Profile
                            </Link>
                        </li>

                        {/* Login and Logout in Dropdown */}
                        {!auth.customer ? (
                        <li className="text-blue-700">
                            <Link href="/loginTokoEni">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                </svg>
                                Login
                            </Link>
                        </li>
                        ) : (
                        <li className="text-red-700">
                            <Link href="/logoutTokoEni" onClick={handleLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                Logout
                            </Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
