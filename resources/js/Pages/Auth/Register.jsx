import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, User, LockKeyhole, Fingerprint } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nik: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Container yang lebih responsif dengan padding yang disesuaikan */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Buat Akun Baru</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Isi data diri Anda untuk mendaftar.
                    </p>
                </div>

                <form onSubmit={submit}>
                    {/* Menggunakan grid untuk menumpuk pada mobile dan berdampingan pada desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-4">
                        <div className="mb-4 md:mb-0">
                            <InputLabel htmlFor="nik" value="NIK" />
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Fingerprint className="w-5 h-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="nik"
                                    type="number"
                                    name="nik"
                                    value={data.nik}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                    autoComplete="off"
                                    isFocused={true}
                                    onChange={(e) => setData('nik', e.target.value)}
                                    required
                                    placeholder="Masukkan NIK Anda"
                                />
                                <InputError message={errors.nik} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" />
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    placeholder="Masukkan nama lengkap Anda"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="Masukkan email Anda"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <div className="mb-4 md:mb-0">
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <LockKeyhole className="w-5 h-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    placeholder="Buat password Anda"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <LockKeyhole className="w-5 h-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    placeholder="Konfirmasi password Anda"
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    <PrimaryButton className="w-full justify-center mt-6" disabled={processing}>
                        {processing ? 'Memproses...' : 'Daftar'}
                    </PrimaryButton>
                </form>

                <div className="mt-4 text-center text-sm">
                    Sudah punya akun?{' '}
                    <Link
                        href={route('login')}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Masuk
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
