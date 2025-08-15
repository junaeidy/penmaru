import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Head } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { Edit, Trash2, PlusCircle, Save, XCircle } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Index({ programStudis, fakultas }) {
    const { data, setData, post, put, reset } = useForm({
        fakultas_id: '',
        nama: '',
        harga_pendaftaran: ''
    });

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({
        isOpen: false,
        id: null,
        nama: ''
    });

    const openDeleteDialog = (id, nama) => {
        setDeleteDialog({ isOpen: true, id, nama });
    };

    const closeDeleteDialog = () => {
        setDeleteDialog({ isOpen: false, id: null, nama: '' });
    };

    const handleDelete = () => {
        Inertia.delete(route('admin.program-studi.destroy', deleteDialog.id), {
            onSuccess: () => {
                toast.success(`Program Studi "${deleteDialog.nama}" berhasil dihapus.`);
                closeDeleteDialog();
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    toast.error(error);
                });
                closeDeleteDialog();
            }
        });
    };

    function submit(e) {
        e.preventDefault();
        if (editMode) {
            put(route('admin.program-studi.update', editId), {
                onSuccess: () => {
                    toast.success('Program studi berhasil diperbarui.');
                    reset();
                    setEditMode(false);
                    setEditId(null);
                },
                onError: (errors) => {
                    Object.values(errors).forEach(error => toast.error(error));
                }
            });
        } else {
            post(route('admin.program-studi.store'), {
                onSuccess: () => {
                    toast.success('Program studi berhasil ditambahkan.');
                    reset();
                },
                onError: (errors) => {
                    Object.values(errors).forEach(error => toast.error(error));
                }
            });
        }
    }

    function startEdit(item) {
        setEditMode(true);
        setEditId(item.id);
        setData({
            fakultas_id: item.fakultas_id,
            nama: item.nama,
            harga_pendaftaran: item.harga_pendaftaran
        });
    }

    function cancelEdit() {
        reset();
        setEditMode(false);
        setEditId(null);
    }

    return (
        <AdminLayout header={"Manajemen Program Studi"}>
            <Head title='Manajemen Program Studi' />
            <ToastContainer />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Kelola Program Studi
                        </h2>

                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-8 p-6 bg-gray-50 border rounded-lg">
                            <div className="col-span-1 md:col-span-1">
                                <InputLabel htmlFor="fakultas_id" value="Fakultas" />
                                <select
                                    id="fakultas_id"
                                    value={data.fakultas_id}
                                    onChange={e => setData('fakultas_id', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                >
                                    <option value="">Pilih Fakultas</option>
                                    {fakultas.map(f => (
                                        <option key={f.id} value={f.id}>
                                            {f.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1 md:col-span-1">
                                <InputLabel htmlFor="nama" value="Nama Program Studi" />
                                <TextInput
                                    id="nama"
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('nama', e.target.value)}
                                    placeholder="Nama Program Studi"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-1">
                                <InputLabel htmlFor="harga_pendaftaran" value="Biaya Pendaftaran" />
                                <TextInput
                                    id="harga_pendaftaran"
                                    type="number"
                                    name="harga_pendaftaran"
                                    value={data.harga_pendaftaran}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('harga_pendaftaran', e.target.value)}
                                    placeholder="Biaya Pendaftaran"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2 flex gap-2">
                                <PrimaryButton className="w-full justify-center" disabled={!data.nama || !data.fakultas_id}>
                                    {editMode ? (
                                        <>
                                            <Save size={16} className="mr-2" />
                                            Perbarui
                                        </>
                                    ) : (
                                        <>
                                            <PlusCircle size={16} className="mr-2" />
                                            Tambah
                                        </>
                                    )}
                                </PrimaryButton>
                                {editMode && (
                                    <SecondaryButton onClick={cancelEdit} className="w-full justify-center">
                                        <XCircle size={16} className="mr-2" />
                                        Batal
                                    </SecondaryButton>
                                )}
                            </div>
                        </form>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 w-12">No</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className="px-6 py-3">Nama Program Studi</th>
                                        <th scope="col" className="px-6 py-3">Biaya Pendaftaran</th>
                                        <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {programStudis.length > 0 ? (
                                        programStudis.map((p, i) => (
                                            <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {i + 1}
                                                </td>
                                                <td className="px-6 py-4">{p.fakultas.nama}</td>
                                                <td className="px-6 py-4">{p.nama}</td>
                                                <td className="px-6 py-4">
                                                    Rp {parseInt(p.harga_pendaftaran).toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <PrimaryButton onClick={() => startEdit(p)} className="!bg-blue-500 hover:!bg-blue-600">
                                                            <Edit size={16} />
                                                        </PrimaryButton>
                                                        <DangerButton onClick={() => openDeleteDialog(p.id, p.nama)}>
                                                            <Trash2 size={16} />
                                                        </DangerButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                Belum ada data program studi.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={closeDeleteDialog}
                onConfirm={handleDelete}
                title="Hapus Program Studi"
                message={`Apakah Anda yakin ingin menghapus program studi "${deleteDialog.nama}"? Aksi ini tidak bisa dibatalkan.`}
            />
        </AdminLayout>
    );
}