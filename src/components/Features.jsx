import { motion } from 'framer-motion';
import { Brain, Zap, Droplets, Cloud, Bell, TrendingUp} from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Brain,
            title: 'AI Prediction',
            description: 'Machine Learning memprediksi konsumsi dan memberikan peringatan dini',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Zap,
            title: 'Monitoring Real-Time',
            description: 'Pantau konsumsi listrik dan air secara live dengan dashboard interaktif',
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: Droplets,
            title: 'Efisiensi Air',
            description: 'Deteksi kebocoran dan optimalkan penggunaan air hingga 40%',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Cloud,
            title: 'Emisi Karbon',
            description: 'Hitung dan kurangi jejak karbon secara otomatis',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Bell,
            title: 'Smart Alerts',
            description: 'Notifikasi pintar untuk abnormalitas konsumsi',
            color: 'from-red-500 to-rose-500',
        },
        {
            icon: TrendingUp,
            title: 'Analytics Dashboard',
            description: 'Laporan dan insight berbasis data untuk pengambilan keputusan',
            color: 'from-indigo-500 to-purple-500',
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                        Fitur Unggulan
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Teknologi <span className="text-green-600">Cerdas</span> untuk Lingkungan
                    </h2>
                    <p className="text-xl text-gray-600">
                        Kombinasi AI, IoT, dan analisis data untuk efisiensi maksimal
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                                {/* Icon Container */}
                                <div className={`mb-6 p-4 bg-gradient-to-br ${feature.color} rounded-xl w-16 h-16 flex items-center justify-center`}>
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {feature.description}
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {['AI', 'IoT', 'Cloud', 'Analytics'].map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Integration Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-12 text-white"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="lg:w-2/3 mb-8 lg:mb-0">
                            <h3 className="text-3xl font-bold mb-4">
                                Terintegrasi dengan Sistem yang Ada
                            </h3>
                            <p className="text-green-100 text-lg">
                                EcoGuard AI dapat diintegrasikan dengan sistem IoT, SCADA, dan ERP yang sudah ada
                                di fasilitas Anda.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                            {['IoT Devices', 'Cloud API', 'ERP', 'Mobile App'].map((tech, i) => (
                                <div
                                    key={i}
                                    className="bg-white/20 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl backdrop-blur-sm flex-1 min-w-[calc(50%-0.75rem)] sm:min-w-0"
                                >
                                    <div className="text-center">
                                        <div className="text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                            {tech}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;