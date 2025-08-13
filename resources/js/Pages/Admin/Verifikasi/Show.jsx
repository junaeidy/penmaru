import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import ReadOnly from '@/Components/Partials/ReadOnly';
import FilePreview from '@/Components/Partials/FilePreview';
import { ArrowLeft } from 'lucide-react';
import ImageModal from '@/Components/Partials/ImageModal';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ToastContainer, toast } from 'react-toastify';

export default function Show({ profile }) {
    const [modalImage, setModalImage] = useState(null);
    const openModal = (img) => setModalImage(img);
    const closeModal = () => setModalImage(null);

    const { data, setData, put, processing } = useForm({
        status_pendaftaran: 'diverifikasi',
        catatan_perbaikan: ''
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('verifikasi.update', profile.id), {
            onSuccess: () => {
                toast.success('Status pendaftaran berhasil diperbarui.');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat memperbarui status pendaftaran.');
            }
        });
    };

    return (
       <AdminLayout
            header={'Verifikasi Pendaftaran'}
       >
        <Head title="Verifikasi Pendaftaran" />
        <ToastContainer />
         <div className="py-8">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-8">
                <Link href={route('verifikasi.index')}>
                    <PrimaryButton className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </PrimaryButton>
                </Link>

                {/* Data Diri */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 border-b-2 pb-2 text-indigo-700">Data Diri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ReadOnly label="Nama Lengkap" value={profile.user.name} />
                        <ReadOnly label="Jenis Kelamin" value={profile.jenis_kelamin} />
                        <ReadOnly label="Tempat Lahir" value={profile.tempat_lahir} />
                        <ReadOnly label="Tanggal Lahir" value={profile.tanggal_lahir} />
                        <ReadOnly label="NIK" value={profile.user.nik} />
                        <ReadOnly label="Agama" value={profile.agama} />
                        <ReadOnly label="Alamat Lengkap" value={profile.alamat} />
                        <ReadOnly label="Nomor HP" value={profile.no_hp} />
                        <ReadOnly label="Email" value={profile.user.email} />
                        <ReadOnly label="Status Perkawinan" value={profile.status_perkawinan} />
                        <ReadOnly label="Kewarganegaraan" value={profile.kewarganegaraan} />
                    </div>
                </section>

                {/* Data Orang Tua */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 border-b-2 pb-2 text-indigo-700">Data Orang Tua / Wali</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ReadOnly label="Nama Ayah" value={profile.nama_ayah} />
                        <ReadOnly label="Pekerjaan Ayah" value={profile.pekerjaan_ayah} />
                        <ReadOnly label="Pendidikan Ayah" value={profile.pendidikan_ayah} />
                        <ReadOnly label="Penghasilan Ayah" value={profile.penghasilan_ayah} />
                        <ReadOnly label="Nama Ibu" value={profile.nama_ibu} />
                        <ReadOnly label="Pekerjaan Ibu" value={profile.pekerjaan_ibu} />
                        <ReadOnly label="Pendidikan Ibu" value={profile.pendidikan_ibu} />
                        <ReadOnly label="Penghasilan Ibu" value={profile.penghasilan_ibu} />
                        <ReadOnly label="Nomor HP Orang Tua" value={profile.no_hp_orangtua} />
                        <ReadOnly label="Alamat Orang Tua" value={profile.alamat_orangtua} />
                    </div>
                </section>

                {/* Pendidikan Sebelumnya */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 border-b-2 pb-2 text-indigo-700">Pendidikan Sebelumnya</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ReadOnly label="Nama Sekolah" value={profile.nama_sekolah} />
                        <ReadOnly label="Jurusan" value={profile.jurusan} />
                        <ReadOnly label="Tahun Lulus" value={profile.tahun_lulus} />
                    </div>
                </section>

                {/* Berkas */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 border-b-2 pb-2 text-indigo-700">Berkas Calon Mahasiswa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FilePreview label="Foto KTP" url={profile.foto_ktp} onClick={() => openModal(profile.foto_ktp)} />
                        <FilePreview label="Foto KK" url={profile.foto_kk} onClick={() => openModal(profile.foto_kk)} />
                        <FilePreview label="Ijazah" url={profile.ijazah} onClick={() => openModal(profile.ijazah)} />
                        <FilePreview label="SKHU / SKL" url={profile.skhu} onClick={() => openModal(profile.skhu)} />
                        <FilePreview label="Pas Foto" url={profile.pas_foto} onClick={() => openModal(profile.pas_foto)} />
                    </div>
                </section>

                {/* Form Verifikasi */}
                {profile.status_pendaftaran === 'menunggu verifikasi' && (
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 border-b-2 pb-2 text-indigo-700">
                            Verifikasi Pendaftaran
                        </h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label>Status:</label>
                                <select
                                    value={data.status_pendaftaran}
                                    onChange={(e) =>
                                        setData("status_pendaftaran", e.target.value)
                                    }
                                    className="border p-2 w-full rounded"
                                >
                                    <option value="diverifikasi">Diterima untuk Pembayaran</option>
                                    <option value="draft">Perlu Perbaikan Data</option>
                                    <option value="ditolak">Ditolak</option>
                                </select>
                            </div>

                            <div>
                                <label>Catatan Perbaikan:</label>
                                <textarea
                                    value={data.catatan_perbaikan}
                                    onChange={(e) =>
                                        setData("catatan_perbaikan", e.target.value)
                                    }
                                    className="border p-2 w-full rounded"
                                />
                            </div>

                            <PrimaryButton disabled={processing}>
                                Simpan
                            </PrimaryButton>
                        </form>
                    </section>
                )}
            </div>

            <ImageModal show={!!modalImage} imageUrl={modalImage} onClose={closeModal} />
        </div>
       </AdminLayout>
    );
}
