import { CONVERSATION_PATTERNS, INDUSTRY_DATA, SALES_SCRIPTS, PAIN_POINTS, SOLUTIONS } from './knowledge-base';

export class AIChatEngine {
    constructor(industry = 'manufacturing') {
        this.industry = industry;
        this.conversationHistory = [];
        this.context = {
            stage: 'opening',
            pain_points: [],
            budget_range: null,
            timeline: null,
            decision_maker: false,
            facility_size: null,
            energy_usage: null,
            water_usage: null
        };
        this.userProfile = {
            name: '',
            role: '',
            experience_level: 'beginner'
        };
        this.sessionStart = new Date();
        this.memory = new Map();

        // Initialize with general knowledge
        this.generalKnowledge = this.initializeGeneralKnowledge();
    }

    // ==================== GENERAL KNOWLEDGE BASE ====================
    initializeGeneralKnowledge() {
        return {
            greetings: ['halo', 'hai', 'hi', 'hello', 'selamat', 'pagi', 'siang', 'sore', 'malam'],
            farewells: ['bye', 'selamat tinggal', 'sampai jumpa', 'dadah', 'goodbye'],
            thanks: ['terima kasih', 'thanks', 'thank you', 'makasih'],
            questions: ['apa', 'siapa', 'dimana', 'kapan', 'mengapa', 'bagaimana', 'berapa'],

            // General topics
            topics: {
                // EcoGuard related
                ecoguard: {
                    name: 'EcoGuard AI',
                    description: 'Platform monitoring dan optimasi energi & air berbasis AI dan IoT',
                    features: [
                        'Real-time monitoring konsumsi energi dan air',
                        'Analisis prediktif untuk preventive maintenance',
                        'Dashboard analytics dengan AI insights',
                        'Automated reporting dan alerting',
                        'Integration dengan sistem existing (BMS, SCADA)'
                    ],
                    benefits: [
                        'Penghematan 25-60% biaya operasional',
                        'ROI 8-18 bulan',
                        'Sustainability dan carbon footprint reduction',
                        'Data-driven decision making',
                        'Compliance dengan regulasi energi'
                    ]
                },

                // General topics chatbot should know
                general: {
                    about_company: {
                        name: 'Perusahaan',
                        info: 'EcoGuard adalah perusahaan teknologi yang fokus pada solusi efisiensi energi dan air menggunakan AI dan IoT. Berdiri sejak 2020, sudah membantu 100+ perusahaan di Indonesia.'
                    },
                    contact: {
                        phone: '+62 856-4889-8807',
                        email: 'info@ecoguard.ai',
                        website: 'https://ecoguard.ai',
                        address: 'Jakarta, Indonesia'
                    },
                    services: [
                        'Energy Monitoring System',
                        'Water Management Solution',
                        'Predictive Maintenance',
                        'Carbon Footprint Analytics',
                        'Smart Building Integration'
                    ]
                },

                // Industry specific knowledge
                industries: {
                    sekolah: {
                        name: 'Sektor Pendidikan',
                        suitability: 'Sangat cocok untuk sekolah/kampus karena:',
                        reasons: [
                            'Educational value untuk siswa (belajar data science & sustainability)',
                            'Penghematan biaya operasional yang signifikan',
                            'Tools untuk penelitian dan project siswa',
                            'Mendukung program green campus',
                            'ROI cepat dari penghematan listrik dan air'
                        ],
                        case_study: 'Sekolah ABC di Jakarta berhasil menghemat Rp 45 juta/bulan',
                        recommendation: 'Mulai dengan pilot project di lab komputer dan gedung utama'
                    },
                    manufacturing: {
                        name: 'Manufaktur',
                        savings: '25-35% penghematan energi',
                        focus: 'Motor, compressor, lighting, HVAC'
                    },
                    property: {
                        name: 'Property',
                        savings: '30-40% untuk common area',
                        focus: 'HVAC optimization, occupancy sensing'
                    }
                }
            }
        };
    }

