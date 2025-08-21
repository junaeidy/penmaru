import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    start_at: "",
    end_at: "",
    duration: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.exams.store"), {
      onSuccess: () => {
        toast.success("Ujian berhasil ditambahkan!");
      },
      onError: (errors) => {
        Object.values(errors).forEach((error) => {
          toast.error(error);
        });
      },
    });
  };

  return (
    <AdminLayout header="Manajemen Ujian">
      <Head title="Tambah Ujian" />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="flex justify-center p-6">
        <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Tambah Ujian Baru
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul Ujian */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Judul Ujian
              </label>
              <input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                className={`w-full rounded-md border p-3 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Misal: Test Seleksi Mahasiswa"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Deskripsi */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                className={`w-full rounded-md border p-3 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                rows="4"
                placeholder="Penjelasan singkat tentang ujian ini..."
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Mulai & Selesai */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Mulai */}
              <div>
                <label
                  htmlFor="start_at"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Waktu Mulai
                </label>
                <input
                  id="start_at"
                  type="datetime-local"
                  value={data.start_at}
                  onChange={(e) => setData("start_at", e.target.value)}
                  className={`w-full rounded-md border p-3 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.start_at ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.start_at && (
                  <p className="mt-1 text-xs text-red-500">{errors.start_at}</p>
                )}
              </div>
              {/* Selesai */}
              <div>
                <label
                  htmlFor="end_at"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Waktu Selesai
                </label>
                <input
                  id="end_at"
                  type="datetime-local"
                  value={data.end_at}
                  onChange={(e) => setData("end_at", e.target.value)}
                  className={`w-full rounded-md border p-3 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.end_at ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.end_at && (
                  <p className="mt-1 text-xs text-red-500">{errors.end_at}</p>
                )}
              </div>
            </div>

            {/* Durasi */}
            <div>
              <label
                htmlFor="duration"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Durasi (menit)
              </label>
              <input
                id="duration"
                type="number"
                min="1"
                value={data.duration}
                onChange={(e) => setData("duration", e.target.value)}
                className={`w-full rounded-md border p-3 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Misal: 90"
              />
              {errors.duration && (
                <p className="mt-1 text-xs text-red-500">{errors.duration}</p>
              )}
            </div>

            {/* Tombol Aksi */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Link
                href={route("admin.exams.index")}
                className="rounded-md bg-gray-200 px-6 py-3 font-medium text-gray-700 transition duration-300 ease-in-out hover:bg-gray-300"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="transform rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 disabled:opacity-50"
              >
                {processing ? "Menyimpan..." : "Simpan Ujian"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}