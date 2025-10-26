// Product catalog for the shopping system
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  image_url: string;
  rating: number;
  stock: number;
  reviews: Array<{
    rating: number;
    comment: string;
  }>;
}

export const ELECTRONICS_PRODUCTS: Product[] = [
  {
    id: 'e001',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    category: 'Electronics',
    brand: 'SoundWave',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
    image_url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 25,
    reviews: [
      { rating: 5, comment: 'Great sound quality and comfortable fit!' },
      { rating: 4, comment: 'Excellent noise cancellation for the price' }
    ]
  },
  {
    id: 'e002',
    name: 'Smart Fitness Watch',
    price: 199.99,
    category: 'Electronics',
    brand: 'FitTech',
    description: 'Advanced fitness tracker with heart rate monitor, GPS, and sleep tracking',
    image_url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop&crop=center',
    rating: 4.3,
    stock: 15,
    reviews: [
      { rating: 5, comment: 'Perfect for tracking workouts and daily activity' },
      { rating: 4, comment: 'Great features but battery could last longer' }
    ]
  },
  {
    id: 'e003',
    name: 'Gaming Mechanical Keyboard',
    price: 129.99,
    category: 'Electronics',
    brand: 'GamePro',
    description: 'RGB backlit mechanical keyboard with Cherry MX switches and programmable macros',
    image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop&crop=center',
    rating: 4.7,
    stock: 20,
    reviews: [
      { rating: 5, comment: 'Amazing tactile feedback and build quality' },
      { rating: 5, comment: 'RGB lighting is beautiful and customizable' }
    ]
  },
  {
    id: 'e004',
    name: 'Wireless Gaming Mouse',
    price: 89.99,
    category: 'Electronics',
    brand: 'GamePro',
    description: 'High-precision wireless gaming mouse with 16000 DPI and customizable buttons',
    image_url: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
    stock: 30,
    reviews: [
      { rating: 5, comment: 'Super responsive and comfortable for long gaming sessions' },
      { rating: 4, comment: 'Great precision but a bit heavy' }
    ]
  },
  {
    id: 'e005',
    name: '4K Webcam',
    price: 149.99,
    category: 'Electronics',
    brand: 'ClearView',
    description: 'Ultra HD 4K webcam with auto-focus and built-in stereo microphones',
    image_url: 'https://images.unsplash.com/photo-1603828833748-46dc8dc72a96?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 18,
    reviews: [
      { rating: 5, comment: 'Crystal clear video quality for video calls' },
      { rating: 4, comment: 'Easy setup and great image quality' }
    ]
  },
  {
    id: 'e006',
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    category: 'Electronics',
    brand: 'SoundWave',
    description: 'Waterproof portable speaker with 360-degree sound and 20-hour battery',
    image_url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 35,
    reviews: [
      { rating: 5, comment: 'Great sound for outdoor activities' },
      { rating: 4, comment: 'Compact and durable design' }
    ]
  },
  {
    id: 'e007',
    name: 'USB-C Hub',
    price: 49.99,
    category: 'Electronics',
    brand: 'ConnectMax',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and fast charging',
    image_url: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop&crop=center',
    rating: 4.2,
    stock: 40,
    reviews: [
      { rating: 4, comment: 'Very useful for MacBook users' },
      { rating: 4, comment: 'Compact and works as expected' }
    ]
  },
  {
    id: 'e008',
    name: 'Wireless Phone Charger',
    price: 34.99,
    category: 'Electronics',
    brand: 'PowerTech',
    description: '15W fast wireless charging pad with LED indicator and anti-slip surface',
    image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center',
    rating: 4.3,
    stock: 50,
    reviews: [
      { rating: 4, comment: 'Charges my phone quickly and safely' },
      { rating: 5, comment: 'Sleek design fits perfectly on my desk' }
    ]
  },
  {
    id: 'e009',
    name: 'Smart LED Light Bulbs (4-Pack)',
    price: 39.99,
    category: 'Electronics',
    brand: 'BrightHome',
    description: 'WiFi-enabled smart bulbs with 16 million colors and voice control compatibility',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 28,
    reviews: [
      { rating: 5, comment: 'Easy to set up and great color options' },
      { rating: 4, comment: 'Works well with Alexa and Google Home' }
    ]
  },
  {
    id: 'e010',
    name: 'Laptop Stand',
    price: 29.99,
    category: 'Electronics',
    brand: 'ErgoTech',
    description: 'Adjustable aluminum laptop stand with cooling ventilation and cable management',
    image_url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
    stock: 45,
    reviews: [
      { rating: 5, comment: 'Perfect height adjustment for ergonomics' },
      { rating: 4, comment: 'Sturdy build and helps with laptop cooling' }
    ]
  },
  {
    id: 'e011',
    name: 'Wireless Earbuds Pro',
    price: 159.99,
    category: 'Electronics',
    brand: 'SoundWave',
    description: 'Premium true wireless earbuds with active noise cancellation and spatial audio',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center',
    rating: 4.8,
    stock: 22,
    reviews: [
      { rating: 5, comment: 'Amazing sound quality and noise cancellation' },
      { rating: 5, comment: 'Comfortable fit and long battery life' }
    ]
  },
  {
    id: 'e012',
    name: 'External SSD 1TB',
    price: 119.99,
    category: 'Electronics',
    brand: 'SpeedDrive',
    description: 'Ultra-fast portable SSD with USB 3.2 and hardware encryption',
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop&crop=center',
    rating: 4.7,
    stock: 15,
    reviews: [
      { rating: 5, comment: 'Lightning fast transfer speeds' },
      { rating: 4, comment: 'Compact and reliable for backups' }
    ]
  },
  {
    id: 'e013',
    name: 'Smart Security Camera',
    price: 89.99,
    category: 'Electronics',
    brand: 'SecureHome',
    description: '1080p WiFi security camera with night vision and motion detection alerts',
    image_url: 'https://images.unsplash.com/photo-1558002038-bb4237b54c0c?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 32,
    reviews: [
      { rating: 5, comment: 'Clear video quality and reliable alerts' },
      { rating: 4, comment: 'Easy installation and good mobile app' }
    ]
  },
  {
    id: 'e014',
    name: 'Tablet Stand with Wireless Charging',
    price: 69.99,
    category: 'Electronics',
    brand: 'TechMount',
    description: 'Adjustable tablet stand with built-in wireless charging for compatible devices',
    image_url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&h=400&fit=crop&crop=center',
    rating: 4.3,
    stock: 25,
    reviews: [
      { rating: 4, comment: 'Convenient charging while using tablet' },
      { rating: 4, comment: 'Stable and well-designed' }
    ]
  },
  {
    id: 'e015',
    name: 'Gaming Headset',
    price: 99.99,
    category: 'Electronics',
    brand: 'GamePro',
    description: 'Professional gaming headset with 7.1 surround sound and noise-canceling microphone',
    image_url: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
    stock: 38,
    reviews: [
      { rating: 5, comment: 'Excellent audio quality for competitive gaming' },
      { rating: 4, comment: 'Comfortable for long gaming sessions' }
    ]
  },
  {
    id: 'e016',
    name: 'Smartphone Gimbal',
    price: 139.99,
    category: 'Electronics',
    brand: 'SmoothCam',
    description: '3-axis smartphone gimbal stabilizer with object tracking and gesture control',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 20,
    reviews: [
      { rating: 5, comment: 'Makes professional-looking videos easily' },
      { rating: 4, comment: 'Great stabilization and easy to use' }
    ]
  },
  {
    id: 'e017',
    name: 'Smart Thermostat',
    price: 179.99,
    category: 'Electronics',
    brand: 'ClimateControl',
    description: 'WiFi-enabled smart thermostat with learning algorithms and energy savings',
    image_url: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa0?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 18,
    reviews: [
      { rating: 5, comment: 'Saves money on energy bills and easy to control' },
      { rating: 4, comment: 'Great app interface and scheduling features' }
    ]
  },
  {
    id: 'e018',
    name: 'USB Microphone',
    price: 79.99,
    category: 'Electronics',
    brand: 'AudioPro',
    description: 'Professional USB condenser microphone for podcasting and streaming',
    image_url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop&crop=center',
    rating: 4.7,
    stock: 30,
    reviews: [
      { rating: 5, comment: 'Crystal clear audio quality for recordings' },
      { rating: 4, comment: 'Easy plug-and-play setup' }
    ]
  },
  {
    id: 'e019',
    name: 'Power Bank 20000mAh',
    price: 44.99,
    category: 'Electronics',
    brand: 'PowerTech',
    description: 'High-capacity portable charger with fast charging and multiple device support',
    image_url: 'https://images.unsplash.com/photo-1609592806596-4b8d4d54a73d?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 55,
    reviews: [
      { rating: 4, comment: 'Charges my phone multiple times' },
      { rating: 5, comment: 'Essential for travel and long days out' }
    ]
  },
  {
    id: 'e020',
    name: 'Smart Doorbell Camera',
    price: 159.99,
    category: 'Electronics',
    brand: 'SecureHome',
    description: 'WiFi video doorbell with HD camera, two-way audio, and motion detection',
    image_url: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
    stock: 24,
    reviews: [
      { rating: 5, comment: 'Great security feature and clear video' },
      { rating: 4, comment: 'Easy installation and reliable notifications' }
    ]
  }
];

