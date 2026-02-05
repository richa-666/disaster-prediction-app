import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-4">
                    <h4 className="text-white font-bold text-lg">DisasterGuard</h4>
                    <p className="text-sm text-slate-400">AI-Powered Risk Assessment & Prediction</p>
                </div>
                <div className="border-t border-slate-800 my-6"></div>
                <p className="text-sm">© 2024 DisasterGuard System. All rights reserved.</p>
                <p className="text-xs text-slate-500 mt-2">Emergency Contact: 112 (Universal) | 911 (US)</p>
            </div>
        </footer>
    );
};

export default Footer;
