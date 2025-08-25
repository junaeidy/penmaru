import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Link as LinkIcon,
  ChevronsRight,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Hubungi Kami</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="mt-1 flex-shrink-0 text-blue-400" />
              <p className="flex-1">Jorong Padang Panjang Pariangan No. 17 Kec. Pariangan Kab. Tanah Datar, West Sumatra, Indonesia.</p>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="flex-shrink-0 text-blue-400" />
              <span>085379388533</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="flex-shrink-0 text-blue-400" />
              <a href="mailto:info@staialhikmahpariangan.ac.id" className="hover:underline">info@staialhikmahpariangan.ac.id</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Tautan Cepat</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <ChevronsRight size={16} /> Beranda
              </Link>
            </li>
            <li>
              <Link href={route("registration.info")} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <ChevronsRight size={16} /> Informasi Pendaftaran
              </Link>
            </li>
            <li>
              <a href="https://staialhikmahpariangan.ac.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <ChevronsRight size={16} /> Website Utama
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Peta Lokasi</h2>
          <div className="rounded-lg overflow-hidden shadow-lg aspect-w-16 aspect-h-9 md:aspect-h-12 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15957.399507116962!2d100.56943141221147!3d-0.4287661502444551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd53b819f6a27e7%3A0x633d7b81966d5b03!2sSTAI%20Al-Hikmah%20Pariangan!5e0!3m2!1sid!2sid!4v1691234567890!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-6 text-white">Ikuti Kami</h2>
          <ul className="flex gap-4 text-blue-400">
            <li>
              <a href="https://www.instagram.com/staialhikmahpariangan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={28} className="hover:text-white transition-colors" />
              </a>
            </li>
            <li>
              <a href="http://facebook.com/staialhikmahpariangan.ac.id/?locale=id_ID" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={28} className="hover:text-white transition-colors" />
              </a>
            </li>
            <li>
              <a href="https://linktr.ee/staialhikmahpariangan" target="_blank" rel="noopener noreferrer" aria-label="Linktree">
                <LinkIcon size={28} className="hover:text-white transition-colors" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bagian Copyright */}
      <div className="bg-blue-950 text-center py-4 text-xs md:text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} STAI Al-Hikmah Pariangan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}