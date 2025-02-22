import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return(
        <div>
            <footer className="footer footer-center bg-base-200 text-base-content rounded p-10 relative">
                <nav className="grid grid-flow-col gap-4">
                    <Link href="/aboutTokoEni">
                        About us
                    </Link>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/shopTokoEni">
                        Shop
                    </Link>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Toko Eni</p>
                </aside>
            </footer>
        </div>
    )
}
