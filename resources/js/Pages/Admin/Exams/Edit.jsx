import { useForm, router, Head } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Plus, Trash2 } from "lucide-react";

export default function Edit({ exam }) {
  const { data, setData, put, processing, errors } = useForm({
    title: exam.title || "",
    description: exam.description || "",
    start_at: exam.start_at || "",
    end_at: exam.end_at || "",
    duration: exam.duration || "",
  });

  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "radio",
    options: [],
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("admin.exams.update", exam.id), {
      onSuccess: () => toast.success("Ujian berhasil diperbarui!"),
      onError: () => toast.error("Gagal memperbarui ujian."),
    });
  };

  const handleAddOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, ""],
    });
  };

  const handleOptionChange = (index, value) => {
    const opts = [...newQuestion.options];
    opts[index] = value;
    setNewQuestion({ ...newQuestion, options: opts });
  };

  const handleRemoveOption = (index) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.filter((_, i) => i !== index),
    });
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) {
      toast.error("Pertanyaan tidak boleh kosong");
      return;
    }

    router.post(
      route("admin.exams.questions.store", exam.id),
      {
        question_text: newQuestion.text,
        answer_type: newQuestion.type,
        options: newQuestion.options,
      },
      {
        onSuccess: () => {
          toast.success("Pertanyaan berhasil ditambahkan");
          setNewQuestion({ text: "", type: "radio", options: [] });
        },
        onError: () => toast.error("Gagal menambahkan pertanyaan"),
        preserveScroll: true,
      }
    );
  };

  const confirmDeleteQuestion = (id) => {
    setQuestionToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteQuestion = () => {
    if (!questionToDelete) return;

    router.delete(route("admin.exams.questions.destroy", questionToDelete), {
      onSuccess: () => {
        toast.success("Pertanyaan berhasil dihapus");
        setShowConfirm(false);
        setQuestionToDelete(null);
      },
      onError: () => toast.error("Gagal menghapus pertanyaan"),
      preserveScroll: true,
    });
  };

  return (
    <AdminLayout header="Manajemen Ujian">
      <Head title="Edit Ujian" />
      <ToastContainer />

      <div className="p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Kolom Kiri: Form Edit Ujian */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Detail Ujian
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Ujian
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    rows="4"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start_at" className="block text-sm font-medium text-gray-700 mb-1">
                      Mulai
                    </label>
                    <input
                      id="start_at"
                      type="datetime-local"
                      value={data.start_at}
                      onChange={(e) => setData("start_at", e.target.value)}
                      className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        errors.start_at ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {errors.start_at && (
                      <p className="text-red-500 text-xs mt-1">{errors.start_at}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="end_at" className="block text-sm font-medium text-gray-700 mb-1">
                      Selesai
                    </label>
                    <input
                      id="end_at"
                      type="datetime-local"
                      value={data.end_at}
                      onChange={(e) => setData("end_at", e.target.value)}
                      className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        errors.end_at ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {errors.end_at && (
                      <p className="text-red-500 text-xs mt-1">{errors.end_at}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Durasi (menit)
                  </label>
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    value={data.duration}
                    onChange={(e) => setData("duration", e.target.value)}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      errors.duration ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    placeholder="Contoh: 90"
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </div>

          {/* Kolom Kanan: Manajemen Pertanyaan */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Tambah Pertanyaan */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Tambah Pertanyaan
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teks Pertanyaan
                  </label>
                  <input
                    type="text"
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                    placeholder="Masukkan pertanyaan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Jawaban
                  </label>
                  <select
                    value={newQuestion.type}
                    onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <option value="radio">Radio</option>
                    <option value="select">Select</option>
                    <option value="multiselect">Multi Select</option>
                    <option value="text">Essay</option>
                  </select>
                </div>

                {["radio", "select", "multiselect"].includes(newQuestion.type) && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Opsi Jawaban
                      </label>
                      <button
                        type="button"
                        onClick={handleAddOption}
                        className="flex items-center px-3 py-1 bg-green-500 text-white text-sm rounded-full gap-1 transition-colors duration-300 hover:bg-green-600"
                      >
                        <Plus size={16} />
                        Tambah Opsi
                      </button>
                    </div>
                    <div className="space-y-3">
                      {newQuestion.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleOptionChange(i, e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                            placeholder={`Opsi ${i + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(i)}
                            className="p-2 bg-red-500 text-white rounded-lg transition-colors duration-300 hover:bg-red-600"
                            title="Hapus opsi"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tambah Pertanyaan
                </button>
              </div>
            </div>

            {/* Daftar Pertanyaan */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Daftar Pertanyaan
              </h3>
              {!exam.questions || exam.questions.length === 0 ? (
                <p className="italic text-gray-500 text-center py-4">
                  Belum ada pertanyaan yang ditambahkan.
                </p>
              ) : (
                <ul className="space-y-4">
                  {exam.questions.map((q, index) => (
                    <li
                      key={q.id}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          <span className="text-gray-500 mr-2">{index + 1}.</span>
                          {q.question_text}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Tipe: <span className="capitalize">{q.answer_type}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => confirmDeleteQuestion(q.id)}
                        className="ml-4 p-2 bg-red-500 text-white rounded-lg transition-colors duration-300 hover:bg-red-600"
                        title="Hapus pertanyaan"
                      >
                        <Trash2 size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDeleteQuestion}
        title="Hapus Pertanyaan"
        message="Apakah Anda yakin ingin menghapus pertanyaan ini? Tindakan ini tidak dapat dibatalkan."
      />
    </AdminLayout>
  );
}