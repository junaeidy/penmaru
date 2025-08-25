import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { PlusCircle, Trash2, X, Upload } from "lucide-react";

export default function WebsiteContent({ informasi, heroes, faqs, flash }) {
    useEffect(() => {
        if (flash.message) {
            if (flash.message.success) {
                toast.success(flash.message.success);
            }
            if (flash.message.error) {
                toast.error(flash.message.error);
            }
        }
    }, [flash]);

    // Instantiate useForm() at the top level
    const { delete: destroy } = useForm();
    const [dialogData, setDialogData] = useState(null);

    const openConfirmDialog = (id, type) => {
        setDialogData({ id, type });
    };

    const closeConfirmDialog = () => {
        setDialogData(null);
    };

    // This function will be called by the dialog
    const handleConfirmDelete = () => {
        if (!dialogData) return;

        let routeName = "";
        switch (dialogData.type) {
            case "informasi":
                routeName = "website-content.informasi.destroy";
                break;
            case "hero":
                routeName = "website-content.hero.destroy";
                break;
            case "faq":
                routeName = "website-content.faq.destroy";
                break;
            default:
                return;
        }

        destroy(route(routeName, dialogData.id), {
            onSuccess: () => closeConfirmDialog(),
            onError: () => closeConfirmDialog(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Kelola Konten Website" />
            <ToastContainer />
            <div className="p-6 md:p-10 space-y-12">
                <h1 className="text-3xl font-bold text-gray-800">
                    Kelola Konten Website
                </h1>

                <InformasiSection informasi={informasi} openConfirmDialog={openConfirmDialog} />
                <HeroSection heroes={heroes} openConfirmDialog={openConfirmDialog} />
                <FaqSection faqs={faqs} openConfirmDialog={openConfirmDialog} />

                {dialogData && (
                    <ConfirmDialog
                        isOpen={!!dialogData}
                        onClose={closeConfirmDialog}
                        onConfirm={handleConfirmDelete}
                        title="Hapus Konten"
                        message="Apakah Anda yakin ingin menghapus konten ini? Tindakan ini tidak dapat dibatalkan."
                    />
                )}
            </div>
        </AdminLayout>
    );
}

// ================== INFORMASI PENDAFTARAN ==================
function InformasiSection({ informasi, openConfirmDialog }) {
    const { data, setData, post, reset } = useForm({
        jalur: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        kegiatan: "",
        biaya_pendaftaran: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("website-content.informasi.store"), {
            onSuccess: () => reset(),
            onError: (errors) => {
                    Object.values(errors).forEach((error) => {
                    toast.error(error);
                    });
                },
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Informasi Pendaftaran</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jalur</label>
                        <input
                            type="text"
                            placeholder="Contoh: Gelombang 1"
                            value={data.jalur}
                            onChange={(e) => setData("jalur", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kegiatan</label>
                        <input
                            type="text"
                            placeholder="Contoh: Tes & Wawancara"
                            value={data.kegiatan}
                            onChange={(e) => setData("kegiatan", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                        <input
                            type="date"
                            value={data.tanggal_mulai}
                            onChange={(e) => setData("tanggal_mulai", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                        <input
                            type="date"
                            value={data.tanggal_selesai}
                            onChange={(e) => setData("tanggal_selesai", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Biaya Pendaftaran</label>
                        <input
                            type="number"
                            placeholder="Contoh: 250000"
                            value={data.biaya_pendaftaran}
                            onChange={(e) => setData("biaya_pendaftaran", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Tambah
                </button>
            </form>

            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jalur</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Mulai</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Selesai</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kegiatan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biaya</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {informasi.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">{item.jalur}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(item.tanggal_mulai).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(item.tanggal_selesai).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.kegiatan}</td>
                                <td className="px-6 py-4 whitespace-nowrap">Rp {item.biaya_pendaftaran}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => openConfirmDialog(item.id, 'informasi')}
                                        className="text-red-600 hover:text-red-900 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ================== HERO SECTION ==================
function HeroSection({ heroes, openConfirmDialog }) {
    const { data, setData, post, reset } = useForm({
        gambar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("website-content.hero.store"), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Hero Section
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
                <input
                    type="file"
                    onChange={(e) => setData("gambar", e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {heroes.map((item) => (
                    <div key={item.id} className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
                        <img
                            src={`/storage/${item.gambar}`}
                            alt={`Hero ${item.id}`}
                            className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <button
                            onClick={() => openConfirmDialog(item.id, 'hero')}
                            className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ================== FAQ ==================
function FaqSection({ faqs, openConfirmDialog }) {
    const { data, setData, post, reset } = useForm({
        pertanyaan: "",
        jawaban: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("website-content.faq.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">FAQ</h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pertanyaan</label>
                    <input
                        type="text"
                        placeholder="Masukkan pertanyaan baru"
                        value={data.pertanyaan}
                        onChange={(e) => setData("pertanyaan", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Jawaban</label>
                    <textarea
                        placeholder="Masukkan jawaban..."
                        rows="3"
                        value={data.jawaban}
                        onChange={(e) => setData("jawaban", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Tambah
                </button>
            </form>

            <div className="space-y-4">
                {faqs.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center transition-all duration-300 hover:shadow-md"
                    >
                        <div className="flex-1 pr-4">
                            <p className="font-semibold text-gray-800">{item.pertanyaan}</p>
                            <p className="text-sm text-gray-600 mt-1">{item.jawaban}</p>
                        </div>
                        <button
                            onClick={() => openConfirmDialog(item.id, 'faq')}
                            className="text-red-600 hover:text-red-900 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}