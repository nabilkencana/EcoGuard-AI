import React from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart3,
    Shield,
    Zap,
    DollarSign,
    Users,
    Globe,
    TrendingUp,
    Award,
    CheckCircle,
    Leaf,
    Cloud,
    Cpu
} from 'lucide-react';

const Benefits = () => {
    const benefits = [
        {
            icon: <DollarSign className="h-8 w-8" />,
            title: "Penghematan Biaya",
            description: "Optimalkan penggunaan energi dan air hingga 40%, mengurangi biaya operasional secara signifikan.",
            features: ["Analisis konsumsi real-time", "Prediksi pengeluaran", "Rekomendasi efisiensi"],
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Kepatuhan Regulasi",
            description: "Pantau dan patuhi standar lingkungan dengan laporan otomatis yang akurat.",
            features: ["Pelaporan otomatis", "Audit lingkungan", "Sertifikasi hijau"],
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: "Dampak Lingkungan",
            description: "Kurangi jejak karbon dan kontribusi terhadap tujuan keberlanjutan global.",
            features: ["Tracking emisi CO2", "Target pengurangan", "SDG alignment"],
            color: "from-purple-500 to-violet-600"
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Efisiensi Operasional",
            description: "Otomatisasi monitoring lingkungan untuk produktivitas tim yang lebih baik.",
            features: ["Workflow otomatis", "Alert proaktif", "Dashboard real-time"],
            color: "from-yellow-500 to-amber-600"
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Kepuasan Stakeholder",
            description: "Tingkatkan reputasi dan kepercayaan dengan komitmen keberlanjutan yang terbukti.",
            features: ["Laporan stakeholder", "Transparansi data", "CSR tracking"],
            color: "from-pink-500 to-rose-600"
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Keunggulan Kompetitif",
            description: "Beda dari kompetitor dengan praktik bisnis berkelanjutan yang tercertifikasi.",
            features: ["Green branding", "Market differentiation", "Investor appeal"],
            color: "from-indigo-500 to-blue-600"
        }
    ];

    const testimonials = [
        {
            name: "Budi Santoso",
            role: "Direktur Operasional, PT Hijau Lestari",
            content: "EcoGuard AI membantu kami mengurangi konsumsi energi sebesar 35% dalam 6 bulan pertama.",
            avatar: "BS"
        },
        {
            name: "Sari Dewi",
            role: "Manajer Sustainability, Mega Corp",
            content: "Sistem pelaporan otomatis menghemat ratusan jam kerja tim kami setiap tahun.",
            avatar: "SD"
        },
        {
            name: "Ahmad Rizki",
            role: "CEO, GreenTech Solutions",
            content: "Investasi terbaik untuk masa depan bisnis dan planet kita.",
            avatar: "AR"
        }
    ];

    const stats = [
        { value: "40%", label: "Penghematan Energi" },
        { value: "25%", label: "Pengurangan Emisi" },
        { value: "50%", label: "Efisiensi Air" },
        { value: "90%", label: "Kepatuhan Regulasi" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                            <g fill="#9C92AC" fillOpacity="0.05">
                                <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" />
                            </g>
                        </g>
                    </svg>
                </div>
                
                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center space-x-2 bg-green-900/30 border border-green-800 rounded-full px-4 py-2 mb-6">
                            <Award className="h-4 w-4" />
                            <span className="text-sm">Pemenang Pertamina Eco-Innovation 2026</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Manfaat yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Mengubah</span> Bisnis Anda
                        </h1>
                        
                        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                            Temukan bagaimana EcoGuard AI tidak hanya melindungi lingkungan, 
                            tetapi juga mendorong pertumbuhan bisnis Anda ke arah yang lebih berkelanjutan dan menguntungkan.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/demo"
                                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                            >
                                Coba Demo Gratis
                            </Link>
                            <Link
                                to="/harga"
                                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-bold text-lg transition-all duration-300"
                            >
                                Lihat Paket
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

    {/* Stats Section */ }
    <section section className = "py-16 bg-white" >
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            {stat.value}
                        </div>
                        <div className="text-gray-600">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
            </section >

    {/* Benefits Grid */ }
    <section section className = "py-20 bg-gray-50" >
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Manfaat <span className="text-green-600">Komprehensif</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Dari efisiensi biaya hingga kepatuhan regulasi, setiap aspek dirancang untuk keberlanjutan maksimal
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                    >
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.color} text-white mb-6`}>
                            {benefit.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {benefit.title}
                        </h3>

                        <p className="text-gray-600 mb-6">
                            {benefit.description}
                        </p>

                        <ul className="space-y-3">
                            {benefit.features.map((feature, fIndex) => (
                                <li key={fIndex} className="flex items-center text-gray-700">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
            </section >

    {/* How It Works */ }
    <section section className = "py-20 bg-white" >
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Cara Mendapatkan <span className="text-green-600">Manfaat</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Hanya dalam 3 langkah sederhana, mulai transformasi keberlanjutan bisnis Anda
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="relative text-center p-8">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                    </div>
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl mb-6">
                        <Cloud className="h-12 w-12 text-green-600 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Integrasi Data</h3>
                    <p className="text-gray-600">
                        Hubungkan sistem Anda dengan EcoGuard AI untuk analisis data real-time
                    </p>
                </div>

                <div className="relative text-center p-8">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                        2
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl mb-6">
                        <Cpu className="h-12 w-12 text-blue-600 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Analisis AI</h3>
                    <p className="text-gray-600">
                        Dapatkan insight dan rekomendasi dari algoritma kecerdasan buatan kami
                    </p>
                </div>

                <div className="relative text-center p-8">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl mb-6">
                        <BarChart3 className="h-12 w-12 text-purple-600 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Implementasi & Monitoring</h3>
                    <p className="text-gray-600">
                        Terapkan solusi dan pantau hasil melalui dashboard interaktif
                    </p>
                </div>
            </div>
        </div>
            </section >

    {/* Testimonials */ }
    <section section className = "py-20 bg-gradient-to-b from-gray-50 to-white" >
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Dikatakan oleh <span className="text-green-600">Pengguna</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Ribuan perusahaan telah merasakan manfaat EcoGuard AI
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                {testimonial.avatar}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-gray-600 text-sm">{testimonial.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 italic">
                            "{testimonial.content}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
            </section >

    {/* CTA Section */ }
    <section section className = "py-20 bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 text-white" >
        <div className="container mx-auto px-4 text-center">
            <Leaf className="h-16 w-16 mx-auto mb-8 text-green-300" />

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Siap Mengubah Bisnis Anda?
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Bergabunglah dengan 500+ perusahaan yang telah memulai perjalanan keberlanjutan dengan EcoGuard AI
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    to="/kontak"
                    className="px-8 py-4 bg-white text-green-900 hover:bg-gray-100 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                    Hubungi Sales
                </Link>
                <Link
                    to="/demo"
                    className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-bold text-lg transition-all duration-300"
                >
                    Jadwalkan Demo
                </Link>
            </div>

            <p className="mt-8 text-gray-400">
                Gratis 14 hari trial • Tidak perlu kartu kredit • Dukungan 24/7
            </p>
        </div>
            </section >
        </div >
    );
};

export default Benefits;