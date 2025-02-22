import React from "react";
import Navbar from "./Components/Navbar";
import ParticlesBackground from "./Components/ParticlesBackground";
import Footer from "./Components/Footer";

export default function About() {
    return (
        <div data-theme="light">
            <title>About Toko Eni</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />

            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-purple-500 to-purple-800">
                <ParticlesBackground />
                <div className="text-center text-white relative z-10">
                    <h1 className="font-extrabold text-2xl md:text-4xl pt-16 md:pt-20 mb-5">About</h1>
                </div>
                <div className="flex justify-center items-center mt-14">
                    <div className="p-4 md:p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-7xl backdrop-filter backdrop-blur-lg border-4 border-white">
                        <div className="text-white text-center">
                            <h1 className="font-bold text-xl md:text-3xl">Welcome to Toko Eni</h1>
                            <p className="pt-2">
                                Kami menghadirkan Alat Tulis Kantor berkualitas untuk menunjang produktivitas dan kreativitas Anda setiap hari.
                                <p className="pt-4 font-bold text-xl">Latar Belakang dari Toko Eni:</p>
                                <p>
                                    Tujuan awal mendirikan Toko Eni adalah sebagai wujud komitmen kami untuk berwirausaha, adapun usaha kami berdagang dibidang alat tulis, kantor, perlengkapan prakarya, kelengkapan pramuka dan accesories pernak pernik seperti berbagai macam paperbag, dll.
                                    Mengapa kita berwirausaha dibidang alat tulis kantor dikarenakan kondisi disekitaran Beringin, Ngaliyan adalah lingkungan yg padat akan penduduk, banyak tempat pendidikan dan tidak jauh dr kawasan industri.
                                    Awal kami mulai usaha sejak tahun 2014.
                                </p>
                                <p className="pt-4 font-bold text-xl">Lokasi kami berada di:</p>
                                <p>Jalan Beringin Raya B1/E, Bringin, Ngaliyan, Tambakaji, Kec. Ngaliyan, Kota Semarang, Jawa Tengah 50189</p>
                                <p className="pt-4 font-bold text-xl">Hubungi kami jika butuh info lebih lanjut</p>
                                <p>No. WhatsApp: 081215255240</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
