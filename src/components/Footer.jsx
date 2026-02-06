import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-4">
                    <h4 className="text-white font-bold text-lg">{t('appTitle')}</h4>
                    <p className="text-sm text-slate-400">{t('footer.tagline')}</p>
                </div>
                <div className="border-t border-slate-800 my-6"></div>
                <p className="text-sm">{t('footer.copyright')}</p>
                <p className="text-xs text-slate-500 mt-2">{t('footer.emergency')}</p>
            </div>
        </footer>
    );
};

export default Footer;
