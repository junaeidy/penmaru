import { Link } from "@inertiajs/react";
import { MoveRight, ArrowRight, ArrowRightCircle } from "lucide-react";

export default function InfoBar() {
  return (
    <div className="bg-yellow-400 text-white shadow-inner py-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4">
        {/* Teks dengan Ikon WhatsApp */}
        <p className="text-center md:text-left text-black text-md md:text-base font-bold flex items-center gap-2">
          KONSULTASI PENDAFTARAN VIA WHATSAPP: 0853-6536-6684
        </p>

        {/* Tombol */}
        <Link
          href={route("register")}
          className="group relative inline-flex items-center gap-2 px-6 py-2 text-sm md:text-base font-semibold text-blue-600 bg-white rounded-full shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
        >
          <span className="relative z-10">Daftar Sekarang</span>
          <ArrowRightCircle className="w-4 h-4 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}