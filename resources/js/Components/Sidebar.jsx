import React, { useState, useEffect } from "react";
import NavLink from "@/Components/NavLink";
import { LayoutDashboard, User, FilePen, ChevronDown, GraduationCap, Building, BookOpen, Megaphone, ClipboardCheck, Settings } from "lucide-react";
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Sidebar({ isSidebarOpen, userRole, user }) {
  const [open, setOpen] = useState(false);

  const isJurusanMenuOpen = route().current('admin.fakultas.*') || route().current('admin.program-studi.*');
    useEffect(() => {
      if (isJurusanMenuOpen) {
        setOpen(true);
      }
    }, [isJurusanMenuOpen]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 z-40 shadow-lg`}
    >
      {/* Header */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-700">
          <ApplicationLogo className="block h-9 w-auto fill-current text-blue-600" />
        <span className="text-lg font-semibold tracking-wide">
          Dashboard Panel
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1 overflow-y-auto custom-scrollbar px-2">
        {userRole === "admin" && (
          <>
            <NavLink
              href={route("admin.dashboard")}
              active={route().current("admin.dashboard")}
              icon={<LayoutDashboard className="w-5 h-5" />}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </NavLink>
            <NavLink
              href={route("verifikasi.index")}
              active={route().current("verifikasi.*")}
              icon={<User className="w-5 h-5" />}
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              Calon Mahasiswa
            </NavLink>
            <NavLink
              href={route("admin.exams.index")}
              active={route().current("admin.exams.*")}
              icon={<ClipboardCheck className="w-5 h-5" />}
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              Manajemen Ujian
            </NavLink>
            <div>
            {/* Menu Utama */}
            <button
                onClick={() => setOpen(!open)}
                  className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                      open || isJurusanMenuOpen
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
            >
                <span className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5" />
                    Manajemen Jurusan
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Submenu */}
            {open && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                    <NavLink
                        href={route('admin.fakultas.index')}
                        active={route().current('admin.fakultas.*')}
                        className="px-3 py-1.5 rounded hover:bg-gray-600 hover:text-white transition"
                    >
                        <Building className="w-4 h-4 mr-1" />
                        Fakultas
                    </NavLink>
                    <NavLink
                        href={route('admin.program-studi.index')}
                        active={route().current('admin.program-studi.*')}
                        className="px-3 py-1.5 rounded hover:bg-gray-600 hover:text-white transition"
                    >
                        <BookOpen className="w-4 h-4 mr-1" />
                        Program Studi
                    </NavLink>
                </div>
            )}
            <NavLink
              href={route("admin.announcements.index")}
              active={route().current("admin.announcements.*")}
              icon={<Megaphone className="w-5 h-5" />}
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              Pengumuman
            </NavLink>
        </div>
          </>
        )}

        {userRole === "mahasiswa" && (
          <>
            <NavLink
              href={route("dashboard")}
              active={route().current("dashboard")}
              icon={<LayoutDashboard className="w-5 h-5" />}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </NavLink>
            <NavLink
              href={route("mahasiswa.profile.create")}
              active={route().current("mahasiswa.profile.*")}
              icon={<FilePen className="w-5 h-5" />}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              Formulir Data Diri
            </NavLink>
            <NavLink
              href={route("mahasiswa.settings")}
              active={route().current("mahasiswa.settings")}
              icon={<Settings className="w-5 h-5" />}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              Pengaturan
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}
