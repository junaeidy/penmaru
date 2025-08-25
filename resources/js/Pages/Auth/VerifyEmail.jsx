import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, LogOut } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            {/* Container form dengan styling yang konsisten */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
                <div className="mb-6 flex justify-center">
                    <Mail className="w-16 h-16 text-indigo-500" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Verifikasi Alamat Email Anda</h2>
                
                {/* Deskripsi form yang lebih ramah dan informatif */}
                <div className="mt-4 text-sm text-gray-600">
                    Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan ke email Anda.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mt-4 mb-4 text-sm font-medium text-green-600">
                        Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                    </div>
                )}
                
                {/* Bagian tombol dan tautan */}
                <form onSubmit={submit} className="mt-6">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        {processing ? 'Memproses...' : 'Kirim Ulang Email Verifikasi'}
                    </PrimaryButton>
                </form>

                <div className="mt-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center mx-auto justify-center rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <LogOut className="w-4 h-4 mr-1" />
                        Keluar
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
