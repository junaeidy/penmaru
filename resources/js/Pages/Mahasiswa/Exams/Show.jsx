import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { Clock, ArrowLeft, ArrowRight, CheckCircle, PanelLeft, X } from 'lucide-react';

export default function Show({ exam }) {
  const { data, setData, post, processing } = useForm({
    answers: {},
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem(`exam_${exam.id}_timeLeft`);
    return storedTime ? parseInt(storedTime, 10) : exam.duration * 60;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExamActive, setIsExamActive] = useState(false);
  const [attemptViolations, setAttemptViolations] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const examContainerRef = useRef(null);

  useEffect(() => {
    if (isExamActive && timeLeft <= 0) {
      alert("⏰ Waktu habis! Jawaban kamu otomatis dikirim.");
      handleSubmit();
      return;
    }

    if (isExamActive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          localStorage.setItem(`exam_${exam.id}_timeLeft`, newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, exam.id, isExamActive]);

  useEffect(() => {
    if (!isExamActive || isSubmitting) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("⚠️ Peringatan: Anda mencoba beralih halaman. Tindakan ini akan dicatat sebagai pelanggaran!");
        setAttemptViolations((prev) => prev + 1);
        if (attemptViolations >= 2) {
          alert("❌ Anda telah melakukan 3 pelanggaran. Ujian Anda akan dihentikan!");
          handleSubmit();
        }
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("⚠️ Peringatan: Anda keluar dari mode layar penuh. Masuk kembali untuk melanjutkan ujian.");
        
        setTimeout(() => {
          enterFullscreen();
        }, 500);
        
        setAttemptViolations((prev) => prev + 1);
        if (attemptViolations >= 2) {
          alert("❌ Anda telah melakukan 3 pelanggaran. Ujian Anda akan dihentikan!");
          handleSubmit();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [attemptViolations, isExamActive, isSubmitting]);

  const enterFullscreen = () => {
    if (examContainerRef.current) {
      try {
        examContainerRef.current.requestFullscreen().then(() => {
          setIsExamActive(true);
        }).catch((err) => {
          console.error("Gagal memasuki mode layar penuh:", err);
          alert(`Gagal memasuki mode layar penuh: ${err.message}`);
          setIsExamActive(true);
        });
      } catch (err) {
        console.error("Kesalahan umum saat mencoba fullscreen:", err);
        alert(`Terjadi kesalahan. Silakan coba muat ulang halaman.`);
      }
    } else {
      console.error("Referensi examContainerRef.current tidak ditemukan.");
      alert("Terjadi kesalahan teknis. Mohon muat ulang halaman.");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleChange = (questionId, value) => {
    setData("answers", {
      ...data.answers,
      [questionId]: value,
    });
  };

  const handleMultiSelect = (questionId, optionId) => {
    const current = data.answers[questionId] || [];
    let updated = [];
    if (current.includes(optionId)) {
      updated = current.filter((id) => id !== optionId);
    } else {
      updated = [...current, optionId];
    }
    setData("answers", {
      ...data.answers,
      [questionId]: updated,
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    localStorage.removeItem(`exam_${exam.id}_timeLeft`);
    post(route("mahasiswa.exams.submit", exam.id), {
        onSuccess: () => {
            setIsSubmitting(false);
        },
        onFinish: () => {
            setIsSubmitting(false);
        }
    });
  };

  const isAnswered = (questionId) => {
    const ans = data.answers[questionId];
    return (
      ans &&
      (typeof ans === "string" || typeof ans === "number"
        ? ans !== ""
        : ans.length > 0)
    );
  };

  const allQuestionsAnswered = exam.questions.every((q) => isAnswered(q.id));
  
  return (
    <>
      <Head title={exam.title} />
      <div ref={examContainerRef} className="min-h-screen flex flex-col bg-gray-100 font-sans">
        {!isExamActive ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                {exam.title}
              </h1>
              <p className="text-gray-600 mb-6">
                Ujian akan dimulai dalam mode layar penuh. Pastikan Anda tidak keluar dari mode ini sampai selesai.
              </p>
              <p className="text-sm font-semibold text-red-500 mb-6">
                Pelanggaran (keluar layar penuh atau beralih tab) akan membatalkan ujian.
              </p>
              <button
                onClick={enterFullscreen}
                className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition"
              >
                Mulai Ujian
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="md:hidden sticky top-0 bg-white shadow-md px-4 py-2 z-10 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg bg-gray-100 text-gray-700"
              >
                <PanelLeft size={18} />
              </button>
              <div className="flex-1 text-center">
                <span className="text-xs font-semibold text-gray-700">Sisa Waktu</span>
                <span className={`block text-lg font-bold ${timeLeft <= 60 ? "text-red-600 animate-pulse" : "text-green-600"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered || processing || isSubmitting}
                className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md transition disabled:bg-gray-400"
              >
                Kirim
              </button>
            </div>

            <div
              className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 z-20 transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:hidden`}
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-gray-800">Daftar Soal</h3>
                  <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-800">
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3 overflow-y-auto">
                  {exam.questions.map((question, idx) => (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => {
                        setCurrentQuestion(idx);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition
                        ${currentQuestion === idx
                          ? "bg-purple-600 text-white shadow-md scale-105"
                          : isAnswered(question.id)
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              ></div>
            )}

            <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 md:p-8 gap-6">
              <div className="flex-1 bg-white p-6 rounded-xl shadow-lg h-full">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{exam.title}</h1>
                <p className="text-gray-500 mb-6 text-sm">{exam.description}</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {exam.questions[currentQuestion] && (
                    <div key={exam.questions[currentQuestion].id} className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg text-gray-700">
                          Soal {currentQuestion + 1}
                        </h2>
                        <span className="text-sm text-gray-500">
                          dari {exam.questions.length}
                        </span>
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed mb-6">{exam.questions[currentQuestion].question_text}</p>
                      
                      <div className="space-y-4">
                        {exam.questions[currentQuestion].answer_type === "text" && (
                          <textarea
                            value={data.answers[exam.questions[currentQuestion].id] || ""}
                            onChange={(e) => handleChange(exam.questions[currentQuestion].id, e.target.value)}
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                            placeholder="Tulis jawaban kamu di sini..."
                          ></textarea>
                        )}
                        {exam.questions[currentQuestion].answer_type === "select" && (
                          <select
                            value={data.answers[exam.questions[currentQuestion].id] || ""}
                            onChange={(e) => handleChange(exam.questions[currentQuestion].id, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 bg-white"
                          >
                            <option value="">-- Pilih Jawaban --</option>
                            {exam.questions[currentQuestion].options.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.option_text}
                              </option>
                            ))}
                          </select>
                        )}
                        {["radio", "multiselect"].includes(exam.questions[currentQuestion].answer_type) && (
                          <div className="space-y-3">
                            {exam.questions[currentQuestion].options.map((opt) => (
                              <label
                                key={opt.id}
                                className="flex items-center p-3 rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50 transition"
                              >
                                <input
                                  type={exam.questions[currentQuestion].answer_type === "radio" ? "radio" : "checkbox"}
                                  name={`question-${exam.questions[currentQuestion].id}`}
                                  value={opt.id}
                                  checked={
                                    exam.questions[currentQuestion].answer_type === "radio"
                                      ? data.answers[exam.questions[currentQuestion].id] === opt.id
                                      : (data.answers[exam.questions[currentQuestion].id] || []).includes(opt.id)
                                  }
                                  onChange={() =>
                                    exam.questions[currentQuestion].answer_type === "radio"
                                      ? handleChange(exam.questions[currentQuestion].id, opt.id)
                                      : handleMultiSelect(exam.questions[currentQuestion].id, opt.id)
                                  }
                                  className="mr-3 text-purple-600 focus:ring-purple-500 h-5 w-5"
                                />
                                <span className="text-gray-700">{opt.option_text}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                      disabled={currentQuestion === 0}
                      className={`px-4 py-2 rounded-full font-semibold transition text-sm ${
                        currentQuestion === 0
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      <ArrowLeft className="inline-block mr-1 w-4 h-4" />
                      Sebelumnya
                    </button>
                    
                    {currentQuestion < exam.questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, exam.questions.length - 1))}
                        disabled={!isAnswered(exam.questions[currentQuestion].id)}
                        className={`px-4 py-2 rounded-full font-semibold transition text-sm ${
                          !isAnswered(exam.questions[currentQuestion].id)
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                      >
                        Selanjutnya
                        <ArrowRight className="inline-block ml-1 w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!allQuestionsAnswered || processing || isSubmitting}
                        className={`px-4 py-2 rounded-full font-semibold transition text-sm ${
                          !allQuestionsAnswered || processing || isSubmitting
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {processing || isSubmitting ? 'Mengirim...' : 'Selesai & Kirim'}
                        <CheckCircle className="inline-block ml-1 w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
              
              <div className="hidden md:block w-72 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-8">
                <div className="flex items-center justify-center border-b pb-4 mb-4">
                  <Clock className="w-6 h-6 text-gray-500 mr-3" />
                  <div className="text-center">
                    <span className="block text-sm font-semibold text-gray-700">Sisa Waktu</span>
                    <span className={`block text-2xl font-bold ${timeLeft <= 60 ? "text-red-600 animate-pulse" : "text-green-600"}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 mb-3">Daftar Soal</h3>
                <div className="grid grid-cols-5 gap-3">
                  {exam.questions.map((question, idx) => (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => setCurrentQuestion(idx)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition
                        ${currentQuestion === idx
                          ? "bg-purple-600 text-white shadow-md scale-105"
                          : isAnswered(question.id)
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered || processing || isSubmitting}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition disabled:bg-gray-400"
                  >
                    {processing || isSubmitting ? 'Mengirim...' : 'Selesai & Kirim Semua Jawaban'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}