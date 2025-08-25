import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSlider({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const goToSlide = (slideIndex) => {
    setCurrent(slideIndex);
  };

  if (slides.length === 0) {
    return (
      <section className="w-full h-[60vh] md:h-[85vh] flex items-center justify-center bg-gray-200">
        <p className="text-gray-500">Belum ada slide tersedia</p>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[60vh] md:h-[85vh] pt-[76px] sm:pt-[84px] overflow-hidden">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={`/storage/${slides[current].gambar}`}
              alt={`Slide ${slides[current].id}`}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === i
                ? "bg-white scale-125"
                : "bg-gray-400 opacity-70 hover:opacity-100"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
