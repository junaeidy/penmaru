import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Trash2 } from "lucide-react";
import MahasiswaLayout from "@/Layouts/MahasiswaLayout";
import { ToastContainer, toast } from "react-toastify";
import ReadOnly from "@/Components/Partials/ReadOnly";

const formatRupiah = (angka) => {
    let number_string = angka.replace(/[^,\d]/g, "").toString();
    let split = number_string.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah ? "Rp " + rupiah : "";
};

const unformatRupiah = (rupiah) => {
    const numericValue = parseInt(rupiah.replace(/[^,\d]/g, "").toString());
    return isNaN(numericValue) ? 0 : numericValue;
};

const PendidikanOptions = [
    "Tidak Sekolah",
    "SD / Sederajat",
    "SMP / Sederajat",
    "SMA / Sederajat",
    "Diploma (D1, D2, D3)",
    "Sarjana (S1)",
    "Magister (S2)",
    "Doktor (S3)",
];

const FormInput = ({ label, id, type = "text", ...props }) => (
    <div>
        <InputLabel htmlFor={id} value={label} className="text-sm font-medium text-gray-700 dark:text-gray-300" />
        <TextInput id={id} type={type} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out" {...props} />
        <InputError message={props.error} className="mt-2" />
    </div>
);

const FormSelect = ({ label, id, options, ...props }) => (
    <div>
        <InputLabel htmlFor={id} value={label} className="text-sm font-medium text-gray-700 dark:text-gray-300" />
        <select
            id={id}
            {...props}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
            <option value="">Pilih...</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <InputError message={props.error} className="mt-2" />
    </div>
);

const FileUploader = ({ label, id, preview, onFileChange, onRemoveFile, error }) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-dashed border-gray-300 dark:border-gray-700">
        <InputLabel htmlFor={id} value={label} className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" />
        <div className="flex items-center space-x-2">
            <input
                id={id}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-700 dark:file:text-indigo-50 dark:hover:file:bg-indigo-600 transition-colors"
            />
            {preview && (
                <button
                    type="button"
                    onClick={onRemoveFile}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    title="Hapus gambar"
                >
                    <Trash2 size={20} />
                </button>
            )}
        </div>
        {preview && (
            <img src={preview} alt="Preview" className="mt-4 h-32 object-cover rounded-lg shadow-md" />
        )}
        <InputError message={error} className="mt-2" />
    </div>
);

