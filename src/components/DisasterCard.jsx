import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DisasterCard = ({ disaster }) => {
    const { t } = useTranslation();
    const { id, icon: Icon } = disaster;

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full group">
            <div className="p-6 flex-grow">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t(`disasters.${id}.name`)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{t(`disasters.${id}.description`)}</p>
            </div>
            <div className="px-6 pb-6 pt-0 mt-auto">
                <Link
                    to={`/disaster/${id}`}
                    className="inline-flex items-center text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors"
                >
                    {t('home.viewRiskAnalysis')} <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

export default DisasterCard;
