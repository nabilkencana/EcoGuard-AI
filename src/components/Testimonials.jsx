import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Building, User } from 'lucide-react';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: 'Budi Santoso',
            position: 'Facility Manager',
            company: 'PT Pertamina RU V',
            content: 'EcoGuard AI membantu kami menghemat 28% konsumsi listrik dalam 3 bulan pertama. Sistem AI-nya sangat akurat dalam memprediksi pola penggunaan.',
            rating: 5,
            avatar: 'BS',
            color: 'from-green-500 to-emerald-500',
        },
        {
            name: 'Sari Dewi',
            position: 'Sustainability Director',
            company: 'Universitas Indonesia',
            content: 'Sebagai kampus yang berkomitmen pada sustainability, EcoGuard AI menjadi solusi sempurna untuk monitoring dan reporting emisi karbon kami.',
            rating: 5,
            avatar: 'SD',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            name: 'Agus Wijaya',
            position: 'Operations Manager',
            company: 'Mall Taman Anggrek',
            content: 'Penghematan air mencapai 35% setelah implementasi. Smart alerts membantu tim maintenance merespons kebocoran dengan cepat.',
            rating: 4,
            avatar: 'AW',
            color: 'from-purple-500 to-pink-500',
        },
        {
            name: 'Lisa Hartono',
            position: 'CEO',
            company: 'Hotel Santika Group',
            content: 'ROI tercapai dalam 8 bulan. Dashboard yang user-friendly membuat seluruh tim bisa berkontribusi dalam program efisiensi.',
            rating: 5,
            avatar: 'LH',
            color: 'from-amber-500 to-orange-500',
        },
    ];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                        Testimoni
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Dipercaya oleh <span className="text-amber-600">Leader</span> Industri
                    </h2>
                    <p className="text-xl text-gray-600">
                        Lihat bagaimana EcoGuard AI mentransformasi operasional berbagai perusahaan.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Main Testimonial Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                                <div className="grid lg:grid-cols-3">
                                    {/* Left Side - Avatar & Info */}
                                    <div className={`bg-gradient-to-br ${testimonials[activeIndex].color} p-12 text-white`}>
                                        <div className="flex flex-col items-center h-full">
                                            {/* Quote Icon */}
                                            <Quote className="h-12 w-12 mb-8 opacity-80" />

                                            {/* Avatar */}
                                            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mb-6">
                                                {testimonials[activeIndex].avatar}
                                            </div>

                                            {/* Name & Position */}
                                            <h3 className="text-2xl font-bold mb-2 text-center">
                                                {testimonials[activeIndex].name}
                                            </h3>
                                            <p className="text-white/90 mb-4 text-center">
                                                {testimonials[activeIndex].position}
                                            </p>

                                            {/* Company */}
                                            <div className="flex items-center mt-4">
                                                <Building className="h-5 w-5 mr-2" />
                                                <span className="font-medium">
                                                    {testimonials[activeIndex].company}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="lg:col-span-2 p-12">
                                        {/* Rating */}
                                        <div className="flex items-center mb-8">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-6 w-6 ${i < testimonials[activeIndex].rating
                                                            ? 'text-amber-400 fill-amber-400'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            <span className="ml-4 text-gray-600">
                                                {testimonials[activeIndex].rating}.0/5.0
                                            </span>
                                        </div>

                                        {/* Testimonial Content */}
                                        <p className="text-2xl text-gray-700 mb-12 leading-relaxed">
                                            "{testimonials[activeIndex].content}"
                                        </p>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-6">
                                            {[
                                                { label: 'Penghematan', value: '28%' },
                                                { label: 'ROI', value: '8 Bulan' },
                                                { label: 'Kepuasan', value: '95%' },
                                            ].map((stat, i) => (
                                                <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                                                    <div className="text-3xl font-bold text-gray-900">
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center items-center mt-12 space-x-4">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-700" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === activeIndex
                                            ? 'bg-green-600 w-8'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Company Logos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 pt-12 border-t border-gray-200"
                >
                    <p className="text-center text-gray-600 mb-8">
                        Dipercaya oleh perusahaan terkemuka
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                        {['Pertamina', 'UI', 'ITB', 'UGM', 'Santika', 'Siloam'].map((company, i) => (
                            <div
                                key={i}
                                className="bg-gray-50 p-6 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-lg transition-all"
                            >
                                <div className="text-lg font-bold text-gray-700">{company}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;