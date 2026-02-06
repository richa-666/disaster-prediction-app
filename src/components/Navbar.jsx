import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <ShieldAlert className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight">{t('appTitle')}</span>
                </Link>
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition text-sm uppercase tracking-wide">{t('nav.home')}</Link>
                    <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition text-sm uppercase tracking-wide">{t('nav.dashboard')}</Link>
                    <LanguageSelector />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
