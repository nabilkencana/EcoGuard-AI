import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageSquare } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Main CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500" />
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-12 md:p-16 text-white">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Left Side */}
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                        Siap Transformasi
                                        <br />
                                        <span className="text-amber-300">Efisiensi</span> Bisnis Anda?
                                    </h2>
                                    <p className="text-green-100 text-lg mb-8">
                                        Bergabung dengan 100+ perusahaan yang sudah menghemat
                                        hingga Rp 185 juta per bulan dengan EcoGuard AI.
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {[
                                            { value: '100+', label: 'Pengguna' },
                                            { value: '40%', label: 'Hemat Air' },
                                            { value: '185jt', label: 'Rata-rata Hemat' },
                                        ].map((stat, index) => (
                                            <div key={index} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                                <div className="text-2xl font-bold">{stat.value}</div>
                                                <div className="text-sm text-green-200">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Side - Form */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                                    <h3 className="text-2xl font-bold mb-6">
                                        Request Demo Gratis
                                    </h3>
                                    <form className="space-y-6">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Nama Perusahaan"
                                                className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <select className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent">
                                                <option value="">Jenis Fasilitas</option>
                                                <option value="pertamina">Fasilitas Pertamina</option>
                                                <option value="office">Gedung Perkantoran</option>
                                                <option value="campus">Kampus</option>
                                                <option value="umkm">UMKM</option>
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-300 text-green-900 font-bold rounded-xl hover:from-amber-300 hover:to-amber-200 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                                        >
                                            Request Demo Gratis
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary CTAs */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Download className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Download Proposal
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Dapatkan proposal lengkap untuk implementasi EcoGuard AI di perusahaan Anda.
                                    </p>
                                    <button className="text-green-600 font-medium hover:text-green-700 flex items-center">
                                        Download PDF
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <MessageSquare className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Konsultasi Gratis
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Jadwalkan konsultasi dengan tim ahli kami untuk analisis kebutuhan spesifik.
                                    </p>
                                    <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                                        Jadwalkan Sekarang
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;