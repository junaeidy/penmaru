import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { Menu, X, LogIn, UserPlus, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { props } = usePage();
  const user = props.auth?.user;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Informasi Pendaftaran", href: route("registration.info") },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo and Text */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Logo STAI Al-Hikmah"
            className="h-14 w-auto sm:h-16"
          />
          <div className="hidden md:inline-block leading-snug">
            <p className="text-md font-bold text-gray-900">STAI AL-Hikmah</p>
            <p className="text-sm text-gray-600">Pariangan Batusangkar</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <Link
              href={route("dashboard")}
              className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route("login")}
                className="px-5 py-2 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors duration-300 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link
                href={route("register")}
                className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Daftar
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu (Responsive) */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
      >
        <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
          <div className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={toggleMenu}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 border-b border-gray-100 pb-2"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <Link
                href={route("dashboard")}
                onClick={toggleMenu}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route("login")}
                  onClick={toggleMenu}
                  className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 border-b border-gray-100 pb-2"
                >
                  Login
                </Link>
                <Link
                  href={route("register")}
                  onClick={toggleMenu}
                  className="mt-2 w-full text-center px-5 py-2 bg-blue-600 text-white rounded-md font-semibold shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
}