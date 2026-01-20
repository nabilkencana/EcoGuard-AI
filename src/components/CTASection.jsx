import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageSquare, CheckCircle, AlertCircle, Loader2, Send, User, Bot } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, WHATSAPP_CONFIG } from '../lib/emailjs-config';
import { AIChatEngine } from '../lib/ai-engine';

const CTASection = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        industry: '',
        facilitySize: '',
        interest: '',
        message: '',
        agreePrivacy: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState({
        success: false,
        message: ''
    });

    // AI Chat States
    const [chatEngine, setChatEngine] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isAILoading, setIsAILoading] = useState(false);
    const [aiStatus, setAiStatus] = useState({ success: false, message: '' });
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        industry: 'manufacturing'
    });
    const chatContainerRef = useRef(null);

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }, []);

    // Initialize chat engine
    useEffect(() => {
        const engine = new AIChatEngine(userInfo.industry);
        setChatEngine(engine);

        // Add welcome message
        const welcomeMsg = {
            type: 'ai',
            content: 'Halo! Saya AI assistant EcoGuard AI. Saya bisa bantu analisis kebutuhan energi dan air untuk bisnis Anda. \n\nBisa ceritakan kebutuhan spesifik Anda?',
            time: new Date().toISOString()
        };
        setConversation([welcomeMsg]);
    }, [userInfo.industry]);

    // Scroll to bottom of chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversation]);

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

            if (!formData.name || !formData.company || !formData.email || !formData.phone) {
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
                company: formData.company.trim(),
                email: formData.email.trim(),
                phone: `+${formattedPhone}`,
                industry: formData.industry || 'Tidak diisi',
                facilitySize: formData.facilitySize || 'Tidak diisi',
                interest: formData.interest || 'Tidak diisi',
                message: formData.message || 'Tidak ada pesan',
                status: 'pending',
                source: 'website_demo_request',
                pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            console.log('📤 Submitting to Firebase:', submissionData);

            // Cek apakah Firebase tersedia
            if (!db) {
                throw new Error('Firebase tidak tersedia. Mode development?');
            }

            // Save to Firebase Firestore
            const docRef = await addDoc(collection(db, "demo_requests"), submissionData);
            console.log('✅ Document written with ID:', docRef.id);

            // Send Email via EmailJS
            try {
                const emailParams = {
                    to_name: submissionData.name,
                    to_email: submissionData.email,
                    company: submissionData.company,
                    phone: submissionData.phone,
                    industry: submissionData.industry,
                    message: submissionData.message,
                    date: new Date().toLocaleString('id-ID'),
                    request_id: docRef.id.slice(0, 8)
                };

                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATES.DEMO_REQUEST,
                    emailParams
                );
                console.log('✅ Email sent via EmailJS');
            } catch (emailError) {
                console.log('Email sending skipped:', emailError);
            }

            // Send WhatsApp Notification
            sendWhatsAppNotification(submissionData, docRef.id);

            // Reset form
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                industry: '',
                facilitySize: '',
                interest: '',
                message: '',
                agreePrivacy: false
            });

            // Tampilkan pesan sukses
            setFormStatus({
                success: true,
                message: `🎉 Permintaan demo berhasil dikirim! (ID: ${docRef.id.slice(0, 8)}) Tim kami akan menghubungi Anda dalam 24 jam.`
            });

        } catch (error) {
            console.error('❌ Form submission error:', error);

            let errorMessage = '❌ Gagal mengirim permintaan. ';

            if (error.message.includes('Firebase')) {
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
            const existing = JSON.parse(localStorage.getItem('demo_requests') || '[]');
            existing.push(backupData);
            localStorage.setItem('demo_requests', JSON.stringify(existing));
            console.log('📝 Data saved to localStorage as backup');
        } catch (err) {
            console.error('Failed to save to localStorage:', err);
        }
    };

    const openWhatsAppFallback = (data) => {
        try {
            const message = `
*DEMO REQUEST - ECOGUARD AI*

Nama: ${data.name}
Perusahaan: ${data.company}
Email: ${data.email}
Telepon: ${data.phone}
Industri: ${data.industry}
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
*NEW DEMO REQUEST - ECOGUARD AI*

*Lead Information:*
• Perusahaan: ${data.company}
• Kontak: ${data.name}
• Email: ${data.email}
• WhatsApp: ${data.phone}
• Industri: ${data.industry}

*Pesan:*
${data.message}

*Request ID:* ${docId.slice(0, 8)}...
*Priority:* Contact within 24 hours!

*SILAKAN FOLLOW UP SEGERA!*
            `.replace(/\n/g, '%0A');

            const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        } catch (error) {
            console.log('WhatsApp notification skipped:', error);
        }
    };

    // ==================== AI CHAT FUNCTIONS ====================

    const handleSendMessage = async () => {
        if (!currentMessage.trim() || !chatEngine || isAILoading) return;

        // Add user message
        const userMessage = {
            type: 'user',
            content: currentMessage,
            time: new Date().toISOString()
        };

        setConversation(prev => [...prev, userMessage]);
        setCurrentMessage('');
        setIsAILoading(true);
        setAiStatus({ success: false, message: '' });

        try {
            // Get AI response
            const { response, analysis } = chatEngine.generateResponse(currentMessage);

            // Add AI response
            const aiMessage = {
                type: 'ai',
                content: response,
                time: new Date().toISOString(),
                analysis: analysis
            };

            setConversation(prev => [...prev, aiMessage]);

            // Auto-send summary after 3 messages
            if (chatEngine.conversationHistory.length >= 3 && userInfo.email) {
                setTimeout(sendConversationSummary, 1000);
            }

        } catch (error) {
            console.error('AI error:', error);
            setAiStatus({
                success: false,
                message: '❌ Gagal memproses. Silakan coba lagi.'
            });
        } finally {
            setIsAILoading(false);
        }
    };

    const sendConversationSummary = async () => {
        if (!userInfo.email || !chatEngine || conversation.length < 2) return;

        try {
            const summary = chatEngine.getSummary();
            const conversationText = conversation
                .map(msg => `${msg.type === 'user' ? 'Anda' : 'AI'}: ${msg.content}`)
                .join('\n\n');

            // Prepare email
            const emailParams = {
                to_name: userInfo.name || 'Pelanggan',
                to_email: userInfo.email,
                conversation_summary: conversationText,
                industry: userInfo.industry,
                date: new Date().toLocaleString('id-ID'),
                next_steps: '1. Free site audit\n2. Detailed proposal\n3. ROI calculation\n4. Implementation timeline'
            };

            // Send via EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATES.AI_CONSULTATION,
                emailParams
            );

            // Save to Firebase
            if (db) {
                await addDoc(collection(db, "ai_consultations"), {
                    name: userInfo.name,
                    email: userInfo.email,
                    phone: userInfo.phone,
                    industry: userInfo.industry,
                    conversation: conversationText,
                    summary: summary,
                    timestamp: serverTimestamp()
                });
            }

            // Send WhatsApp notification to admin
            const whatsappMsg = `
AI CONVERSATION SUMMARY

Name: ${userInfo.name || 'Not provided'}
Email: ${userInfo.email}
Industry: ${userInfo.industry}
Conversation: ${conversation.length} messages

Stage: ${summary.stage}
Confidence: ${summary.confidence || 'High'}

FOLLOW UP REQUIRED!
            `.replace(/\n/g, '%0A');

            window.open(`https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${whatsappMsg}`, '_blank');

            setAiStatus({
                success: true,
                message: '✅ Summary dikirim ke email Anda. Tim akan follow up via WhatsApp.'
            });

        } catch (error) {
            console.error('Summary error:', error);
            downloadConversation();
        }
    };

    const downloadConversation = () => {
        if (conversation.length === 0) return;

        const content = conversation
            .map(msg => `[${new Date(msg.time).toLocaleTimeString('id-ID')}] ${msg.type === 'user' ? 'Anda' : 'AI'}: ${msg.content}`)
            .join('\n\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Chat-EcoGuard-${new Date().getTime()}.txt`;
        a.click();

        setAiStatus({
            success: true,
            message: '✅ Chat didownload. Hubungi kami di WhatsApp untuk lanjutan.'
        });
    };

    const bookHumanConsultation = async () => {
        if (!userInfo.email || !userInfo.name) {
            setAiStatus({
                success: false,
                message: 'Harap isi nama dan email untuk penjadwalan'
            });
            return;
        }

        try {
            // Send confirmation email
            const emailParams = {
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone || 'Tidak diisi',
                company: 'Pelanggan',
                schedule: 'Akan dikonfirmasi via WhatsApp',
                date: new Date().toLocaleString('id-ID'),
                conversation_length: conversation.length
            };

            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATES.CONSULTATION_BOOKING,
                emailParams
            );

            // Send WhatsApp to admin
            const whatsappMessage = `
📅 HUMAN CONSULTATION REQUEST

Name: ${userInfo.name}
Email: ${userInfo.email}
Phone: ${userInfo.phone || 'Not provided'}
Industry: ${userInfo.industry}

Chat Messages: ${conversation.length}
Last Message: ${conversation[conversation.length - 1]?.content?.substring(0, 50) || 'No messages'}

⏰ Please schedule within 24-48 hours
            `.replace(/\n/g, '%0A');

            window.open(`https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${whatsappMessage}`, '_blank');

            setAiStatus({
                success: true,
                message: '✅ Permintaan terkirim! Tim akan konfirmasi via WhatsApp.'
            });

            // Save to Firebase
            if (db) {
                await addDoc(collection(db, "consultation_requests"), {
                    ...emailParams,
                    timestamp: serverTimestamp()
                });
            }

        } catch (error) {
            console.error('Booking error:', error);

            // Fallback to direct WhatsApp
            const fallbackMessage = `
📅 BOOKING REQUEST

Name: ${userInfo.name}
Email: ${userInfo.email}
Phone: ${userInfo.phone || 'Not provided'}

Please schedule a consultation call.
            `.replace(/\n/g, '%0A');

            window.open(`https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${fallbackMessage}`, '_blank');

            setAiStatus({
                success: true,
                message: 'WhatsApp terbuka. Silakan kirim pesan untuk booking.'
            });
        }
    };

    // Quick reply buttons
    const quickReplies = [
        "Berapa penghematan yang bisa dicapai?",
        "Apa ROI period untuk bisnis saya?",
        "Teknologi apa yang digunakan?",
        "Berapa biaya implementasi?",
        "Ada case study di industri saya?",
        "Proses implementasi seperti apa?"
    ];

    // ==================== RENDER ====================

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
                        <div className="relative z-10 p-8 md:p-16 text-white">
                            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                                {/* Left Side */}
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                        Siap Transformasi
                                        <br />
                                        <span className="text-amber-300">Efisiensi</span> Bisnis Anda?
                                    </h2>
                                    <p className="text-green-100 text-base md:text-lg mb-8">
                                        Bergabung dengan 100+ perusahaan yang sudah menghemat
                                        hingga Rp 185 juta per bulan dengan EcoGuard AI.
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {[
                                            'Demo 1-on-1 dengan tim ahli',
                                            'Analisis kebutuhan spesifik',
                                            'Estimasi ROI personal',
                                            'Gratis konsultasi awal'
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <CheckCircle className="h-5 w-5 text-amber-300 mr-3" />
                                                <span className="text-green-100">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Status Badge */}
                                    <div className="mt-8 p-4 bg-white/10 rounded-xl">
                                        <div className="flex items-center">
                                            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                                            <span className="text-sm text-green-200">
                                                🔥 Data tersimpan aman di Firebase Cloud
                                            </span>
                                        </div>
                                        <div className="mt-2 text-xs text-green-300">
                                            + WhatsApp notification langsung ke tim
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Demo Request Form */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl md:text-2xl font-bold">
                                            Request Demo Gratis
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">
                                                Gratis
                                            </div>
                                            <div className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                                                🔥 Real-time
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Message */}
                                    {formStatus.message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-500/20 border border-green-400' : 'bg-red-500/20 border border-red-400'}`}
                                        >
                                            <div className="flex items-center">
                                                {formStatus.success ? (
                                                    <>
                                                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                                                        <div>
                                                            <span className="text-white text-sm">{formStatus.message}</span>
                                                            <p className="text-green-300 text-xs mt-1">
                                                                WhatsApp akan terbuka otomatis untuk notifikasi tim.
                                                            </p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                                                        <div>
                                                            <span className="text-white text-sm">{formStatus.message}</span>
                                                            <p className="text-red-300 text-xs mt-1">
                                                                WhatsApp akan terbuka untuk mengirim manual.
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                        {/* Form fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Nama Lengkap *"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-sm md:text-base"
                                                />
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder="Nama Perusahaan *"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-sm md:text-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Perusahaan *"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-sm md:text-base"
                                                />
                                            </div>

                                            <div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="WhatsApp *"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-sm md:text-base"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <select
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-sm md:text-base"
                                            >
                                                <option value="">Pilih Industri</option>
                                                <option value="manufacturing">Manufaktur</option>
                                                <option value="property">Property & Real Estate</option>
                                                <option value="retail">Retail & Mall</option>
                                                <option value="hospitality">Hospitality & Hotel</option>
                                                <option value="healthcare">Healthcare</option>
                                                <option value="education">Education</option>
                                                <option value="other">Lainnya</option>
                                            </select>
                                        </div>

                                        <div>
                                            <textarea
                                                name="message"
                                                placeholder="Ceritakan kebutuhan spesifik Anda..."
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent resize-none text-sm md:text-base"
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
                                                className="h-4 w-4 mt-1 text-amber-500 bg-white/10 border-white/30 rounded focus:ring-amber-300"
                                            />
                                            <label htmlFor="privacy" className="ml-2 text-xs md:text-sm text-green-200">
                                                Saya setuju data saya disimpan dan{' '}
                                                <a href="/privacy-policy" className="text-amber-300 hover:text-amber-200 underline">
                                                    kebijakan privasi
                                                </a>
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 md:py-4 bg-gradient-to-r from-amber-400 to-amber-300 text-green-900 font-bold rounded-xl hover:from-amber-300 hover:to-amber-200 transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                <>
                                                    <span>Request Demo Gratis</span>
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </>
                                            )}
                                        </button>

                                        <div className="text-center text-xs text-green-200 space-y-1">
                                            <p className="flex items-center justify-center">
                                                <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                                                Sistem 100% bekerja dengan fallback WhatsApp
                                            </p>
                                            <p>Tim akan menghubungi maksimal 1x24 jam</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Chat Consultation */}
                    <div className="items-center mt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl">
                                    <MessageSquare className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Chat Konsultasi AI Real
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="px-2 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 text-xs font-medium rounded-full">
                                                Context-Aware AI
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Info Form */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
                                        <input
                                            type="text"
                                            placeholder="Nama Anda"
                                            value={userInfo.name}
                                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                            className="px-3 py-2 border border-gray-200 rounded text-sm"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email (untuk hasil)"
                                            value={userInfo.email}
                                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                            className="px-3 py-2 border border-gray-200 rounded text-sm"
                                        />
                                        <select
                                            value={userInfo.industry}
                                            onChange={(e) => setUserInfo({ ...userInfo, industry: e.target.value })}
                                            className="px-3 py-2 border border-gray-200 rounded text-sm"
                                        >
                                            <option value="manufacturing">Manufaktur</option>
                                            <option value="property">Gedung Perkantoran</option>
                                            <option value="retail">Mall & Retail</option>
                                            <option value="hospitality">Hotel</option>
                                        </select>
                                    </div>

                                    {/* Status Message */}
                                    {aiStatus.message && (
                                        <div className={`p-3 rounded-lg mb-4 ${aiStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                            <div className="flex items-center">
                                                {aiStatus.success ? (
                                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                ) : (
                                                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                                                )}
                                                <span className="text-sm">{aiStatus.message}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Chat Container */}
                                    <div
                                        ref={chatContainerRef}
                                        className="h-64 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                        {conversation.map((msg, idx) => (
                                            <div key={idx} className={`mb-3 ${msg.type === 'user' ? 'text-right' : ''}`}>
                                                <div className={`inline-flex items-start max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-blue-100 ml-2' : 'bg-gray-100 mr-2'}`}>
                                                        {msg.type === 'user' ? (
                                                            <User className="h-3 w-3 text-blue-600" />
                                                        ) : (
                                                            <Bot className="h-3 w-3 text-gray-600" />
                                                        )}
                                                    </div>
                                                    <div className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}>
                                                        <p className="text-sm">{msg.content}</p>
                                                        <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                                            {new Date(msg.time).toLocaleTimeString('id-ID', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {isAILoading && (
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-full bg-gray-100 mr-2">
                                                    <Bot className="h-3 w-3 text-gray-600" />
                                                </div>
                                                <div className="p-3 rounded-lg bg-white border border-gray-200">
                                                    <div className="flex space-x-1">
                                                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
                                                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Replies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {quickReplies.map((reply, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setCurrentMessage(reply);
                                                    setTimeout(handleSendMessage, 100);
                                                }}
                                                className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-300 transition-colors"
                                            >
                                                {reply}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Message Input */}
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={currentMessage}
                                            onChange={(e) => setCurrentMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Tanyakan tentang penghematan, ROI, teknologi, dll..."
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                                            disabled={isAILoading}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={isAILoading || !currentMessage.trim()}
                                            className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isAILoading ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Send className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <button
                                            onClick={sendConversationSummary}
                                            disabled={!userInfo.email || conversation.length < 2}
                                            className="py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center text-sm disabled:opacity-50"
                                        >
                                            <Send className="h-4 w-4 mr-2" />
                                            Kirim ke Email
                                        </button>

                                        <button
                                            onClick={downloadConversation}
                                            disabled={conversation.length === 0}
                                            className="py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center text-sm disabled:opacity-50"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Chat
                                        </button>

                                        <button
                                            onClick={bookHumanConsultation}
                                            disabled={!userInfo.email}
                                            className="py-3 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-all flex items-center justify-center text-sm disabled:opacity-50"
                                        >
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Booking Ahli
                                        </button>
                                    </div>

                                    {/* Features */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            <div className="text-center">
                                                <div className="text-xs font-medium text-gray-700">🤖 AI Real</div>
                                                <div className="text-xs text-gray-500">Berdasar data nyata</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs font-medium text-gray-700">📧 Email Otomatis</div>
                                                <div className="text-xs text-gray-500">Summary langsung ke inbox</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs font-medium text-gray-700">📱 WhatsApp Alert</div>
                                                <div className="text-xs text-gray-500">Tim langsung notified</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs font-medium text-gray-700">💬 Context-Aware</div>
                                                <div className="text-xs text-gray-500">Ingat percakapan sebelumnya</div>
                                            </div>
                                        </div>
                                    </div>
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