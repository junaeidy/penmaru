import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Settings, Clock, ListChecks, Banknote, Save, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import ConfirmDialog from '@/Components/ConfirmDialog';
import Edit from '@/Pages/Profile/Edit';

export default function Index({ flash, settings, bankAccounts }) {
    useEffect(() => {
        if (flash.message?.success) {
            toast.success(flash.message.success);
        }
        if (flash.message?.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    // === State dan Form untuk setiap bagian ===
    const [logoPreviewUrl, setLogoPreviewUrl] = useState(null);
    const [confirmDeleteBankOpen, setConfirmDeleteBankOpen] = useState(false);
    const [selectedBankId, setSelectedBankId] = useState(null);

    const generalForm = useForm({
        app_logo: null,
        academic_year: settings.academic_year || "",
    });

    const periodForm = useForm({
        registration_start: settings.registration_start || "",
        registration_end: settings.registration_end || "",
    });

    const requirementsForm = useForm({
        requirements: settings.registration_requirements
            ? JSON.parse(settings.registration_requirements)
            : [],
    });
    const [requirementInput, setRequirementInput] = useState("");

    const bankForm = useForm({
        bank_name: "",
        account_number: "",
        account_holder: "",
    });

    // === Fungsi untuk Pengaturan Umum ===
    const handleGeneralSubmit = (e) => {
        e.preventDefault();
        generalForm.post(route("admin.settings.general"), {
            onSuccess: () => {
                toast.success("Pengaturan umum berhasil disimpan!");
                setLogoPreviewUrl(null);
            },
        });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        generalForm.setData("app_logo", file);
        if (file) {
            setLogoPreviewUrl(URL.createObjectURL(file));
        } else {
            setLogoPreviewUrl(null);
        }
    };

    const handleRemoveLogo = () => {
        generalForm.setData("app_logo", null);
        setLogoPreviewUrl(null);
        document.getElementById('app_logo').value = '';
    };

    // === Fungsi untuk Periode Pendaftaran ===
    const handlePeriodSubmit = (e) => {
        e.preventDefault();
        periodForm.post(route("admin.settings.period"), {
            onSuccess: () => toast.success("Periode pendaftaran berhasil disimpan!"),
        });
    };

    // === Fungsi untuk Syarat Pendaftaran ===
    const handleRequirementsSubmit = (e) => {
        e.preventDefault();
        requirementsForm.post(route("admin.settings.requirements"), {
            onSuccess: () => toast.success("Syarat pendaftaran berhasil disimpan!"),
        });
    };

    const handleAddRequirement = () => {
        if (requirementInput.trim()) {
            requirementsForm.setData("requirements", [
                ...requirementsForm.data.requirements,
                requirementInput.trim(),
            ]);
            setRequirementInput("");
        }
    };

    const handleRemoveRequirement = (index) => {
        requirementsForm.setData(
            "requirements",
            requirementsForm.data.requirements.filter((_, idx) => idx !== index)
        );
    };

    // === Fungsi untuk Rekening Bank ===
    const handleBankSubmit = (e) => {
        e.preventDefault();
        bankForm.post(route("admin.settings.bank.store"), {
            onSuccess: () => {
                toast.success("Rekening bank berhasil ditambahkan!");
                bankForm.reset();
            },
        });
    };

    const openConfirmDeleteBank = (id) => {
        setSelectedBankId(id);
        setConfirmDeleteBankOpen(true);
    };

    const handleConfirmDeleteBank = () => {
        if (selectedBankId) {
            router.delete(route("admin.settings.bank.destroy", selectedBankId), {
                onSuccess: () => toast.success("Rekening bank berhasil dihapus!"),
            });
            setConfirmDeleteBankOpen(false);
            setSelectedBankId(null);
        }
    };

    return (
        <AdminLayout header={'Pengaturan'}>
            <Head title="Pengaturan" />
            <ToastContainer />
            <Edit />

            <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
                
                {/* Bagian Pengaturan Umum */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Settings size={24} className="text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Pengaturan Umum</h2>
                    </div>
                    <form onSubmit={handleGeneralSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="app_logo" className="block text-sm font-semibold text-gray-700 mb-2">Logo Aplikasi</label>
                            <div className="flex items-center gap-4 mb-4">
                                {(logoPreviewUrl || settings.app_logo) && (
                                    <div className="relative w-24 h-20 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                                        <img
                                            src={logoPreviewUrl || `/storage/${settings.app_logo}`}
                                            alt="Logo Aplikasi"
                                            className="h-full w-full object-contain p-2"
                                        />
                                        {logoPreviewUrl && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveLogo}
                                                className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                                                title="Hapus logo yang dipilih"
                                            >
                                                <XCircle size={20} />
                                            </button>
                                        )}
                                    </div>
                                )}
                                <input
                                    id="app_logo"
                                    type="file"
                                    onChange={handleLogoChange}
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="academic_year" className="block text-sm font-semibold text-gray-700 mb-2">Tahun Akademik</label>
                            <input
                                id="academic_year"
                                type="text"
                                value={generalForm.data.academic_year}
                                onChange={(e) => generalForm.setData("academic_year", e.target.value)}
                                placeholder="e.g., 2024/2025"
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                disabled={generalForm.processing}
                            >
                                <Save size={18} />
                                {generalForm.processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Bagian Periode Pendaftaran */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-indigo-100 rounded-full">
                            <Clock size={24} className="text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Periode Pendaftaran</h2>
                    </div>
                    <form onSubmit={handlePeriodSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="registration_start" className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Mulai</label>
                            <input
                                id="registration_start"
                                type="date"
                                value={periodForm.data.registration_start}
                                onChange={(e) => periodForm.setData("registration_start", e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="registration_end" className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Selesai</label>
                            <input
                                id="registration_end"
                                type="date"
                                value={periodForm.data.registration_end}
                                onChange={(e) => periodForm.setData("registration_end", e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end pt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
                                disabled={periodForm.processing}
                            >
                                <Save size={18} />
                                {periodForm.processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Bagian Syarat Pendaftaran */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-green-100 rounded-full">
                            <ListChecks size={24} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Syarat Pendaftaran</h2>
                    </div>
                    <form onSubmit={handleRequirementsSubmit} className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={requirementInput}
                                onChange={(e) => setRequirementInput(e.target.value)}
                                placeholder="Tambah syarat (contoh: Fotokopi Ijazah)"
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddRequirement}
                                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        {requirementsForm.data.requirements.length > 0 && (
                            <ul className="space-y-2">
                                {requirementsForm.data.requirements.map((r, i) => (
                                    <li key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">{r}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRequirement(i)}
                                            className="p-1 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                disabled={requirementsForm.processing}
                            >
                                <Save size={18} />
                                {requirementsForm.processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Bagian Rekening Bank */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <Banknote size={24} className="text-yellow-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Rekening Bank</h2>
                    </div>
                    <form onSubmit={handleBankSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Nama Bank"
                            value={bankForm.data.bank_name}
                            onChange={(e) => bankForm.setData("bank_name", e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Nomor Rekening"
                            value={bankForm.data.account_number}
                            onChange={(e) => bankForm.setData("account_number", e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Atas Nama"
                            value={bankForm.data.account_holder}
                            onChange={(e) => bankForm.setData("account_holder", e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                                disabled={bankForm.processing}
                            >
                                <Plus size={18} />
                                {bankForm.processing ? "Menambahkan..." : "Tambah Rekening"}
                            </button>
                        </div>
                    </form>
                    
                    {bankAccounts.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600 border-collapse">
                                <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 border-b">Nama Bank</th>
                                        <th scope="col" className="px-6 py-3 border-b">Nomor Rekening</th>
                                        <th scope="col" className="px-6 py-3 border-b">Atas Nama</th>
                                        <th scope="col" className="px-6 py-3 text-center border-b">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bankAccounts.map((acc) => (
                                        <tr key={acc.id} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{acc.bank_name}</td>
                                            <td className="px-6 py-4">{acc.account_number}</td>
                                            <td className="px-6 py-4">{acc.account_holder}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => openConfirmDeleteBank(acc.id)}
                                                    className="p-2 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            
            <ConfirmDialog
                isOpen={confirmDeleteBankOpen}
                onClose={() => setConfirmDeleteBankOpen(false)}
                onConfirm={handleConfirmDeleteBank}
                title="Hapus Rekening Bank"
                message="Apakah Anda yakin ingin menghapus rekening bank ini? Tindakan ini tidak bisa dibatalkan."
            />
        </AdminLayout>
    );
}