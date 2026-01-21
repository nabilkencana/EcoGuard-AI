import { motion } from 'framer-motion';
import { ArrowRight, Download, CheckCircle, AlertCircle, Loader2, Send, User, Bot, Bolt, Calendar, LightningBolt } from 'lucide-react';
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
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        phone: '',
        industry: 'manufacturing',
        role: '',
        experience: ''
    });
    const [chatStats, setChatStats] = useState({
        messages: 0,
        duration: 0,
        intents: []
    });

    const chatContainerRef = useRef(null);
    const sessionStartRef = useRef(new Date());

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }, []);

    // Initialize chat engine
    useEffect(() => {
        const engine = new AIChatEngine(userProfile.industry);

        // Set user profile if available
        if (userProfile.name) {
            engine.userProfile = { ...userProfile, experience_level: 'beginner' };
        }

        setChatEngine(engine);

        // Add personalized welcome message
        const welcomeMsg = {
            type: 'ai',
            content: `Halo${userProfile.name ? ' ' + userProfile.name : ''}! 👋

Saya AI Assistant EcoGuard AI, siap membantu analisis kebutuhan energi dan air untuk bisnis ${userProfile.industry} Anda.

Saya bisa bantu dengan:
• 📊 Analisis penghematan potensial
• 💰 Estimasi ROI & investment
• 🛠️ Rekomendasi teknologi tepat
• 📅 Timeline implementasi
• 📈 Case study industri serupa

*Bisa ceritakan kebutuhan spesifik Anda?*`,
            time: new Date().toISOString()
        };

        setConversation([welcomeMsg]);
        sessionStartRef.current = new Date();

        // Start session timer
        const timer = setInterval(() => {
            const duration = Math.round((new Date() - sessionStartRef.current) / 1000);
            setChatStats(prev => ({ ...prev, duration }));
        }, 1000);

        return () => clearInterval(timer);
    }, [userProfile.industry, userProfile.name]);

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

            // Send Email via EmailJS - Perbaikan
            try {
                console.log('📧 Attempting to send email via EmailJS...');

                // Pastikan EmailJS sudah di-init
                if (!window.emailjs || !window.emailjs.init) {
                    console.log('🔄 Initializing EmailJS...');
                    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
                }

                // Gunakan parameter yang sesuai dengan template DEMO_REQUEST
                const emailParams = {
                    // Parameter yang wajib untuk recipient
                    reply_to: submissionData.email, // Bisa juga to_email, email, user_email
                    to_email: submissionData.email,
                    email: submissionData.email,

                    // Data lainnya
                    to_name: submissionData.name,
                    name: submissionData.name,
                    company: submissionData.company,
                    phone: submissionData.phone,
                    industry: submissionData.industry,
                    message: submissionData.message || 'Tidak ada pesan tambahan',
                    date: new Date().toLocaleString('id-ID'),
                    request_id: docRef.id.slice(0, 8),
                    source: 'Demo Request Form',
                    website: 'EcoGuard AI'
                };

                console.log('📧 EmailJS params:', emailParams);

                // Debug: Cek template
                console.log('📧 Using template:', EMAILJS_CONFIG.TEMPLATES.DEMO_REQUEST);

                const result = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATES.DEMO_REQUEST,
                    emailParams
                );

                console.log('✅ Email sent successfully:', result.status, result.text);

            } catch (emailError) {
                console.log('⚠️ Email sending skipped (not critical):', emailError);
                console.log('⚠️ Error details:', emailError.text);

                // Debug lebih detail
                if (emailError.text.includes('recipients address')) {
                    console.log('⚠️ Issue: Template needs recipient parameter (to_email, reply_to, or email)');
                }
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

    // ==================== ENHANCED AI CHAT FUNCTIONS ====================

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
            // Generate AI response
            const { response, analysis } = chatEngine.generateResponse(currentMessage);

            // Add AI response with typing effect
            const aiMessage = {
                type: 'ai',
                content: response,
                time: new Date().toISOString(),
                analysis: analysis
            };

            // Simulate typing delay
            await new Promise(resolve => setTimeout(resolve, 800));

            setConversation(prev => [...prev, aiMessage]);

            // Update stats
            setChatStats(prev => ({
                ...prev,
                messages: prev.messages + 1,
                intents: [...new Set([...prev.intents, analysis.intent])]
            }));

            // Auto-suggest actions based on conversation stage
            if (analysis.stage === 'pricing_talk' && userProfile.email) {
                setTimeout(() => {
                    setAiStatus({
                        success: true,
                        message: '💡 Mau saya kirim detailed proposal via email?'
                    });
                }, 1500);
            }

            // Auto-send summary after meaningful conversation
            if (chatEngine.conversationHistory.length >= 4 && userProfile.email) {
                setTimeout(() => {
                    setAiStatus({
                        success: true,
                        message: '📋 Percakapan sudah cukup meaningful. Mau saya summarize dan kirim ke email?'
                    });
                }, 2000);
            }

        } catch (error) {
            console.error('AI error:', error);
            setAiStatus({
                success: false,
                message: '❌ Gagal memproses. Silakan coba lagi atau hubungi langsung tim kami.'
            });
        } finally {
            setIsAILoading(false);
        }
    };

    // Enhanced conversation summary
    const sendConversationSummary = async () => {
        if (!userProfile.email || !chatEngine || conversation.length < 2) return;

        try {
            const summary = chatEngine.getSummary();
            const conversationText = conversation
                .map(msg => {
                    const time = new Date(msg.time).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    return `[${time}] ${msg.type === 'user' ? '👤 Anda' : '🤖 AI'}: ${msg.content}`;
                })
                .join('\n\n');

            // Prepare detailed email
            const emailParams = {
                reply_to: userProfile.email,
                to_email: userProfile.email,
                email: userProfile.email,
                to_name: userProfile.name || 'Pelanggan',
                name: userProfile.name || 'Pelanggan',
                conversation_summary: conversationText,
                industry: userProfile.industry,
                date: new Date().toLocaleString('id-ID'),
                next_steps: '1. Free site audit\n2. Detailed proposal\n3. ROI calculation\n4. Implementation timeline',
                pain_points: summary.pain_points?.join(', ') || 'Tidak terdeteksi',
                budget_range: summary.budget || 'Belum dibahas',
                timeline: summary.timeline || 'Flexible',
                session_duration: summary.session_duration,
                conversation_insights: `Detected intents: ${summary.detected_intents?.join(', ')}`
            };

            // Send via EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATES.AI_CONSULTATION,
                emailParams
            );

            // Save to Firebase with more data
            if (db) {
                await addDoc(collection(db, "ai_consultations"), {
                    name: userProfile.name,
                    email: userProfile.email,
                    phone: userProfile.phone,
                    industry: userProfile.industry,
                    role: userProfile.role,
                    conversation: conversationText,
                    summary: summary,
                    chat_stats: chatStats,
                    timestamp: serverTimestamp(),
                    ai_analysis: chatEngine.conversationHistory.map(msg => msg.analysis).filter(Boolean)
                });
            }

            // Send enhanced WhatsApp notification
            const whatsappMsg = `
🤖 AI CONVERSATION SUMMARY - ECOGUARD AI

👤 Contact: ${userProfile.name || 'Not provided'}
📧 Email: ${userProfile.email}
📱 Phone: ${userProfile.phone || 'Not provided'}
🏭 Industry: ${userProfile.industry}
💼 Role: ${userProfile.role || 'Not specified'}

📊 Conversation Stats:
• Messages: ${conversation.length}
• Duration: ${chatStats.duration} detik
• Stage: ${summary.stage}
• Pain Points: ${summary.pain_points?.join(', ') || 'None'}

🎯 Key Insights:
• Budget: ${summary.budget || 'Not discussed'}
• Timeline: ${summary.timeline || 'Flexible'}
• Decision Maker: ${summary.decision_maker ? 'Yes' : 'No'}

💡 FOLLOW UP REQUIRED!
Priority: ${summary.timeline === 'urgent' ? 'HIGH' : 'MEDIUM'}
            `.trim().replace(/\n/g, '%0A');

            window.open(`https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${whatsappMsg}`, '_blank');

            setAiStatus({
                success: true,
                message: '✅ Summary berhasil dikirim ke email dan tim sudah di-notify via WhatsApp!'
            });

        } catch (error) {
            console.error('Summary error:', error);

            // Enhanced fallback
            downloadEnhancedConversation();

            setAiStatus({
                success: false,
                message: '❌ Email gagal, namun chat sudah didownload dengan analysis lengkap.'
            });
        }
    };

    // Enhanced download with analysis
    const downloadEnhancedConversation = () => {
        if (conversation.length === 0) return;

        const summary = chatEngine?.getSummary() || {};

        const content = `ECO-GUARD AI CHAT SESSION
========================
Date: ${new Date().toLocaleString('id-ID')}
Duration: ${chatStats.duration} detik
User: ${userProfile.name || 'Anonymous'}
Industry: ${userProfile.industry}
Role: ${userProfile.role || 'Not specified'}

CONVERSATION SUMMARY
===================
Stage: ${summary.stage || 'Unknown'}
Pain Points: ${summary.pain_points?.join(', ') || 'None'}
Budget Range: ${summary.budget || 'Not discussed'}
Timeline: ${summary.timeline || 'Flexible'}
Decision Maker: ${summary.decision_maker ? 'Yes' : 'No'}

CHAT TRANSCRIPT
===============
${conversation.map((msg, idx) => {
            const time = new Date(msg.time).toLocaleTimeString('id-ID');
            const prefix = msg.type === 'user' ? '👤 ANDA' : '🤖 AI';
            const analysis = msg.analysis ?
                `\n    [Intent: ${msg.analysis.intent}, Confidence: ${(msg.analysis.confidence * 100).toFixed(0)}%]` : '';
            return `${time} ${prefix}: ${msg.content}${analysis}`;
        }).join('\n\n')}

NEXT STEPS RECOMMENDATIONS
=========================
1. Free Site Audit
2. Detailed ROI Analysis
3. Technical Consultation
4. Implementation Planning

Contact EcoGuard AI:
📞 ${WHATSAPP_CONFIG.BUSINESS_NUMBER}
📧 support@ecoguard.ai
`;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `EcoGuard-AI-Chat-${new Date().getTime()}.txt`;
        a.click();

        setAiStatus({
            success: true,
            message: '✅ Chat dengan analysis lengkap telah didownload!'
        });
    };

    // Enhanced quick replies dengan context awareness
    const getContextualQuickReplies = () => {
        const stage = chatEngine?.context?.stage || 'opening';

        const replies = {
            opening: [
                "Berapa penghematan yang bisa dicapai?",
                "Apa ROI period untuk bisnis saya?",
                "Teknologi apa yang digunakan?",
                "Berapa biaya implementasi?"
            ],
            discovery: [
                "Butuh berapa sensor untuk gedung saya?",
                "Ada case study di industri saya?",
                "Proses implementasi seperti apa?",
                "Berapa lama setup?"
            ],
            pricing_talk: [
                "Bisa breakdown biayanya?",
                "Ada financing options?",
                "Bisa trial/demo dulu?",
                "Bandingin dengan vendor lain"
            ],
            qualification: [
                "Jadwalkan meeting dengan tim",
                "Kirim proposal detail",
                "Free site audit kapan?",
                "Bicara dengan technical team"
            ]
        };

        return replies[stage] || replies.opening;
    };

    // Reset chat session
    const resetChat = () => {
        setConversation([]);
        setCurrentMessage('');
        setAiStatus({ success: false, message: '' });
        if (chatEngine) {
            chatEngine.clearConversation();
        }
        sessionStartRef.current = new Date();
        setChatStats({ messages: 0, duration: 0, intents: [] });
    };

    const bookHumanConsultation = async () => {
        if (!userProfile.email || !userProfile.name) {
            setAiStatus({
                success: false,
                message: 'Harap isi nama dan email untuk penjadwalan'
            });
            return;
        }

        try {
            // Send confirmation email dengan parameter yang benar
            const emailParams = {
                reply_to: userProfile.email,
                to_email: userProfile.email,
                email: userProfile.email,
                name: userProfile.name,
                phone: userProfile.phone || 'Tidak diisi',
                company: 'Pelanggan',
                schedule: 'Akan dikonfirmasi via WhatsApp',
                date: new Date().toLocaleString('id-ID'),
                conversation_length: conversation.length,
                source: 'Booking Request'
            };

            console.log('📧 Sending booking email with params:', emailParams);

            // Gunakan template DEMO_REQUEST jika CONSULTATION_BOOKING tidak ada
            const templateId = EMAILJS_CONFIG.TEMPLATES.CONSULTATION_BOOKING || EMAILJS_CONFIG.TEMPLATES.DEMO_REQUEST;

            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                templateId,
                emailParams
            );

            // Send WhatsApp to admin
            const whatsappMessage = `
HUMAN CONSULTATION REQUEST

Name: ${userProfile.name}
Email: ${userProfile.email}
Phone: ${userProfile.phone || 'Not provided'}
Industry: ${userProfile.industry}

Chat Messages: ${conversation.length}
Last Message: ${conversation[conversation.length - 1]?.content?.substring(0, 50) || 'No messages'}

Please schedule within 24-48 hours
        `.trim().replace(/\n/g, '%0A');

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

            // Fallback to direct WhatsApp tanpa email
            const fallbackMessage = `
📅 BOOKING REQUEST - EMAIL FAILED

Name: ${userProfile.name}
Email: ${userProfile.email}
Phone: ${userProfile.phone || 'Not provided'}

Please schedule a consultation call.
Email sending failed: ${error.message}
        `.trim().replace(/\n/g, '%0A');

            window.open(`https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${fallbackMessage}`, '_blank');

            setAiStatus({
                success: true,
                message: 'WhatsApp terbuka. Silakan kirim pesan untuk booking (email gagal).'
            });
        }
    };

    // Quick reply buttons untuk AI chat yang lama (backward compatibility)
    const quickReplies = [
        "Berapa penghematan yang bisa dicapai?",
        "Apa ROI period untuk bisnis saya?",
        "Teknologi apa yang digunakan?",
        "Berapa biaya implementasi?",
        "Ada case study di industri saya?",
        "Proses implementasi seperti apa?"
    ];

    // Enhanced user info form component
    const UserProfileForm = ({ userProfile, setUserProfile }) => {
        return (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 md:p-6 rounded-xl border border-blue-200 mb-4">
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    Profil Anda (Opsional, untuk personalisasi)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <input
                        type="text"
                        placeholder="Nama"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                        type="tel"
                        placeholder="WhatsApp"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <select
                        value={userProfile.role}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, role: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                        <option value="">Posisi/Role</option>
                        <option value="owner">Owner/Pemilik</option>
                        <option value="director">Direktur</option>
                        <option value="manager">Manajer</option>
                        <option value="engineer">Engineer</option>
                        <option value="consultant">Konsultan</option>
                        <option value="other">Lainnya</option>
                    </select>
                    <select
                        value={userProfile.industry}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, industry: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                        <option value="manufacturing">Manufaktur</option>
                        <option value="property">Property</option>
                        <option value="retail">Retail</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                    </select>
                </div>

                {userProfile.name && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 text-xs text-green-700 bg-green-50 p-2 rounded-lg"
                    >
                        ✅ Chat akan dipersonalisasi untuk {userProfile.name} ({userProfile.role || 'Tidak spesifik'}) di industri {userProfile.industry}
                        {userProfile.email && ` • Email: ${userProfile.email}`}
                        {userProfile.phone && ` • WA: ${userProfile.phone}`}
                    </motion.div>
                )}
            </div>
        );
    }

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

                                        <div className="relative group">
                                            <label className="block text-sm font-medium text-green-200 mb-2 pl-1">
                                                Jenis Industri *
                                            </label>

                                            <div className="relative">
                                                <select
                                                    name="industry"
                                                    value={formData.industry}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3.5 bg-white/10 border border-white/30 rounded-xl text-white placeholder-green-200/70 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent text-sm md:text-base appearance-none cursor-pointer transition-all duration-300 hover:bg-white/15 group-hover:border-white/40"
                                                >
                                                    <option value="" className="text-gray-700">Pilih jenis industri Anda</option>
                                                    <option value="manufacturing" className="text-gray-700">🏭 Manufaktur & Pabrik</option>
                                                    <option value="property" className="text-gray-700">🏢 Property & Real Estate</option>
                                                    <option value="retail" className="text-gray-700">🛍️ Retail & Mall</option>
                                                    <option value="hospitality" className="text-gray-700">🏨 Hospitality & Hotel</option>
                                                    <option value="healthcare" className="text-gray-700">🏥 Healthcare & Rumah Sakit</option>
                                                    <option value="education" className="text-gray-700">🎓 Education & Pendidikan</option>
                                                    <option value="office" className="text-gray-700">💼 Gedung Perkantoran</option>
                                                    <option value="factory" className="text-gray-700">⚙️ Pabrik & Factory</option>
                                                    <option value="mall" className="text-gray-700">🏬 Mall & Pusat Perbelanjaan</option>
                                                    <option value="school" className="text-gray-700">📚 Sekolah & Kampus</option>
                                                    <option value="hospital" className="text-gray-700">🏥 Rumah Sakit & Klinik</option>
                                                    <option value="other" className="text-gray-700">🔧 Lainnya</option>
                                                </select>

                                                {/* Custom dropdown arrow */}
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-5 h-5 text-green-200/70 group-hover:text-green-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>

                                                {/* Focus highlight */}
                                                <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 ring-2 ring-amber-400/30"></div>
                                            </div>

                                            {/* Selected value indicator */}
                                            {formData.industry && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-2 flex items-center text-xs text-green-300"
                                                >
                                                    <CheckCircle className="h-3 w-3 mr-1.5 text-amber-300" />
                                                    <span className="font-medium">
                                                        {formData.industry === 'manufacturing' && '🏭 Manufaktur dipilih'}
                                                        {formData.industry === 'property' && '🏢 Property & Real Estate dipilih'}
                                                        {formData.industry === 'retail' && '🛍️ Retail & Mall dipilih'}
                                                        {formData.industry === 'hospitality' && '🏨 Hospitality & Hotel dipilih'}
                                                        {formData.industry === 'healthcare' && '🏥 Healthcare & Rumah Sakit dipilih'}
                                                        {formData.industry === 'education' && '🎓 Education & Pendidikan dipilih'}
                                                        {formData.industry === 'office' && '💼 Gedung Perkantoran dipilih'}
                                                        {formData.industry === 'factory' && '⚙️ Pabrik & Factory dipilih'}
                                                        {formData.industry === 'mall' && '🏬 Mall & Pusat Perbelanjaan dipilih'}
                                                        {formData.industry === 'school' && '📚 Sekolah & Kampus dipilih'}
                                                        {formData.industry === 'hospital' && '🏥 Rumah Sakit & Klinik dipilih'}
                                                        {formData.industry === 'other' && '🔧 Lainnya dipilih'}
                                                    </span>
                                                </motion.div>
                                            )}
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

                    {/* Enhanced AI Chat Consultation */}
                    <div className="mt-8 md:mt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                        >
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 md:p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/20 rounded-xl">
                                            <Bot className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold">EcoGuard AI Assistant</h3>
                                            <p className="text-blue-100 text-sm">Context-aware AI dengan data real industri</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center text-xs bg-white/20 px-2 py-1 rounded-full">
                                            <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse mr-1.5"></div>
                                            <span>AI Active</span>
                                        </div>
                                        <button
                                            onClick={resetChat}
                                            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            🔄 Restart
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Bar */}
                                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                                    <div className="bg-white/10 p-2 rounded-lg text-center">
                                        <div className="font-bold">{chatStats.messages}</div>
                                        <div className="text-blue-200">Messages</div>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-lg text-center">
                                        <div className="font-bold">{Math.floor(chatStats.duration / 60)}:{String(chatStats.duration % 60).padStart(2, '0')}</div>
                                        <div className="text-blue-200">Duration</div>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-lg text-center">
                                        <div className="font-bold">{chatStats.intents.length}</div>
                                        <div className="text-blue-200">Topics</div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Body */}
                            <div className="p-4 md:p-6">

                                {/* Status Message */}
                                {aiStatus.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 mb-4 rounded-lg ${aiStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                                    >
                                        <div className="flex items-center">
                                            {aiStatus.success ? (
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                                            )}
                                            <span className="text-sm">{aiStatus.message}</span>
                                        </div>
                                    </motion.div>
                                )}

                                {/* User Profile Form - INLINE */}
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 md:p-6 rounded-xl border border-blue-200 mb-4">
                                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                                        <User className="h-4 w-4 mr-2 text-blue-600" />
                                        Profil Anda (Opsional, untuk personalisasi)
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Nama"
                                            value={userProfile.name}
                                            onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={userProfile.email}
                                            onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="WhatsApp"
                                            value={userProfile.phone}
                                            onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                        <select
                                            value={userProfile.role}
                                            onChange={(e) => setUserProfile(prev => ({ ...prev, role: e.target.value }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="">Posisi/Role</option>
                                            <option value="owner">Owner/Pemilik</option>
                                            <option value="director">Direktur</option>
                                            <option value="manager">Manajer</option>
                                            <option value="engineer">Engineer</option>
                                            <option value="consultant">Konsultan</option>
                                            <option value="other">Lainnya</option>
                                        </select>
                                        <select
                                            value={userProfile.industry}
                                            onChange={(e) => setUserProfile(prev => ({ ...prev, industry: e.target.value }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="manufacturing">Manufaktur</option>
                                            <option value="property">Property</option>
                                            <option value="retail">Retail</option>
                                            <option value="hospitality">Hospitality</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="education">Education</option>
                                        </select>
                                    </div>

                                    {userProfile.name && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mt-3 text-xs text-green-700 bg-green-50 p-2 rounded-lg"
                                        >
                                            ✅ Chat akan dipersonalisasi untuk {userProfile.name} ({userProfile.role || 'Tidak spesifik'}) di industri {userProfile.industry}
                                            {userProfile.email && ` • Email: ${userProfile.email}`}
                                            {userProfile.phone && ` • WA: ${userProfile.phone}`}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Chat Container */}
                                <div
                                    ref={chatContainerRef}
                                    className="h-64 md:h-80 overflow-y-auto mb-4 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-200"
                                >
                                    {conversation.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: msg.type === 'user' ? 10 : -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}
                                        >
                                            <div className={`inline-flex items-start max-w-full sm:max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                                {/* Avatar */}
                                                <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-blue-100 ml-2 md:ml-3' : 'bg-gradient-to-br from-blue-100 to-cyan-100 mr-2 md:mr-3'} flex-shrink-0`}>
                                                    {msg.type === 'user' ? (
                                                        <User className="h-4 w-4 text-blue-600" />
                                                    ) : (
                                                        <Bot className="h-4 w-4 text-blue-600" />
                                                    )}
                                                </div>

                                                {/* Message */}
                                                <div className={`p-3 md:p-4 rounded-2xl ${msg.type === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none'} flex-1`}>
                                                    {/* AI Analysis Badge */}
                                                    {msg.type === 'ai' && msg.analysis && (
                                                        <div className="mb-2 flex items-center text-xs">
                                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                                {msg.analysis.intent?.replace('_', ' ') || 'general'} • {Math.round((msg.analysis.confidence || 0) * 100)}% confident
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div className="whitespace-pre-wrap text-sm md:text-base">
                                                        {msg.content}
                                                    </div>

                                                    {/* Timestamp */}
                                                    <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                                        {new Date(msg.time).toLocaleTimeString('id-ID', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                        {msg.analysis?.stage && ` • ${msg.analysis.stage}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* AI Loading Animation */}
                                    {isAILoading && (
                                        <div className="flex items-center">
                                            <div className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mr-2 md:mr-3">
                                                <Bot className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div className="p-3 md:p-4 bg-white border border-gray-200 rounded-2xl rounded-bl-none">
                                                <div className="flex items-center space-x-1">
                                                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                                                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    <span className="text-xs text-gray-500 ml-2">AI thinking...</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Replies */}
                                <div className="mb-4">
                                    <div className="flex items-center text-xs text-gray-500 mb-2">
                                        <Bolt className="h-3 w-3 mr-1" />
                                        Quick replies berdasarkan percakapan:
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {getContextualQuickReplies().map((reply, idx) => (
                                            <motion.button
                                                key={idx}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setCurrentMessage(reply);
                                                    setTimeout(handleSendMessage, 100);
                                                }}
                                                className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200 transition-all hover:shadow-sm"
                                            >
                                                {reply}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        value={currentMessage}
                                        onChange={(e) => setCurrentMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Tanyakan tentang efisiensi, ROI, teknologi, atau kebutuhan spesifik..."
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                                        disabled={isAILoading}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={isAILoading || !currentMessage.trim()}
                                        className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
                                    >
                                        {isAILoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Send className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <button
                                        onClick={sendConversationSummary}
                                        disabled={!userProfile.email || conversation.length < 2}
                                        className="py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center text-sm disabled:opacity-50 shadow-sm"
                                    >
                                        <Send className="h-4 w-4 mr-2" />
                                        Kirim Summary & Proposal
                                    </button>

                                    <button
                                        onClick={downloadEnhancedConversation}
                                        disabled={conversation.length === 0}
                                        className="py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center text-sm disabled:opacity-50"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download Chat + Analysis
                                    </button>

                                    <button
                                        onClick={() => {
                                            // Trigger human consultation
                                            if (userProfile.email) {
                                                bookHumanConsultation();
                                            } else {
                                                setAiStatus({
                                                    success: false,
                                                    message: 'Harap isi email untuk penjadwalan meeting'
                                                });
                                            }
                                        }}
                                        disabled={!userProfile.email}
                                        className="py-3 border border-green-300 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all flex items-center justify-center text-sm disabled:opacity-50"
                                    >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Schedule Live Demo
                                    </button>
                                </div>

                                {/* AI Capabilities */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="text-center text-sm text-gray-600 mb-3">🤖 AI Capabilities:</div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                                            <div className="text-xs font-medium text-gray-900">Context-Aware</div>
                                            <div className="text-xs text-gray-600 mt-1">Ingat percakapan sebelumnya</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                            <div className="text-xs font-medium text-gray-900">Real Data</div>
                                            <div className="text-xs text-gray-600 mt-1">Data industri terkini</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                            <div className="text-xs font-medium text-gray-900">Smart Analysis</div>
                                            <div className="text-xs text-gray-600 mt-1">Deteksi intent & kebutuhan</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                                            <div className="text-xs font-medium text-gray-900">Learning AI</div>
                                            <div className="text-xs text-gray-600 mt-1">Makin paham makin lama</div>
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