    // ==================== ENHANCED QUESTION ANALYZER ====================
    analyzeQuestion(question) {
        const lowerQuestion = question.toLowerCase().trim();

        // First, check for general conversation
        const generalAnalysis = this.analyzeGeneralConversation(lowerQuestion);
        if (generalAnalysis.found) {
            return generalAnalysis;
        }

        // Then check for industry/topic specific
        const topicAnalysis = this.analyzeTopic(lowerQuestion);
        if (topicAnalysis.found) {
            return topicAnalysis;
        }

        // Finally, check for intent patterns
        const intentAnalysis = this.analyzeIntent(lowerQuestion);

        return {
            found: true,
            type: 'intent',
            intent: intentAnalysis.intent || 'general_inquiry',
            confidence: intentAnalysis.confidence || 0.7,
            entities: intentAnalysis.entities || {},
            topic: intentAnalysis.topic || 'ecoguard',
            context: intentAnalysis.context || 'general',
            needs_clarification: false
        };
    }

    analyzeGeneralConversation(question) {
        // Greetings
        if (this.generalKnowledge.greetings.some(g => question.includes(g))) {
            return {
                found: true,
                type: 'greeting',
                response_type: 'greeting',
                confidence: 1.0
            };
        }

        // Farewells
        if (this.generalKnowledge.farewells.some(f => question.includes(f))) {
            return {
                found: true,
                type: 'farewell',
                response_type: 'farewell',
                confidence: 1.0
            };
        }

        // Thanks
        if (this.generalKnowledge.thanks.some(t => question.includes(t))) {
            return {
                found: true,
                type: 'thanks',
                response_type: 'thanks',
                confidence: 1.0
            };
        }

        return { found: false };
    }

    analyzeTopic(question) {
        // Check for known topics
        for (const [topicKey, topicData] of Object.entries(this.generalKnowledge.topics)) {
            // Check topic name
            if (question.includes(topicKey) ||
                (topicData.name && question.includes(topicData.name.toLowerCase()))) {
                return {
                    found: true,
                    type: 'topic',
                    topic: topicKey,
                    confidence: 0.9,
                    topic_data: topicData
                };
            }

            // Check for industry mentions
            if (topicKey === 'industries') {
                for (const [industryKey, industryData] of Object.entries(topicData)) {
                    if (question.includes(industryKey) ||
                        question.includes(industryData.name?.toLowerCase() || '')) {
                        return {
                            found: true,
                            type: 'industry',
                            topic: industryKey,
                            industry: industryKey,
                            confidence: 0.85,
                            industry_data: industryData
                        };
                    }
                }
            }
        }

        return { found: false };
    }

    analyzeIntent(question) {
        // Enhanced intent detection with broader categories
        const intentPatterns = {
            // Price & Cost
            'price_inquiry': {
                keywords: ['harga', 'biaya', 'cost', 'price', 'invest', 'uang', 'rp', 'juta', 'miliar', 'budget', 'anggaran', 'mahal', 'murah'],
                context: 'pricing'
            },

            // Benefits & Value
            'benefits_inquiry': {
                keywords: ['manfaat', 'keuntungan', 'benefit', 'value', 'untung', 'kelebihan', 'plus', 'advantage'],
                context: 'value_prop'
            },

            // Technology & Features
            'tech_inquiry': {
                keywords: ['iot', 'sensor', 'teknologi', 'ai', 'machine learning', 'software', 'hardware', 'platform', 'dashboard', 'fitur', 'feature', 'cara kerja'],
                context: 'technical'
            },

            // Implementation & Process
            'implementation_inquiry': {
                keywords: ['implementasi', 'pasang', 'install', 'setup', 'proses', 'timeline', 'waktu', 'durasi', 'kapan', 'deadline', 'tahap', 'step'],
                context: 'implementation'
            },

            // Comparison & Alternatives
            'comparison_inquiry': {
                keywords: ['banding', 'perbedaan', 'vs', 'competitor', 'lainnya', 'alternatif', 'vendor', 'provider', 'beda', 'lebih baik'],
                context: 'comparison'
            },

            // Support & Service
            'support_inquiry': {
                keywords: ['support', 'maintenance', 'garansi', 'service', 'after sales', 'bantuan', 'troubleshoot', 'help', 'bantu'],
                context: 'support'
            },

            // Environmental & Sustainability
            'sustainability_inquiry': {
                keywords: ['green', 'hijau', 'lingkungan', 'environment', 'sustainability', 'carbon', 'karbon', 'eco', 'ramah lingkungan'],
                context: 'sustainability'
            },

            // Specific Questions
            'what_is': {
                keywords: ['apa itu', 'what is', 'jelaskan', 'definisi', 'pengertian'],
                context: 'definition'
            },

            'how_to': {
                keywords: ['bagaimana cara', 'how to', 'cara menggunakan', 'tutorial', 'panduan'],
                context: 'tutorial'
            },

            'why': {
                keywords: ['mengapa', 'why', 'alasan', 'reason', 'kenapa'],
                context: 'reasoning'
            }
        };

        let detectedIntent = 'general_inquiry';
        let confidence = 0.5;
        let entities = {};
        let topic = 'general';

        // Check each intent pattern
        for (const [intent, pattern] of Object.entries(intentPatterns)) {
            const keywordMatches = pattern.keywords.filter(kw =>
                question.includes(kw)
            ).length;

            if (keywordMatches > 0) {
                detectedIntent = intent;
                confidence = Math.min(0.5 + (keywordMatches * 0.15), 0.95);
                break;
            }
        }

        // Extract entities
        entities = this.extractEntities(question);

        return {
            intent: detectedIntent,
            confidence,
            entities,
            topic,
            context: intentPatterns[detectedIntent]?.context || 'general'
        };
    }

