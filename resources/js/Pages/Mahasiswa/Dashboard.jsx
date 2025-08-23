import { useState, useEffect } from 'react';
import MahasiswaLayout from '@/Layouts/MahasiswaLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { ToastContainer, toast } from "react-toastify";
import {
    Edit3,
    Clock,
    CheckCircle2,
    FileCheck,
    HelpCircle,
    Banknote,
    IdCard,
    ClipboardCheck,
    User,
    ClipboardList,
    UserCog,
    BookOpen,
    CreditCard, 
    Landmark, 
    Copy,
    Check,
} from "lucide-react";
import Modal from '@/Components/Modal';

export default function Dashboard({ flash, announcements, bankAccounts }) {
    const user = usePage().props.auth.user;
    const { exam } = usePage().props;

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (accId, accNumber) => {
        navigator.clipboard.writeText(accNumber);
        setCopiedId(accId);

        setTimeout(() => setCopiedId(null), 2000);
    };

    useEffect(()=> {
        if(flash.message.success){
            toast.success(flash.message.success);
        }
        if(flash.message.error){
            toast.error(flash.message.error);
        }
    }, [flash]);

    return (
        <MahasiswaLayout
            header={'Dashboard Mahasiswa'}
        >
            <Head title="Dashboard Mahasiswa" />
            <ToastContainer />

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
                        src={
                            user?.mahasiswa_profile?.pas_foto
                                ? `/storage/${user.mahasiswa_profile.pas_foto}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                        }
                        alt="Avatar"
                        className="w-14 h-14 aspect-square rounded-full shadow-md object-cover flex-shrink-0"
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
                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-bold mb-2">Status Pendaftaran</h2>
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full capitalize text-white ${
                            user?.mahasiswa_profile?.status_pendaftaran === "draft"
                                ? "bg-red-500"
                                : user?.mahasiswa_profile?.status_pendaftaran === "menunggu verifikasi"
                                ? "bg-yellow-500"
                                : user?.mahasiswa_profile?.status_pendaftaran === "diverifikasi"
                                ? "bg-blue-500"
                                : user?.mahasiswa_profile?.status_pendaftaran === "selesai ujian"
                                ? "bg-indigo-500"
                                : user?.mahasiswa_profile?.status_pendaftaran === "diterima"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                    >
                        {user?.mahasiswa_profile?.status_pendaftaran === "draft" && (
                            <Edit3 size={18} />
                        )}
                        {user?.mahasiswa_profile?.status_pendaftaran === "menunggu verifikasi" && (
                            <Clock size={18} />
                        )}
                        {user?.mahasiswa_profile?.status_pendaftaran === "diverifikasi" && (
                            <FileCheck size={18} />
                        )}
                        {user?.mahasiswa_profile?.status_pendaftaran === "selesai ujian" && (
                            <BookOpen size={18} />
                        )}
                        {user?.mahasiswa_profile?.status_pendaftaran === "diterima" && (
                            <CheckCircle2 size={18} />
                        )}
                        {!user?.mahasiswa_profile?.status_pendaftaran && <HelpCircle size={18} />}
                        
                        {user?.mahasiswa_profile?.status_pendaftaran || "Belum Mengisi Data"}
                    </div>

                    {user?.mahasiswa_profile?.catatan_perbaikan && user?.mahasiswa_profile?.status_pendaftaran === "draft" && (
                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800">
                            <strong>Catatan Perbaikan:</strong>
                            <p>{user?.mahasiswa_profile?.catatan_perbaikan}</p>
                        </div>
                    )}
                    {user?.mahasiswa_profile?.status_pendaftaran === "diverifikasi" && (
                        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-600">
                            <strong>Catatan :</strong>
                            <p>Silakan menunggu informasi lebih lanjut terkait test ujian online</p>
                        </div>
                    )}
                    {user?.mahasiswa_profile?.status_pendaftaran === "selesai ujian" && (
                        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-indigo-500 text-indigo-600">
                            <strong>Catatan :</strong>
                            <p>Anda telah menyelesaikan ujian. Harap tunggu informasi berikutnya.</p>
                        </div>
                    )}
                    {user?.mahasiswa_profile?.status_pendaftaran === "diterima" && (
                        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-600">
                            <strong>Selamat!</strong>
                            <p>Anda telah diterima sebagai mahasiswa. Silakan cek informasi berikutnya dan lengkapi administrasi yang diperlukan.</p>
                        </div>
                    )}
                </section>

                {/* Pengumuman */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Pengumuman Terbaru</h3>

                {announcements.length > 0 ? (
                    <ul className="space-y-4">
                    {announcements.map((a) => (
                        <li key={a.id} className="p-4 border rounded hover:shadow-sm">
                        <div className="font-medium">{a.title}</div>
                        <div className="text-gray-700 mt-1">{a.content}</div>
                        <div className="text-gray-500 text-sm mt-1">
                            {new Date(a.published_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            })}
                        </div>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Belum ada pengumuman.</p>
                )}
                </div>

                {/* Akses Cepat */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {!user.mahasiswa_profile && (
                        <Link
                            href={route('mahasiswa.profile.create')}
                            className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <ClipboardList size={20} />
                            Isi Data Diri
                        </Link>
                    )}

                    {user.mahasiswa_profile?.status_pendaftaran === 'draft' && (
                        <Link
                            href={route('mahasiswa.profile.edit')}
                            className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <UserCog size={20} />
                            Perbaiki Data Diri
                        </Link>
                    )}

                    {(user.mahasiswa_profile?.status_pendaftaran === "menunggu verifikasi" ||
                        user.mahasiswa_profile?.status_pendaftaran === "selesai ujian") && (
                            <Link
                                href={route("mahasiswa.profile.show")}
                                className="bg-gray-500 text-white p-4 rounded-lg shadow hover:bg-gray-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            >
                            <User size={20} />
                            Lihat Data Diri
                            </Link>
                        )}
                    {user.mahasiswa_profile?.status_pendaftaran === 'diverifikasi' && (
                        <a
                            target='_blank'
                            href={route('mahasiswa.kartu.cetak')}
                            className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <IdCard size={20} />
                            Cetak Kartu Pendaftaran
                        </a>
                    )}
                    <a
                        onClick={handleOpenModal}
                        className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Banknote size={20} />
                        <span>Pembayaran</span>
                    </a>
                    <Link
                        href={
                            exam && user?.mahasiswa_profile?.status_pendaftaran === "diverifikasi"
                                ? route("mahasiswa.exams.access", exam.id)
                                : "#"
                        }
                        className={`p-4 rounded-lg shadow flex items-center justify-center gap-2 transition-all duration-300 
                            ${
                                exam && user?.mahasiswa_profile?.status_pendaftaran === "diverifikasi"
                                    ? "bg-purple-500 text-white hover:bg-purple-600 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        disabled={
                            !exam || user?.mahasiswa_profile?.status_pendaftaran !== "diverifikasi"
                        }
                    >
                        <ClipboardCheck size={20} />
                        {exam
                            ? user?.mahasiswa_profile?.status_pendaftaran === "selesai ujian" || 
                                user?.mahasiswa_profile?.status_pendaftaran === "diterima"
                                    ? "Sudah Selesai Ujian"
                                    : user?.mahasiswa_profile?.status_pendaftaran === "diverifikasi"
                                        ? "Test Online"
                                        : "Belum Bisa Ujian"
                            : "Test Online Belum Tersedia"}
                    </Link>
                </div>
                <Modal show={showModal} onClose={handleCloseModal}>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Landmark className="w-5 h-5 text-blue-600" />
                            Informasi Pembayaran
                        </h3>
                        <p className="text-gray-700 mb-2">
                            Silakan lakukan pembayaran ke salah satu rekening berikut:
                        </p>

                        {bankAccounts.length > 0 ? (
                            bankAccounts.map((acc) => (
                                <div
                                    key={acc.id}
                                    className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm border"
                                >
                                    {/* Nama Pemilik */}
                                    <div className="mb-2 flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Nama Rekening</p>
                                            <p className="font-medium text-gray-800">{acc.account_holder}</p>
                                        </div>
                                    </div>

                                    {/* Nomor Rekening */}
                                    <div className="mb-2 flex items-center gap-2 justify-between">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Nomor Rekening</p>
                                                <p className="font-medium text-gray-800">{acc.account_number}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(acc.id, acc.account_number)}
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                            title="Salin Nomor Rekening"
                                        >
                                            {copiedId === acc.id ? (
                                                <>
                                                    <Check className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm text-green-600">Disalin!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    <span className="text-sm">Salin</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Bank */}
                                    <div className="flex items-center gap-2">
                                        <Landmark className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Bank</p>
                                            <p className="font-medium text-gray-800">{acc.bank_name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Belum ada rekening terdaftar.</p>
                        )}

                        {/* Tombol Tutup */}
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                onClick={handleCloseModal}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </MahasiswaLayout>
    );
}
