import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RiskBadge from './RiskBadge';
import { MapPin, Calendar, Info, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PredictionCard = ({ prediction, disasterName, Icon }) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start space-x-4 w-full md:w-auto">
                    <div className={`p-3 rounded-lg flex-shrink-0 ${prediction.riskLevel === 'High' ? 'bg-red-50 text-red-600' : prediction.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                        {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900">{t(`disasters.${prediction.disasterId}.name`)}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center text-slate-500 text-sm mt-1 gap-2 sm:gap-4">
                            <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {prediction.location}</span>
                            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {prediction.expectedTime}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-2 md:mt-0 pl-14 md:pl-0 gap-4 md:gap-0">
                    <RiskBadge riskLevel={prediction.riskLevel} className="mb-0 md:mb-2" />
                    <div className="flex items-center text-sm font-medium text-slate-700">
                        <span>{t('card.probability')}:</span>
                        <span className={`ml-1 text-lg font-bold ${prediction.probability > 70 ? 'text-red-600' : 'text-slate-900'}`}>
                            {prediction.probability}%
                        </span>
                    </div>
                </div>
            </div>

            {/* AI Explanation Section */}
            <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-3">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp className="w-4 h-4 mr-1" /> {t('card.hideAnalysis')}
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4 mr-1" /> {t('card.viewAnalysis')}
                            </>
                        )}
                    </button>

                    <Link
                        to={`/disaster/${prediction.disasterId}`}
                        state={{ prediction }}
                        className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center"
                    >
                        {t('card.fullDetails')} <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                {expanded && (
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-slate-900 mb-1">{t('card.insight')}:</strong>
                                {prediction.explanation}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PredictionCard;
