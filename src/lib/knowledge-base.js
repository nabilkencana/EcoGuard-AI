// REAL CONVERSATION PATTERNS BASED ON ACTUAL SALES CHATS
export const CONVERSATION_PATTERNS = {
    // Pattern 1: Client tanya tentang penghematan
    "penghematan|hemat|save|saving": {
        context: "client_inquiring_about_savings",
        responses: [
            "Berdasarkan data 125+ client di industri {{industry}}, rata-rata penghematan yang kami capai adalah {{savings_range}}.",
            "Dari implementasi di {{similar_companies}}, penghematan yang realistis adalah {{savings_amount}} per bulan.",
            "Untuk bisnis sejenis {{industry}}, ROI biasanya {{roi_period}} dengan penghematan bulanan sekitar {{monthly_savings}}."
        ],
        follow_up: [
            "Apa ada data konsumsi 3 bulan terakhir untuk analisis lebih akurat?",
            "Area mana yang paling boros: listrik, air, atau keduanya?",
            "Apakah sudah ada sistem monitoring saat ini?"
        ]
    },

    // Pattern 2: Client tanya tentang ROI
    "roi|return|balik modal|payback|investasi": {
        context: "client_asking_roi",
        responses: [
            "ROI period untuk {{industry}} biasanya {{roi_average}}. Contoh: {{case_study}} balik modal dalam {{roi_months}} bulan.",
            "Investasi awal sekitar {{investment_range}}. Dengan penghematan {{monthly_savings}}, ROI tercapai dalam {{roi_calculation}}.",
            "Berdasarkan data {{client_count}} client, rata-rata ROI {{roi_percentage}} dalam {{time_frame}}."
        ],
        follow_up: [
            "Berapa budget yang disiapkan untuk improvement?",
            "Target ROI berapa bulan yang diharapkan?",
            "Apakah ada urgency untuk segera implementasi?"
        ]
    },

    // Pattern 3: Client tanya tentang teknologi
    "iot|sensor|teknologi|system|monitoring|real-time": {
        context: "client_asking_technology",
        responses: [
            "Kami pakai sensor {{sensor_types}} yang terintegrasi dengan dashboard real-time.",
            "Teknologi utama: IoT sensors untuk {{measurement_points}}, cloud analytics, dan AI prediction.",
            "System flow: Sensor → Gateway → Cloud → Dashboard → Automatic alerts."
        ],
        follow_up: [
            "Apakah infrastruktur IT sudah siap untuk IoT?",
            "Butuh berapa titik sensor untuk coverage optimal?",
            "Tim IT internal ada berapa orang?"
        ]
    },

    // Pattern 4: Client tanya tentang implementasi
    "implementasi|pasang|install|setup|proses|timeline": {
        context: "client_asking_implementation",
        responses: [
            "Timeline: Audit (3 hari) → Proposal (2 hari) → Installation ({{install_days}} hari) → Training (1 hari).",
            "Proses: Site survey → Design → Installation → Commissioning → Handover → Support.",
            "Team: 2 engineers untuk installation, 1 project manager, 24/7 support after."
        ],
        follow_up: [
            "Kapan timeline ideal untuk mulai?",
            "Ada event/peak season yang perlu dihindari?",
            "Butuh downtime saat installation?"
        ]
    },

    // Pattern 5: Client tanya tentang biaya
    "harga|biaya|cost|price|invest|uang": {
        context: "client_asking_price",
        responses: [
            "Biaya tergantung scale: Small ({{small_price}}), Medium ({{medium_price}}), Enterprise ({{enterprise_price}}).",
            "Package termasuk: {{inclusions}}. Biaya bulanan: {{monthly_fee}} untuk maintenance.",
            "Breakdown: Hardware {{hw_cost}}, Software {{sw_cost}}, Installation {{install_cost}}, Support {{support_cost}}."
        ],
        follow_up: [
            "Range budget yang disiapkan berapa?",
            "Butuh financing/leasing options?",
            "Apakah ada anggaran Capex atau Opex?"
        ]
    },

    // Pattern 6: Client minta case study
    "contoh|case|study|referensi|klien|portfolio": {
        context: "client_asking_references",
        responses: [
            "Contoh di {{similar_industry}}: {{company_name}} hemat {{savings_amount}} dalam {{time_period}}.",
            "Portfolio kami di {{industry}}: {{client_list}} dengan average savings {{avg_savings}}.",
            "Case study detail bisa di-share via email. Mau saya kirim PDF-nya?"
        ],
        follow_up: [
            "Industri mana yang paling relevan dengan bisnis Anda?",
            "Butuh reference contact untuk verifikasi?",
            "Mau jadwalkan site visit ke client kami?"
        ]
    },

    // Pattern 7: Client tanya tentang support
    "support|maintenance|garansi|service|after sales|bantuan": {
        context: "client_asking_support",
        responses: [
            "Support termasuk: {{support_inclusions}}. Response time: {{response_time}}.",
            "Garansi hardware {{hw_warranty}}, software updates {{sw_updates}}, 24/7 monitoring.",
            "Team support: {{support_team_size}} orang, SLA {{sla_percentage}}, emergency contact {{emergency_contact}}."
        ],
        follow_up: [
            "Butuh on-site support atau remote cukup?",
            "Ada IT team internal untuk handle basic issues?",
            "Prefer support via WhatsApp, email, atau phone?"
        ]
    }
};

