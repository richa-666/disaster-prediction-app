import React, { useState, useEffect } from 'react';
import { disasters } from '../data/disasters';
import PredictionCard from '../components/PredictionCard';
import { Filter, RefreshCcw } from 'lucide-react';
import { fetchPrediction } from '../services/api';
import SearchBar from '../components/SearchBar';

// Configuration for Monitored Locations
// In a real app, users might subscribe to these.
const MONITORED_LOCATIONS = [
    { id: 101, location: 'Assam, India', lat: 26.2, lon: 91.7, disasterType: 'flood' },
    { id: 102, location: 'Los Angeles, USA', lat: 34.0, lon: -118.2, disasterType: 'earthquake' },
    { id: 103, location: 'Odisha, India', lat: 20.3, lon: 85.8, disasterType: 'cyclone' },
    { id: 104, location: 'Rajasthan, India', lat: 26.9, lon: 70.9, disasterType: 'heatwave' },
    { id: 105, location: 'Tokyo, Japan', lat: 35.6, lon: 139.6, disasterType: 'earthquake' },
    { id: 106, location: 'Jakarta, Indonesia', lat: -6.2, lon: 106.8, disasterType: 'flood' },
];

const Dashboard = () => {
    const [filter, setFilter] = useState('All');
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatPrediction = (data, locationName, disasterType, id) => {
        return {
            id: id || Date.now(),
            disasterId: disasterType, // matched with disasters.id
            location: locationName,
            riskLevel: data.riskLevel,
            probability: parseFloat((data.riskScore * 100).toFixed(0)),
            expectedTime: data.timeWindow,
            explanation: data.explanation
        };
    };

    const loadPredictions = async () => {
        setLoading(true);
        try {
            const promises = MONITORED_LOCATIONS.map(async (loc) => {
                const data = await fetchPrediction(loc.lat, loc.lon, loc.disasterType);
                if (data) {
                    return formatPrediction(data, loc.location, loc.disasterType, loc.id);
                }
                return null;
            });

            const results = await Promise.all(promises);
            setPredictions(results.filter(p => p !== null));
        } catch (error) {
            console.error("Failed to load predictions", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPredictions();
    }, []);

    const handleSearch = async ({ name, lat, lon, disasterType }) => {
        // Fetch prediction for searched city
        const data = await fetchPrediction(lat, lon, disasterType);
        if (data) {
            const newPrediction = formatPrediction(data, name, disasterType);
            setPredictions(prev => [newPrediction, ...prev]);
        }
    };

    const filteredPredictions = filter === 'All'
        ? predictions
        : predictions.filter(p => p.riskLevel === filter);

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Live Risk Dashboard</h1>
                    <p className="text-gray-500 mt-1">
                        Real-time assessment for monitored regions
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={loadPredictions}
                        className="flex items-center space-x-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                    >
                        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>

                    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm relative">
                        <Filter className="w-4 h-4 text-gray-500 ml-1" />
                        <select
                            className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 outline-none pr-8 cursor-pointer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="All">All Risks</option>
                            <option value="High">High Risk Only</option>
                            <option value="Medium">Medium Risk Only</option>
                            <option value="Low">Low Risk Only</option>
                        </select>
                    </div>
                </div>
            </header>

            <SearchBar onSearch={handleSearch} />

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-500">Analyzing latest satellite data...</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredPredictions.length > 0 ? (
                        filteredPredictions.map(prediction => {
                            const disaster = disasters.find(d => d.id === prediction.disasterId);
                            // Fallback if disaster type doesn't match predefined list exactly
                            const disasterName = disaster ? disaster.name : prediction.disasterId.charAt(0).toUpperCase() + prediction.disasterId.slice(1);
                            const Icon = disaster ? disaster.icon : null;

                            return (
                                <PredictionCard
                                    key={prediction.id}
                                    prediction={prediction}
                                    disasterName={disasterName}
                                    Icon={Icon}
                                />
                            );
                        })
                    ) : (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                            No predictions found for this filter.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
