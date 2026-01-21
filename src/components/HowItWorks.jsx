import { motion } from 'framer-motion';
import { Upload, Cpu, Brain, TrendingUp, BarChart, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            step: '01',
            title: 'Instalasi & Setup',
            description: 'Pasang sensor IoT atau integrasikan dengan sistem yang ada. Setup dalam 1-3 hari.',
            icon: Upload,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            step: '02',
            title: 'Data Collection',
            description: 'Sensor mengumpulkan data real-time konsumsi energi dan air.',
            icon: Cpu,
            color: 'from-green-500 to-emerald-500',
        },
        {
            step: '03',
            title: 'AI Analysis',
            description: 'Machine Learning menganalisis pola dan mengidentifikasi peluang efisiensi.',
            icon: Brain,
            color: 'from-purple-500 to-pink-500',
        },
        {
            step: '04',
            title: 'Smart Insights',
            description: 'Dapatkan rekomendasi otomatis untuk optimasi konsumsi.',
            icon: TrendingUp,
            color: 'from-amber-500 to-orange-500',
        },
        {
            step: '05',
            title: 'Monitoring Dashboard',
            description: 'Pantau performa melalui dashboard interaktif real-time.',
            icon: BarChart,
            color: 'from-red-500 to-rose-500',
        },
        {
            step: '06',
            title: 'Continuous Improvement',
            description: 'Sistem belajar dan beradaptasi untuk efisiensi yang terus meningkat.',
            icon: CheckCircle,
            color: 'from-indigo-500 to-purple-500',
        },
    ];

   return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-medium mb-4">
                        Cara Kerja
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Sederhana, <span className="text-purple-500">Cerdas</span>, Efektif
                    </h2>
                    <p className="text-xl text-gray-600">
                        Dalam 6 langkah, transformasi efisiensi bisnis Anda dimulai.
                    </p>
                </div>

                {/* Steps Timeline */}
                <div className="relative">
                    {/* Timeline Line - SOFT GRADIENT */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-200 via-emerald-200 to-indigo-200 transform -translate-x-1/2" />

                    {/* Steps Grid */}
                    <div className="grid lg:grid-cols-2 gap-y-20 lg:gap-y-32">
                        {steps.map((step, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`relative ${isLeft ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'}`}
                                >
                                    {/* Step Number - SOFT STYLE */}
                                    <div className={`absolute lg:absolute top-12 ${isLeft ? 'lg:right-0 lg:transform lg:translate-x-1/2' : 'lg:-left-8 lg:transform lg:-translate-x-1/2'} z-10`}>
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-4 border-white/80 backdrop-blur-sm`}>
                                            <span className="text-white text-xl font-bold drop-shadow-sm">{step.step}</span>
                                        </div>
                                    </div>

                                    {/* Content - SOFT CARD */}
                                    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 mt-20 ${isLeft ? 'lg:mr-8' : 'lg:ml-8'}`}>
                                        {/* Icon - SOFT ICON */}
                                        <div className={`inline-flex p-4 rounded-xl ${step.lightColor} mb-4`}>
                                            <step.icon className={`h-6 w-6 ${step.dotColor.replace('bg-', 'text-')}`} />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600">
                                            {step.description}
                                        </p>

                                        {/* Timeline Dot (Mobile) - SOFT */}
                                        <div className={`lg:hidden absolute ${isLeft ? '-right-4' : '-left-4'} top-16 w-8 h-8 rounded-full ${step.dotColor} border-4 border-white/80 backdrop-blur-sm shadow-sm`} />
                                    </div>

                                    {/* Connector Line untuk Desktop - SOFT */}
                                    <div className={`hidden lg:block absolute ${isLeft ? 'right-0' : 'left-0'} top-24 w-8 h-[2px] ${step.lightColor} transform ${isLeft ? 'translate-x-1/2' : '-translate-x-1/2'}`}></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Integration Section - SOFT STYLE */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12 border border-gray-200"
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                Kompatibel dengan Sistem Anda
                            </h3>
                            <p className="text-gray-600 mb-8">
                                EcoGuard AI dapat diintegrasikan dengan berbagai sistem yang sudah ada:
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Sistem SCADA & PLC',
                                    'IoT Devices & Sensors',
                                    'ERP & Accounting Software',
                                    'Building Management Systems',
                                    'Cloud Platforms (AWS, Google Cloud)',
                                    'Mobile Applications',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700">
                                        <div className={`w-6 h-6 rounded-full ${steps[i].lightColor} flex items-center justify-center mr-3`}>
                                            <CheckCircle className={`h-4 w-4 ${steps[i].dotColor.replace('bg-', 'text-')}`} />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Modbus', color: 'bg-blue-100 text-blue-600' },
                                { name: 'API REST', color: 'bg-emerald-100 text-emerald-600' },
                                { name: 'MQTT', color: 'bg-purple-100 text-purple-600' },
                                { name: 'WebSocket', color: 'bg-amber-100 text-amber-600' },
                            ].map((protocol, i) => (
                                <div key={i} className={`${protocol.color} p-6 rounded-xl text-center border border-gray-200/50 backdrop-blur-sm`}>
                                    <div className="text-lg font-bold">{protocol.name}</div>
                                    <div className="text-sm opacity-90">Protocol</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;