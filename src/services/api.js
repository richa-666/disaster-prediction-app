import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Checks if the backend service is healthy.
 */
export const checkHealth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/health`);
        return response.data.status === 'ok';
    } catch (error) {
        console.error("Health check failed:", error);
        return false;
    }
};

/**
 * Fetches disaster risk prediction for a specific location.
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {string} disasterType 
 */
export const fetchPrediction = async (latitude, longitude, disasterType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/predict`, {
            latitude,
            longitude,
            disaster_type: disasterType
        });
        return response.data;
    } catch (error) {
        console.error(`Prediction fetch failed for ${disasterType}:`, error);
        return null;
    }
};

/**
 * Searches for a city to get coordinates.
 * @param {string} query 
 */
export const searchCities = async (query) => {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
        const response = await axios.get(url);
        if (response.data && response.data.results) {
            return response.data.results;
        }
        return [];
    } catch (error) {
        console.error("City search failed:", error);
        return [];
    }
};
