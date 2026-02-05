import React from 'react';
import { disasters } from '../data/disasters';
import DisasterCard from '../components/DisasterCard';
import AlertBanner from '../components/AlertBanner';
import Hero from '../components/Hero';
import { predictions } from '../data/predictions';
import { Link } from 'react-router-dom';

const Home = () => {
    const highRisk = predictions.find(p => p.riskLevel === 'High');

    return (
        <div className="space-y-8 animate-fade-in">
            {highRisk && <AlertBanner message={`⚠️ High ${highRisk.disasterId.toUpperCase()} Risk Detected in ${highRisk.location}`} />}

            <Hero />

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-4">Monitored Disasters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {disasters.map(disaster => (
                        <DisasterCard key={disaster.id} disaster={disaster} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
