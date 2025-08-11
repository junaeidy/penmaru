import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';

export default function MahasiswaLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const userRole = usePage().props.auth.user.role;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {userRole === 'mahasiswa' && (
                <>
                    <Sidebar isSidebarOpen={isSidebarOpen} userRole={userRole} />
                    {/* Overlay untuk mobile */}
                    {isSidebarOpen && (
                        <div
                            onClick={toggleSidebar}
                            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden"
                        ></div>
                    )}
                </>
            )}

            {/* Konten Utama */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
                    userRole === 'mahasiswa' ? 'md:ml-64' : 'ml-0'
                }`}
            >
                {/* Header/Navbar */}
                <Header onToggleSidebar={toggleSidebar} header={header} user={user} />

                {/* Konten Halaman */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-50 border-t border-gray-200 py-6">
                    <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-gray-600 text-sm">
                        <p className="flex items-center space-x-1">
                            <span>© {new Date().getFullYear()}</span>
                            <span className="font-semibold">Dashboard Panel</span>
                            <span>• All rights reserved.</span>
                        </p>

                        <div className="flex space-x-4 mt-3 sm:mt-0">
                            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}