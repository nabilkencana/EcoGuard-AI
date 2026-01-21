// Enhanced knowledge base
export const CONVERSATION_PATTERNS = {
    // Price inquiries
    "harga|biaya|cost|price|invest|uang|rp|juta|miliar|budget|anggaran": {
        context: "price_inquiry",
        responses: [
            "Untuk industri {{industry}}, investment biasanya {{investment_range}} dengan ROI {{roi_average}}.",
            "Berdasarkan scale yang Anda butuhkan, biaya sekitar {{price_range}}. Breakdown: {{breakdown}}.",
            "Package untuk {{industry}} dimulai dari {{starting_price}}. Inclusions: {{inclusions}}."
        ],
        follow_up: [
            "Budget yang disiapkan dalam range berapa?",
            "Butuh financing options?",
            "Ini untuk Capex atau Opex?"
        ]
    },

    // ROI inquiries
    "roi|return|balik modal|payback|investasi|untung|keuntungan": {
        context: "roi_inquiry",
        responses: [
            "ROI untuk {{industry}} rata-rata {{roi_months}} bulan. Case study: {{case_study}}.",
            "Dengan savings {{monthly_savings}}, investasi balik dalam {{roi_calculation}}.",
            "Berdasarkan 100+ client, ROI {{roi_percentage}} dalam {{time_frame}}."
        ],
        follow_up: [
            "Target ROI berapa bulan?",
            "Sudah hitung payback period?",
            "Prioritas cash flow atau long-term savings?"
        ]
    },

    // Technology inquiries
    "iot|sensor|teknologi|ai|machine learning|software|hardware|platform|dashboard": {
        context: "tech_inquiry",
        responses: [
            "Tech stack: {{sensor_types}} → {{gateway}} → Cloud → {{dashboard}} → Mobile App.",
            "Kami pakai {{technology_stack}} untuk accuracy {{accuracy_rate}}.",
            "System architecture: {{architecture}} dengan redundancy {{redundancy}}."
        ],
        follow_up: [
            "Infrastructure IT sudah ready?",
            "Butuh berapa sensor points?",
            "Prefer cloud atau on-premise?"
        ]
    },

    // Implementation inquiries
    "implementasi|pasang|install|setup|proses|timeline|waktu|durasi|kapan|deadline": {
        context: "implementation_inquiry",
        responses: [
            "Timeline: {{timeline_steps}}. Total {{total_days}} hari kerja.",
            "Proses: {{implementation_process}}. Team: {{team_size}} orang.",
            "Schedule: {{schedule_breakdown}}. Minimal downtime: {{downtime}}."
        ],
        follow_up: [
            "Kapan ideal mulai?",
            "Butuh coordination dengan team lain?",
            "Ada peak season yang dihindari?"
        ]
    },

    // Case study requests
    "contoh|case|study|referensi|klien|portfolio|success story|bukti|testimoni": {
        context: "case_study_inquiry",
        responses: [
            "Di {{similar_industry}}: {{client_names}} dengan savings {{client_savings}}.",
            "Portfolio: {{portfolio_details}}. Client feedback: {{feedback}}.",
            "Case study detail: {{case_study_details}}. Bisa share via email PDF."
        ],
        follow_up: [
            "Industri mana yang paling relevan?",
            "Butuh contact reference?",
            "Mau site visit ke client?"
        ]
    },

    // Comparison inquiries
    "banding|perbedaan|vs|competitor|lainnya|alternatif|vendor|provider": {
        context: "comparison_inquiry",
        responses: [
            "Keunggulan kami vs competitors: {{advantages}}. Differentiator: {{differentiators}}.",
            "Perbedaan utama: {{key_differences}}. Unique value: {{unique_value}}.",
            "Kenapa pilih kami: {{reasons}}. Client retention: {{retention_rate}}."
        ],
        follow_up: [
            "Sedang evaluate vendor lain?",
            "Criteria selection yang utama apa?",
            "Mau competitive comparison matrix?"
        ]
    }
};