// INDUSTRY-SPECIFIC DATA (REAL NUMBERS)
export const INDUSTRY_DATA = {
    manufacturing: {
        savings_range: "25-35%",
        monthly_savings: "Rp 85-250 juta",
        roi_average: "8-14 bulan",
        case_study: "PT Steel Manufacturing hemat Rp 185jt/bulan",
        sensor_types: "power quality, vibration, temperature",
        install_days: "10-14 hari",
        small_price: "Rp 250-500 juta",
        similar_companies: "PT Krakatau Steel, Unilever, Semen Indonesia"
    },
    property: {
        savings_range: "30-40%",
        monthly_savings: "Rp 65-150 juta",
        roi_average: "10-16 bulan",
        case_study: "Gedung BNI City hemat 35% AC cost",
        sensor_types: "occupancy, temperature, CO2",
        install_days: "7-10 hari",
        small_price: "Rp 150-300 juta",
        similar_companies: "Pacific Place, Plaza Senayan, BRI Tower"
    },
    retail: {
        savings_range: "40-50%",
        monthly_savings: "Rp 150-350 juta",
        roi_average: "9-12 bulan",
        case_study: "Mall Taman Anggrek hemat Rp 210jt/bulan",
        sensor_types: "foot traffic, lighting, refrigeration",
        install_days: "14-21 hari",
        small_price: "Rp 500 juta - 1.2 M",
        similar_companies: "Central Park, Grand Indonesia, Pondok Indah Mall"
    },
    hospitality: {
        savings_range: "35-45%",
        monthly_savings: "Rp 95-220 juta",
        roi_average: "14-18 bulan",
        case_study: "Hotel Aryaduta hemat 42% operational cost",
        sensor_types: "room occupancy, water flow, energy",
        install_days: "12-18 hari",
        small_price: "Rp 300-700 juta",
        similar_companies: "Hotel Indonesia, Kempinski, Sheraton"
    }
};

// SALES SCRIPT TEMPLATES
export const SALES_SCRIPTS = {
    opening: [
        "Terima kasih atas pertanyaannya! Saya bantu analisis kebutuhan {{industry}} Anda.",
        "Pertanyaan bagus! Berdasarkan pengalaman dengan {{client_count}} client {{industry}}...",
        "Saya paham concern Anda. Mari kita breakdown berdasarkan data real."
    ],

    middle: [
        "Untuk kasus seperti ini, biasanya kami rekomendasikan:",
        "Dari pattern yang sama, solusi efektifnya adalah:",
        "Berdasarkan best practices di industri:"
    ],

    closing: [
        "Langkah berikutnya: free audit untuk analisis detail. Mau dijadwalkan?",
        "Untuk angka lebih akurat, butuh data konsumsi 3 bulan. Bisa dishare?",
        "Saya bisa kirim proposal detail via email. Alamat emailnya?"
    ],

    pricing_talk: [
        "Untuk scope seperti ini, investment sekitar {{price_range}}. ROI {{roi_period}}.",
        "Package yang cocok: {{package_name}} dengan biaya {{package_price}}.",
        "Breakdown: Capex {{capex}} untuk hardware, Opex {{opex}}/bulan untuk software."
    ]
};