export default function ProfileForm({ auth, profile }) {
    const initialPreviews = {
        foto_ktp: profile.foto_ktp ? `/storage/${profile.foto_ktp}` : null,
        foto_kk: profile.foto_kk ? `/storage/${profile.foto_kk}` : null,
        ijazah: profile.ijazah ? `/storage/${profile.ijazah}` : null,
        skhu: profile.skhu ? `/storage/${profile.skhu}` : null,
        pas_foto: profile.pas_foto ? `/storage/${profile.pas_foto}` : null,
    };

    const { data, setData, post, processing, errors } = useForm({
        jenis_kelamin: profile.jenis_kelamin || "",
        tempat_lahir: profile.tempat_lahir || "",
        tanggal_lahir: profile.tanggal_lahir || "",
        agama: profile.agama || "",
        alamat: profile.alamat || "",
        no_hp: profile.no_hp || "",
        status_perkawinan: profile.status_perkawinan || "",
        kewarganegaraan: profile.kewarganegaraan || "",
        nama_ayah: profile.nama_ayah || "",
        nama_ibu: profile.nama_ibu || "",
        pekerjaan_ayah: profile.pekerjaan_ayah || "",
        pekerjaan_ibu: profile.pekerjaan_ibu || "",
        no_hp_orangtua: profile.no_hp_orangtua || "",
        alamat_orangtua: profile.alamat_orangtua || "",
        pendidikan_ayah: profile.pendidikan_ayah || "",
        pendidikan_ibu: profile.pendidikan_ibu || "",
        penghasilan_ayah: profile.penghasilan_ayah || "",
        penghasilan_ibu: profile.penghasilan_ibu || "",
        nama_sekolah: profile.nama_sekolah || "",
        jurusan: profile.jurusan || "",
        tahun_lulus: profile.tahun_lulus || "",
        fakultas_id: profile?.fakultas || "",
        program_studi_id: profile?.program_studi || "",
        foto_ktp: null,
        foto_kk: null,
        ijazah: null,
        skhu: null,
        pas_foto: null,
    });

    const [previews, setPreviews] = useState(initialPreviews);

    const handlePenghasilanChange = (e, field) => {
        const value = formatRupiah(e.target.value);
        setData(field, value);
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setData(field, file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => ({ ...prev, [field]: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setPreviews((prev) => ({ ...prev, [field]: null }));
        }
    };

    const removeFile = (field) => {
        setData(field, null);
        setPreviews((prev) => ({ ...prev, [field]: null }));
        const inputElement = document.getElementById(field);
        if (inputElement) {
            inputElement.value = "";
        }
    };

   const submit = (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            penghasilan_ayah: String(unformatRupiah(data.penghasilan_ayah)),
            penghasilan_ibu: String(unformatRupiah(data.penghasilan_ibu)),
            _method: 'PUT',
        };
        post(route('mahasiswa.profile.update'), {
            ...payload,
            _method: 'PUT',
        }, {
            forceFormData: true,
            preserveScroll: true,
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    toast.error(error);
                });
            }
        });
    };
    return (
        <MahasiswaLayout header={"Profile Form Mahasiswa"}>
            <Head title="Profile Form" />
            <ToastContainer />
            <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-gray-50 dark:bg-gray-800 shadow-xl rounded-2xl">
                <form onSubmit={submit} className="space-y-8" encType="multipart/form-data">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-indigo-500 pb-2">
                            Data Jurusan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="md:col-span-1 lg:col-span-1">
                                <ReadOnly label="Fakultas" value={profile?.fakultas?.nama || '-'} />
                            </div>
                            <div className="md:col-span-1 lg:col-span-1">
                                <ReadOnly label="Program Studi" value={profile?.program_studi?.nama || '-'} />
                            </div>
                            <div className="md:col-span-1 lg:col-span-1">
                                <ReadOnly
                                    label="Tanggal Daftar"
                                    value={
                                        profile?.created_at
                                            ? new Date(profile.created_at).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : "-"
                                        }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-indigo-500 pb-2">
                            Data Diri Mahasiswa
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="md:col-span-1 lg:col-span-1">
                                <InputLabel value="Jenis Kelamin" />
                                <div className="mt-2 flex space-x-6">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="jenis_kelamin"
                                            value="Laki-laki"
                                            checked={data.jenis_kelamin === "Laki-laki"}
                                            onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                            className="form-radio text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">Laki-laki</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="jenis_kelamin"
                                            value="Perempuan"
                                            checked={data.jenis_kelamin === "Perempuan"}
                                            onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                            className="form-radio text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">Perempuan</span>
                                    </label>
                                </div>
                                <InputError message={errors.jenis_kelamin} className="mt-2" />
                            </div>
                            <FormInput
                                label="Tempat Lahir"
                                id="tempat_lahir"
                                value={data.tempat_lahir}
                                onChange={(e) => setData("tempat_lahir", e.target.value)}
                                error={errors.tempat_lahir}
                            />
                            <FormInput
                                label="Tanggal Lahir"
                                id="tanggal_lahir"
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={(e) => setData("tanggal_lahir", e.target.value)}
                                error={errors.tanggal_lahir}
                            />
                            <FormSelect
                                label="Agama"
                                id="agama"
                                options={["Islam", "Kristen Protestan", "Kristen Katolik", "Hindu", "Buddha", "Konghucu"]}
                                value={data.agama}
                                onChange={(e) => setData("agama", e.target.value)}
                                error={errors.agama}
                            />
                            <div className="md:col-span-2 lg:col-span-3">
                                <FormInput
                                    label="Alamat"
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) => setData("alamat", e.target.value)}
                                    error={errors.alamat}
                                />
                            </div>
                            <FormInput
                                label="Nomor HP / WhatsApp"
                                id="no_hp"
                                value={data.no_hp}
                                onChange={(e) => setData("no_hp", e.target.value)}
                                error={errors.no_hp}
                            />
                            <FormSelect
                                label="Status Perkawinan"
                                id="status_perkawinan"
                                options={["Belum Kawin", "Kawin", "Janda", "Duda"]}
                                value={data.status_perkawinan}
                                onChange={(e) => setData("status_perkawinan", e.target.value)}
                                error={errors.status_perkawinan}
                            />
                            <FormInput
                                label="Kewarganegaraan"
                                id="kewarganegaraan"
                                value={data.kewarganegaraan}
                                onChange={(e) => setData("kewarganegaraan", e.target.value)}
                                error={errors.kewarganegaraan}
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-indigo-500 pb-2">
                            Data Orang Tua / Wali
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FormInput
                                label="Nama Ayah"
                                id="nama_ayah"
                                value={data.nama_ayah}
                                onChange={(e) => setData("nama_ayah", e.target.value)}
                                error={errors.nama_ayah}
                            />
                            <FormSelect
                                label="Pendidikan Ayah"
                                id="pendidikan_ayah"
                                options={PendidikanOptions}
                                value={data.pendidikan_ayah}
                                onChange={(e) => setData("pendidikan_ayah", e.target.value)}
                                error={errors.pendidikan_ayah}
                            />
                            <FormInput
                                label="Pekerjaan Ayah"
                                id="pekerjaan_ayah"
                                value={data.pekerjaan_ayah}
                                onChange={(e) => setData("pekerjaan_ayah", e.target.value)}
                                error={errors.pekerjaan_ayah}
                            />
                            <FormInput
                                label="Penghasilan Ayah"
                                id="penghasilan_ayah"
                                value={data.penghasilan_ayah}
                                onChange={(e) => handlePenghasilanChange(e, "penghasilan_ayah")}
                                error={errors.penghasilan_ayah}
                            />
                            <FormInput
                                label="Nama Ibu"
                                id="nama_ibu"
                                value={data.nama_ibu}
                                onChange={(e) => setData("nama_ibu", e.target.value)}
                                error={errors.nama_ibu}
                            />
                            <FormSelect
                                label="Pendidikan Ibu"
                                id="pendidikan_ibu"
                                options={PendidikanOptions}
                                value={data.pendidikan_ibu}
                                onChange={(e) => setData("pendidikan_ibu", e.target.value)}
                                error={errors.pendidikan_ibu}
                            />
                            <FormInput
                                label="Pekerjaan Ibu"
                                id="pekerjaan_ibu"
                                value={data.pekerjaan_ibu}
                                onChange={(e) => setData("pekerjaan_ibu", e.target.value)}
                                error={errors.pekerjaan_ibu}
                            />
                            <FormInput
                                label="Penghasilan Ibu"
                                id="penghasilan_ibu"
                                value={data.penghasilan_ibu}
                                onChange={(e) => handlePenghasilanChange(e, "penghasilan_ibu")}
                                error={errors.penghasilan_ibu}
                            />
                            <div className="md:col-span-2 lg:col-span-3">
                                <FormInput
                                    label="Alamat Orang Tua"
                                    id="alamat_orangtua"
                                    value={data.alamat_orangtua}
                                    onChange={(e) => setData("alamat_orangtua", e.target.value)}
                                    error={errors.alamat_orangtua}
                                />
                            </div>
                            <FormInput
                                label="Nomor HP Orang Tua"
                                id="no_hp_orangtua"
                                value={data.no_hp_orangtua}
                                onChange={(e) => setData("no_hp_orangtua", e.target.value)}
                                error={errors.no_hp_orangtua}
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-indigo-500 pb-2">
                            Pendidikan Sebelumnya
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FormInput
                                label="Nama Sekolah"
                                id="nama_sekolah"
                                value={data.nama_sekolah}
                                onChange={(e) => setData("nama_sekolah", e.target.value)}
                                error={errors.nama_sekolah}
                            />
                            <FormInput
                                label="Jurusan"
                                id="jurusan"
                                value={data.jurusan}
                                onChange={(e) => setData("jurusan", e.target.value)}
                                error={errors.jurusan}
                            />
                            <FormInput
                                label="Tahun Lulus"
                                id="tahun_lulus"
                                value={data.tahun_lulus}
                                onChange={(e) => setData("tahun_lulus", e.target.value)}
                                error={errors.tahun_lulus}
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-indigo-500 pb-2">
                            Berkas Calon Mahasiswa
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {["foto_ktp", "foto_kk", "ijazah", "skhu", "pas_foto"].map((field) => (
                                <FileUploader
                                    key={field}
                                    label={field.replace(/_/g, " ").toUpperCase()}
                                    id={field}
                                    preview={previews[field]}
                                    onFileChange={(e) => handleFileChange(e, field)}
                                    onRemoveFile={() => removeFile(field)}
                                    error={errors[field]}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end mt-8">
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            className={`bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 transition-colors py-3 px-8 text-lg font-semibold rounded-full ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            Simpan Data
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </MahasiswaLayout>
    );
}