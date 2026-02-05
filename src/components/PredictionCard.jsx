import React from 'react';
import RiskBadge from './RiskBadge';
import { MapPin, Calendar } from 'lucide-react';

const PredictionCard = ({ prediction, disasterName, Icon }) => {
    return (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start space-x-4 w-full md:w-auto">
                <div className={`p-3 rounded-lg flex-shrink-0 ${prediction.riskLevel === 'High' ? 'bg-red-50 text-red-600' : prediction.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                    {Icon && <Icon className="w-6 h-6" />}
                </div>
                <div>
                    <h4 className="text-lg font-bold text-slate-900">{disasterName}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center text-slate-500 text-sm mt-1 gap-2 sm:gap-4">
                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {prediction.location}</span>
                        <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {prediction.expectedTime}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-2 md:mt-0 pl-14 md:pl-0">
                <RiskBadge riskLevel={prediction.riskLevel} className="mb-0 md:mb-2" />
                <div className="flex items-center text-sm font-medium text-slate-700">
                    <span>Probability:</span>
                    <span className={`ml-1 text-lg font-bold ${prediction.probability > 70 ? 'text-red-600' : 'text-slate-900'}`}>
                        {prediction.probability}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PredictionCard;
