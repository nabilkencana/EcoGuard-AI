import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, User, LogOut, ChevronDown } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Beranda', path: '/' },
        { name: 'Fitur', path: '/features' },
        { name: 'Cara Kerja', path: '/about' },
        { name: 'Manfaat', path: '/benefits' },
        { name: 'Kontak', path: '/contact' },
    ];

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log('User status:', currentUser ? 'Logged in' : 'Not logged in');
        });

        return () => unsubscribe();
    }, []);

    // Handle Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            setIsMenuOpen(false);
            console.log('Attempting Google sign in...');

            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            console.log('✅ Signed in as:', user.email);

            // Save user data to localStorage
            localStorage.setItem('ecoguard_user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                photo: user.photoURL
            }));

            // Redirect or show success
            alert(`Selamat datang ${user.displayName}!`);

        } catch (error) {
            console.error('❌ Google sign in error:', error.code, error.message);

            // User-friendly error messages
            let errorMessage = 'Gagal login dengan Google. ';
            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Login dibatalkan.';
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage = 'Popup diblok browser. Izinkan popup untuk login.';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Koneksi internet bermasalah.';
            }

            alert(errorMessage);
        }
    };

    // Handle Sign Out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('ecoguard_user');
            setIsUserMenuOpen(false);
            console.log('✅ Signed out successfully');

            // Redirect to home
            navigate('/');
        } catch (error) {
            console.error('❌ Sign out error:', error);
            alert('Gagal logout. Coba lagi.');
        }
    };

    // Handle Demo Gratis
    const handleDemoRequest = () => {
        setIsMenuOpen(false);

        if (user) {
            // User sudah login, redirect ke halaman demo request
            navigate('/demo-request');
        } else {
            // User belum login, minta login dulu
            const proceed = window.confirm(
                'Untuk request demo, Anda perlu login terlebih dahulu.\n\nLogin dengan Google sekarang?'
            );

            if (proceed) {
                handleGoogleSignIn();
            }
        }
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user?.displayName) return 'U';
        return user.displayName
            .split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    // Get user first name
    const getUserFirstName = () => {
        if (!user?.displayName) return 'User';
        return user.displayName.split(' ')[0];
    };

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

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {loading ? (
                            // Loading state
                            <div className="flex items-center space-x-2">
                                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ) : user ? (
                            // User is logged in
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName}
                                            className="h-8 w-8 rounded-full border-2 border-green-200"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-medium text-sm">
                                            {getUserInitials()}
                                        </div>
                                    )}
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-gray-900">
                                            {getUserFirstName()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {user.email?.split('@')[0]}
                                        </div>
                                    </div>
                                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* User Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <div className="px-4 py-3 border-b">
                                            <div className="flex items-center space-x-3">
                                                {user.photoURL ? (
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user.displayName}
                                                        className="h-10 w-10 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-medium">
                                                        {getUserInitials()}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {user.displayName}
                                                    </div>
                                                        <div className="text-sm text-gray-500">
                                                            {/* PERBAIKAN DI SINI: Hanya tampilkan bagian sebelum @ */}
                                                            {user.email?.split('@')[0]}
                                                        </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                to="/demo-request"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <Leaf className="h-4 w-4 mr-3" />
                                                Request Demo
                                            </Link>
                                        </div>

                                        <div className="border-t pt-2">
                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="h-4 w-4 mr-3" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // User is not logged in
                            <>
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors border border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50"
                                >
                                    Masuk
                                </button>
                                <button
                                    onClick={handleDemoRequest}
                                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl"
                                >
                                    Demo Gratis
                                </button>
                            </>
                        )}
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

                            <div className="pt-4 border-t">
                                {loading ? (
                                    <div className="space-y-2">
                                        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ) : user ? (
                                    <div className="space-y-3">
                                        {/* User Info */}
                                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-medium">
                                                    {getUserInitials()}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">
                                                    {user.displayName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Actions */}
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-3 text-center text-green-600 font-medium border border-green-600 rounded-lg hover:bg-green-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/demo-request"
                                            className="block px-4 py-3 text-center bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Request Demo
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full px-4 py-3 text-center text-red-600 font-medium border border-red-600 rounded-lg hover:bg-red-50"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={handleGoogleSignIn}
                                            className="px-4 py-3 text-center text-green-600 font-medium border border-green-600 rounded-lg hover:bg-green-50 flex items-center justify-center"
                                        >
                                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Masuk dengan Google
                                        </button>
                                        <button
                                            onClick={handleDemoRequest}
                                            className="px-4 py-3 text-center bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600"
                                        >
                                            Demo Gratis
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;