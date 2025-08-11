import React from 'react';
import Dropdown from '@/Components/Dropdown';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { ChevronDown, Bell, Search } from 'lucide-react';

export default function Header({ onToggleSidebar, header, user }) {
    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between z-30 relative">
            {/* Tombol Toggle & Logo */}
            <div className="flex items-center">
                <button
                    onClick={onToggleSidebar}
                    className="text-gray-500 hover:text-gray-700 md:hidden mr-4"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
                <div className="hidden md:block">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </div>
                <div className="ml-4 font-semibold text-gray-800 text-lg">
                    {header}
                </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
            </div>

            {/* Profil & Notifikasi */}
            <div className="flex items-center space-x-4">
                {/* Ikon Notifikasi */}
                <button className="relative p-2 rounded-full hover:bg-gray-100">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Dropdown User */}
                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                                        alt={user.name}
                                        className="w-6 h-6 rounded-full mr-2"
                                    />
                                    {user.name}
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
