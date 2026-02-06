import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

const RiskBadge = ({ riskLevel, className }) => {
    const { t } = useTranslation();
    const styles = {
        Low: 'bg-green-100 text-green-800 border-green-200',
        Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        High: 'bg-red-100 text-red-800 border-red-200 animate-pulse font-bold',
    };

    return (
        <span className={twMerge('px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider', styles[riskLevel], className)}>
            {t(`riskLevel.${riskLevel.toLowerCase()}`)}
        </span>
    );
};

export default RiskBadge;
