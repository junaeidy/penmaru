import { Link } from "@inertiajs/react";

export default function JoinUsSection() {
  return (
    <section className="bg-blue-900 py-16">
      <div className="container mx-auto px-6 text-center text-white">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Bergabunglah Bersama Kami!
        </h2>
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Jadilah bagian dari kampus kami dan wujudkan masa depan cerah bersama
          Program Studi unggulan. Ayo segera daftar dan raih kesempatan emasmu!
        </p>

        {/* Tombol */}
        <Link
          href={route("register")}
          className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
        >
          Daftar Sekarang
        </Link>
      </div>
    </section>
  );
}
