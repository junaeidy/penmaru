import { useForm, usePage, Head } from "@inertiajs/react";
import React from 'react';
import { formatDateTime } from "@/Utils/format";

export default function AccessForm() {
  const { exam } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    nomor_pendaftaran: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("mahasiswa.exams.access.verify", exam.id));
  };

  return (
    <>
      <Head title={`Akses Ujian - ${exam.title}`} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-lg">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Akses Ujian
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Verifikasi identitas Anda untuk memulai ujian.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 w-full">
                <p className="text-xs sm:text-sm text-blue-700 break-words">
                  <strong className="font-semibold">Judul Ujian:</strong> {exam.title || 'Tidak ada judul.'}
                  <br />
                  <strong className="font-semibold">Waktu Ujian:</strong> {formatDateTime(exam.start_at)} - {formatDateTime(exam.end_at)}.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label htmlFor="nomor_pendaftaran" className="block text-sm font-medium text-gray-700 mb-2">
                Masukkan Nomor Pendaftaran
              </label>
              <input
                id="nomor_pendaftaran"
                type="text"
                value={data.nomor_pendaftaran}
                onChange={(e) => setData("nomor_pendaftaran", e.target.value)}
                placeholder="Misalnya: 12345678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
              />
              {errors.nomor_pendaftaran && (
                <p className="text-red-600 text-xs sm:text-sm mt-2">
                  {errors.nomor_pendaftaran}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {processing ? 'Memverifikasi...' : 'Verifikasi & Masuk'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}