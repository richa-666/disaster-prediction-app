import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { searchCities } from '../services/api';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ onSearch }) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [disasterType, setDisasterType] = useState('flood');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleInputChange = async (e) => {
        const val = e.target.value;
        setQuery(val);

        if (val.length > 2) {
            const cities = await searchCities(val);
            setResults(cities);
            setShowDropdown(true);
        } else {
            setResults([]);
            setShowDropdown(false);
        }
    };

    const handleSelectCity = (city) => {
        setQuery(`${city.name}, ${city.country}`);
        setShowDropdown(false);
        // We pass the full city object to help the parent
        // or we just store it temporarily until they click "Check Risk"
        // For simplicity, let's just fill the input and store the chosen lat/lon in a hidden way
        // But for this prototype, let's trust the "onSearch" to resolve it or pass the selected data directly.
        // Better UX: Trigger search immediately on selection? Or wait for button?
        // Let's wait for button to confirm disaster type.
        // We'll attach the selected city data to the state
        setQuery(`${city.name}, ${city.country} (${city.latitude}, ${city.longitude})`); // Debug view
        // Ideally we need to store the coords.
        // Let's refactor:
        onSearch({
            name: `${city.name}, ${city.country}`,
            lat: city.latitude,
            lon: city.longitude,
            disasterType
        });
        setQuery('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // If they typed manually and didn't select from dropdown, we might want to search first
        // For now, let's assume they pick from dropdown or we rely on parent to search.
        // Actually, the previous implementation plan said "Dashboard handles search". 
        // Let's make this component just an input + type selector.
    };

    // Simplification for prototype:
    // Input is just text. Parent calls searchCities.
    // OR: Input has autocomplete.

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('dashboard.searchPlaceholder')}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        // Debounce search here?
                        // Let's keep it simple: Type city, click Search.
                    }}
                />
            </div>

            <div className="w-full md:w-48">
                <select
                    value={disasterType}
                    onChange={(e) => setDisasterType(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="flood">{t('disasters.flood.name')}</option>
                    <option value="earthquake">{t('disasters.earthquake.name')}</option>
                    <option value="cyclone">{t('disasters.cyclone.name')}</option>
                    <option value="heatwave">{t('disasters.heatwave.name')}</option>
                    <option value="landslide">{t('disasters.landslide.name')}</option>
                </select>
            </div>

            <button
                type="button" // changed to button to manual handle
                onClick={async () => {
                    setLoading(true);
                    // 1. Search for city to get coordinates
                    const cities = await searchCities(query);
                    if (cities.length > 0) {
                        const city = cities[0];
                        onSearch({
                            name: `${city.name}, ${city.country}`,
                            lat: city.latitude,
                            lon: city.longitude,
                            disasterType
                        });
                        setQuery('');
                    } else {
                        alert("City not found!");
                    }
                    setLoading(false);
                }}
                disabled={!query || loading}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {loading ? t('dashboard.searching') : t('dashboard.checkRisk')}
            </button>
        </form>
    );
};

export default SearchBar;
