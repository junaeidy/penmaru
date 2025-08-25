import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { LockKeyhole } from 'lucide-react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Password" />

            {/* Container form dengan styling yang konsisten */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Konfirmasi Password</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Ini adalah area aman aplikasi. Harap konfirmasi password Anda sebelum melanjutkan.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div>
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
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Masukkan password Anda"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </div>

                    <PrimaryButton className="w-full justify-center mt-6" disabled={processing}>
                        {processing ? 'Memproses...' : 'Konfirmasi'}
                    </PrimaryButton>
                </form>
            </div>
        </GuestLayout>
    );
}
