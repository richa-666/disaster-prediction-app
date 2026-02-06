const dataService = require('./dataService');

/**
 * Predicts disaster risk based on location and type
 */
async function predict(lat, lon, disasterType) {
    // 1. Gather Data
    const data = await dataService.getCombinedData(lat, lon);

    if (!data.realTime) {
        throw new Error("Failed to fetch real-time data");
    }

    const { realTime, historical } = data;

    // 2. Antigravity Inference Logic (Heuristics)
    let riskScore = 0;
    let riskLevel = "Low";
    let explanation = "";
    let timeWindow = "Next 24 hours";

    const currentWeather = realTime.current_weather;
    const dailyForecast = realTime.daily || {};
    const rainForecast = dailyForecast.precipitation_sum ? dailyForecast.precipitation_sum[0] : 0;

    switch (disasterType.toLowerCase()) {
        case 'flood':
            // Heuristic: High historical probability + High current/forecast rain
            let rainFactor = 0;
            if (rainForecast > 50) rainFactor = 0.8; // > 50mm rain is high
            else if (rainForecast > 20) rainFactor = 0.5;

            riskScore = (historical.floodProbability * 0.4) + (rainFactor * 0.6);

            if (riskScore > 0.7) {
                riskLevel = "High";
                explanation = `High rainfall forecast (${rainForecast}mm) combined with historical flood patterns in this region.`;
                timeWindow = "Next 48 hours";
            } else if (riskScore > 0.4) {
                riskLevel = "Medium";
                explanation = `Moderate rainfall (${rainForecast}mm) detected. Standard flood precautions advised.`;
            } else {
                explanation = "Rainfall levels are within normal range.";
            }
            break;

        case 'earthquake':
            // Heuristic: Mainly historical for earthquakes, unless we had a real-time seismic API
            // For prototype, we lean on historical risk
            if (historical.earthquakeRisk === 'High') {
                riskScore = 0.8;
                riskLevel = "High";
                explanation = "Located in a high-seismic activity zone. Always be prepared.";
                timeWindow = "Indefinite";
            } else if (historical.earthquakeRisk === 'Medium') {
                riskScore = 0.5;
                riskLevel = "Medium";
                explanation = "Moderate seismic activity zone.";
            } else {
                riskScore = 0.1;
                explanation = "Low seismic risk zone.";
            }
            break;

        case 'cyclone':
            // Heuristic: High wind speed + Rain
            const windSpeed = currentWeather.windspeed;

            if (windSpeed > 100) {
                riskScore = 0.9;
                riskLevel = "High";
                explanation = `Severe wind speeds (${windSpeed} km/h) detected indicative of cyclonic conditions.`;
            } else if (windSpeed > 60) {
                riskScore = 0.6;
                riskLevel = "Medium";
                explanation = `High wind speeds (${windSpeed} km/h). Monitor local warnings.`;
            } else {
                riskScore = 0.1;
                explanation = "Wind speeds are normal.";
            }
            break;

        case 'heatwave':
            const temp = currentWeather.temperature;
            if (temp > 40) {
                riskScore = 0.9;
                riskLevel = "High";
                explanation = `Extreme temperature (${temp}°C) detected. Heatwave warning in effect.`;
            } else if (temp > 35) {
                riskScore = 0.6;
                riskLevel = "Medium";
                explanation = `High temperatures (${temp}°C). Stay hydrated.`;
            } else {
                riskScore = 0.2;
                explanation = `Current temperature (${temp}°C) is normal.`;
            }
            break;

        default:
            return { error: "Unknown disaster type" };
    }

    return {
        location: `Lat: ${lat}, Lon: ${lon}`,
        disaster: disasterType,
        riskScore: parseFloat(riskScore.toFixed(2)),
        riskLevel,
        timeWindow,
        explanation
    };
}

module.exports = {
    predict
};
