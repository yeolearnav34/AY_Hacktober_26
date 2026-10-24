// Advisory content for the classes the trained model (model-api/) can output:
// Healthy, Powdery (powdery mildew) and Rust.
// The model does not identify the crop, so entries are written to apply to any crop.

export interface ModelDiseaseInfo {
  name: string;
  localName: { hi: string; mr: string };
  scientificName: string;
  pathogenType: 'fungal' | 'healthy';
  symptoms: string[];
  causes: string[];
  treatment: { cultural: string[]; organic: string[]; chemical: string[] };
  prevention: string[];
  expertGuidance: string;
}

export const MODEL_DISEASES: Record<'healthy' | 'powdery' | 'rust', ModelDiseaseInfo> = {
  healthy: {
    name: 'Healthy Leaf — No Disease Detected',
    localName: {
      hi: 'स्वस्थ पत्ती — कोई रोग नहीं मिला',
      mr: 'निरोगी पान — कोणताही रोग नाही',
    },
    scientificName: 'Normal plant tissue',
    pathogenType: 'healthy',
    symptoms: [
      'Even green colour without spots, powder or pustules',
      'Smooth leaf surface and normal vein structure',
    ],
    causes: ['Balanced nutrition and irrigation, low disease pressure'],
    treatment: {
      cultural: ['Continue regular weeding and balanced irrigation'],
      organic: ['No treatment needed'],
      chemical: ['No spraying required'],
    },
    prevention: [
      'Scout the field once a week, especially after rain or humid spells',
      'Re-scan if white powder or orange spots appear',
    ],
    expertGuidance:
      'The leaf looks healthy. This model only checks for powdery mildew and rust, so other problems (pests, nutrient deficiency, other diseases) will not be flagged.',
  },
  powdery: {
    name: 'Powdery Mildew',
    localName: { hi: 'चूर्णिल आसिता (पाउडरी मिल्ड्यू)', mr: 'भुरी रोग' },
    scientificName: 'Erysiphales (powdery mildew fungi)',
    pathogenType: 'fungal',
    symptoms: [
      'White to grey powdery patches on the upper leaf surface',
      'Leaves may yellow, curl and dry out as the patches spread',
    ],
    causes: [
      'Dry days with humid nights and moderate temperatures',
      'Crowded plants with poor air movement, or too much nitrogen',
    ],
    treatment: {
      cultural: [
        'Remove and destroy badly affected leaves',
        'Widen spacing or prune to improve air flow',
        'Avoid excess nitrogen fertiliser',
      ],
      organic: [
        'Neem oil spray @ 3–5 ml/L of water, repeat after 7–10 days',
        'Spray 10% milk solution (1 part milk to 9 parts water) on affected plants',
      ],
      chemical: [
        'Wettable sulphur 80% WP @ 2–2.5 g/L (do not use on sulphur-sensitive crops such as cucurbits, or in hot weather above about 32°C)',
        'Hexaconazole 5% EC @ 1–2 ml/L',
      ],
    },
    prevention: [
      'Plant resistant varieties where available',
      'Keep foliage spaced and avoid dense canopies',
      'Scout weekly during humid-night, dry-day weather',
    ],
    expertGuidance:
      'Check the product label for your specific crop before spraying, wear protective gear and respect the waiting period before harvest. Confirm with your nearest Krishi Vigyan Kendra (KVK).',
  },
  rust: {
    name: 'Rust',
    localName: { hi: 'रतुआ (गेरुआ) रोग', mr: 'तांबेरा रोग' },
    scientificName: 'Pucciniales (rust fungi)',
    pathogenType: 'fungal',
    symptoms: [
      'Small orange, reddish-brown or rusty pustules, usually on the underside of leaves',
      'Pustules release powdery spores that rub off on fingers',
      'Heavily infected leaves yellow and drop early',
    ],
    causes: [
      'Cool to moderate temperatures with long leaf wetness (dew, rain, fog)',
      'Wind-blown spores from nearby infected plants or volunteer crops',
    ],
    treatment: {
      cultural: [
        'Remove and destroy heavily infected leaves',
        'Avoid overhead irrigation and do not work in the field when plants are wet',
        'Remove volunteer plants and weeds that can carry the fungus',
      ],
      organic: ['Neem oil spray @ 5 ml/L of water, repeat after 7–10 days'],
      chemical: [
        'Mancozeb 75% WP @ 2.5 g/L',
        'Propiconazole 25% EC @ 1 ml/L or Hexaconazole 5% EC @ 1–2 ml/L',
      ],
    },
    prevention: [
      'Grow rust-tolerant varieties',
      'Keep foliage dry and ensure good spacing and drainage',
      'Scout early; rust spreads fast in humid weather',
    ],
    expertGuidance:
      'Rust spreads quickly. Check the product label for your crop, wear protective gear, respect the waiting period, and confirm with your nearest Krishi Vigyan Kendra (KVK).',
  },
};
