import React from 'react';
import InputLabel from '@/Components/InputLabel';

export default function ReadOnly({ label, value }) {
    return (
        <div className="flex flex-col">
            <InputLabel value={label} className="text-gray-600 font-medium" />
            <p className="mt-1 p-3 bg-gray-100 rounded-lg border border-gray-200 text-gray-800 break-words">{value || '-'}</p>
        </div>
    );
}