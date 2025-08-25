import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex items-center space-x-2" // Menambahkan z-[9999]
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm shadow-lg font-medium whitespace-nowrap"
          >
            Hubungi Kami
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/6285365366684"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path></svg>
      </a>
    </div>
  );
}