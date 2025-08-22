import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { formatDateTime } from "@/Utils/format";
import {
    User,
    Clock,
    CheckCircle,
    XCircle,
    ArrowLeft,
    List,
    AlertTriangle,
} from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { ToastContainer, toast } from "react-toastify";

export default function ResponseDetail({ exam, response, mahasiswa, flash }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const status = mahasiswa?.mahasiswa_profile?.status_pendaftaran;

    const handleConfirm = () => {
        if (!selectedStatus) return;

        router.post(
            route("verifikasi.setStatus", { id: response.user_id }),
            {
                status: selectedStatus,
            }
        );
        setConfirmOpen(false);
    };

    const openConfirmationModal = (status) => {
        setSelectedStatus(status);
        setConfirmOpen(true);
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
        <AdminLayout header="Detail Jawaban">
            <Head title={`Jawaban ${response.user_name}`} />
            <ToastContainer />

            <div className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Tombol Kembali */}
                <div className="flex justify-start">
                    <Link href={route("admin.exams.statistics", exam.id)}>
                        <PrimaryButton className="flex items-center gap-2">
                            <ArrowLeft size={16} className="mr-2" />
                            Kembali
                        </PrimaryButton>
                    </Link>
                </div>

                {/* Card Informasi Peserta */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex items-center mb-4">
                        <User size={24} className="text-gray-600 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Informasi Peserta
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Nama Peserta</p>
                            <p className="font-semibold text-gray-900 mt-1">
                                {response.user_name}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Waktu Mulai</p>
                            <p className="font-semibold text-gray-900 mt-1">
                                {formatDateTime(response.started_at)}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Waktu Selesai</p>
                            <p className="font-semibold text-gray-900 mt-1">
                                {formatDateTime(response.finished_at)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card Jawaban Peserta */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex items-center mb-4">
                        <CheckCircle size={24} className="text-green-600 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Jawaban Peserta
                        </h2>
                    </div>

                    <ul className="space-y-4">
                        {response.answers.length === 0 ? (
                            <p className="italic text-gray-500 text-center py-4">
                                Peserta belum menjawab satupun pertanyaan.
                            </p>
                        ) : (
                            response.answers.map((ans, i) => (
                                <li
                                    key={i}
                                    className="bg-gray-50 p-5 rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-start mb-2">
                                        <span className="text-gray-500 font-semibold mr-2 flex-shrink-0">
                                            {i + 1}.
                                        </span>
                                        <p className="font-semibold text-gray-800">{ans.question}</p>
                                    </div>
                                    <div className="mt-2 text-sm">
                                        <p className="flex items-center text-gray-600">
                                            <span className="font-medium mr-2">Jawaban:</span>
                                            <span className="text-gray-900 font-normal">
                                                {ans.answer || "Tidak ada jawaban"}
                                            </span>
                                        </p>
                                        <p className="flex items-center text-gray-500 mt-1">
                                            <span className="font-medium mr-2">Tipe:</span>
                                            <span className="capitalize">{ans.type}</span>
                                        </p>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Card Penilaian */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex items-center mb-4">
                        <List size={24} className="text-blue-600 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-800">Penilaian</h2>
                    </div>

                    {status !== "diterima" && status !== "ditolak" ? (
                        <div className="flex gap-4">
                            <PrimaryButton
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => openConfirmationModal("diterima")}
                            >
                                <CheckCircle size={18} className="mr-2" /> Terima
                            </PrimaryButton>

                            <PrimaryButton
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => openConfirmationModal("ditolak")}
                            >
                                <XCircle size={18} className="mr-2" /> Tolak
                            </PrimaryButton>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            {status === "diterima" ? (
                                <span className="flex items-center text-green-600 font-semibold">
                                    <CheckCircle size={18} className="mr-1" /> Diterima
                                </span>
                            ) : (
                                <span className="flex items-center text-red-600 font-semibold">
                                    <XCircle size={18} className="mr-1" /> Ditolak
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* Modal Konfirmasi yang digabungkan */}
            <Modal show={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                        <AlertTriangle size={48} className="text-yellow-500" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold text-gray-900 leading-6">Konfirmasi Penilaian</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menandai peserta ini sebagai{" "}
                                <span className="font-bold capitalize">{selectedStatus}</span>?
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm transition-colors duration-200"
                            onClick={() => setConfirmOpen(false)}
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm transition-colors duration-200 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                            onClick={handleConfirm}
                        >
                            Ya, Lanjutkan
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
