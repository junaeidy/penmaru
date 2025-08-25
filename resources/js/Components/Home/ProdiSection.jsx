import { BookOpen, Mic } from "lucide-react";

export default function ProdiSection() {
  const prodis = [
    {
      id: 1,
      title: "Pendidikan Agama Islam",
      icon: <BookOpen size={48} />,
      desc: "Membekali mahasiswa dengan ilmu keislaman, pendidikan, dan metodologi pengajaran modern.",
    },
    {
      id: 2,
      title: "Komunikasi dan Penyiaran Islam",
      icon: <Mic size={48} />,
      desc: "Mengembangkan keterampilan komunikasi, jurnalistik, dan dakwah melalui media modern.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-center text-blue-900 text-3xl font-bold mb-10 md:mb-12">
          PROGRAM STUDI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prodis.map((prodi) => (
            <div
              key={prodi.id}
              className="bg-yellow-400 rounded-3xl p-8 flex flex-col items-center text-center border border-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-blue-500 transform hover:-translate-y-1"
            >
              <div className="text-blue-600 mb-6 transition-transform duration-300 group-hover:scale-110">
                {prodi.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {prodi.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 mt-2 max-w-sm">
                {prodi.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}