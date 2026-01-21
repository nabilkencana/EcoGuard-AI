import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Building } from 'lucide-react';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: 'Mohammad Ali',
            position: 'Swasta',
            company: 'Petani Tangguh',
            content: 'EcoGuard AI membantu kami menghemat 28% konsumsi listrik dalam 3 bulan pertama. Sistem AI-nya sangat akurat dalam memprediksi pola penggunaan.',
            rating: 5,
            avatar: 'Ma',
            color: 'from-green-500 to-emerald-500',
        },
        {
            name: 'Nisfu Laila',
            position: 'Karyawan Swasta',
            company: 'PT Distributor Swasta',
            content: 'Sebagai kampus yang berkomitmen pada sustainability, EcoGuard AI menjadi solusi sempurna untuk monitoring dan reporting emisi karbon kami.',
            rating: 5,
            avatar: 'NL',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            name: 'Lilik Heru',
            position: 'Manajemen Oprasi',
            company: 'Mall Taman Anggrek',
            content: 'Penghematan air mencapai 35% setelah implementasi. Smart alerts membantu tim maintenance merespons kebocoran dengan cepat.',
            rating: 4,
            avatar: 'LH',
            color: 'from-purple-500 to-pink-500',
        },
        {
            name: 'Lisa Hartono',
            position: 'OB',
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

                {/* Company Logos Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="mt-24 pt-16 border-t border-gray-100"
                >
                    {/* Section Title */}
                    <div className="text-center mb-14">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Dipercaya oleh Perusahaan Terkemuka
                        </h3>
                        <p className="text-gray-600 text-sm max-w-md mx-auto">
                            Berkolaborasi dengan institusi dan perusahaan inovatif dalam pengembangan teknologi
                        </p>
                    </div>

                    {/* Logos Container - Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 px-4 max-w-6xl mx-auto">

                        {/* SMK Telkom Malang */}
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative"
                        >
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group-hover:border-blue-200 group-hover:ring-2 group-hover:ring-blue-50 min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-300 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                </div>

                                <div className="relative z-10 flex flex-col items-center">
                                    {/* Logo Container */}
                                    <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-inner">
                                        <div className="w-20 h-20 relative flex items-center justify-center">
                                            {/* Logo SMK Telkom */}
                                            <div className="w-16 h-16 flex items-center justify-center">
                                                <img
                                                    src="/images/logos/smktelkom.png"
                                                    alt="SMK Telkom Malang"
                                                    className="max-w-full max-h-full object-contain"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%233b82f6' rx='32'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='20' font-weight='bold'%3ESMK%3C/text%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                            {/* Badge */}
                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Name */}
                                    <div className="text-center">
                                        <h4 className="font-bold text-gray-900 text-lg">SMK Telkom</h4>
                                        <p className="text-gray-600 text-sm mt-1">Malang</p>
                                    </div>

                                    {/* Partnership Badge */}
                                    <div className="mt-3 inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Mitra Pendidikan
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* VRagio */}
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative"
                        >
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group-hover:border-purple-200 group-hover:ring-2 group-hover:ring-purple-50 min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                                </div>

                                <div className="relative z-10 flex flex-col items-center">
                                    {/* Logo Container */}
                                    <div className="mb-4 p-3 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-inner">
                                        <div className="w-20 h-20 relative flex items-center justify-center">
                                            {/* Logo VRagio */}
                                            <div className="w-16 h-16 flex items-center justify-center">
                                                <img
                                                    src="/images/logos/vragio.png"
                                                    alt="VRagio Studio"
                                                    className="max-w-full max-h-full object-contain"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%237c3aed' rx='16'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='20' font-weight='bold'%3EVR%3C/text%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                            {/* VR Icon */}
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Name */}
                                    <div className="text-center">
                                        <h4 className="font-bold text-gray-900 text-lg">VRagio Studio</h4>
                                        <p className="text-gray-600 text-sm mt-1">Innovation Lab</p>
                                    </div>

                                    {/* Tech Badge */}
                                    <div className="mt-3 inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                        </svg>
                                        VR/AR Development
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Indosat */}
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative"
                        >
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group-hover:border-red-200 group-hover:ring-2 group-hover:ring-red-50 min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <div className="absolute top-0 left-0 w-20 h-20 bg-red-500 rounded-full -translate-x-1/4 -translate-y-1/4"></div>
                                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-400 rounded-full translate-x-1/4 translate-y-1/4"></div>
                                </div>

                                <div className="relative z-10 flex flex-col items-center">
                                    {/* Logo Container */}
                                    <div className="mb-4 p-3 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-inner">
                                        <div className="w-20 h-20 relative flex items-center justify-center">
                                            {/* Logo Indosat */}
                                            <div className="w-16 h-16 flex items-center justify-center">
                                                <img
                                                    src="/images/logos/indosat.png"
                                                    alt="Indosat Ooredoo"
                                                    className="max-w-full max-h-full object-contain"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ef4444' rx='32'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3EI%3C/text%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                            {/* Network Icon */}
                                            <div className="absolute -top-1 -left-1 w-7 h-7 bg-red-900 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Name */}
                                    <div className="text-center">
                                        <h4 className="font-bold text-gray-900 text-lg">Indosat Ooredoo</h4>
                                        <p className="text-gray-600 text-sm mt-1">Hutchison</p>
                                    </div>

                                    {/* Industry Badge */}
                                    <div className="mt-3 inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        Telekomunikasi
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Divider & Additional Text
                    <div className="text-center mt-14 pt-8 border-t border-gray-100">
                        <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                            </svg>
                            <span>Lebih dari <span className="font-semibold text-gray-700">50+</span> perusahaan telah mempercayai kami</span>
                        </div>
                    </div> */}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;