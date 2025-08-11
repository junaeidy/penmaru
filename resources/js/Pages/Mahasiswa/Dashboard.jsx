import MahasiswaLayout from '@/Layouts/MahasiswaLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <MahasiswaLayout>
            <Head title="Dashboard Mahasiswa" />

            <div className='space-y-6'>
                <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">
                            Selamat datang, {user.name} 👋
                        </h2>
                        <p className="text-gray-500">
                            Hari ini:{" "}
                            {new Date().toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name
                        )}`}
                        alt="Avatar"
                        className="w-14 h-14 rounded-full shadow-md"
                    />
                </div>

                {/* Progress Pendaftaran */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Progress Pendaftaran</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <p className="mt-2 text-gray-500 text-sm">2 dari 4 tahap telah selesai</p>
                </div>

                {/* Pengumuman */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Pengumuman Terbaru</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Ujian online akan dilaksanakan pada 20 Agustus 2025</li>
                        <li>Batas unggah berkas: 15 Agustus 2025</li>
                    </ul>
                </div>

                {/* Akses Cepat */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        Isi Biodata
                    </a>
                    <a className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        Upload Berkas
                    </a>
                    <a className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        Pembayaran
                    </a>
                    <a className="bg-purple-500 text-white p-4 rounded-lg shadow hover:bg-purple-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        Ujian Online
                    </a>
                </div>
            </div>
        </MahasiswaLayout>
    );
}
