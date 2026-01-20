import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Beranda', path: '/' },
        { name: 'Fitur', path: '/features' },
        { name: 'Cara Kerja', path: '/about' },
        { name: 'Manfaat', path: '/benefits' },
        { name: 'Kontak', path: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-green-600 to-green-500 rounded-xl">
                            <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">EcoGuard AI</h1>
                            <p className="text-xs text-gray-600">Satpam Lingkungan Digital</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`text-sm font-medium transition-colors hover:text-green-600 ${location.pathname === item.path
                                        ? 'text-green-600'
                                        : 'text-gray-700'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                            Masuk
                        </button>
                        <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl">
                            Demo Gratis
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`px-4 py-2 rounded-lg font-medium ${location.pathname === item.path
                                            ? 'bg-green-50 text-green-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col space-y-2 pt-4 border-t">
                                <button className="px-4 py-3 text-center text-green-600 font-medium border border-green-600 rounded-lg hover:bg-green-50">
                                    Masuk
                                </button>
                                <button className="px-4 py-3 text-center bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600">
                                    Demo Gratis
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;