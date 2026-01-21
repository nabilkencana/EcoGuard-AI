import { motion } from 'framer-motion';
import {
    Brain, Zap, Droplets, Cloud, Bell, TrendingUp,
    Cpu, Database, Shield, Users, BarChart, Smartphone
} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/common/Card';

const FeaturesPage = () => {
    const mainFeatures = [
        {
            icon: Brain,
            title: 'AI-Powered Analytics',
            description: 'Machine Learning dan Deep Learning untuk analisis prediktif yang akurat.',
            details: [
                'Prediksi konsumsi energi & air',
                'Deteksi pola abnormal',
                'Rekomendasi otomatis',
                'Self-learning algorithms',
            ],
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Zap,
            title: 'Real-Time Monitoring',
            description: 'Dashboard live dengan update data setiap detik untuk pengambilan keputusan cepat.',
            details: [
                'Live sensor data',
                'Multi-location view',
                'Custom alerts threshold',
                'Historical comparison',
            ],
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: Droplets,
            title: 'Water Management',
            description: 'Sistem cerdas untuk optimasi penggunaan air dan deteksi kebocoran.',
            details: [
                'Flow monitoring',
                'Leak detection',
                'Conservation scheduling',
                'Quality tracking',
            ],
            color: 'from-blue-500 to-cyan-500',
        },
    ];

    const allFeatures = [
        {
            category: 'AI & Machine Learning',
            features: [
                { icon: Brain, name: 'Predictive Maintenance' },
                { icon: TrendingUp, name: 'Pattern Recognition' },
                { icon: Cpu, name: 'Anomaly Detection' },
            ],
        },
        {
            category: 'Monitoring & Control',
            features: [
                { icon: Zap, name: 'Real-Time Dashboard' },
                { icon: Bell, name: 'Smart Alerts' },
                { icon: BarChart, name: 'Advanced Analytics' },
            ],
        },
        {
            category: 'Sustainability',
            features: [
                { icon: Cloud, name: 'Carbon Tracking' },
                { icon: Droplets, name: 'Water Optimization' },
                { icon: Shield, name: 'Compliance Reporting' },
            ],
        },
        {
            category: 'Integration',
            features: [
                { icon: Database, name: 'API Access' },
                { icon: Users, name: 'Multi-User' },
                { icon: Smartphone, name: 'Mobile App' },
            ],
        },
    ];

    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <SectionTitle
                    title="Fitur Lengkap EcoGuard AI"
                    subtitle="Teknologi Canggih untuk Efisiensi Maksimal"
                    description="Jelajahi semua fitur yang membuat EcoGuard AI menjadi solusi terdepan dalam manajemen sumber daya dan keberlanjutan."
                    align="center"
                    className="mb-20"
                />

                {/* Main Features */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {mainFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                icon={feature.icon}
                                title={feature.title}
                                subtitle={feature.description}
                                className="h-full"
                            >
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {feature.details.map((detail, i) => (
                                        <li key={i} className="flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                                            <span className="text-gray-700">{detail}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-gray-100">
                                    <div className="text-sm text-gray-500">Teknologi:</div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {['AI', 'IoT', 'Cloud', 'ML'].map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* All Features Grid */}
                <SectionTitle
                    title="Semua Fitur dalam Satu Platform"
                    align="center"
                    className="mb-12"
                />

                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    {allFeatures.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, x: catIndex % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                title={category.category}
                                variant="gradient"
                                className="h-full"
                            >
                                <div className="space-y-6">
                                    {category.features.map((feature, featIndex) => (
                                        <div
                                            key={featIndex}
                                            className="flex items-center p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
                                        >
                                            <div className="p-3 bg-green-100 rounded-lg mr-4">
                                                <feature.icon className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    {feature.name}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Specifications */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-12 text-white"
                >
                    <SectionTitle
                        title="Spesifikasi Teknis"
                        align="center"
                        className="mb-12"
                        tagColor="green"
                    />

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">99.9%</div>
                            <div className="text-gray-300">Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">&lt;100ms</div>
                            <div className="text-gray-300">Latency</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">256-bit</div>
                            <div className="text-gray-300">Encryption</div>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Protocols', value: 'MQTT, HTTP, WebSocket' },
                            { label: 'Database', value: 'PostgreSQL, TimescaleDB' },
                            { label: 'Cloud', value: 'AWS, Google Cloud' },
                            { label: 'Compliance', value: 'ISO 50001, LEED' },
                        ].map((spec, i) => (
                            <div key={i} className="p-4 bg-white/10 rounded-xl">
                                <div className="text-sm text-gray-300">{spec.label}</div>
                                <div className="font-medium">{spec.value}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Integration Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <SectionTitle
                        title="Integrasi yang Luas"
                        subtitle="Bekerja dengan Sistem yang Ada"
                        align="center"
                        className="mb-12"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            'SCADA',
                            'PLC',
                            'BMS',
                            'ERP',
                            'CRM',
                            'IoT',
                            'API',
                            'Modbus',
                            'BACnet',
                            'OPC UA',
                            'REST',
                            'GraphQL',
                        ].map((system, i) => (
                            <div
                                key={i}
                                className="p-4 bg-white border border-gray-200 rounded-xl text-center hover:border-green-300 hover:shadow-lg transition-all"
                            >
                                <div className="text-lg font-medium text-gray-800">{system}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturesPage;