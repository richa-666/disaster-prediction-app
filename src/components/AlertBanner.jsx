import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AlertBanner = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-red-600 text-white px-4 py-3 shadow-md flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 mr-2 animate-bounce" />
            <span className="font-bold text-sm md:text-base tracking-wide">{message}</span>
        </div>
    );
};

export default AlertBanner;
