export const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Fitur', path: '/features' },
    { name: 'Cara Kerja', path: '/about' },
    { name: 'Manfaat', path: '/benefits' },
    { name: 'Harga', path: '/pricing' },
    { name: 'Kontak', path: '/contact' },
];

export const features = [
    {
        id: 1,
        icon: 'Brain',
        title: 'AI Prediction',
        description: 'Machine Learning memprediksi konsumsi dan memberikan peringatan dini',
        details: 'Sistem AI kami menggunakan algoritma machine learning untuk menganalisis pola historis dan memprediksi konsumsi masa depan dengan akurasi 95%.',
        color: 'purple',
    },
    {
        id: 2,
        icon: 'Zap',
        title: 'Monitoring Real-Time',
        description: 'Pantau konsumsi listrik dan air secara live dengan dashboard interaktif',
        details: 'Dashboard real-time dengan update setiap 5 detik, menampilkan data konsumsi, tren, dan peringatan.',
        color: 'amber',
    },
    {
        id: 3,
        icon: 'Droplets',
        title: 'Efisiensi Air',
        description: 'Deteksi kebocoran dan optimalkan penggunaan air hingga 40%',
        details: 'Sensor cerdas mendeteksi pola penggunaan abnormal yang mengindikasikan kebocoran.',
        color: 'blue',
    },
    {
        id: 4,
        icon: 'Cloud',
        title: 'Emisi Karbon',
        description: 'Hitung dan kurangi jejak karbon secara otomatis',
        details: 'Konversi otomatis konsumsi energi menjadi emisi CO₂ dengan standar internasional.',
        color: 'green',
    },
    {
        id: 5,
        icon: 'Bell',
        title: 'Smart Alerts',
        description: 'Notifikasi pintar untuk abnormalitas konsumsi',
        details: 'Sistem notifikasi multi-channel: email, SMS, push notification, dan dashboard alerts.',
        color: 'red',
    },
    {
        id: 6,
        icon: 'TrendingUp',
        title: 'Analytics Dashboard',
        description: 'Laporan dan insight berbasis data untuk pengambilan keputusan',
        details: 'Analisis mendalam dengan visualisasi data interaktif untuk strategic planning.',
        color: 'indigo',
    },
];

export const benefits = [
    {
        icon: 'TrendingDown',
        title: 'Efisiensi Operasional',
        value: '30%',
        description: 'Pengurangan biaya operasional',
    },
    {
        icon: 'DollarSign',
        title: 'ROI Cepat',
        value: '6-12',
        description: 'Bulan untuk return on investment',
    },
    {
        icon: 'Shield',
        title: 'Kepatuhan',
        value: '100%',
        description: 'Compliance dengan regulasi',
    },
    {
        icon: 'Globe',
        title: 'Emisi Berkurang',
        value: '40%',
        description: 'Pengurangan jejak karbon',
    },
];

export const steps = [
    {
        step: '01',
        title: 'Instalasi & Setup',
        time: '1-3 hari',
    },
    {
        step: '02',
        title: 'Data Collection',
        time: 'Real-time',
    },
    {
        step: '03',
        title: 'AI Analysis',
        time: '24/7',
    },
    {
        step: '04',
        title: 'Optimization',
        time: 'Ongoing',
    },
];

export const testimonials = [
    {
        name: 'Mohammad Ali',
        role: 'Swasta',
        company: 'Petani Tangguh',
        content: 'EcoGuard AI membantu kami menghemat 28% konsumsi listrik.',
        rating: 5,
    },
    {
        name: 'Sari Dewi',
        role: 'Sustainability Director',
        company: 'Universitas Indonesia',
        content: 'Solusi sempurna untuk monitoring dan reporting emisi.',
        rating: 5,
    },
];

export const pricingPlans = [
    {
        name: 'Starter',
        price: 'Rp 2.500.000',
        period: '/bulan',
        features: [
            'Monitoring 5 sensor',
            'Dashboard basic',
            'Email alerts',
            'Laporan bulanan',
            'Support email',
        ],
        recommended: false,
    },
    {
        name: 'Professional',
        price: 'Rp 7.500.000',
        period: '/bulan',
        features: [
            'Monitoring 20 sensor',
            'Dashboard premium',
            'AI predictions',
            'Multi-channel alerts',
            'Laporan real-time',
            'Priority support',
            'API access',
        ],
        recommended: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        features: [
            'Unlimited sensors',
            'Custom dashboard',
            'Advanced AI analytics',
            'Dedicated support',
            'On-premise deployment',
            'Custom integration',
            'Training & consultancy',
        ],
        recommended: false,
    },
];

export const faqs = [
    {
        question: 'Berapa lama waktu implementasi?',
        answer: 'Implementasi standar membutuhkan 1-3 hari kerja, tergantung kompleksitas sistem yang ada.',
    },
    {
        question: 'Apakah perlu mengganti peralatan yang ada?',
        answer: 'Tidak. EcoGuard AI dapat diintegrasikan dengan sistem dan sensor yang sudah ada.',
    },
    {
        question: 'Bagaimana dengan keamanan data?',
        answer: 'Data dienkripsi end-to-end dengan standar enterprise dan disimpan di server lokal Indonesia.',
    },
    {
        question: 'Apakah tersedia versi mobile?',
        answer: 'Ya, tersedia aplikasi mobile untuk iOS dan Android untuk monitoring on-the-go.',
    },
];

export const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'YouTube', icon: 'Youtube', url: '#' },
];

export const contactInfo = {
    email: 'support@ecoguard.ai',
    phone: '+62 21 1234 5678',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan, Indonesia',
    workingHours: 'Senin - Jumat: 06:00 - 16:00',
};