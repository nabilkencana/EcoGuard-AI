import { motion } from 'framer-motion';
import { TrendingDown, Users, Globe, DollarSign, Shield, Target } from 'lucide-react';

const Benefits = () => {
    const benefits = [
        {
            icon: TrendingDown,
            title: 'Efisiensi Operasional',
            description: 'Turunkan biaya operasional hingga 30% dengan monitoring real-time dan optimasi otomatis.',
            stats: '30% Penghematan',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: DollarSign,
            title: 'ROI Cepat',
            description: 'Investasi kembali dalam 6-12 bulan melalui penghematan energi dan air yang signifikan.',
            stats: '6-12 Bulan ROI',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Shield,
            title: 'Kepatuhan Regulasi',
            description: 'Memenuhi standar lingkungan dan regulasi pemerintah dengan laporan otomatis.',
            stats: '100% Compliance',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Globe,
            title: 'Dampak Lingkungan',
            description: 'Kurangi emisi karbon dan konservasi air untuk mendukung sustainability goals.',
            stats: '40% Kurangi Emisi',
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: Users,
            title: 'Kesadaran Karyawan',
            description: 'Tingkatkan engagement dengan eco-score dan program insentif hijau.',
            stats: '85% Partisipasi',
            color: 'from-red-500 to-rose-500',
        },
        {
            icon: Target,
            title: 'SDGs Alignment',
            description: 'Dukung Sustainable Development Goals khususnya energi bersih dan konsumsi bertanggung jawab.',
            stats: '5 SDGs',
            color: 'from-indigo-500 to-purple-500',
        },
    ];

    return (
        <section id="benefits" className="py-20 bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                        Manfaat Nyata
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Nilai <span className="text-blue-600">Tambahan</span> untuk Bisnis Anda
                    </h2>
                    <p className="text-xl text-gray-600">
                        Lebih dari sekadar penghematan, EcoGuard AI memberikan dampak strategis jangka panjang.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                                {/* Icon with Gradient */}
                                <div className={`mb-6 p-4 bg-gradient-to-br ${benefit.color} rounded-2xl w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <benefit.icon className="h-7 w-7 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {benefit.description}
                                </p>

                                {/* Stats Badge */}
                                <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                    {benefit.stats}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ROI Calculator */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white"
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-4">
                                Hitung Potensi Penghematan Anda
                            </h3>
                            <p className="text-blue-100 text-lg mb-6">
                                Masukkan data konsumsi Anda untuk melihat estimasi penghematan dengan EcoGuard AI.
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { value: '15-30%', label: 'Listrik' },
                                    { value: '25-40%', label: 'Air' },
                                    { value: '185jt/bln', label: 'Rata-rata' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/20 p-4 rounded-xl text-center backdrop-blur-sm">
                                        <div className="text-xl font-bold">{item.value}</div>
                                        <div className="text-sm text-blue-200">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calculator Form */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-2">
                                        Konsumsi Listrik Bulanan (kWh)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Contoh: 50000"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-2">
                                        Konsumsi Air Bulanan (m³)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Contoh: 1000"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                                    />
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-300 text-blue-900 font-bold rounded-lg hover:from-cyan-300 hover:to-cyan-200 transition-all">
                                    Hitung Penghematan
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Benefits;