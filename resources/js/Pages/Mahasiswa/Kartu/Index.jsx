import MahasiswaLayout from "@/Layouts/MahasiswaLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function Index({ auth, user, profile }) {
    return (
        <MahasiswaLayout user={auth.user} header={"Kartu Pendaftaran"}>
            <Head title="Kartu Pendaftaran" />
            <ToastContainer />
            <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl relative bg-white">
                {/* Latar Belakang Gradien */}
                <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-br from-blue-600 via-transparent to-orange-400 opacity-70 transform -skew-x-12 origin-top-right"></div>
                <div className="absolute top-0 left-0 h-1/2 w-1/3 bg-gradient-to-bl from-blue-600 via-transparent to-orange-400 opacity-70 transform skew-x-12 origin-bottom-left"></div>

                <div className="relative p-6 z-10">
                    {/* Header */}
                    <div className="flex items-start">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="https://staialhikmahpariangan.ac.id/images/logo.png"
                                alt="Logo STAI Al-Hikmah"
                                className="w-24 h-24 object-contain"
                            />
                        </div>
                        {/* Teks Header */}
                        <div className="ml-6 mt-2">
                            <h1 className="text-xl font-bold text-gray-800">
                                STAI Al-Hikmah Pariangan
                            </h1>
                            <h2 className="text-xl font-bold text-gray-800">
                                Batusangkar
                            </h2>
                            <p className="text-sm italic text-blue-600 mt-1">
                                "Lembaga pendidikan tinggi Islam yang
                                berkomitmen mencetak generasi unggul"
                            </p>
                            <div className="text-xs text-gray-600 mt-2">
                                <div className="grid grid-cols-1 gap-x-2">
                                    <p className="flex">
                                        <span className="w-16">Email</span>
                                        <span className="font-semibold">
                                            : info@staialhikmahpariangan.ac.id
                                        </span>
                                    </p>
                                    <p className="flex">
                                        <span className="w-16">Web</span>
                                        <span className="font-semibold">
                                            : staialhikmahpariangan.ac.id
                                        </span>
                                    </p>
                                    <p className="flex">
                                        <span className="w-16">No HP</span>
                                        <span className="font-semibold">
                                            : +6285379388533
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-t border-gray-300" />

                    {/* Body */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Kolom Kiri - Foto */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="w-48 h-64 border-2 border-blue-500 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">
                                    <img
                                        src={`/storage/${profile.pas_foto}` || "https://via.placeholder.com/150"}
                                        alt="Foto Mahasiswa"
                                        className="w-[185px] h-[250px] object-cover"
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Kolom Kanan - Data Mahasiswa */}
                        <div className="md:col-span-2 space-y-2 text-sm mt-4 md:mt-0">
                            <div className="flex">
                                <span className="text-orange-500 font-semibold w-40">
                                    Nomor Registrasi
                                </span>
                                <span className="mr-2">:</span>
                                <span className="text-gray-800 font-semibold">{profile.nomor_pendaftaran}</span>
                            </div>
                            <div className="flex">
                                <span className="text-orange-500 font-semibold w-40">
                                    Fakultas
                                </span>
                                <span className="mr-2">:</span>
                                <span className="text-gray-800 font-semibold">{profile.fakultas?.nama}</span>
                            </div>
                            <div className="flex">
                                <span className="text-orange-500 font-semibold w-40">
                                    Program Studi
                                </span>
                                <span className="mr-2">:</span>
                                <span className="text-gray-800 font-semibold">{profile.program_studi?.nama}</span>
                            </div>
                            <div className="flex">
                                <span className="text-orange-500 font-semibold w-40">
                                    Nama
                                </span>
                                <span className="mr-2">:</span>
                                <span className="text-gray-800 font-semibold">{auth.user.name}</span>
                            </div>
                            <div className="flex">
                                <span className="text-orange-500 font-semibold w-40">
                                    Tanggal Lahir
                                </span>
                                <span className="mr-2">:</span>
                                <span className="text-gray-800 font-semibold">{profile.tanggal_lahir}</span>
                            </div>
                            <div className="flex">
                                <span className="text-orange-500 font-semibold w-40">
                                    Alamat
                                </span>
                                <span className="mr-2">:</span>
                                <span className="text-gray-800 font-semibold">{profile.alamat}</span>
                            </div>
                            <div className="flex">
                                <span className="text-orange-500 font-semibold w-40">
                                    No HP/Whatsapp
                                </span>
                                <span className="mr-2">:</span>
                                <span className="text-gray-800 font-semibold">{profile.no_hp}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MahasiswaLayout>
    );
}
