import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { formatDateTime } from "@/Utils/format";
import {
  User,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  MessageSquare,
  List,
} from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ResponseDetail({ exam, response }) {
  const getQuestionIcon = (type) => {
    switch (type) {
      case "text":
        return <MessageSquare size={16} className="text-gray-500" />;
      case "radio":
      case "select":
      case "multiselect":
        return <List size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout header="Detail Jawaban">
      <Head title={`Jawaban ${response.user_name}`} />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Tombol Kembali */}
        <div className="flex justify-start">
          <Link
            href={route("admin.exams.statistics", exam.id)}
          >
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
      </div>
    </AdminLayout>
  );
}