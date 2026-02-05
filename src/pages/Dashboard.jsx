import React, { useState } from 'react';
import { predictions } from '../data/predictions';
import { disasters } from '../data/disasters';
import PredictionCard from '../components/PredictionCard';
import { Filter } from 'lucide-react';

const Dashboard = () => {
    const [filter, setFilter] = useState('All');

    const filteredPredictions = filter === 'All'
        ? predictions
        : predictions.filter(p => p.riskLevel === filter);

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Live Risk Dashboard</h1>
                    <p className="text-gray-500 mt-1">Real-time assessment for {predictions.length} monitored regions</p>
                </div>
                <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                        className="bg-transparent border-none text-sm font-medium focus:ring-0 text-gray-700 outline-none pr-2"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Risks</option>
                        <option value="High">High Risk Only</option>
                        <option value="Medium">Medium Risk Only</option>
                        <option value="Low">Low Risk Only</option>
                    </select>
                </div>
            </header>

            <div className="grid gap-4">
                {filteredPredictions.length > 0 ? (
                    filteredPredictions.map(prediction => {
                        const disaster = disasters.find(d => d.id === prediction.disasterId);
                        return (
                            <PredictionCard
                                key={prediction.id}
                                prediction={prediction}
                                disasterName={disaster?.name || 'Unknown'}
                                Icon={disaster?.icon}
                            />
                        );
                    })
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                        No predictions found for this filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
