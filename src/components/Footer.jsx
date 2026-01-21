import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin,CheckCircle, Loader2 } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            setError('Masukkan email yang valid');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulasi API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success state
            setIsSuccess(true);
            setEmail('');
            
            // Reset success message setelah 5 detik
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
            
            console.log('Email subscribed:', email);
            
        } catch (err) {
            setError('Gagal berlangganan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                                <Leaf className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">EcoGuard AI</h2>
                                <p className="text-gray-400 text-sm">Intelligent Energy Management</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Solusi AI untuk efisiensi energi dan pengelolaan sumber daya berkelanjutan bagi industri dan bisnis.
                        </p>
                     
                    </div>

                    {/* Quick Links */}
                    <div>
    <h3 className="font-semibold text-gray-200 mb-4 text-sm uppercase tracking-wider">
        Jelajahi
    </h3>
    <ul className="space-y-3">
        {[
            { name: 'Beranda', href: '/' },
            { name: 'Fitur', href: '/features' },
            { name: 'Cara Kerja', href: '/about' },
            { name: 'Manfaat', href: '/benefits' },
            { name: 'Kontak', href: '/contact' },
        ].map((item) => (
            <li key={item.name}>
                <a
                    href={item.href}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors block hover:translate-x-1 duration-300"
                    onClick={(e) => {
                        // Untuk internal anchor links, smooth scroll
                        if (item.href.includes('#')) {
                            e.preventDefault();
                            const element = document.querySelector(item.href);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    }}
                >
                    {item.name}
                </a>
            </li>
        ))}
    </ul>
</div>
                    {/* Solutions */}
                    <div>
                        <h3 className="font-semibold text-gray-200 mb-4 text-sm uppercase tracking-wider">
                            Manfaat
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Penghematan Biaya',
                                'Kepatuhan Regulasi',
                                'Dampak Lingkungan',
                                'Efisiensi Operasional',
                                'Keunggulan Kompetitif',
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="#"
                                        className="text-gray-400 hover:text-green-400 text-sm transition-colors block hover:translate-x-1 duration-300"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-gray-200 mb-4 text-sm uppercase tracking-wider">
                            Kontak
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                                <a href="EcoGuardAI@gmail.com" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                                    EcoGuardAI@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                                <a href="tel:+62 856-4889-8807" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                                    +62 856-4889-8807
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-400 text-sm">
                                    Malang, Indonesia
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* NEWSLETTER - IMPROVED DESIGN */}
                <div className="max-w-lg mx-auto">
                    <div className="text-center mb-6">
                        <h4 className="font-bold text-xl text-gray-100 mb-2">
                            Tetap Terinformasi
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Dapatkan insight terbaru tentang efisiensi energi dan keberlanjutan.
                        </p>
                    </div>

                    <form onSubmit={handleSubscribe} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-grow">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Masukkan email Anda"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                                    required
                                    disabled={isLoading || isSuccess}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || isSuccess}
                                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${isLoading || isSuccess ? 'opacity-90' : 'hover:shadow-lg'} ${isSuccess ? 'bg-green-700' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Memproses...
                                    </span>
                                ) : isSuccess ? (
                                    <span className="flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Berhasil!
                                    </span>
                                ) : (
                                    'Subscribe'
                                )}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm rounded-lg p-3 animate-fadeIn">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {isSuccess && (
                            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/50 text-green-300 text-sm rounded-lg p-4 animate-fadeIn">
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Terima kasih telah berlangganan!</p>
                                        <p className="text-green-400/80 text-xs mt-1">
                                            Kami akan mengirimkan update terbaru ke email Anda.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Notice */}
                        <p className="text-gray-500 text-xs text-center">
                            Dengan berlangganan, Anda menyetujui{' '}
                            <a href="/privacy" className="text-green-500 hover:text-green-400 transition-colors">
                                Kebijakan Privasi
                            </a>{' '}
                            kami. Kami tidak akan membagikan email Anda.
                        </p>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-950 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-gray-500 text-sm">
                                © {new Date().getFullYear()} EcoGuard AI. All rights reserved.
                            </p>
                        </div>

                        <div className="flex space-x-6">
                            <a href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                                Terms of Service
                            </a>
                            <a href="/cookies" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;