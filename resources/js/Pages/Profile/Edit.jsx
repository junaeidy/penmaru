import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-8">
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
        </div>
    );
}