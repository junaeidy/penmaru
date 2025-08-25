import { Link } from "@inertiajs/react";
import {
  Calendar,
  Workflow,
  Banknote,
  FileImage,
  ChevronRight,
} from "lucide-react";

export default function InfoSection() {
  const items = [
    { id: 1, title: "JADWAL PENDAFTARAN", icon: <Calendar size={40} />, link: "/registration-info" },
    { id: 2, title: "ALUR PENDAFTARAN", icon: <Workflow size={40} />, link: "/registration-info" },
    { id: 3, title: "RINCIAN BIAYA", icon: <Banknote size={40} />, link: "/registration-info" },
  ];

  return (
    <section className="bg-blue-600 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Judul */}
        <h2 className="text-center text-white text-3xl font-bold mb-10 md:mb-12">
          INFORMASI PENERIMAAN MAHASISWA BARU
        </h2>

        {/* Grid Kartu */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="bg-yellow-400 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Ikon */}
              <div className="text-blue-900 mb-4 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              {/* Teks */}
              <p className="font-bold text-blue-900 text-base md:text-lg">
                {item.title}
              </p>
              {/* Panah */}
              <ChevronRight className="w-5 h-5 text-blue-900 mt-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ))}
          
          {/* Tautan Brosur dengan tag <a> */}
          <a
            href="https://drive.google.com/file/d/1cFP4ff0Kkuhcv0MsQRsHHHhW8bMQOuIk/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
          >
            {/* Ikon */}
            <div className="text-blue-900 mb-4 transition-transform duration-300 group-hover:scale-110">
              <FileImage size={40} />
            </div>
            {/* Teks */}
            <p className="font-bold text-blue-900 text-base md:text-lg">
              BROSUR
            </p>
            {/* Panah */}
            <ChevronRight className="w-5 h-5 text-blue-900 mt-2 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}