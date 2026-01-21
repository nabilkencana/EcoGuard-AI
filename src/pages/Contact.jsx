import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        facilityType: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // In production, replace with your EmailJS credentials
            await emailjs.send(
                'service_id', // Replace with your service ID
                'template_id', // Replace with your template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    company: formData.company,
                    phone: formData.phone,
                    message: formData.message,
                    facility_type: formData.facilityType,
                },
                'public_key' // Replace with your public key
            );

            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                message: '',
                facilityType: '',
            });
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.');
            console.error('EmailJS Error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email',
            details: 'support@ecoguard.ai',
            link: 'mailto:support@ecoguard.ai',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Phone,
            title: 'Telepon',
            details: '+62 21 1234 5678',
            link: 'tel:+622112345678',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: MapPin,
            title: 'Kantor',
            details: 'Jl. Sudirman No. 123, Jakarta',
            link: 'https://maps.google.com',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Clock,
            title: 'Jam Operasional',
            details: 'Senin - Jumat: 09:00 - 17:00',
            color: 'from-amber-500 to-orange-500',
        },
    ];

    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <SectionTitle
                    titel="Hubungi Kami"
                    subtitle="Siap Membantu Transformasi Digital Anda"
                    description="Tim kami siap membantu Anda memahami bagaimana EcoGuard AI dapat mengoptimalkan operasional bisnis Anda."
                    align="center"
                    className="mb-16"
                />

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            Informasi Kontak
                        </h3>

                        {/* KOTAK-KOTAK INFORMASI - SAMA TINGGI DAN LEBAR */}
                        <div className="space-y-4 mb-8">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.link || '#'}
                                    target={method.link ? '_blank' : '_self'}
                                    rel="noopener noreferrer"
                                    className={`block bg-gradient-to-br ${method.color} text-white p-6 rounded-2xl hover:shadow-xl transition-shadow h-[120px] flex items-center`}
                                >
                                    <div className="flex items-center w-full">
                                        <div className="p-4 bg-white/20 rounded-xl mr-4 flex-shrink-0">
                                            <method.icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-lg mb-1 truncate">
                                                {method.title}
                                            </h4>
                                            <p className="text-white/90 text-sm line-clamp-2">
                                                {method.details}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* FAQ Quick Links */}
                        <div className="p-6 bg-gray-50 rounded-2xl">
                            <h4 className="font-bold text-gray-900 mb-4">
                                Pertanyaan Umum
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    'Berapa biaya implementasi?',
                                    'Apakah ada demo gratis?',
                                    'Berapa lama setup?',
                                    'Apakah perlu training?',
                                ].map((faq, i) => (
                                    <li key={i}>
                                        <button
                                            className="text-green-600 hover:text-green-700 font-medium flex items-center w-full text-left"
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">{faq}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        {isSubmitted ? (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 text-center h-full flex flex-col justify-center">
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Pesan Terkirim!
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    Terima kasih telah menghubungi kami. Tim kami akan menghubungi Anda dalam 1-2 hari kerja.
                                </p>
                                <div className="mt-auto">
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        variant="primary"
                                        icon={Send}
                                        iconPosition="left"
                                    >
                                        Kirim Pesan Lain
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 h-full">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Kirim Pesan
                                </h3>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="Nama Anda"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="email@perusahaan.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Perusahaan
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="Nama Perusahaan"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Telepon
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="+62 812 3456 7890"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Fasilitas
                                        </label>
                                        <select
                                            name="facilityType"
                                            value={formData.facilityType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Pilih jenis fasilitas</option>
                                            <option value="pertamina">Fasilitas Pertamina</option>
                                            <option value="office">Gedung Perkantoran</option>
                                            <option value="campus">Kampus</option>
                                            <option value="school">Sekolah</option>
                                            <option value="umkm">UMKM</option>
                                            <option value="mall">Mall</option>
                                            <option value="hotel">Hotel</option>
                                            <option value="hospital">Rumah Sakit</option>
                                            <option value="factory">Pabrik</option>
                                            <option value="other">Lainnya</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pesan *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="Ceritakan kebutuhan spesifik Anda..."
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="privacy"
                                            required
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                                            Saya setuju dengan{' '}
                                            <button className="text-green-600 hover:text-green-700">
                                                Kebijakan Privasi
                                            </button>{' '}
                                            dan{' '}
                                            <button className="text-green-600 hover:text-green-700">
                                                Syarat Layanan
                                            </button>
                                        </label>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="large"
                                        icon={Send}
                                        iconPosition="right"
                                        loading={isSubmitting}
                                        fullWidth
                                    >
                                        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                                    </Button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-6">
                            Lokasi Kantor Kami
                        </h3>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                {/* Google Maps Embed */}
                                <div className="bg-gray-200 h-96 rounded-xl overflow-hidden">
                                    <iframe
                                        title="Office Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.2135997797236!2d112.659016!3d-7.976862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6285c5c1b44e3%3A0xf6c889ac7452dc3a!2sSMK%20Telkom%20Malang!5e0!3m2!1sid!2sid!4v1768921389829!5m2!1sid!2sid" 
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                                <h4 className="text-xl font-bold mb-4">Kunjungi Kami</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <MapPin className="h-5 w-5 mr-3 mt-1" />
                                        <span>
                                            Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <Clock className="h-5 w-5 mr-3" />
                                        <span>Senin - Jumat: 06:00 - 16:00 WIB</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Phone className="h-5 w-5 mr-3" />
                                        <span>081223488999</span>
                                    </li>
                                </ul>
                                <Button
                                    variant="secondary"
                                    className="mt-6 w-full"
                                    onClick={() => window.open('https://maps.app.goo.gl/BXHyXybr1DqjrGMz5', '_blank')}
                                >
                                    Dapatkan Petunjuk Arah
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;