    extractEntities(question) {
        const entities = {};

        // Extract numbers (budget, size, etc)
        const numberMatch = question.match(/\d+[\d.,]*/g);
        if (numberMatch) {
            entities.numbers = numberMatch;

            // Check if it's budget (contains juta, miliar, rb)
            if (question.match(/juta|miliar|rb|ratus|ribu/i)) {
                entities.budget = numberMatch[0] + ' ' + (question.match(/juta|miliar|rb|ratus|ribu/i)?.[0] || '');
                this.context.budget_range = entities.budget;
            }

            // Check if it's size (contains m2, meter, luas)
            if (question.match(/m2|meter|luas|hektar/i)) {
                entities.size = numberMatch[0] + ' ' + (question.match(/m2|meter|luas|hektar/i)?.[0] || '');
                this.context.facility_size = entities.size;
            }
        }

        // Extract time references
        const timeWords = ['segera', 'cepat', 'urgent', 'mendesak', 'besok', 'minggu', 'bulan', 'tahun'];
        timeWords.forEach(word => {
            if (question.includes(word)) {
                entities.timeline = word;
                this.context.timeline = word;
            }
        });

        return entities;
    }

    // ==================== ENHANCED RESPONSE GENERATOR ====================
    generateResponse(question) {
        const analysis = this.analyzeQuestion(question);

        // Add to conversation history
        const userMessage = {
            type: 'user',
            content: question,
            time: new Date().toISOString(),
            analysis: analysis
        };
        this.conversationHistory.push(userMessage);

        // Generate response based on analysis
        let response = '';

        switch (analysis.type) {
            case 'greeting':
                response = this.generateGreetingResponse();
                break;

            case 'farewell':
                response = this.generateFarewellResponse();
                break;

            case 'thanks':
                response = this.generateThanksResponse();
                break;

            case 'topic':
            case 'industry':
                response = this.generateTopicResponse(analysis);
                break;

            case 'intent':
            default:
                response = this.generateIntentBasedResponse(analysis);
                break;
        }

        // Personalize if we have user info
        if (this.userProfile.name) {
            response = `Halo ${this.userProfile.name}! 👋\n\n${response}`;
        }

        // Add signature
        response += `\n\n🤖 *EcoGuard AI Assistant*\n💡 Powered by AI & Industry Insights`;

        // Add to history
        const aiMessage = {
            type: 'ai',
            content: response,
            time: new Date().toISOString(),
            analysis: analysis
        };
        this.conversationHistory.push(aiMessage);

        return {
            response,
            analysis: aiMessage.analysis
        };
    }

    // ==================== RESPONSE GENERATORS ====================
    generateGreetingResponse() {
        const greetings = [
            `Halo! 👋 Selamat datang di EcoGuard AI Assistant!\n\nSaya siap bantu Anda dengan:\n• Analisis efisiensi energi & air\n• Teknologi IoT & AI untuk bisnis\n• ROI calculation & business case\n• Industry-specific solutions\n\nApa yang bisa saya bantu hari ini?`,

            `Hi! 😊 Senang bertemu Anda!\n\nSaya AI Assistant EcoGuard, pakar dalam efisiensi energi dan air menggunakan teknologi AI.\n\nBisa tanya apa saja tentang:\n- Penghematan biaya operasional\n- Implementasi teknologi monitoring\n- Case study industri\n- Sustainability solutions\n\nAda yang ingin ditanyakan?`,

            `Selamat datang! 🎯\n\nSaya EcoGuard AI, siap membantu transformasi bisnis Anda menjadi lebih efisien dan sustainable.\n\nExpertise area:\n✅ Energy monitoring & optimization\n✅ Water management solutions\n✅ Predictive maintenance\n✅ Carbon footprint analytics\n\nMau mulai dari mana?`
        ];

        return this.getRandomItem(greetings);
    }

