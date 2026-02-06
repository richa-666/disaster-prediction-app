const axios = require('axios');

// Mock Historical Data (In a real app, this would be loaded from CSVs/Database)
const historicalData = {
    '26.2,91.7': { // Assam
        floodProbability: 0.7,
        avgRainfall: 200, // mm
        earthquakeRisk: 'Medium'
    },
    '34.0,-118.2': { // Los Angeles
        floodProbability: 0.1,
        avgRainfall: 20,
        earthquakeRisk: 'High'
    }
    // Add more mock points as needed
};

/**
 * Simulates loading historical data
 */
async function loadHistoricalData() {
    console.log("Loading historical datasets...");
    // In a real implementation: Parse CSVs here
    return new Promise(resolve => setTimeout(resolve, 500));
}

/**
 * Fetches real-time weather data from Open-Meteo
 */
async function fetchRealTimeData(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,rain,windspeed_10m&daily=precipitation_sum,apparent_temperature_max&timezone=auto`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching real-time data:", error.message);
        return null;
    }
}

/**
 * Combines historical and real-time data
 */
async function getCombinedData(lat, lon) {
    // 1. Get Real-time Data
    const realTime = await fetchRealTimeData(lat, lon);

    // 2. Get Historical Data (Mock lookup)
    const key = `${lat.toFixed(1)},${lon.toFixed(1)}`;
    // Simple nearest neighbor or direct lookup for mock
    // For prototype, we'll try to find an exact match or return generic defaults
    const historical = historicalData[key] || {
        floodProbability: 0.3,
        avgRainfall: 50,
        earthquakeRisk: 'Low'
    };

    return {
        realTime,
        historical
    };
}

module.exports = {
    loadHistoricalData,
    fetchRealTimeData,
    getCombinedData
};
