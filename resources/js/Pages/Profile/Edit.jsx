import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
            <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
                {/* Bagian Perbarui Informasi Profil */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                {/* Bagian Perbarui Kata Sandi */}
                    <UpdatePasswordForm />
            </div>
    );
}