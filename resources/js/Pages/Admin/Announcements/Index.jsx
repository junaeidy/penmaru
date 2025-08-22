import { useEffect, useState } from "react";
import { Link, useForm, Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/Components/Modal";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Eye, Trash2, PlusCircle, Newspaper, Info, Calendar } from "lucide-react";

export default function Index({ announcements, flash }) {
  const { delete: destroy } = useForm();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openConfirm = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      destroy(route("admin.announcements.destroy", selectedId));
    }
  };

  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
    setShowModal(false);
  };

  useEffect(() => {
    if (flash.message?.success) {
      toast.success(flash.message.success);
    }
    if (flash.message?.error) {
      toast.error(flash.message.error);
    }
  }, [flash]);

  return (
    <AdminLayout header={"Daftar Pengumuman"}>
      <Head title="Daftar Pengumuman" />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <div className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">Daftar Pengumuman</h1>
          <Link
            href={route("admin.announcements.create")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <PlusCircle size={20} />
            Tambah Pengumuman
          </Link>
        </div>

        {announcements.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.data.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-xl shadow-md overflow-hidden ring-1 ring-gray-200 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Newspaper size={16} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Pengumuman</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{a.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{a.content}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="text-xs text-gray-500 font-medium">
                      {a.published_at ? new Date(a.published_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(a)}
                        className="p-2 text-blue-500 rounded-full hover:bg-blue-100 transition-colors duration-200"
                        title="Lihat Detail"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => openConfirm(a.id)}
                        className="p-2 text-red-500 rounded-full hover:bg-red-100 transition-colors duration-200"
                        title="Hapus"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Newspaper size={64} className="text-gray-300" />
              <h2 className="text-xl font-semibold">Belum ada pengumuman.</h2>
              <p className="max-w-md">Tambahkan pengumuman baru untuk mulai berbagi informasi penting dengan audiens Anda.</p>
              <Link
                href={route("admin.announcements.create")}
                className="inline-flex items-center gap-2 px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <PlusCircle size={20} />
                Tambah Pengumuman
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {announcements.links.length > 3 && (
          <div className="flex justify-center mt-8 space-x-2">
            {announcements.links.map((link, i) => (
              <Link
                key={i}
                href={link.url || "#"}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  link.active
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}

        {/* Detail Modal */}
        <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
          {selectedAnnouncement && (
            <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Info size={28} className="text-blue-500" />
                  <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
                    {selectedAnnouncement.title}
                  </h3>
                </div>
              </div>
              <hr className="my-4 border-gray-200" />
              <div className="prose max-w-none text-gray-700 leading-relaxed mb-6">
                {selectedAnnouncement.content}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <Calendar size={16} />
                <span className="uppercase">
                  Diterbitkan pada:{" "}
                  {new Date(selectedAnnouncement.published_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors transform hover:scale-105"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Confirm Dialog */}
        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Hapus Pengumuman"
          message="Apakah Anda yakin ingin menghapus pengumuman ini? Tindakan ini tidak bisa dibatalkan."
        />
      </div>
    </AdminLayout>
  );
}