import React from 'react';
import InputLabel from '@/Components/InputLabel';
import { FileImage } from 'lucide-react';

export default function FilePreview({ label, url, onClick }) {
    const fullUrl = url ? `/storage/${url}` : null;
    return (
        <div className="flex flex-col items-center">
            <InputLabel value={label} className="text-gray-600 font-medium mb-2" />
            {fullUrl ? (
                <button 
                    onClick={onClick} 
                    className="w-32 h-32 overflow-hidden rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <img
                        src={fullUrl}
                        alt={label}
                        className="w-full h-full object-cover"
                    />
                </button>
            ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 flex-col">
                    <FileImage className="text-4xl mb-2" />
                    <p className="text-xs text-center">Tidak ada file</p>
                </div>
            )}
        </div>
    );
}