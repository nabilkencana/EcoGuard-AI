import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, CheckCircle } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            alert('Masukkan alamat email yang valid');
            return;
        }

        setLoading(true);

        // Simulasi API call untuk subscribe
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Subscribed:', email);
            setSubscribed(true);
            setEmail('');

            // Reset status setelah 3 detik
            setTimeout(() => {
                setSubscribed(false);
            }, 3000);
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-400 rounded-xl">
                                <Leaf className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">EcoGuard AI</h2>
                                <p className="text-gray-400 text-sm">Satpam Lingkungan Digital</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Aplikasi berbasis Artificial Intelligence untuk efisiensi sumber daya
                            dan ketahanan lingkungan berkelanjutan. Inovasi Pertamina Eco-Innovation Competition 2026.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="p-2 bg-gray-800 rounded-lg hover:bg-green-600 transition-colors duration-300"
                                    aria-label={`Follow us on ${Icon.name}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Menu</h3>
                        <ul className="space-y-3">
                            {['Beranda', 'Fitur', 'Cara Kerja', 'Manfaat', 'Harga', 'Kontak'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase() === 'beranda' ? '' : item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-300 block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Resources</h3>
                        <ul className="space-y-3">
                            {[
                                'Documentation',
                                'API Reference',
                                'Blog',
                                'Case Studies',
                                'Help Center',
                                'Community',
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-300 block"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Kontak</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <Mail className="h-5 w-5 text-green-400 mt-1" />
                                <a href="mailto:support@ecoguard.ai" className="text-gray-400 hover:text-green-400 transition-colors">
                                    support@ecoguard.ai
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone className="h-5 w-5 text-green-400 mt-1" />
                                <a href="tel:+622112345678" className="text-gray-400 hover:text-green-400 transition-colors">
                                    +62 21 1234 5678
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-green-400 mt-1" />
                                <span className="text-gray-400">
                                    Jakarta, Indonesia
                                </span>
                            </li>
                        </ul>

                        {/* Newsletter - DIPERBAIKI */}
                        <div className="mt-8">
                            <h4 className="text-sm font-bold mb-3">NEWSLETTER</h4>
                            <p className="text-gray-400 text-sm mb-4">
                                Dapatkan tips dan update terbaru tentang keberlanjutan lingkungan.
                            </p>

                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Anda"
                                        className="flex-grow px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                        required
                                        disabled={loading || subscribed}
                                    />
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 ${subscribed ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'} rounded-r-lg transition-all duration-300 font-medium text-sm whitespace-nowrap ${(loading || subscribed) ? 'opacity-90' : ''}`}
                                        disabled={loading || subscribed}
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin h-4 w-4 mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Memproses...
                                            </span>
                                        ) : subscribed ? (
                                            <span className="flex items-center justify-center">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Terdaftar!
                                            </span>
                                        ) : (
                                            'Subscribe'
                                        )}
                                    </button>
                                </div>

                                {subscribed && (
                                    <div className="bg-green-900/30 border border-green-800 rounded-lg p-2 animate-fadeIn">
                                        <p className="text-green-400 text-xs flex items-center">
                                            <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                                            Terima kasih! Anda telah berlangganan newsletter kami.
                                        </p>
                                    </div>
                                )}

                                <p className="text-gray-500 text-xs">
                                    Dengan berlangganan, Anda menyetujui Kebijakan Privasi kami.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} EcoGuard AI. Hak Cipta Dilindungi.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Kebijakan Privasi
                            </a>
                            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Syarat & Ketentuan
                            </a>
                            <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Cookies
                            </a>
                        </div>
                    </div>

                    {/* Partnership */}
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <p className="text-gray-400 text-sm mb-4">Didukung oleh:</p>
                        <div className="flex flex-wrap items-center gap-6">
                            {[
                                { name: 'Pertamina', color: 'bg-red-900/30 text-red-300' },
                                { name: 'Kementerian ESDM', color: 'bg-blue-900/30 text-blue-300' },
                                { name: 'Google Cloud', color: 'bg-gray-800 text-gray-300' },
                                { name: 'AWS', color: 'bg-yellow-900/30 text-yellow-300' }
                            ].map((partner) => (
                                <div
                                    key={partner.name}
                                    className={`px-5 py-2 rounded-lg text-sm font-medium ${partner.color} border border-gray-700/50`}
                                >
                                    {partner.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;