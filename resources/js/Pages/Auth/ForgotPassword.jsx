import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Mail } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            {/* Container form dengan styling yang konsisten */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Lupa Password?</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Tidak masalah. Cukup masukkan alamat email Anda, dan kami akan mengirimkan tautan untuk mengatur ulang password Anda.
                    </p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Masukkan alamat email"
                            />
                        </div>
                            <InputError message={errors.email} className="mt-2" />
                    </div>

                    <PrimaryButton className="w-full justify-center mt-6" disabled={processing}>
                        {processing ? 'Memproses...' : 'Kirim Tautan Reset Password'}
                    </PrimaryButton>
                </form>
            </div>
        </GuestLayout>
    );
}
