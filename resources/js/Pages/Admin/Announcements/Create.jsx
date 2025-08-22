import { useForm, Link, Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import { PlusCircle, Save, X } from "lucide-react";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.announcements.store"), {
      onSuccess: () => {
        toast.success("Pengumuman berhasil ditambahkan!");
        setData({ title: "", content: "" });
      },
      onError: (errors) => {
        Object.values(errors).forEach((error) => {
          toast.error(error);
        });
      },
    });
  };

  return (
    <AdminLayout
      header={"Tambah Pengumuman"}
    >
      <Head title="Tambah Pengumuman" />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 rounded-full">
            <PlusCircle size={32} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">Buat Pengumuman Baru</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                Judul Pengumuman
              </label>
              <input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                placeholder="Masukkan judul pengumuman"
                className={`w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Isi */}
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                Isi Pengumuman
              </label>
              <textarea
                id="content"
                rows="8"
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
                placeholder="Tuliskan isi pengumuman di sini..."
                className={`w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.content ? "border-red-500" : ""
                }`}
              />
              {errors.content && (
                <p className="text-red-600 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Link
                href={route("admin.announcements.index")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-colors duration-200"
              >
                <X size={18} />
                Batal
              </Link>
              <button
                type="submit"
                disabled={processing}
                className={`inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                  processing ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700 transform hover:scale-105"
                }`}
              >
                <Save size={18} />
                {processing ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}