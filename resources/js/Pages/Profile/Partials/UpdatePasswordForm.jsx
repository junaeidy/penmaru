import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Lock, Save, CheckCircle } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`p-6 bg-white rounded-2xl shadow-xl ${className}`}>
            <header className="mb-6 flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-full">
                    <Lock size={24} className="text-gray-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Perbarui Kata Sandi
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Gunakan kata sandi yang kuat dan unik untuk menjaga keamanan akun Anda.
                    </p>
                </div>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                {/* Kata Sandi Saat Ini */}
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Kata Sandi Saat Ini"
                        className="text-sm font-semibold text-gray-700 mb-2"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                {/* Kata Sandi Baru */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Baru" className="text-sm font-semibold text-gray-700 mb-2" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Konfirmasi Kata Sandi */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="text-sm font-semibold text-gray-700 mb-2"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Tombol Aksi dan Feedback */}
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