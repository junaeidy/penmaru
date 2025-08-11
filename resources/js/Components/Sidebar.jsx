import React from "react";
import NavLink from "@/Components/NavLink";
import { LayoutDashboard } from "lucide-react";

export default function Sidebar({ isSidebarOpen, userRole }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 z-40 shadow-lg`}
    >
      {/* Header */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-700">
        <div className="bg-yellow-500 text-gray-900 font-bold w-10 h-10 flex items-center justify-center rounded-lg">
          DP
        </div>
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
          </>
        )}
      </nav>
    </div>
  );
}
