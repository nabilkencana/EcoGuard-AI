import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const DemoRequest = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState({ success: false, message: '' });
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        company: '',
        industry: '',
        facilitySize: '',
        preferredDate: '',
        preferredTime: '',
        agenda: '',
        participants: 1
    });

    // Check auth on mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                // Redirect to login if not authenticated
                navigate('/');
                return;
            }
            setUser(currentUser);
            setLoading(false);

            // Pre-fill form with user data
            setFormData(prev => ({
                ...prev,
                company: localStorage.getItem('user_company') || ''
            }));
        });

        return () => unsubscribe();
    }, [navigate]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ success: false, message: '' });

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Save to localStorage
            const demoRequest = {
                ...formData,
                user: {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName
                },
                timestamp: new Date().toISOString(),
                status: 'pending'
            };

            localStorage.setItem('demo_request', JSON.stringify(demoRequest));

            // Send WhatsApp notification
            sendWhatsAppNotification(demoRequest);

            setFormStatus({
                success: true,
                message: '✅ Permintaan demo berhasil dikirim! Tim kami akan konfirmasi via WhatsApp.'
            });

            // Reset form
            setFormData({
                company: '',
                industry: '',
                facilitySize: '',
                preferredDate: '',
                preferredTime: '',
                agenda: '',
                participants: 1
            });

        } catch (error) {
            console.error('Error:', error);
            setFormStatus({
                success: false,
                message: '❌ Gagal mengirim permintaan. Silakan coba lagi.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Send WhatsApp notification
    const sendWhatsAppNotification = (data) => {
        const message = `
NEW DEMO REQUEST FROM LOGGED IN USER

${data.user.name}
${data.user.email}
${data.company}
${data.industry}

Date: ${data.preferredDate}
Time: ${data.preferredTime}
Participants: ${data.participants}

Agenda:
${data.agenda}

Please confirm within 24 hours!
        `.replace(/\n/g, '%0A');

        window.open(`https://wa.me/6285648898807?text=${message}`, '_blank');
    };

    // Available time slots
    const timeSlots = [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
    ];

    // Get tomorrow's date for min date
    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Memuat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Request Demo Gratis
                        </h1>
                        <p className="text-gray-600">
                            Jadwalkan demo personalized dengan tim ahli EcoGuard AI
                        </p>

                        {/* User Info */}
                        <div className="inline-flex items-center mt-6 px-4 py-2 bg-green-50 rounded-full">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-medium text-sm mr-2">
                                {user.displayName?.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-medium text-gray-900">
                                    {user.displayName}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column - Form */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                {/* Status Message */}
                                {formStatus.message && (
                                    <div className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                        <div className="flex items-center">
                                            {formStatus.success ? (
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                            )}
                                            <span className="text-sm">{formStatus.message}</span>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Company Info */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Perusahaan *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="PT. Contoh Indonesia"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Industri *
                                            </label>
                                            <select
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="">Pilih Industri</option>
                                                <option value="manufacturing">Manufaktur</option>
                                                <option value="property">Gedung Perkantoran</option>
                                                <option value="retail">Mall & Retail</option>
                                                <option value="hospitality">Hotel</option>
                                                <option value="education">Pendidikan</option>
                                                <option value="healthcare">Kesehatan</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Facility Info */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Luas Fasilitas
                                            </label>
                                            <select
                                                value={formData.facilitySize}
                                                onChange={(e) => setFormData({ ...formData, facilitySize: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="">Pilih Range</option>
                                                <option value="<1000">&lt; 1,000 m²</option>
                                                <option value="1000-5000">1,000 - 5,000 m²</option>
                                                <option value="5000-10000">5,000 - 10,000 m²</option>
                                                <option value="10000-50000">10,000 - 50,000 m²</option>
                                                <option value=">50000">&gt; 50,000 m²</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Jumlah Peserta
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="20"
                                                value={formData.participants}
                                                onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 1 })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Schedule */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tanggal Preferensi *
                                            </label>
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                                <input
                                                    type="date"
                                                    min={getTomorrow()}
                                                    value={formData.preferredDate}
                                                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Waktu Preferensi *
                                            </label>
                                            <div className="flex items-center">
                                                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                                                <select
                                                    value={formData.preferredTime}
                                                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                >
                                                    <option value="">Pilih Waktu</option>
                                                    {timeSlots.map(time => (
                                                        <option key={time} value={time}>{time} WIB</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Agenda */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Agenda / Topik Khusus
                                        </label>
                                        <textarea
                                            value={formData.agenda}
                                            onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="Contoh: 
1. Demo sistem monitoring real-time
2. Diskusi ROI untuk pabrik 10,000 m²
3. Integrasi dengan sistem ERP existing"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                                Mengirim Permintaan...
                                            </>
                                        ) : (
                                            'Request Demo Gratis'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column - Info */}
                        <div className="space-y-6">
                            {/* What to Expect */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-4">
                                    Yang Akan Anda Dapatkan
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">Demo live sistem</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                        <span className="text-sm text-gray-600">Analisis kebutuhan spesifik</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                        <span className="text-sm text-gray-600">Estimasi ROI personalized</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                        <span className="text-sm text-gray-600">Q&A dengan tim ahli</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                        <span className="text-sm text-gray-600">Proposal detail (optional)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Preparation */}
                            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-lg p-6 text-white">
                                <h3 className="font-bold text-lg mb-4">
                                    Persiapan Demo
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                            1
                                        </div>
                                        <span>Data konsumsi 3 bulan terakhir</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-0.5">
                                            2
                                        </div>
                                        <span>Layout gedung/fasilitas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-0.5">
                                            3
                                        </div>
                                        <span>List pertanyaan spesifik</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-0.5">
                                            4
                                        </div>
                                        <span>Team yang akan hadir</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-4">
                                    Butuh Bantuan Cepat?
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href="https://wa.me/6285648898807"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-green-600 hover:text-green-700"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                            💬
                                        </div>
                                        <div>
                                            <div className="font-medium">WhatsApp</div>
                                            <div className="text-sm text-gray-600">+62 856-4889-8807</div>
                                        </div>
                                    </a>
                                    <a
                                        href="mailto:hello@ecoguard-ai.com"
                                        className="flex items-center text-blue-600 hover:text-blue-700"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                            📧
                                        </div>
                                        <div>
                                            <div className="font-medium">Email</div>
                                            <div className="text-sm text-gray-600">hello@ecoguard-ai.com</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoRequest;