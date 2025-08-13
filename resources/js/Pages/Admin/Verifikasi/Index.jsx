import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { router } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';

export default function Index({ profiles, flash, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    useEffect(() => {
        if (flash.message?.success) {
            toast.success(flash.message.success);
        }
        if (flash.message?.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    const handleFilter = (newSearch = search, newStatus = status) => {
        router.get(route('verifikasi.index'), { search: newSearch, status: newStatus }, { preserveState: true, replace: true });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleFilter(search, status);
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        handleFilter(search, newStatus);
    };

    const handlePageClick = (event) => {
        const pageNumber = event.selected + 1;
        router.get(route('verifikasi.index', { page: pageNumber, search: search, status: status }), {}, { preserveState: true, replace: true });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'menunggu verifikasi':
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Menunggu Verifikasi</span>;
            case 'diterima':
                return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Diterima</span>;
            case 'ditolak':
                return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Ditolak</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">Draft</span>;
        }
    };

    return (
        <AdminLayout
            header={'Verifikasi Pendaftaran'}
        >
            <Head title="Verifikasi Pendaftaran" />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Daftar Calon Mahasiswa</h1>
                    
                    {/* Search and Filter Section */}
                    <div className="mb-4">
                        <div className="flex items-center space-x-2">
                            {/* Dropdown Filter Status */}
                            <select
                                value={status}
                                onChange={handleStatusChange}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Semua Status</option>
                                <option value="menunggu verifikasi">Menunggu Verifikasi</option>
                                <option value="draft">Draft</option>
                                <option value="diterima">Diterima</option>
                                <option value="ditolak">Ditolak</option>
                            </select>

                            {/* Search Input */}
                            <form onSubmit={handleSearchSubmit} className="flex-grow">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="Cari NIK, nama, atau email..."
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </form>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {profiles.data.length > 0 ? (
                                    profiles.data.map((profile) => (
                                        <tr key={profile.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{profile.user.nik}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{profile.user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{profile.user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(profile.status_pendaftaran)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <Link
                                                    href={route('verifikasi.show', profile.id)}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Tidak ada data calon mahasiswa yang cocok.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Section */}
                    {profiles.data.length > 0 && profiles.last_page > 1 && (
                        <div className="mt-4 flex justify-center">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="&raquo;"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                pageCount={profiles.last_page}
                                previousLabel="&laquo;"
                                renderOnZeroPageCount={null}
                                containerClassName="flex items-center space-x-2"
                                pageLinkClassName="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-200"
                                previousLinkClassName="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-200"
                                nextLinkClassName="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-200"
                                activeLinkClassName="!bg-indigo-600 !text-white"
                                disabledLinkClassName="opacity-50 cursor-not-allowed"
                                forcePage={profiles.current_page - 1}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}