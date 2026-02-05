import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { disasters } from '../data/disasters';
import { ArrowLeft, Activity, ShieldCheck } from 'lucide-react';

const DisasterDetails = () => {
    const { id } = useParams();
    const disaster = disasters.find(d => d.id === id);

    if (!disaster) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">Disaster not found</h2>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Return Home</Link>
            </div>
        );
    }

    const { name, icon: Icon, description, causes, safetyTips } = disaster;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
            </Link>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md shadow-inner">
                            <Icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-bold mb-2">{name}</h1>
                            <div className="h-1 w-20 bg-indigo-500 mx-auto md:mx-0 rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-lg text-slate-300 max-w-2xl leading-relaxed text-center md:text-left relative z-10">{description}</p>
                </div>

                <div className="p-8 md:p-12 bg-white">
                    <div className="grid md:grid-cols-2 gap-12">
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-indigo-700 pb-2 border-b border-indigo-100">
                                <Activity className="w-6 h-6" />
                                <h2 className="text-xl font-bold uppercase tracking-wide">Common Causes</h2>
                            </div>
                            <ul className="space-y-4">
                                {causes.map((cause, idx) => (
                                    <li key={idx} className="flex items-start text-gray-700 group">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:bg-indigo-600 transition-colors"></span>
                                        <span className="leading-relaxed">{cause}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-6 text-emerald-700 pb-2 border-b border-emerald-100">
                                <ShieldCheck className="w-6 h-6" />
                                <h2 className="text-xl font-bold uppercase tracking-wide">Safety Tips</h2>
                            </div>
                            <ul className="space-y-3">
                                {safetyTips.map((tip, idx) => (
                                    <li key={idx} className="bg-emerald-50 p-4 rounded-xl text-emerald-800 text-sm border-l-4 border-emerald-400 shadow-sm">
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisasterDetails;
