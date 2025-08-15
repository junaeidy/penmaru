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

export default function Index({ fakultas }) {
    const { data, setData, post, put, reset } = useForm({ nama: '' });
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
        Inertia.delete(route('admin.fakultas.destroy', deleteDialog.id), {
            onSuccess: () => {
                toast.success(`Fakultas "${deleteDialog.nama}" berhasil dihapus.`);
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
            put(route('admin.fakultas.update', editId), {
                onSuccess: () => {
                    toast.success('Fakultas berhasil diperbarui.');
                    reset();
                    setEditMode(false);
                    setEditId(null);
                },
                onError: (errors) => {
                    Object.values(errors).forEach(error => {
                        toast.error(error);
                    });
                }
            });
        } else {
            post(route('admin.fakultas.store'), {
                onSuccess: () => {
                    toast.success('Fakultas berhasil ditambahkan.');
                    reset();
                },
                onError: (errors) => {
                    Object.values(errors).forEach(error => {
                        toast.error(error);
                    });
                }
            });
        }
    }

    function startEdit(item) {
        setEditMode(true);
        setEditId(item.id);
        setData({ nama: item.nama });
    }

    function cancelEdit() {
        reset();
        setEditMode(false);
        setEditId(null);
    }

    return (
        <AdminLayout header={"Manajemen Fakultas"}>
            <Head title='Manajemen Fakultas' />
            <ToastContainer />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Kelola Fakultas
                        </h2>
                        
                        <form onSubmit={submit} className="flex flex-col md:flex-row items-end gap-4 mb-8 p-6 bg-gray-50 border rounded-lg">
                            <div className="flex-grow w-full">
                                <InputLabel htmlFor="nama" value="Nama Fakultas" />
                                <TextInput
                                    id="nama"
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData('nama', e.target.value)}
                                    placeholder="Masukkan nama fakultas"
                                />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <PrimaryButton className="w-full justify-center" disabled={!data.nama}>
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
                                        <th scope="col" className="px-6 py-3">Nama Fakultas</th>
                                        <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fakultas.length > 0 ? (
                                        fakultas.map((f, i) => (
                                            <tr key={f.id} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {i + 1}
                                                </td>
                                                <td className="px-6 py-4">{f.nama}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <PrimaryButton onClick={() => startEdit(f)} className="!bg-blue-500 hover:!bg-blue-600">
                                                            <Edit size={16} />
                                                        </PrimaryButton>
                                                        <DangerButton onClick={() => openDeleteDialog(f.id, f.nama)}>
                                                            <Trash2 size={16} />
                                                        </DangerButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                                Belum ada data fakultas.
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
                title="Hapus Fakultas"
                message={`Apakah Anda yakin ingin menghapus fakultas "${deleteDialog.nama}"? Aksi ini tidak bisa dibatalkan.`}
            />
        </AdminLayout>
    );
}