export const SPORTS_PRODUCTS: Product[] = [
  {
    id: 's001',
    name: 'Yoga Mat Premium',
    price: 49.99,
    category: 'Sports',
    brand: 'ZenFlex',
    description: 'Non-slip yoga mat with excellent grip, 6mm thickness, and eco-friendly material',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
    stock: 30,
    reviews: [
      { rating: 5, comment: 'Perfect grip, never slips during practice' },
      { rating: 4, comment: 'Good quality material and comfortable thickness' }
    ]
  },
  {
    id: 's003',
    name: 'Running Shoes - Trail Pro',
    price: 129.99,
    category: 'Sports',
    brand: 'RunTech',
    description: 'All-terrain running shoes with advanced cushioning and waterproof design',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 45,
    reviews: [
      { rating: 5, comment: 'Comfortable for long runs and great traction' },
      { rating: 4, comment: 'True to size and excellent build quality' }
    ]
  },
  {
    id: 's004',
    name: 'Resistance Bands Set',
    price: 29.99,
    category: 'Sports',
    brand: 'FlexFit',
    description: 'Complete resistance bands set with 5 resistance levels and door anchor',
    image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 60,
    reviews: [
      { rating: 4, comment: 'Great for travel workouts and rehabilitation' },
      { rating: 5, comment: 'Durable bands with good resistance variety' }
    ]
  },
  {
    id: 's005',
    name: 'Foam Roller',
    price: 34.99,
    category: 'Sports',
    brand: 'RecoveryPlus',
    description: 'High-density foam roller for muscle recovery and trigger point therapy',
    image_url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
    stock: 35,
    reviews: [
      { rating: 5, comment: 'Perfect for post-workout recovery' },
      { rating: 4, comment: 'Firm density is great for deep tissue massage' }
    ]
  },
  {
    id: 's006',
    name: 'Basketball - Official Size',
    price: 39.99,
    category: 'Sports',
    brand: 'CourtKing',
    description: 'Official size basketball with premium leather and superior grip',
    image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 25,
    reviews: [
      { rating: 5, comment: 'Great feel and bounce on the court' },
      { rating: 4, comment: 'Durable and maintains shape well' }
    ]
  },
  {
    id: 's007',
    name: 'Protein Shaker Bottle',
    price: 14.99,
    category: 'Sports',
    brand: 'NutriMix',
    description: 'BPA-free protein shaker with wire whisk ball and measurement markings',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    rating: 4.3,
    stock: 80,
    reviews: [
      { rating: 4, comment: 'Mixes protein powder smoothly' },
      { rating: 5, comment: 'Leak-proof and easy to clean' }
    ]
  },
  {
    id: 's008',
    name: 'Jump Rope - Speed Style',
    price: 19.99,
    category: 'Sports',
    brand: 'CardioMax',
    description: 'Lightweight speed jump rope with adjustable length and comfortable handles',
    image_url: 'https://images.unsplash.com/photo-1520206319821-0496cfdeb31d?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 50,
    reviews: [
      { rating: 4, comment: 'Great for cardio workouts and easy to adjust' },
      { rating: 5, comment: 'Smooth rotation and portable' }
    ]
  },
  {
    id: 's009',
    name: 'Workout Gloves',
    price: 24.99,
    category: 'Sports',
    brand: 'GripMax',
    description: 'Breathable workout gloves with wrist support and anti-slip palm',
    image_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=400&fit=crop&crop=center',
    rating: 4.2,
    stock: 40,
    reviews: [
      { rating: 4, comment: 'Good grip and protects hands during lifting' },
      { rating: 4, comment: 'Comfortable fit and breathable material' }
    ]
  },
  {
    id: 's010',
    name: 'Exercise Ball - 65cm',
    price: 22.99,
    category: 'Sports',
    brand: 'CoreFit',
    description: 'Anti-burst exercise ball with pump included, perfect for core workouts',
    image_url: 'https://images.unsplash.com/photo-1566351471782-38d4dc2e762d?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 28,
    reviews: [
      { rating: 5, comment: 'Great for core strengthening exercises' },
      { rating: 4, comment: 'Durable and maintains air well' }
    ]
  },
  {
    id: 's011',
    name: 'Tennis Racket - Pro Series',
    price: 189.99,
    category: 'Sports',
    brand: 'AcePlay',
    description: 'Professional tennis racket with graphite frame and optimal weight distribution',
    image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center',
    rating: 4.7,
    stock: 15,
    reviews: [
      { rating: 5, comment: 'Excellent control and power for competitive play' },
      { rating: 4, comment: 'Lightweight yet powerful' }
    ]
  },
  {
    id: 's012',
    name: 'Swimming Goggles',
    price: 18.99,
    category: 'Sports',
    brand: 'AquaClear',
    description: 'Anti-fog swimming goggles with UV protection and adjustable strap',
    image_url: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 65,
    reviews: [
      { rating: 4, comment: 'Clear vision underwater and comfortable fit' },
      { rating: 5, comment: 'No fogging issues and great seal' }
    ]
  },
  {
    id: 's013',
    name: 'Cycling Helmet',
    price: 79.99,
    category: 'Sports',
    brand: 'SafeRide',
    description: 'Lightweight cycling helmet with ventilation system and MIPS technology',
    image_url: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
    stock: 32,
    reviews: [
      { rating: 5, comment: 'Comfortable and great ventilation' },
      { rating: 4, comment: 'Safety certified and lightweight' }
    ]
  },
  {
    id: 's014',
    name: 'Water Bottle - Insulated',
    price: 26.99,
    category: 'Sports',
    brand: 'HydroFlow',
    description: 'Stainless steel insulated water bottle keeping drinks cold for 24 hours',
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 70,
    reviews: [
      { rating: 5, comment: 'Keeps water ice cold all day' },
      { rating: 4, comment: 'Durable and doesn\'t leak' }
    ]
  },
  {
    id: 's015',
    name: 'Kettlebell - 20lb',
    price: 54.99,
    category: 'Sports',
    brand: 'IronCore',
    description: 'Cast iron kettlebell with wide handle for comfortable grip during workouts',
    image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
    stock: 22,
    reviews: [
      { rating: 5, comment: 'Perfect weight for functional training' },
      { rating: 4, comment: 'Great build quality and finish' }
    ]
  },
  {
    id: 's016',
    name: 'Soccer Ball - FIFA Approved',
    price: 34.99,
    category: 'Sports',
    brand: 'FieldMaster',
    description: 'Official FIFA approved soccer ball with superior flight characteristics',
    image_url: 'https://images.unsplash.com/photo-1614632537190-23e4b0f27c90?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
    stock: 38,
    reviews: [
      { rating: 5, comment: 'Great ball feel and accurate flight' },
      { rating: 4, comment: 'Durable and maintains shape' }
    ]
  },
  {
    id: 's017',
    name: 'Pull-up Bar - Doorway Mount',
    price: 39.99,
    category: 'Sports',
    brand: 'StrengthMax',
    description: 'No-screw doorway pull-up bar supporting up to 300lbs with multiple grip positions',
    image_url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center',
    rating: 4.3,
    stock: 26,
    reviews: [
      { rating: 4, comment: 'Easy installation and feels secure' },
      { rating: 4, comment: 'Multiple grip options for varied workouts' }
    ]
  },
  {
    id: 's018',
    name: 'Golf Glove - Pro Grip',
    price: 16.99,
    category: 'Sports',
    brand: 'GolfTech',
    description: 'Premium leather golf glove with enhanced grip and moisture control',
    image_url: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 55,
    reviews: [
      { rating: 4, comment: 'Great feel and improved grip on clubs' },
      { rating: 5, comment: 'Durable leather and perfect fit' }
    ]
  },
  {
    id: 's019',
    name: 'Balance Board',
    price: 44.99,
    category: 'Sports',
    brand: 'StabilityPro',
    description: 'Wobble balance board for core training and rehabilitation exercises',
    image_url: 'https://images.unsplash.com/photo-1506629905610-111c5e6a7dd9?w=400&h=400&fit=crop&crop=center',
    rating: 4.3,
    stock: 33,
    reviews: [
      { rating: 4, comment: 'Great for balance training and core work' },
      { rating: 4, comment: 'Sturdy construction and good challenge level' }
    ]
  },
  {
    id: 's020',
    name: 'Compression Shorts',
    price: 32.99,
    category: 'Sports',
    brand: 'ActiveWear',
    description: 'Moisture-wicking compression shorts with muscle support and chafe-resistant design',
    image_url: 'https://images.unsplash.com/photo-1594736797933-d0601ba2fe65?w=400&h=400&fit=crop&crop=center',
    rating: 4.4,
    stock: 42,
    reviews: [
      { rating: 4, comment: 'Comfortable compression and good moisture management' },
      { rating: 5, comment: 'Perfect fit and helps with muscle support' }
    ]
  }
];

export const SAMPLE_PRODUCTS: Product[] = [
  ...ELECTRONICS_PRODUCTS,
  ...SPORTS_PRODUCTS
];