    generateFarewellResponse() {
        const farewells = [
            `Terima kasih sudah chatting dengan EcoGuard AI! 🙏\n\nJangan ragu untuk kembali jika ada pertanyaan lagi.\n\n📞 Contact: +62 856-4889-8807\n📧 Email: info@ecoguard.ai\n🌐 Website: ecoguard.ai\n\nSampai jumpa! 👋`,

            `Selamat tinggal! 😊 Terima kasih untuk percakapan yang menarik.\n\nJika butuh analisis lebih detail, tim kami siap membantu dengan:\n• Free site audit\n• Detailed proposal\n• ROI calculation\n\nHave a great day! 🌟`,

            `Sampai jumpa! 🎯\n\nIngat, setiap penghematan energi = profit untuk bisnis + kontribusi untuk bumi.\n\nMari bersama ciptakan bisnis yang sustainable dan profitable! 💚`
        ];

        return this.getRandomItem(farewells);
    }

    generateThanksResponse() {
        const thanksResponses = [
            `Sama-sama! 😊 Senang bisa membantu.\n\nAda hal lain yang ingin ditanyakan tentang efisiensi energi atau teknologi monitoring?`,

            `Terima kasih kembali! 🙏\n\nJika ada pertanyaan lebih lanjut atau butuh konsultasi detail, jangan sungkan untuk tanya lagi.`,

            `You're welcome! 👍\n\nIngat, investasi dalam efisiensi energi adalah investasi yang pasti ROI-nya.\n\nMau explore topik lainnya?`
        ];

        return this.getRandomItem(thanksResponses);
    }

    generateTopicResponse(analysis) {
        if (analysis.type === 'industry' && analysis.industry_data) {
            return this.generateIndustryResponse(analysis.topic, analysis.industry_data);
        }

        if (analysis.topic_data) {
            return this.generateGeneralTopicResponse(analysis.topic, analysis.topic_data);
        }

        return this.generateGeneralResponse();
    }

    generateIndustryResponse(industry, data) {
        const responses = {
            sekolah: `🏫 *ECO-GUARD UNTUK PENDIDIKAN/SEKOLAH*\n\n` +
                `Sangat worth it! Berikut detailnya:\n\n` +
                `🎓 *Educational Value:*\n` +
                `• Teaching tool untuk mata pelajaran STEM\n` +
                `• Real-time data untuk penelitian siswa\n` +
                `• Sustainability education integration\n` +
                `• Project-based learning opportunities\n\n` +
                `💰 *Financial Benefits:*\n` +
                `• Penghematan: ${data.savings || '25-40%'}\n` +
                `• ROI: ${data.roi_average || '10-16 bulan'}\n` +
                `• Monthly savings: Rp 35-75 juta\n\n` +
                `🌱 *Sustainability Impact:*\n` +
                `• Reduce carbon footprint 15-25%\n` +
                `• Green school certification\n` +
                `• Environmental awareness program\n\n` +
                `📊 *Case Study:* ${data.case_study || 'Sekolah ABC hemat Rp 45jt/bulan'}\n\n` +
                `💡 *Rekomendasi:* ${data.recommendation || 'Start dengan pilot project di area lab komputer'}\n\n` +
                `Apakah Anda tertarik untuk detailed analysis khusus sekolah?`,

            manufacturing: `🏭 *ECO-GUARD UNTUK MANUFAKTUR*\n\n` +
                `Industri manufaktur adalah pengguna energi terbesar. EcoGuard bisa bantu:\n\n` +
                `⚡ *Focus Areas:*\n` +
                `• Motor & drive optimization\n` +
                `• Compressed air system\n` +
                `• HVAC & lighting\n` +
                `• Production line monitoring\n\n` +
                `📈 *Typical Results:*\n` +
                `• Savings: ${data.savings || '25-35%'}\n` +
                `• ROI: 8-14 bulan\n` +
                `• Monthly impact: Rp 85-250 juta\n\n` +
                `🔧 *Technology:*\n` +
                `• Real-time power quality monitoring\n` +
                `• Predictive maintenance alerts\n` +
                `• Production efficiency analytics\n\n` +
                `Mau analisis area mana yang paling boros?`,

            property: `🏢 *ECO-GUARD UNTUK PROPERTY*\n\n` +
                `Gedung komersial bisa hemat signifikan dengan smart monitoring:\n\n` +
                `❄️ *HVAC Optimization:*\n` +
                `• Occupancy-based temperature control\n` +
                `• Peak load management\n` +
                `• Tenant comfort optimization\n\n` +
                `💡 *Lighting & Common Areas:*\n` +
                `• Smart lighting dengan motion sensors\n` +
                `• Common area efficiency\n` +
                `• Tenant billing accuracy\n\n` +
                `📊 *Results:*\n` +
                `• Savings: ${data.savings || '30-40%'}\n` +
                `• ROI: 10-16 bulan\n` +
                `• Tenant satisfaction improvement\n\n` +
                `Mau tahu lebih detail?`
        };

        return responses[industry] || this.generateGeneralResponse();
    }

