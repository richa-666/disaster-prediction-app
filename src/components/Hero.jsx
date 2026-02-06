import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Zap, ArrowRight, BarChart2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative bg-[#0B1120] text-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden min-h-[500px] flex items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Darker Background Base */}
                <div className="absolute inset-0 bg-[#000000]"></div>

                {/* Animated Sparks */}
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fbbf24, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #f59e0b, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #d97706, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #b45309, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #FDBF50, rgba(0,0,0,0))',
                    backgroundSize: '200px 200px',
                    animation: 'sparksAnimation 4s linear infinite'
                }}></div>

                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/40 rounded-full opacity-30 blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/40 rounded-full opacity-20 blur-[80px] transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div className="text-center lg:text-left space-y-8">
                    <div className="inline-flex items-center gap-2 bg-indigo-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-500/30 text-indigo-100 text-sm font-medium animate-fade-in-up">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        {t('hero.aiActive')}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                        {t('hero.title')}
                    </h1>

                    <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        {t('hero.subtitle')}
                    </p>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-indigo-700/50 pt-6 mt-6">
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <div className="p-2 bg-indigo-700/50 rounded-lg">
                                <Activity className="w-5 h-5 text-blue-300" />
                            </div>
                            <span className="text-sm font-medium text-indigo-100" dangerouslySetInnerHTML={{ __html: t('hero.monitoring') }}></span>
                        </div>
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <div className="p-2 bg-indigo-700/50 rounded-lg">
                                <ShieldCheck className="w-5 h-5 text-green-300" />
                            </div>
                            <span className="text-sm font-medium text-indigo-100" dangerouslySetInnerHTML={{ __html: t('hero.aiScoring') }}></span>
                        </div>
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <div className="p-2 bg-indigo-700/50 rounded-lg">
                                <Zap className="w-5 h-5 text-yellow-300" />
                            </div>
                            <span className="text-sm font-medium text-indigo-100" dangerouslySetInnerHTML={{ __html: t('hero.realTimeEngine') }}></span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Link to="/dashboard" className="group flex items-center justify-center gap-2 bg-white text-indigo-900 font-bold py-4 px-8 rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg shadow-indigo-900/20 transform hover:-translate-y-1">
                            {t('hero.cta')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-indigo-400 text-white font-semibold py-4 px-8 rounded-xl hover:bg-indigo-800/30 hover:border-indigo-300 transition-all duration-300">
                            {t('hero.secondaryCta')}
                        </button>
                    </div>
                </div>

                {/* Right Visuals - AI Radar Theme */}
                <div className="relative hidden lg:block h-full min-h-[400px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Radar Circles */}
                        <div className="absolute w-[400px] h-[400px] border border-indigo-500/20 rounded-full"></div>
                        <div className="absolute w-[300px] h-[300px] border border-indigo-500/30 rounded-full"></div>
                        <div className="absolute w-[200px] h-[200px] border border-indigo-500/40 rounded-full"></div>

                        {/* Scanning Effect */}
                        <div className="absolute w-[200px] h-[200px] bg-gradient-to-t from-indigo-500/40 to-transparent rounded-full opacity-50 animate-spin origin-bottom-right" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }}></div>

                        {/* Center Node */}
                        <div className="relative w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.5)] animate-pulse">
                            <BarChart2 className="w-10 h-10 text-white" />
                        </div>

                        {/* Floating Data Points */}
                        <div className="absolute top-1/4 right-1/4 bg-white/10 backdrop-blur-md p-2 rounded-lg text-xs font-mono border border-white/20 animate-bounce" style={{ animationDuration: '3s' }}>
                            {t('hero.rainfall')}: 120mm
                        </div>
                        <div className="absolute bottom-1/4 left-1/4 bg-white/10 backdrop-blur-md p-2 rounded-lg text-xs font-mono border border-white/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                            {t('hero.wind')}: 45km/h
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