export const INDUSTRY_DATA = {
    manufacturing: {
        savings_range: "25-35%",
        monthly_savings: "Rp 85-250 juta",
        roi_average: "8-14 bulan",
        case_study: "PT Steel Manufacturing hemat Rp 185jt/bulan",
        investment_range: "Rp 250 juta - 2.5 M",
        sensor_types: "power quality, vibration, temperature, pressure",
        similar_companies: "PT Krakatau Steel, Unilever, Semen Indonesia",
        technology_stack: "IoT sensors + AI analytics + predictive maintenance",
        accuracy_rate: "95%",
        timeline_steps: "Audit 3d → Proposal 2d → Installation 10-14d → Training 1d",
        client_names: "PT ABC, PT XYZ, PT DEF",
        advantages: "Real-time monitoring, AI predictions, local support"
    },
    property: {
        savings_range: "30-40%",
        monthly_savings: "Rp 65-150 juta",
        roi_average: "10-16 bulan",
        case_study: "Gedung BNI City hemat 35% AC cost",
        investment_range: "Rp 150 juta - 1.5 M",
        sensor_types: "occupancy, temperature, CO2, humidity",
        similar_companies: "Pacific Place, Plaza Senayan, BRI Tower",
        technology_stack: "Smart BMS integration + occupancy optimization",
        accuracy_rate: "92%",
        timeline_steps: "Survey 2d → Design 3d → Installation 7-10d → Commissioning 2d",
        client_names: "Tower A, Tower B, Complex C",
        advantages: "BMS integration, occupancy analytics, comfort optimization"
    },
    retail: {
        savings_range: "40-50%",
        monthly_savings: "Rp 150-350 juta",
        roi_average: "9-12 bulan",
        case_study: "Mall Taman Anggrek hemat Rp 210jt/bulan",
        investment_range: "Rp 500 juta - 5 M",
        sensor_types: "foot traffic, lighting, refrigeration, HVAC",
        similar_companies: "Central Park, Grand Indonesia, Pondok Indah Mall",
        technology_stack: "Multi-sensor network + crowd analytics",
        accuracy_rate: "97%",
        timeline_steps: "Assessment 4d → Planning 3d → Rollout 14-21d → Optimization 3d",
        client_names: "Mall X, Mall Y, Retail Chain Z",
        advantages: "Foot traffic insights, refrigeration optimization, peak load management"
    },
    hospitality: {
        savings_range: "35-45%",
        monthly_savings: "Rp 95-220 juta",
        roi_average: "14-18 bulan",
        case_study: "Hotel Aryaduta hemat 42% operational cost",
        investment_range: "Rp 300 juta - 3 M",
        sensor_types: "room occupancy, water flow, energy, guest comfort",
        similar_companies: "Hotel Indonesia, Kempinski, Sheraton",
        technology_stack: "Guest comfort optimization + resource tracking",
        accuracy_rate: "90%",
        timeline_steps: "Phase 1 7d → Phase 2 10d → Phase 3 5d → Training 2d",
        client_names: "Hotel A, Resort B, Chain C",
        advantages: "Guest comfort + savings balance, 24/7 monitoring, predictive maintenance"
    }
};

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
    ],

    value_prop: [
        "Value yang Anda dapat: {{value_proposition}}. ROI jelas, savings terukur.",
        "Beyond savings: {{additional_benefits}}. Impact jangka panjang.",
        "Differentiator kami: {{differentiators}}. Why choose us."
    ]
};

export const PAIN_POINTS = {
    manufacturing: [
        { name: "High electricity cost", keyword: "listrik mahal" },
        { name: "Motor inefficiency", keyword: "motor boros" },
        { name: "Compressor waste", keyword: "kompresor" },
        { name: "Production downtime", keyword: "downtime" },
        { name: "Maintenance cost", keyword: "maintenance mahal" }
    ],
    property: [
        { name: "HVAC inefficiency", keyword: "ac boros" },
        { name: "Empty room waste", keyword: "ruang kosong" },
        { name: "Poor scheduling", keyword: "jadwal ac" },
        { name: "Tenant complaints", keyword: "keluhan" },
        { name: "High common area cost", keyword: "common area" }
    ],
    retail: [
        { name: "Lighting waste", keyword: "lampu boros" },
        { name: "Refrigeration cost", keyword: "freezer" },
        { name: "Foot traffic mismatch", keyword: "pengunjung" },
        { name: "Peak load charges", keyword: "beban puncak" },
        { name: "Tenant billing disputes", keyword: "tagihan" }
    ],
    general: [
        { name: "High utility bills", keyword: "tagihan mahal" },
        { name: "Manual monitoring", keyword: "manual" },
        { name: "No real-time data", keyword: "real-time" },
        { name: "Reactive maintenance", keyword: "maintenance" },
        { name: "Sustainability goals", keyword: "sustainability" }
    ]
};

export const SOLUTIONS = {
    manufacturing: [
        {
            for_pain_points: ["High electricity cost", "Motor inefficiency"],
            solution: "VFD installation + power factor correction (Save 15-25%)"
        },
        {
            for_pain_points: ["Compressor waste", "Production downtime"],
            solution: "Compressed air system optimization (Save 20-30%)"
        }
    ],
    property: [
        {
            for_pain_points: ["HVAC inefficiency", "Empty room waste"],
            solution: "Smart BMS with occupancy sensors (Save 25-35%)"
        }
    ],
    retail: [
        {
            for_pain_points: ["Lighting waste", "Foot traffic mismatch"],
            solution: "Smart lighting + foot traffic optimization (Save 30-40%)"
        }
    ],
    general: [
        {
            for_pain_points: ["Manual monitoring", "No real-time data"],
            solution: "Real-time IoT dashboard with alerts"
        }
    ]
};

export const USER_ROLES = {
    owner: "Pemilik/Pengusaha",
    director: "Direktur",
    manager: "Manajer",
    engineer: "Engineer",
    consultant: "Konsultan",
    other: "Lainnya"
};

export const CONVERSATION_STAGES = {
    opening: "Introduction & rapport building",
    discovery: "Understanding needs & pain points",
    qualification: "Budget, timeline, decision process",
    presentation: "Solution presentation",
    objection: "Handling concerns",
    closing: "Next steps & commitment"
};