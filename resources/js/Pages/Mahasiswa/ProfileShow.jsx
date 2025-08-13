import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MahasiswaLayout from '@/Layouts/MahasiswaLayout';
import ReadOnly from '@/Components/Partials/ReadOnly';
import FilePreview from '@/Components/Partials/FilePreview';
import ImageModal from '@/Components/Partials/ImageModal';
import PrimaryButton from '@/Components/PrimaryButton';
import { ArrowLeft } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";

export default function ProfileShow({ auth, profile, flash }) {
    const [modalImage, setModalImage] = useState(null);

    const openModal = (url) => {
        setModalImage(url);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    useEffect(()=> {
        if(flash.message.success){
            toast.success(flash.message.success);
        }
        if(flash.message.error){
            toast.error(flash.message.error);
        }
    }, [flash]);

    return (
        <MahasiswaLayout
            user={auth.user}
            header="Profil Calon Mahasiswa"
        >
            <Head title="Profil Calon Mahasiswa" />
            <ToastContainer />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <Link href={route('dashboard')}>
                        <PrimaryButton className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </PrimaryButton>
                    </Link>

                    {/* Data Diri */}
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 border-b-2 pb-2 text-indigo-700">Data Diri</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReadOnly label="Nama Lengkap" value={auth.user.name} />
                            <ReadOnly label="Jenis Kelamin" value={profile.jenis_kelamin} />
                            <ReadOnly label="Tempat Lahir" value={profile.tempat_lahir} />
                            <ReadOnly label="Tanggal Lahir" value={profile.tanggal_lahir} />
                            <ReadOnly label="NIK" value={auth.user.nik} />
                            <ReadOnly label="Agama" value={profile.agama} />
                            <ReadOnly label="Alamat Lengkap" value={profile.alamat} />
                            <ReadOnly label="Nomor HP" value={profile.no_hp} />
                            <ReadOnly label="Email" value={auth.user.email} />
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
                            <ReadOnly label="Alamat Orang Tua" value={profile.alamat} />
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
                </div>
            </div>

            <ImageModal show={!!modalImage} imageUrl={modalImage} onClose={closeModal} />

        </MahasiswaLayout>
    );
}