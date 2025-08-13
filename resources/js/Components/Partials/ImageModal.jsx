import React from 'react';
import Modal from '@/Components/Modal'; 
import { X } from 'lucide-react';

export default function ImageModal({ show, imageUrl, onClose }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl" closeable={true}>
            {imageUrl && (
                <div className="relative p-4 bg-gray-900 rounded-lg shadow-xl">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        aria-label="Tutup"
                    >
                        <X />
                    </button>
                    <img
                        src={`/storage/${imageUrl}`}
                        alt="Gambar yang diperbesar"
                        className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                    />
                </div>
            )}
        </Modal>
    );
}