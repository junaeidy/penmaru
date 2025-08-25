import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowLeft, ArrowRight, Check, Trash2 } from "lucide-react";
import MahasiswaLayout from "@/Layouts/MahasiswaLayout";
import { ToastContainer, toast } from "react-toastify";

const formatRupiah = (angka) => {
    let number_string = angka.replace(/[^,\d]/g, '').toString();
    let split = number_string.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah ? 'Rp ' + rupiah : '';
};

const unformatRupiah = (rupiah) => {
    return parseInt(rupiah.replace(/[^,\d]/g, '').toString());
};


export default function ProfileForm({ auth, fakultas, programStudis }) {
    const steps = [
        "Data Diri Mahasiswa",
        "Data Orang Tua / Wali",
        "Pendidikan Sebelumnya",
        "Berkas Calon Mahasiswa",
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        // Step 1
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "",
        alamat: "",
        no_hp: "",
        status_perkawinan: "",
        kewarganegaraan: "",
        fakultas_id: "",
        program_studi_id: "",

        // Step 2
        nama_ayah: "",
        nama_ibu: "",
        pekerjaan_ayah: "",
        pekerjaan_ibu: "",
        no_hp_orangtua: "",
        alamat_orangtua: "",
        pendidikan_ayah: "",
        pendidikan_ibu: "",
        penghasilan_ayah: "",
        penghasilan_ibu: "",

        // Step 3
        nama_sekolah: "",
        jurusan: "",
        tahun_lulus: "",

        // Step 4
        foto_ktp: null,
        foto_kk: null,
        ijazah: null,
        skhu: null,
        pas_foto: null,
        bukti_pembayaran: null,
    });
    
    const [filteredProgramStudis, setFilteredProgramStudis] = useState([]);
    useEffect(() => {
        if (data.fakultas_id) {
            const filtered = programStudis.filter(
            (ps) => ps.fakultas_id == data.fakultas_id
            );
            setFilteredProgramStudis(filtered);
            if (!filtered.some(ps => ps.id == data.program_studi_id)) {
                setData("program_studi_id", "");
            }
        } else {
            setFilteredProgramStudis([]);
        }
    }, [data.fakultas_id, programStudis]);

    const [previews, setPreviews] = useState({});

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

    const stepFields = [
        ["jenis_kelamin", "tempat_lahir", "tanggal_lahir", "agama", "alamat", "no_hp", "status_perkawinan", "kewarganegaraan"],
        ["nama_ayah", "nama_ibu", "pekerjaan_ayah", "pekerjaan_ibu", "no_hp_orangtua", "alamat_orangtua", "pendidikan_ayah", "pendidikan_ibu", "penghasilan_ayah", "penghasilan_ibu"],
        ["nama_sekolah", "jurusan", "tahun_lulus"],
        ["foto_ktp", "foto_kk", "ijazah", "skhu", "pas_foto", "bukti_pembayaran"],
    ];

    const validateStep = () => {
        const fieldsToCheck = stepFields[currentStep];
        const isValid = fieldsToCheck.every((field) => data[field] && data[field] !== "");
        if (!isValid) {
            toast.error("Harap isi semua field sebelum melanjutkan.");
        }
        return isValid;
    };

    const nextStep = () => {
        if (validateStep()) setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const isStepComplete = (stepIndex) => {
    const fields = stepFields[stepIndex];
        if (!fields) return false;

        return fields.every(field => {
            const value = data[field];
            if (field.startsWith('foto_') || field === 'ijazah' || field === 'skhu' || field === 'pas_foto' || field === 'bukti_pembayaran') {
                return value !== null;
            }
            return value && value.toString().trim() !== "";
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        const dataToSend = {
            ...data,
            penghasilan_ayah: unformatRupiah(data.penghasilan_ayah),
            penghasilan_ibu: unformatRupiah(data.penghasilan_ibu),
        };

        post(route("mahasiswa.profile.store"), {
            data: dataToSend,
            forceFormData: true,

            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    toast.error(error);
                });
            }
        });
    };

    const pendidikanOptions = [
        "Tidak Sekolah",
        "SD / Sederajat",
        "SMP / Sederajat",
        "SMA / Sederajat",
        "Diploma (D1, D2, D3)",
        "Sarjana (S1)",
        "Magister (S2)",
        "Doktor (S3)",
    ];
    
    const renderStepFields = () => {
        switch (currentStep) {
            case 0:
                return (
                    <>
                        <div className="mt-4">
                            <InputLabel value="Fakultas" />
                            <select
                            value={data.fakultas_id}
                            onChange={(e) => setData("fakultas_id", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                            <option value="">Pilih Fakultas...</option>
                            {fakultas.map((f) => (
                                <option key={f.id} value={f.id}>
                                {f.nama}
                                </option>
                            ))}
                            </select>
                            <InputError message={errors.fakultas_id} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel value="Program Studi" />
                            <select
                            value={data.program_studi_id}
                            onChange={(e) => setData("program_studi_id", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            disabled={!data.fakultas_id}
                            >
                            <option value="">Pilih Program Studi...</option>
                            {filteredProgramStudis.map((ps) => (
                                <option key={ps.id} value={ps.id}>
                                {ps.nama}
                                </option>
                            ))}
                            </select>
                            <InputError message={errors.program_studi_id} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Jenis Kelamin" />
                            <div className="mt-2 flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="jenis_kelamin"
                                        value="Laki-laki"
                                        checked={data.jenis_kelamin === "Laki-laki"}
                                        onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                        className="form-radio text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Laki-laki</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="jenis_kelamin"
                                        value="Perempuan"
                                        checked={data.jenis_kelamin === "Perempuan"}
                                        onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                        className="form-radio text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Perempuan</span>
                                </label>
                            </div>
                            <InputError message={errors.jenis_kelamin} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Tempat Lahir" />
                            <TextInput value={data.tempat_lahir} onChange={(e) => setData("tempat_lahir", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.tempat_lahir} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Tanggal Lahir" />
                            <TextInput type="date" value={data.tanggal_lahir} onChange={(e) => setData("tanggal_lahir", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.tanggal_lahir} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Agama" />
                            <select
                                value={data.agama}
                                onChange={(e) => setData("agama", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Pilih...</option>
                                <option value="Islam">Islam</option>
                                <option value="Kristen Protestan">Kristen Protestan</option>
                                <option value="Kristen Katolik">Kristen Katolik</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Buddha">Buddha</option>
                                <option value="Konghucu">Konghucu</option>
                            </select>
                            <InputError message={errors.agama} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Alamat" />
                            <TextInput value={data.alamat} onChange={(e) => setData("alamat", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.alamat} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Nomor HP / WhatsApp" />
                            <TextInput value={data.no_hp} onChange={(e) => setData("no_hp", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.no_hp} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Status Perkawinan" />
                            <select
                                value={data.status_perkawinan}
                                onChange={(e) => setData("status_perkawinan", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Pilih...</option>
                                <option value="Belum Kawin">Belum Kawin</option>
                                <option value="Kawin">Kawin</option>
                                <option value="Janda">Janda</option>
                                <option value="Duda">Duda</option>
                            </select>
                            <InputError message={errors.status_perkawinan} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Kewarganegaraan" />
                            <TextInput value={data.kewarganegaraan} onChange={(e) => setData("kewarganegaraan", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.kewarganegaraan} className="mt-2" />
                        </div>
                    </>
                );
            case 1:
                return (
                    <>
                        <div className="mt-4">
                            <InputLabel value="Nama Ayah" />
                            <TextInput value={data.nama_ayah} onChange={(e) => setData("nama_ayah", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.nama_ayah} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Pendidikan Ayah" />
                            <select
                                value={data.pendidikan_ayah}
                                onChange={(e) => setData("pendidikan_ayah", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Pilih...</option>
                                {pendidikanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <InputError message={errors.pendidikan_ayah} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Pekerjaan Ayah" />
                            <TextInput value={data.pekerjaan_ayah} onChange={(e) => setData("pekerjaan_ayah", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.pekerjaan_ayah} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Penghasilan Ayah" />
                            <TextInput 
                                value={data.penghasilan_ayah} 
                                onChange={(e) => handlePenghasilanChange(e, "penghasilan_ayah")} 
                                className="mt-1 block w-full" 
                            />
                            <InputError message={errors.penghasilan_ayah} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Nama Ibu" />
                            <TextInput value={data.nama_ibu} onChange={(e) => setData("nama_ibu", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.nama_ibu} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Pendidikan Ibu" />
                            <select
                                value={data.pendidikan_ibu}
                                onChange={(e) => setData("pendidikan_ibu", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Pilih...</option>
                                {pendidikanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <InputError message={errors.pendidikan_ibu} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Pekerjaan Ibu" />
                            <TextInput value={data.pekerjaan_ibu} onChange={(e) => setData("pekerjaan_ibu", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.pekerjaan_ibu} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Penghasilan Ibu" />
                            <TextInput 
                                value={data.penghasilan_ibu} 
                                onChange={(e) => handlePenghasilanChange(e, "penghasilan_ibu")} 
                                className="mt-1 block w-full" 
                            />
                            <InputError message={errors.penghasilan_ibu} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Alamat Orang Tua" />
                            <TextInput value={data.alamat_orangtua} onChange={(e) => setData("alamat_orangtua", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.alamat_orangtua} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Nomor HP Orang Tua" />
                            <TextInput value={data.no_hp_orangtua} onChange={(e) => setData("no_hp_orangtua", e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.no_hp_orangtua} className="mt-2" />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        {["nama_sekolah", "jurusan", "tahun_lulus"].map((field, i) => (
                            <div className="mt-4" key={i}>
                                <InputLabel value={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} />
                                <TextInput value={data[field]} onChange={(e) => setData(field, e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors[field]} className="mt-2" />
                            </div>
                        ))}
                    </>
                );
            case 3:
                return (
                    <>
                        {["foto_ktp", "foto_kk", "ijazah", "skhu", "pas_foto", "bukti_pembayaran"].map((field, i) => (
                            <div className="mt-4" key={i}>
                                <InputLabel value={field.replace(/_/g, " ").toUpperCase()} />
                                <div className="flex items-center space-x-2">
                                    <input
                                        id={field}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, field)}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {previews[field] && (
                                        <button
                                            type="button"
                                            onClick={() => removeFile(field)}
                                            className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-full hover:bg-gray-100"
                                            title="Hapus gambar"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                                {previews[field] && (
                                    <img src={previews[field]} alt="Preview" className="mt-2 h-32 object-cover rounded-md shadow-sm" />
                                )}
                                <InputError message={errors[field]} className="mt-2" />
                            </div>
                        ))}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <MahasiswaLayout
            header={"Profile Form Mahasiswa"}
        >
            <Head title="Profile Form" />
            <ToastContainer />
            <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-xl rounded-2xl">
                {/* Stepper */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                    {steps.map((step, index) => (
                        <div
                        key={index}
                        className={`
                            flex items-center
                            ${index > 0 ? 'mt-4 sm:mt-0 sm:ml-4' : ''}
                            ${index === steps.length - 1 && steps.length > 1 ? 'sm:flex-1' : ''}
                        `}
                        >
                        <div
                            className={`
                            flex items-center justify-center
                            w-8 h-8 rounded-full
                            text-white text-sm font-bold
                            ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'}
                            `}
                        >
                            {index < currentStep ? <Check size={16} /> : index + 1}
                        </div>
                        <span className="ml-2 text-xs sm:text-sm">{step}</span>
                        {index < steps.length - 1 && (
                            <div className="ml-2 flex-1 border-t-2 border-gray-300 hidden sm:block"></div>
                        )}
                        </div>
                    ))}
                </div>

                <form onSubmit={submitForm}>
                    {renderStepFields()}
                    <div className="flex justify-between mt-8">
                        {currentStep > 0 && (
                            <PrimaryButton type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600">
                                <ArrowLeft size={16} className="mr-2" /> Sebelumnya
                            </PrimaryButton>
                        )}
                        <div className="ml-auto">
                            {currentStep < steps.length - 1 ? (
                                <PrimaryButton 
                                    type="button" 
                                    onClick={nextStep} 
                                    disabled={!isStepComplete(currentStep)}
                                >
                                    Selanjutnya <ArrowRight size={16} className="ml-2" />
                                </PrimaryButton>
                            ) : (
                                <PrimaryButton 
                                    type="submit" 
                                    disabled={processing || !isStepComplete(currentStep)} 
                                    className="bg-green-500 hover:bg-green-600"
                                >
                                    Simpan
                                </PrimaryButton>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </MahasiswaLayout>
    );
}