    generateGeneralTopicResponse(topic, data) {
        if (topic === 'ecoguard') {
            return `🤖 *TENTANG ECOGUARD AI*\n\n` +
                `${data.description}\n\n` +
                `✨ *Key Features:*\n` +
                `${data.features.map(f => `• ${f}`).join('\n')}\n\n` +
                `✅ *Benefits:*\n` +
                `${data.benefits.map(b => `• ${b}`).join('\n')}\n\n` +
                `📈 *Proven Results:*\n` +
                `• 100+ clients across industries\n` +
                `• Average savings: 25-60%\n` +
                `• ROI: 8-18 months\n\n` +
                `Ada aspek spesifik yang ingin diketahui lebih detail?`;
        }

        return this.generateGeneralResponse();
    }

    generateIntentBasedResponse(analysis) {
        const intentResponses = {
            price_inquiry: `💰 *INVESTMENT & PRICING*\n\n` +
                `Berdasarkan industri ${this.industry}, berikut estimasi:\n\n` +
                `📊 *Package Options:*\n` +
                `1. Basic Monitoring: Rp 250-500 juta\n` +
                `   - IoT sensors + basic dashboard\n` +
                `   - ROI: 12-18 bulan\n\n` +
                `2. Advanced Analytics: Rp 500 juta - 1.2 M\n` +
                `   - AI predictions + advanced reporting\n` +
                `   - ROI: 8-14 bulan\n\n` +
                `3. Enterprise Suite: Rp 1.2 M+ \n` +
                `   - Full integration + predictive maintenance\n` +
                `   - ROI: 6-12 bulan\n\n` +
                `💡 *Note:* Exact pricing tergantung scope, facility size, dan requirements spesifik.\n\n` +
                `Mau free quotation?`,

            benefits_inquiry: `✅ *MANFAAT & VALUE PROPOSITION*\n\n` +
                `Dengan EcoGuard, Anda dapat:\n\n` +
                `💰 *Financial Benefits:*\n` +
                `• 25-60% savings on energy & water\n` +
                `• Fast ROI (8-18 months)\n` +
                `• Reduced maintenance costs\n` +
                `• Extended equipment lifespan\n\n` +
                `🌱 *Sustainability Benefits:*\n` +
                `• Carbon footprint reduction\n` +
                `• Green certification support\n` +
                `• ESG reporting automation\n` +
                `• Corporate social responsibility\n\n` +
                `📈 *Operational Benefits:*\n` +
                `• Real-time visibility\n` +
                `• Predictive maintenance\n` +
                `• Data-driven decisions\n` +
                `• Automated reporting\n\n` +
                `Manfaat mana yang paling penting untuk bisnis Anda?`,

            tech_inquiry: `🛠️ *TECHNOLOGY & FEATURES*\n\n` +
                `EcoGuard menggunakan teknologi terkini:\n\n` +
                `📡 *Hardware:*\n` +
                `• IoT sensors (energy, water, temperature, etc.)\n` +
                `• Wireless connectivity (LoRaWAN, WiFi, 4G)\n` +
                `• Edge computing devices\n\n` +
                `🤖 *Software:*\n` +
                `• AI analytics engine\n` +
                `• Real-time dashboard\n` +
                `• Mobile app (iOS/Android)\n` +
                `• API for integration\n\n` +
                `⚙️ *Key Features:*\n` +
                `• Predictive maintenance alerts\n` +
                `• Anomaly detection\n` +
                `• Automated reporting\n` +
                `• Multi-site management\n\n` +
                `Tertarik dengan aspek teknis tertentu?`,

            implementation_inquiry: `📅 *IMPLEMENTATION PROCESS*\n\n` +
                `Proses implementasi yang smooth:\n\n` +
                `🔍 *Phase 1: Assessment (3-5 days)*\n` +
                `• Site survey & data collection\n` +
                `• Requirement analysis\n` +
                `• Proposal development\n\n` +
                `⚙️ *Phase 2: Installation (7-14 days)*\n` +
                `• Sensor deployment\n` +
                `• System configuration\n` +
                `• Integration with existing systems\n\n` +
                `🎓 *Phase 3: Training (1-2 days)*\n` +
                `• User training\n` +
                `• Admin training\n` +
                `• Documentation handover\n\n` +
                `📊 *Phase 4: Optimization (Ongoing)*\n` +
                `• Performance monitoring\n` +
                `• Continuous improvement\n` +
                `• Regular reporting\n\n` +
                `Timeline bisa customize sesuai kebutuhan.`,

            comparison_inquiry: `📊 *ECO-GUARD VS COMPETITORS*\n\n` +
                `Keunggulan EcoGuard:\n\n` +
                `🎯 *Differentiators:*\n` +
                `1. *AI-Powered:* Bukan hanya monitoring, tapi predictive analytics\n` +
                `2. *Local Expertise:* Understand Indonesian market & regulations\n` +
                `3. *Holistic Approach:* Energy + water + sustainability\n` +
                `4. *Proven ROI:* Transparent case studies & results\n\n` +
                `🏆 *Why Choose EcoGuard:*\n` +
                `• 95% client retention rate\n` +
                `• 24/7 local support\n` +
                `• Continuous feature updates\n` +
                `• Integration flexibility\n\n` +
                `Mau competitive comparison matrix?`,

            sustainability_inquiry: `🌱 *SUSTAINABILITY & ENVIRONMENT*\n\n` +
                `EcoGuard membantu bisnis jadi lebih green:\n\n` +
                `📉 *Carbon Reduction:*\n` +
                `• Track carbon footprint in real-time\n` +
                `• Set reduction targets\n` +
                `• Automated ESG reporting\n\n` +
                `💧 *Water Conservation:*\n` +
                `• Leak detection & prevention\n` +
                `• Usage optimization\n` +
                `• Rainwater harvesting integration\n\n` +
                `📜 *Certification Support:*\n` +
                `• Green Building certification\n` +
                `• ISO 50001 compliance\n` +
                `• ESG reporting framework\n\n` +
                `🌍 *Environmental Impact:*\n` +
                `Average client: 15-25% carbon reduction annually`,

            what_is: `🤔 *APA ITU ECOGUARD?*\n\n` +
                `EcoGuard adalah platform *AI-powered energy and water management* yang membantu bisnis:\n\n` +
                `1. *Monitor* konsumsi energi & air real-time\n` +
                `2. *Analyze* patterns & inefficiencies menggunakan AI\n` +
                `3. *Optimize* penggunaan untuk maksimal savings\n` +
                `4. *Predict* maintenance needs sebelum terjadi breakdown\n\n` +
                `💡 *Simple analogy:* Seperti dokter pribadi untuk kesehatan energi bisnis Anda!\n\n` +
                `Ada aspek spesifik yang ingin dijelaskan lebih detail?`,

            how_to: `🔧 *CARA KERJA ECOGUARD*\n\n` +
                `Prosesnya sederhana:\n\n` +
                `1. *Install Sensors:* Pasang sensor IoT di titik-titik kunci\n` +
                `2. *Collect Data:* Data dikirim ke cloud secara real-time\n` +
                `3. *AI Analysis:* Algoritma AI menganalisis patterns\n` +
                `4. *Get Insights:* Dashboard menunjukkan insights & recommendations\n` +
                `5. *Take Action:* Implement recommendations untuk savings\n\n` +
                `📱 *User Experience:*\n` +
                `• Dashboard mudah digunakan\n` +
                `• Mobile app untuk monitoring anywhere\n` +
                `• Automated alerts via WhatsApp/Email\n` +
                `• Regular performance reports\n\n` +
                `Mau demo cara kerjanya?`,

            why: `🤷 *MENGAPA HARUS ECOGUARD?*\n\n` +
                `5 alasan utama:\n\n` +
                `1. *Proven ROI:* Investasi balik dalam 8-18 bulan\n` +
                `2. *Comprehensive Solution:* Energy + water + sustainability\n` +
                `3. *Technology Edge:* AI & IoT, bukan hanya basic monitoring\n` +
                `4. *Local Support:* Tim lokal, support 24/7\n` +
                `5. *Scalability:* Tumbuh bersama bisnis Anda\n\n` +
                `📈 *Business Impact:*\n` +
                `• Reduced operational costs\n` +
                `• Improved sustainability metrics\n` +
                `• Enhanced brand reputation\n` +
                `• Compliance with regulations\n\n` +
                `Masih ada pertanyaan "mengapa"?`
        };

        return intentResponses[analysis.intent] || this.generateGeneralResponse();
    }

