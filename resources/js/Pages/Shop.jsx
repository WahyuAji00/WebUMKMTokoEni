import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";
import { Link } from "@inertiajs/react";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(18);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("All");
    const [sortOrder, setSortOrder] = useState("Reset");
    const [filterLoading, setFilterLoading] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const showMoreProducts = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount(prevCount => prevCount + 6);
            setLoading(false);
        }, 1500);
    };

    const handleTypeChange = (type) => {
        setFilterLoading(true);
        setSelectedType(type);
        setTimeout(() => {
            setFilterLoading(false);
        }, 1500);
    };

    const handleSortChange = (order) => {
        setFilterLoading(true);
        setSortOrder(order);
        setTimeout(() => {
            setFilterLoading(false);
        }, 1500);
    };

    const filteredProducts = products
        .filter(product => selectedType === "All" || product.type === selectedType)
        .sort((a, b) => {
            if (sortOrder === "A-Z") {
                return a.name.localeCompare(b.name);
            } else if (sortOrder === "Z-A") {
                return b.name.localeCompare(a.name);
            } else {
                return 0;
            }
        });

    return (
        <div data-theme="light">
            <title>Shop Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 pb-14">
                <ParticlesBackground />
                <div className="text-center text-white relative z-10">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-16 md:pt-20 mb-5">Products</h1>
                    <p className="max-w-xs md:max-w-sm mx-auto mb-3 font-bold">
                        Temukan berbagai Alat Tulis Kantor berkualitas
                        untuk menunjang produktivitas Anda setiap hari!
                    </p>
                </div>
                <div className="flex items-center justify-center mt-14">
                    <div className="p-2 rounded-3xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg border-4 border-white">
                        <div className="flex justify-between w-full p-4">
                            {/* Dropdown Category */}
                            <div className="dropdown dropdown-bottom">
                                <div tabIndex={0} role="button" className="btn btn-neutral m-1">Type</div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
                                    <li><a onClick={() => handleTypeChange("All")}>All</a></li>
                                    <li><a onClick={() => handleTypeChange("Pen")}>Pen</a></li>
                                    <li><a onClick={() => handleTypeChange("Pencil")}>Pencil</a></li>
                                    <li><a onClick={() => handleTypeChange("Notebook")}>Notebook</a></li>
                                    <li><a onClick={() => handleTypeChange("Eraser")}>Eraser</a></li>
                                    <li><a onClick={() => handleTypeChange("Marker")}>Marker</a></li>
                                    <li><a onClick={() => handleTypeChange("Other")}>Other</a></li>
                                </ul>
                            </div>
                            {/* Dropdown Filter */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-neutral m-1">Filter</div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
                                    <li><a onClick={() => handleSortChange("A-Z")}>A-Z</a></li>
                                    <li><a onClick={() => handleSortChange("Z-A")}>Z-A</a></li>
                                    <li><a onClick={() => handleSortChange("Reset")}>Reset</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Product Content */}
                        {filterLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <span className="loading loading-dots loading-lg text-white"></span>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-white text-lg font-bold">Product Not Found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4">
                                {filteredProducts.slice(0, visibleCount).map((product, index) => (
                                    <div key={index} className="rounded-xl shadow-md bg-white">
                                        <Link href={`/shopTokoEni/detailProduct/${product.name}`} className="block">
                                            <img src={`http://127.0.0.1:8000/storage/${product.image}`} alt={product.name} className="rounded-t-xl w-full h-auto" />
                                        </Link>
                                        <div className="px-2 rounded-b-xl bg-gray-200 text-center py-3">
                                            <Link href={`/shopTokoEni/detailProduct/${product.name}`} className="text-black text-sm font-bold block truncate">
                                                {product.name}
                                            </Link>
                                            <h6 className="text-orange-500 text-xs font-semibold">
                                                IDR {new Intl.NumberFormat("id-ID").format(product.price)}
                                            </h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {visibleCount < filteredProducts.length && (
                            <div className="flex justify-center pt-8">
                                {loading ? (
                                    <span className="loading loading-dots loading-lg text-white mb-6"></span>
                                ) : (
                                    <button onClick={showMoreProducts} className="btn font-bold btn-neutral text-white px-4 py-2 rounded-md mb-6">
                                        Show More
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
