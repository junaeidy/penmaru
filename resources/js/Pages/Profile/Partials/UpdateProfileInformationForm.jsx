import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { User, MailCheck, Save, CheckCircle } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-6 flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-full">
                    <User size={24} className="text-gray-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Informasi Profil
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Perbarui informasi nama dan email akun Anda.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Input Nama */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-sm font-semibold text-gray-700 mb-2" />
                    <TextInput
                        id="name"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Input Email */}
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-sm font-semibold text-gray-700 mb-2" />
                    <TextInput
                        id="email"
                        type="email"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Status Verifikasi Email */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg flex items-start gap-3">
                        <MailCheck size={20} className="flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold">Alamat email Anda belum diverifikasi.</p>
                            <p className="text-sm mt-1">
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-yellow-800 underline hover:text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    Klik di sini untuk mengirim ulang email verifikasi.
                                </Link>
                            </p>
                        </div>
                    </div>
                )}
                {status === 'verification-link-sent' && (
                    <div className="mt-2 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                        <CheckCircle size={18} />
                        <span className="text-sm">Tautan verifikasi baru telah dikirim ke alamat email Anda.</span>
                    </div>
                )}

                {/* Tombol Aksi */}
                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton
                        type="submit"
                        disabled={processing}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform ${
                            processing ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
                        }`}
                    >
                        {processing ? (
                            <span>Menyimpan...</span>
                        ) : (
                            <>
                                <Save size={18} />
                                <span>Simpan</span>
                            </>
                        )}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in-out duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="flex items-center text-sm font-semibold text-green-600 gap-1.5">
                            <CheckCircle size={16} />
                            <span>Tersimpan!</span>
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}