    generateGeneralResponse() {
        const generalResponses = [
            `Pertanyaan yang menarik! 😊 Sebagai AI Assistant EcoGuard, saya bisa bantu dengan berbagai topik:\n\n` +
            `📊 *Tentang Efisiensi Energi & Air*\n` +
            `💰 *ROI & Business Case*\n` +
            `🛠️ *Teknologi & Implementasi*\n` +
            `🌱 *Sustainability & Green Initiatives*\n` +
            `📈 *Case Studies & Success Stories*\n\n` +
            `Bisa ceritakan lebih spesifik apa yang ingin diketahui?`,

            `Terima kasih untuk pertanyaannya! 🙏\n\n` +
            `Saya AI Assistant dengan pengetahuan tentang:\n` +
            `• Energy management solutions\n` +
            `• Water conservation technologies\n` +
            `• AI & IoT applications for business\n` +
            `• Sustainability best practices\n` +
            `• Industry-specific case studies\n\n` +
            `Topik mana yang paling relevan untuk Anda?`,

            `Saya paham pertanyaan Anda. 🤔\n\n` +
            `Sebagai referensi, EcoGuard membantu bisnis dengan:\n` +
            `✅ *Cost Reduction:* Average 25-60% savings\n` +
            `✅ *Technology:* AI + IoT for smart monitoring\n` +
            `✅ *Sustainability:* Carbon & water footprint reduction\n` +
            `✅ *ROI:* Typically 8-18 months payback\n\n` +
            `Mau fokus pada aspek tertentu?`
        ];

        return this.getRandomItem(generalResponses);
    }

