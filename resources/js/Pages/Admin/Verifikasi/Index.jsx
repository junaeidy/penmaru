import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Search, ChevronDown, FileText, FileSpreadsheet, Eye } from 'lucide-react';

export default function Index({ profiles, flash, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

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
            case 'diverifikasi':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Diverifikasi</span>;
            case 'menunggu verifikasi':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Menunggu Verifikasi</span>;
            case 'diterima':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Diterima</span>;
            case 'ditolak':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Ditolak</span>;
            case 'selesai ujian':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Selesai Ujian</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Draft</span>;
        }
    };

    return (
        <AdminLayout header={'Verifikasi Pendaftaran'}>
            <Head title="Verifikasi Pendaftaran" />
            <ToastContainer />

            <div>
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 sm:p-6 lg:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                        Daftar Calon Mahasiswa
                    </h1>

                    {/* Kontrol Filter dan Export */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                        {/* Dropdown Export */}
                        <div className="relative inline-block text-left w-full md:w-auto">
                            <button
                                type="button"
                                onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
                                className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-sm font-medium text-white hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Export
                                <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                            </button>
                            {isExportDropdownOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <a href={route("admin.mahasiswa.export.pdf", { search, status })} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" role="menuitem">
                                            <FileText className="mr-2 h-4 w-4" /> Export PDF
                                        </a>
                                        <a href={route("admin.mahasiswa.export.excel", { search, status })} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" role="menuitem">
                                            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            <select
                                value={status}
                                onChange={handleStatusChange}
                                className="w-full md:w-auto rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="menunggu verifikasi">Menunggu Verifikasi</option>
                                <option value="draft">Draft</option>
                                <option value="diverifikasi">Diverifikasi</option>
                                <option value="selesai ujian">Selesai Ujian</option>
                                <option value="diterima">Diterima</option>
                                <option value="ditolak">Ditolak</option>
                            </select>

                            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="Cari..."
                                    className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </form>
                        </div>
                    </div>

                    {/* Tabel Data */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No Registrasi</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">NIK</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {profiles.data.length > 0 ? (
                                    profiles.data.map((profile, index) => (
                                        <tr key={profile.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{profile.nomor_pendaftaran}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{profile.user.nik}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{profile.user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{profile.user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {getStatusBadge(profile.status_pendaftaran)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <Link
                                                    href={route('verifikasi.show', profile.id)}
                                                    className="inline-flex items-center px-4 py-2 rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Lihat Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                                            Tidak ada data calon mahasiswa yang cocok.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {profiles.data.length > 0 && profiles.last_page > 1 && (
                        <div className="mt-8 flex justify-center">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="›"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                pageCount={profiles.last_page}
                                previousLabel="‹"
                                renderOnZeroPageCount={null}
                                containerClassName="flex items-center space-x-2"
                                pageLinkClassName="px-3 py-1 border rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                                previousLinkClassName="px-3 py-1 border rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                                nextLinkClassName="px-3 py-1 border rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                                activeLinkClassName="!bg-indigo-600 !text-white hover:!bg-indigo-700"
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