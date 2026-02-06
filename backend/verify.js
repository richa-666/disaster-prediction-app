const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function verify() {
    console.log("Starting Verification...");

    try {
        // 1. Health Check
        console.log("\n[1] Testing Health Check...");
        const health = await axios.get(`${BASE_URL}/health`);
        console.log("Response:", health.data);
        if (health.data.status === 'ok') console.log("✅ Passed");
        else console.error("❌ Failed");

        // 2. Supported Disasters
        console.log("\n[2] Testing Supported Disasters...");
        const disasters = await axios.get(`${BASE_URL}/disasters`);
        console.log("Response:", disasters.data);
        if (Array.isArray(disasters.data) && disasters.data.length > 0) console.log("✅ Passed");
        else console.error("❌ Failed");

        // 3. Predict Flood (High Risk Scenario)
        console.log("\n[3] Testing Flood Prediction (Mocked High Risk)...");
        const flood = await axios.post(`${BASE_URL}/predict`, {
            latitude: 26.2,
            longitude: 91.7,
            disaster_type: "flood"
        });
        console.log("Response:", flood.data);
        if (flood.data.disaster === 'flood' && flood.data.riskScore !== undefined) console.log("✅ Passed");
        else console.error("❌ Failed");

        // 4. Predict Earthquake
        console.log("\n[4] Testing Earthquake Prediction...");
        const earthquake = await axios.post(`${BASE_URL}/predict`, {
            latitude: 34.0,
            longitude: -118.2,
            disaster_type: "earthquake"
        });
        console.log("Response:", earthquake.data);
        if (earthquake.data.disaster === 'earthquake') console.log("✅ Passed");
        else console.error("❌ Failed");

    } catch (error) {
        console.error("Verification Warning/Error:", error.message);
        if (error.response) {
            console.error("Data:", error.response.data);
        }
    }
}

verify();
