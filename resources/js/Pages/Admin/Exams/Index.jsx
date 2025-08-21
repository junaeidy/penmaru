import React, { useState, useEffect } from "react";
import { Link, usePage, router, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import AdminLayout from "@/Layouts/AdminLayout";
import ConfirmDialog from "@/Components/ConfirmDialog";
import {
  Plus,
  Edit,
  BarChart,
  Trash2,
  Calendar,
  CircleHelp,
  Users,
} from "lucide-react";
import { formatDateTime } from "@/Utils/format";

export default function Index({ flash }) {
  const { exams } = usePage().props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openConfirm = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    if (selectedId) {
      router.delete(route("admin.exams.destroy", selectedId), {
        onSuccess: () => {
          toast.success("Ujian berhasil dihapus!");
        },
        onError: () => {
          toast.error("Terjadi kesalahan, coba lagi.");
        },
      });
    }
    setConfirmOpen(false);
  };

  const getStatus = (exam) => {
    const now = new Date();
    const start = new Date(exam.start_at);
    const end = new Date(exam.end_at);

    if (now < start)
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
          Belum Dimulai
        </span>
      );
    if (now > end)
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/20">
          Selesai
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
        Aktif
      </span>
    );
  };

  useEffect(() => {
    if (flash?.message?.success) {
      toast.success(flash.message.success);
    }
    if (flash?.message?.error) {
      toast.error(flash.message.error);
    }
  }, [flash]);

  return (
    <AdminLayout header={"Manajemen Ujian"}>
      <Head title="Manajemen Ujian" />
      <ToastContainer />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Daftar Ujian
          </h1>
          <Link
            href={route("admin.exams.create")}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus size={18} />
            Tambah Ujian
          </Link>
        </div>

        {/* Menggunakan grid untuk layout berbasis kartu */}
        {exams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Bagian judul dan status */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900 leading-tight pr-4">
                    {exam.title}
                  </h2>
                  <div>{getStatus(exam)}</div>
                </div>

                {/* Bagian detail ujian */}
                <div className="space-y-3 text-sm text-gray-600 flex-grow">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>
                      {formatDateTime(exam.start_at)} - {formatDateTime(exam.end_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleHelp size={16} className="text-gray-400" />
                    <span>{exam.questions} Pertanyaan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span>{exam.responses} Responden</span>
                  </div>
                </div>

                {/* Bagian aksi, ditempatkan di bagian bawah kartu */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-2">
                  <Link
                    href={route("admin.exams.edit", exam.id)}
                    className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-all duration-200"
                    title="Edit Ujian"
                  >
                    <Edit size={16} />
                  </Link>
                  <Link
                    href={route("admin.exams.statistics", exam.id)}
                    className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-all duration-200"
                    title="Lihat Statistik"
                  >
                    <BarChart size={16} />
                  </Link>
                  <button
                    onClick={() => openConfirm(exam.id)}
                    className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-all duration-200"
                    title="Hapus Ujian"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500 ring-1 ring-gray-200">
            <h3 className="text-xl font-semibold">Belum ada ujian yang terdaftar.</h3>
            <p className="mt-2 text-sm">
              Klik tombol 'Tambah Ujian' di atas untuk membuat ujian baru.
            </p>
          </div>
        )}

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus ujian ini? Tindakan ini tidak bisa dibatalkan."
        />
      </div>
    </AdminLayout>
  );
}
