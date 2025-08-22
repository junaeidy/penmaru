import { usePage, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { formatDateTime } from "@/Utils/format";
import PrimaryButton from "@/Components/PrimaryButton";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

export default function Statistics({ flash }) {
  const { exam, responses } = usePage().props;

  useEffect(()=> {
      if(flash.message.success){
          toast.success(flash.message.success);
      }
      if(flash.message.error){
          toast.error(flash.message.error);
      }
  }, [flash]);

  return (
    <AdminLayout header={`Statistik Ujian: ${exam.title}`}>
      <Head title={`Statistik Ujian - ${exam.title}`} />
      <ToastContainer />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Statistik Ujian: {exam.title}
        </h1>

        {/* Card Informasi Ringkas */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Ringkasan Ujian
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Periode Ujian</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formatDateTime(exam.start_at)} - {formatDateTime(exam.end_at)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Responden</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {responses.length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Rata-Rata Pengerjaan</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                -
              </p>
            </div>
          </div>
        </div>

        {/* Card Daftar Responden */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Daftar Responden
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr className="border-b border-gray-300">
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Nama Peserta
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Waktu Mulai
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Waktu Selesai
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {responses.length > 0 ? (
                  responses.map((res, index) => (
                    <tr
                      key={res.id}
                      className={`bg-white border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors duration-200`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {res.user}
                      </td>
                      <td className="px-6 py-4">{formatDateTime(res.started_at)}</td>
                      <td className="px-6 py-4">{formatDateTime(res.finished_at)}</td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={route("admin.exams.responses.show", {
                            exam: exam.id,
                            response: res.id,
                          })}
                          className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          Lihat Jawaban
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500 italic">
                      Belum ada peserta yang mengerjakan ujian ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-start">
          <Link
            href={route("admin.exams.index")}
          >
            <PrimaryButton>
              Kembali ke Daftar Ujian
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}