    // ==================== HELPER METHODS ====================
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    updateContext(question, analysis) {
        // Simple context update
        const userMessages = this.conversationHistory.filter(m => m.type === 'user').length;

        if (userMessages === 1) this.context.stage = 'opening';
        else if (userMessages <= 3) this.context.stage = 'discovery';
        else this.context.stage = 'qualification';

        // Store in memory
        this.memory.set('last_interaction', new Date().toISOString());
        this.memory.set('question_count', userMessages);
    }

    getSummary() {
        const sessionDuration = Math.round((new Date() - this.sessionStart) / 1000 / 60);

        return {
            industry: this.industry,
            stage: this.context.stage,
            pain_points: this.context.pain_points,
            budget: this.context.budget_range,
            timeline: this.context.timeline,
            conversation_length: this.conversationHistory.length,
            session_duration: `${sessionDuration} minutes`,
            user_profile: this.userProfile
        };
    }

    clearConversation() {
        this.conversationHistory = [];
        this.context = {
            stage: 'opening',
            pain_points: [],
            budget_range: null,
            timeline: null,
            decision_maker: false,
            facility_size: null,
            energy_usage: null,
            water_usage: null
        };
        this.sessionStart = new Date();
    }
}

// Export the enhanced knowledge base
export { CONVERSATION_PATTERNS, INDUSTRY_DATA, SALES_SCRIPTS, PAIN_POINTS, SOLUTIONS };