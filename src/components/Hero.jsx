import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Play,
    Shield,
    Zap,
    Droplets,
    Wind,
    Thermometer,
    Leaf,
    TrendingUp,
    TrendingDown,
    CheckCircle,
    Clock,
    BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Tambahkan ini

const Hero = () => {
    const navigate = useNavigate(); // Tambahkan ini
    return (
        <section className="relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50" />

            <div className="container relative mx-auto px-4 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg">
                            <Shield className="h-4 w-4 mr-2" />
                            Inovasi Pertamina Eco-Innovation Competition 2026
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">EcoGuard AI</span>
                            <br />
                            <span className="text-gray-700">Satpam Lingkungan Digital</span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-lg">
                            Aplikasi berbasis Artificial Intelligence untuk efisiensi sumber daya
                            dan ketahanan lingkungan berkelanjutan.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {[
                                { icon: Zap, value: '15-30%', label: 'Hemat Energi', color: 'from-yellow-500 to-amber-500' },
                                { icon: Droplets, value: '40%', label: 'Hemat Air', color: 'from-blue-500 to-cyan-500' },
                                { icon: Leaf, value: 'Rp 185jt', label: 'Penghematan', color: 'from-green-500 to-emerald-500' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100"
                                >
                                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center text-lg"
                            >   
                                <Link to="/demo-request">
                                Coba Demo Gratis
                                </Link>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/under-development')} // Tambahkan ini
                                className="group px-8 py-4 bg-white text-green-600 font-bold rounded-xl border-2 border-green-600 hover:bg-green-50 transition-all flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
                            >
                                <Play className="h-5 w-5 mr-2 fill-green-600" />
                                Tonton Demo
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Column - Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Mockup Container */}
                        <div className="relative mx-auto max-w-2xl lg:max-w-3xl">
                            {/* Macbook Mockup */}
                            <div className="relative rounded-xl md:rounded-3xl shadow-lg md:shadow-2xl overflow-hidden border-4 md:border-8 border-gray-900">
                                {/* Screen Content */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100">
                                    {/* Dashboard Content */}
                                    <div className="p-3 md:p-4 h-[400px] md:h-[480px] bg-gradient-to-br from-gray-50 to-white">
                                        {/* Dashboard Header */}
                                        <div className="flex items-center justify-between mb-4 md:mb-6">
                                            <div className="flex items-center space-x-2 md:space-x-3">
                                                <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg md:rounded-xl flex items-center justify-center">
                                                    <Leaf className="h-4 w-4 md:h-6 md:w-6 text-white" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-sm md:text-lg">EcoGuard AI</div>
                                                    <div className="text-xs md:text-sm text-gray-600">Satpam Lingkungan</div>
                                                </div>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <div className="text-xs md:text-sm text-gray-600">Selamat Pagi</div>
                                                <div className="font-bold text-gray-900 text-sm">Selamat datang!</div>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                                            {/* Eco Score */}
                                            <div className="col-span-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-3 md:p-4 rounded-xl md:rounded-2xl">
                                                <div className="text-xs md:text-sm mb-1">Eco Score</div>
                                                <div className="flex flex-col md:flex-row md:items-end justify-between">
                                                    <div className="text-xl md:text-3xl font-bold mb-1 md:mb-0">78.0<span className="text-sm md:text-lg">/100</span></div>
                                                    <div className="text-xs bg-white/20 px-2 py-1 rounded-lg w-fit">
                                                        <TrendingUp className="h-3 w-3 inline mr-1" />
                                                        +5.2
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Penghematan */}
                                            <div className="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm">
                                                <div className="text-xs text-gray-600 mb-1">Penghematan</div>
                                                <div className="text-sm md:text-xl font-bold text-gray-900">Rp 1.85JT</div>
                                                <div className="text-xs text-green-600 mt-1">
                                                    <TrendingUp className="h-3 w-3 inline mr-1" />
                                                    +8.5%
                                                </div>
                                            </div>

                                            {/* CO2 Berkurang */}
                                            <div className="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm">
                                                <div className="text-xs text-gray-600 mb-1">CO₂ Berkurang</div>
                                                <div className="text-sm md:text-xl font-bold text-gray-900">150 kg</div>
                                                <div className="text-xs text-green-600 mt-1">
                                                    <TrendingUp className="h-3 w-3 inline mr-1" />
                                                    -12.3%
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pohon Diselamatkan */}
                                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-2 md:p-3 rounded-lg md:rounded-xl mb-4 md:mb-6">
                                            <div className="flex items-center justify-center text-sm md:text-base">
                                                <Leaf className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                                                <span className="font-bold">12 Pohon Diselamatkan</span>
                                            </div>
                                        </div>

                                        {/* Energy and Water Consumption */}
                                        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                                            {/* Listrik */}
                                            <div className="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm">
                                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                                    <div className="flex items-center">
                                                        <div className="h-6 w-6 md:h-8 md:w-8 bg-yellow-100 rounded-md md:rounded-lg flex items-center justify-center mr-2">
                                                            <Zap className="h-3 w-3 md:h-4 md:w-4 text-yellow-600" />
                                                        </div>
                                                        <span className="font-bold text-gray-900 text-sm md:text-base">Listrik</span>
                                                    </div>
                                                    <div className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full hidden md:block">
                                                        <TrendingDown className="h-3 w-3 inline mr-1" />
                                                        8.5% turun
                                                    </div>
                                                </div>
                                                <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1">2,850 kWh</div>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                                                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-1.5 md:h-2 rounded-full" style={{ width: '72%' }}></div>
                                                </div>
                                            </div>

                                            {/* Air */}
                                            <div className="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm">
                                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                                    <div className="flex items-center">
                                                        <div className="h-6 w-6 md:h-8 md:w-8 bg-blue-100 rounded-md md:rounded-lg flex items-center justify-center mr-2">
                                                            <Droplets className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                                                        </div>
                                                        <span className="font-bold text-gray-900 text-sm md:text-base">Air</span>
                                                    </div>
                                                    <div className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full hidden md:block">
                                                        <TrendingDown className="h-3 w-3 inline mr-1" />
                                                        12.3% turun
                                                    </div>
                                                </div>
                                                <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1">27,200 L</div>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                                                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-1.5 md:h-2 rounded-full" style={{ width: '65%' }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Environment Monitoring */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                            {/* Suhu & Kualitas */}
                                            <div className="space-y-2 md:space-y-3">
                                                <div className="flex items-center justify-between bg-white p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-200">
                                                    <div className="flex items-center">
                                                        <Thermometer className="h-4 w-4 md:h-5 md:w-5 text-orange-500 mr-2" />
                                                        <span className="text-xs md:text-sm">Suhu Ruangan</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-bold text-gray-900 text-sm md:text-base">24°C</div>
                                                        <div className="text-xs text-green-600">Optimal</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between bg-white p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-200">
                                                    <div className="flex items-center">
                                                        <Wind className="h-4 w-4 md:h-5 md:w-5 text-blue-500 mr-2" />
                                                        <span className="text-xs md:text-sm">Kualitas Udara</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-bold text-gray-900 text-sm md:text-base">Baik</div>
                                                        <div className="text-xs text-green-600">AQI: 42</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Aksi Cepat */}
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg md:rounded-xl p-2 md:p-3">
                                                <div className="text-sm font-bold text-gray-900 mb-2">Aksi Cepat</div>
                                                <div className="space-y-1 md:space-y-2">
                                                    <div className="flex items-center justify-between text-xs md:text-sm">
                                                        <span>Deteksi Anomali</span>
                                                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs md:text-sm">
                                                        <span>Insight</span>
                                                        <BarChart3 className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs md:text-sm">
                                                        <span>Dashboard</span>
                                                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Macbook Frame Bottom */}
                                <div className="h-1 md:h-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                                    <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gray-700 rounded-full mx-auto"></div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl border-2 md:border-4 border-white"
                            >
                                <div className="text-center">
                                    <div className="text-xs font-bold mb-1">AI Active</div>
                                    <div className="flex items-center justify-center">
                                        <div className="h-2 w-2 md:h-3 md:w-3 bg-green-300 rounded-full animate-pulse mr-1"></div>
                                        <div className="h-1.5 w-4 md:h-2 md:w-6 bg-white/80 rounded"></div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{
                                    y: [0, 10, 0],
                                    rotate: [0, -5, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl border border-gray-200"
                            >
                                <div className="flex items-center">
                                    <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg md:rounded-xl flex items-center justify-center mr-2 md:mr-3">
                                        <Clock className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">Real-Time</div>
                                        <div className="text-xs text-gray-600">Update: 4:30</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Chart Preview */}
                            <motion.div
                                animate={{
                                    x: [0, 5, 0],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-white p-2 md:p-3 rounded-lg md:rounded-xl shadow-md md:shadow-lg border border-gray-200"
                            >
                                <div className="flex items-center mb-1 md:mb-2">
                                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1 md:mr-2" />
                                    <span className="text-xs font-bold">Trend +8.5%</span>
                                </div>
                                <div className="flex items-end space-x-0.5 md:space-x-1 h-8 md:h-12">
                                    {[30, 45, 60, 40, 55, 70, 65].map((height, i) => (
                                        <div
                                            key={i}
                                            className="w-1 md:w-2 bg-gradient-to-t from-green-400 to-emerald-500 rounded-t"
                                            style={{ height: `${height}%` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;