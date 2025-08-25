import Footer from "@/Components/Home/Footer";
import Navbar from "@/Components/Home/Navbar";
import { Head, useForm } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import WhatsAppButton from "@/Components/Home/WhatsAppButton";

export default function RegistrationInfo({ flash, settings, bankAccounts, informasi }) {
  useEffect(() => {
    if (flash.message) {
      if (flash.message.success) {
        toast.success(flash.message.success);
      }
      if (flash.message.error) {
        toast.error(flash.message.error);
      }
    }
  }, [flash]);

  const requirementsForm = useForm({
      requirements: settings.registration_requirements
          ? JSON.parse(settings.registration_requirements)
          : [],
  });

  const biayaAktif = useMemo(() => {
    const today = new Date();

    const aktif = informasi.find((item) => {
      const mulai = new Date(item.tanggal_mulai);
      const selesai = new Date(item.tanggal_selesai);
      return today >= mulai && today <= selesai;
    });

    return aktif ? aktif.biaya_pendaftaran : null;
  }, [informasi]);

  const sections = [
    {
      title: "Syarat Pendaftaran",
      content: (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {requirementsForm.data.requirements.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">✓</span>
              <p className="text-base md:text-lg">{item}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Jalur & Waktu Pendaftaran",
      content: (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-sm md:px-6 font-semibold uppercase tracking-wider">Jalur</th>
                <th className="px-4 py-3 text-sm md:px-6 font-semibold uppercase tracking-wider">Waktu</th>
                <th className="px-4 py-3 text-sm md:px-6 font-semibold uppercase tracking-wider">Kegiatan</th>
                <th className="px-4 py-3 text-sm md:px-6 font-semibold uppercase tracking-wider">Biaya</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
              {informasi.length > 0 ? (
                informasi.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    {/* Jalur */}
                    <td className="px-4 py-3 md:px-6 whitespace-nowrap">{item.jalur}</td>

                    {/* Waktu (tanggal_mulai - tanggal_selesai) */}
                    <td className="px-4 py-3 md:px-6 whitespace-nowrap">
                      {new Date(item.tanggal_mulai).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(item.tanggal_selesai).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>

                    {/* Kegiatan */}
                    <td className="px-4 py-3 md:px-6 whitespace-nowrap">{item.kegiatan}</td>

                    {/* Biaya */}
                    <td className="px-4 py-3 md:px-6 whitespace-nowrap">
                      Rp {Number(item.biaya_pendaftaran).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 md:px-6 text-center text-gray-500">
                    Belum ada informasi pendaftaran
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Alur Pendaftaran",
      content: (
        <ol className="relative border-l-2 border-dashed border-blue-300 space-y-8 pl-8 md:pl-12">
          {[
            { step: "1", title: "Registrasi Online", desc: "Mengisi formulir pendaftaran secara online di website resmi." },
            { step: "2", title: "Pembayaran", desc: "Melakukan pembayaran biaya pendaftaran melalui rekening bank yang ditentukan." },
            { step: "3", title: "Unggah Berkas", desc: "Mengunggah dokumen yang diperlukan, seperti ijazah, KTP, dan pas foto dll." },
            { step: "4", title: "Tes & Wawancara", desc: "Mengikuti ujian tertulis dan wawancara sesuai jadwal." },
            { step: "5", title: "Pengumuman", desc: "Hasil seleksi akan diumumkan secara resmi melalui website PMB." },
          ].map((item, index) => (
            <li key={index} className="relative">
              <span className="absolute -left-12 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full ring-4 ring-white shadow-lg text-white font-bold text-lg">{item.step}</span>
              <div className="bg-white p-5 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]">
                <h3 className="font-bold text-lg md:text-xl text-blue-700">{item.title}</h3>
                <p className="text-gray-600 mt-1 text-sm md:text-base">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "Biaya Pendaftaran",
      content: (
        <div className="bg-blue-50 p-6 md:p-8 rounded-2xl shadow-inner text-center">
          <p className="text-gray-800 text-lg md:text-xl font-medium mb-4">
            Biaya pendaftaran mahasiswa baru adalah sebesar{" "}
            <span className="font-extrabold text-blue-600 text-2xl md:text-3xl block mt-2">
              {biayaAktif
                ? `Rp ${Number(biayaAktif).toLocaleString("id-ID")}`
                : "Belum ada periode aktif"}
            </span>
          </p>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Pembayaran dapat dilakukan melalui rekening bank berikut:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {bankAccounts.map((bank, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-lg text-gray-900">
                  {bank.bank_name}
                </h4>
                <p className="font-mono text-gray-600 mt-1">{bank.account_number}</p>
                <p className="text-sm text-gray-500">a.n. {bank.account_holder}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    }
  ];

  return (
    <>
      <Navbar />
      <Head title="Informasi Pendaftaran" />
      <ToastContainer />

      <div className="bg-gray-50 min-h-screen pt-24">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Informasi Pendaftaran
            </h1>
            <p className="mt-2 text-base md:text-xl font-light opacity-90">
              Mahasiswa Baru Tahun Akademik {settings.academic_year}<br/>STAI Al-Hikmah Pariangan Batusangkar
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 -mt-16 relative z-20 space-y-10 md:space-y-16">
          {sections.map((section, index) => (
            <section
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-4 border-blue-500 pb-4 mb-6 md:mb-8">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </main>
      </div>
      <WhatsAppButton />

      <Footer />
    </>
  );
}