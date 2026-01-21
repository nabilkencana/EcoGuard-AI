import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, ArrowUpRight, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { EMAILJS_CONFIG, WHATSAPP_CONFIG } from '../lib/emailjs-config';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        facilityType: '',
        message: '',
        agreePrivacy: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState({
        success: false,
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ success: false, message: '' });

        try {
            // Validasi
            if (!formData.agreePrivacy) {
                throw new Error('Anda harus menyetujui kebijakan privasi');
            }

            if (!formData.name || !formData.email || !formData.phone || !formData.facilityType) {
                throw new Error('Harap isi semua field yang wajib diisi');
            }

            // Format nomor telepon
            let formattedPhone = formData.phone.replace(/\D/g, '');
            if (formattedPhone.startsWith('0')) {
                formattedPhone = '62' + formattedPhone.substring(1);
            } else if (!formattedPhone.startsWith('62')) {
                formattedPhone = '62' + formattedPhone;
            }

            // Siapkan data untuk Firebase
            const submissionData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                company: formData.company.trim() || 'Tidak diisi',
                phone: `+${formattedPhone}`,
                facilityType: formData.facilityType,
                message: formData.message || 'Tidak ada pesan',
                status: 'pending',
                source: 'contact_form',
                pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            console.log('📤 Submitting contact form:', submissionData);

            // Save to Firebase Firestore
            const docRef = await addDoc(collection(db, "contact_messages"), submissionData);
            console.log('✅ Contact message saved with ID:', docRef.id);

            // Send Email via EmailJS
            // Send Email via EmailJS - Perbaikan
            try {
                // Initialize EmailJS jika belum
                if (!window.emailjs || !window.emailjs.init) {
                    console.log('Initializing EmailJS...');
                    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
                }

                const emailParams = {
                    from_name: submissionData.name,
                    to_email: submissionData.email, // Pastikan ada parameter ini
                    reply_to: submissionData.email, // Tambahkan ini juga
                    user_email: submissionData.email, // Alternatif
                    email: submissionData.email, // Alternatif lain
                    name: submissionData.name,
                    company: submissionData.company,
                    phone: submissionData.phone,
                    facility_type: submissionData.facilityType,
                    message: submissionData.message,
                    date: new Date().toLocaleString('id-ID'),
                    request_id: docRef.id.slice(0, 8),
                    website: 'EcoGuard AI Contact Form'
                };

                console.log('📧 Sending email with params:', emailParams);

                // Coba gunakan template DEMO_REQUEST dulu (karena sudah ada)
                const templateId = EMAILJS_CONFIG.TEMPLATES.DEMO_REQUEST; // Pakai yang sudah working

                const result = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    templateId,
                    emailParams
                );

                console.log('✅ Contact email sent successfully:', result);

            } catch (emailError) {
                console.log('Contact email sending skipped:', emailError);

                // Fallback: Kirim email menggunakan mailto link
                sendFallbackEmail(submissionData);
            }

            // Send WhatsApp Notification
            sendWhatsAppNotification(submissionData, docRef.id);

            // Reset form
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                facilityType: '',
                message: '',
                agreePrivacy: false
            });

            // Tampilkan pesan sukses
            setFormStatus({
                success: true,
                message: `🎉 Pesan berhasil dikirim! (ID: ${docRef.id.slice(0, 8)}) Tim kami akan menghubungi Anda dalam 1-2 hari kerja.`
            });

        } catch (error) {
            console.error('❌ Contact form error:', error);

            let errorMessage = '❌ Gagal mengirim pesan. ';

            if (error.message.includes('Firebase') || !db) {
                errorMessage += 'Sistem penyimpanan sementara tidak tersedia. ';
                saveToLocalStorage(formData);
            }

            errorMessage += 'Silakan hubungi langsung di WhatsApp: +62 856-4889-8807';

            setFormStatus({
                success: false,
                message: errorMessage
            });

            // Fallback: Buka WhatsApp langsung
            openWhatsAppFallback(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    const saveToLocalStorage = (data) => {
        try {
            const backupData = {
                ...data,
                timestamp: new Date().toISOString(),
                backup: true
            };
            const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
            existing.push(backupData);
            localStorage.setItem('contact_messages', JSON.stringify(existing));
            console.log('📝 Contact data saved to localStorage as backup');
        } catch (err) {
            console.error('Failed to save contact to localStorage:', err);
        }
    };

    const openWhatsAppFallback = (data) => {
        try {
            const message = `
*CONTACT FORM - ECOGUARD AI*

Nama: ${data.name}
Email: ${data.email}
Perusahaan: ${data.company || 'Tidak diisi'}
Telepon: ${data.phone}
Jenis Fasilitas: ${data.facilityType || 'Tidak diisi'}
Pesan: ${data.message}

*Harap follow up segera!*
            `.replace(/\n/g, '%0A');

            const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        } catch (err) {
            console.error('Failed to open WhatsApp:', err);
        }
    };

    const sendWhatsAppNotification = (data, docId) => {
        try {
            const whatsappMessage = `
*NEW CONTACT MESSAGE - ECOGUARD AI*

*Lead Information:*
• Nama: ${data.name}
• Email: ${data.email}
• WhatsApp: ${data.phone}
• Perusahaan: ${data.company}
• Jenis Fasilitas: ${data.facilityType}

*Pesan:*
${data.message}

*Message ID:* ${docId.slice(0, 8)}...
*Priority:* Contact within 24-48 hours!

*SILAKAN FOLLOW UP SEGERA!*
            `.replace(/\n/g, '%0A');

            const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        } catch (error) {
            console.log('Contact WhatsApp notification skipped:', error);
        }
    };

    const sendFallbackEmail = (data) => {
        try {
            const subject = `Contact Form - EcoGuard AI - ${data.name}`;
            const body = `
Nama: ${data.name}
Email: ${data.email}
Perusahaan: ${data.company || 'Tidak diisi'}
Telepon: ${data.phone}
Jenis Fasilitas: ${data.facilityType}
Pesan: ${data.message}

---
Pesan ini dikirim melalui form kontak EcoGuard AI.
        `.trim().replace(/\n/g, '%0A');

            const mailtoLink = `mailto:${WHATSAPP_CONFIG.BUSINESS_NUMBER}@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            console.log('📧 Fallback email link:', mailtoLink);
            // window.open(mailtoLink, '_blank'); // Optional: buka email client
        } catch (err) {
            console.log('Fallback email failed:', err);
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
            details: '+62 856 4889 8807',
            link: 'https://wa.me/6285648898807',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: MapPin,
            title: 'Sekolah',
            details: 'Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139',
            link: 'https://maps.app.goo.gl/b8Ew7q7wUXe7nhTg7',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Clock,
            title: 'Jam Operasional',
            details: 'Senin - Jumat: 06:00 - 16:00',
            color: 'from-amber-500 to-orange-500',
        },
    ];

    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <SectionTitle
                    title="Hubungi Kami"
                    subtitle="Siap Membantu Transformasi Digital Anda"
                    description="Tim kami siap membantu Anda memahami bagaimana EcoGuard AI dapat mengoptimalkan operasional bisnis Anda."
                    align="center"
                    className="mb-16"
                />

                <div className="grid lg:grid-cols-3 gap-12">
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

                        <div className="space-y-4 md:space-y-6">
                            {contactMethods.map((method, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => method.link && window.open(method.link, '_blank')}
                                    className={`block w-full p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br ${method.color} text-white hover:shadow-xl transition-all duration-300 hover:shadow-lg active:shadow-md`}
                                >
                                    <div className="flex items-start">
                                        {/* Icon */}
                                        <div className="p-3 bg-white/20 rounded-lg md:rounded-xl flex-shrink-0">
                                            <method.icon className="h-5 w-5 md:h-6 md:w-6" />
                                        </div>

                                        {/* Content */}
                                        <div className="ml-4 flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <h4 className="font-bold text-base md:text-lg text-left">{method.title}</h4>
                                                    <p className="text-white/90 text-sm md:text-base mt-1 text-left">{method.details}</p>
                                                </div>

                                                {/* Action Indicator */}
                                                <div className="mt-3 md:mt-0 flex items-center">
                                                    {method.actionText && (
                                                        <span className="text-sm bg-white/20 px-3 py-1.5 rounded-full font-medium">
                                                            {method.actionText}
                                                        </span>
                                                    )}
                                                    {method.link && (
                                                        <ArrowUpRight className="h-4 w-4 ml-2 hidden md:block" />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Additional Info */}
                                            {method.additionalInfo && (
                                                <div className="mt-3 p-3 bg-white/10 rounded-lg border border-white/20">
                                                    <p className="text-xs md:text-sm text-white/80">{method.additionalInfo}</p>
                                                </div>
                                            )}

                                            {/* Status Badge */}
                                            {method.status && (
                                                <div className="mt-3 flex items-center">
                                                    <div className={`h-2 w-2 rounded-full mr-2 ${method.status === 'online' ? 'bg-green-300 animate-pulse' : 'bg-gray-300'}`}></div>
                                                    <span className="text-xs text-white/70">{method.status === 'online' ? 'Online • Tersedia' : 'Offline'}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile Arrow Indicator */}
                                    {method.link && (
                                        <div className="mt-4 flex justify-end md:hidden">
                                            <ArrowUpRight className="h-4 w-4 text-white/70" />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* FAQ Quick Links */}
                        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
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
                                            className="text-green-600 hover:text-green-700 font-medium flex items-center"
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            {faq}
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
                        {formStatus.success ? (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center">
                                <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-green-500 mx-auto mb-4 md:mb-6" />
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                                    Pesan Terkirim!
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">
                                    Terima kasih telah menghubungi kami. Tim kami akan menghubungi Anda dalam 1-2 hari kerja.
                                </p>
                                <button
                                    onClick={() => setFormStatus({ success: false, message: '' })}
                                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg md:rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center mx-auto"
                                >
                                    <Send className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                                    Kirim Pesan Lain
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-5 md:p-8 lg:p-12">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                                    Kirim Pesan
                                </h3>

                                {/* Status Message */}
                                {formStatus.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 mb-4 md:mb-6 rounded-lg ${formStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                                    >
                                        <div className="flex items-center">
                                            {formStatus.success ? (
                                                <>
                                                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0" />
                                                    <div>
                                                        <span className="text-green-800 text-sm md:text-base">{formStatus.message}</span>
                                                        <p className="text-green-600 text-xs md:text-sm mt-1">
                                                            WhatsApp akan terbuka otomatis untuk notifikasi tim.
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 mr-2 flex-shrink-0" />
                                                    <div>
                                                        <span className="text-red-800 text-sm md:text-base">{formStatus.message}</span>
                                                        <p className="text-red-600 text-xs md:text-sm mt-1">
                                                            WhatsApp akan terbuka untuk mengirim manual.
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
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
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                                                placeholder="email@perusahaan.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Perusahaan
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                                                placeholder="Nama Perusahaan"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Telepon *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                                                placeholder="+62 812 3456 7890"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Fasilitas *
                                        </label>
                                        <select
                                            name="facilityType"
                                            value={formData.facilityType}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
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
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base resize-none"
                                            placeholder="Ceritakan kebutuhan spesifik Anda..."
                                        />
                                    </div>

                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="privacy"
                                            name="agreePrivacy"
                                            checked={formData.agreePrivacy}
                                            onChange={handleInputChange}
                                            required
                                            className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                                            Saya setuju dengan{' '}
                                            <a href="/privacy-policy" className="text-green-600 hover:text-green-700 underline">
                                                Kebijakan Privasi
                                            </a>{' '}
                                            dan{' '}
                                            <a href="/terms" className="text-green-600 hover:text-green-700 underline">
                                                Syarat Layanan
                                            </a>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg md:rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                <span>Kirim Pesan</span>
                                                <Send className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </button>

                                    {/* Real-time Status */}
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                                                <span className="text-xs text-gray-600">
                                                    Data tersimpan real-time ke sistem kami
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                + WhatsApp notification
                                            </div>
                                        </div>
                                    </div>
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