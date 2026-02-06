const express = require('express');
const router = express.Router();
const predictionService = require('../services/predictionService');

// Health Check
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Supported Disasters
router.get('/disasters', (req, res) => {
    const disasters = ['Flood', 'Earthquake', 'Cyclone', 'Heatwave'];
    res.json(disasters);
});

// Predict Disaster Risk
router.post('/predict', async (req, res) => {
    try {
        const { latitude, longitude, disaster_type } = req.body;

        if (!latitude || !longitude || !disaster_type) {
            return res.status(400).json({ error: 'Missing required fields: latitude, longitude, disaster_type' });
        }

        const result = await predictionService.predict(latitude, longitude, disaster_type);
        res.json(result);
    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({ error: 'Failed to generate prediction' });
    }
});

module.exports = router;
