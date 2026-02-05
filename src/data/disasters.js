import { AlertTriangle, Waves, Wind, Mountain, Sun, Zap } from 'lucide-react';

export const disasters = [
    {
        id: 'earthquake',
        name: 'Earthquake',
        icon: AlertTriangle,
        description: 'Sudden shaking of the ground caused by seismic waves.',
        causes: [
            'Tectonic plate movements',
            'Volcanic eruptions',
            'Underground explosions'
        ],
        safetyTips: [
            'Drop, Cover, and Hold On.',
            'Stay away from windows and glass.',
            'If outdoors, stay away from buildings and trees.'
        ]
    },
    {
        id: 'flood',
        name: 'Flood',
        icon: Waves,
        description: 'Overflow of water that submerges land that is usually dry.',
        causes: [
            'Heavy rainfall',
            'Overflowing rivers',
            'Dam failure',
            'Melting snow/ice'
        ],
        safetyTips: [
            'Move to higher ground immediately.',
            'Do not walk or drive through floodwaters.',
            'Disconnect electrical appliances.'
        ]
    },
    {
        id: 'cyclone',
        name: 'Cyclone',
        icon: Wind,
        description: 'Large scale air mass that rotates around a strong center of low atmospheric pressure.',
        causes: [
            'Warm ocean waters',
            'Atmospheric instability',
            'Coriolis force'
        ],
        safetyTips: [
            'Secure loose outdoor items.',
            'Board up windows.',
            'Evacuate if advised by authorities.'
        ]
    },
    {
        id: 'landslide',
        name: 'Landslide',
        icon: Mountain, // specific enough?
        description: 'Movement of a mass of rock, debris, or earth down a slope.',
        causes: [
            'Heavy rain',
            'Earthquakes',
            'Volcanic eruptions',
            'Slope erosion'
        ],
        safetyTips: [
            'Stay alert and awake.',
            'Listen for unusual sounds like trees cracking.',
            'Move out of the path of landslides/debris flow.'
        ]
    },
    {
        id: 'heatwave',
        name: 'Heatwave',
        icon: Sun,
        description: 'Period of excessively hot weather, which may be accompanied by high humidity.',
        causes: [
            'High pressure systems',
            'Climate change',
            'Urban heat island effect'
        ],
        safetyTips: [
            'Stay hydrated.',
            'Avoid strenuous activities.',
            'Stay cool indoors.'
        ]
    }
];
