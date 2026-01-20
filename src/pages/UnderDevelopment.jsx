// UnderDevelopment.jsx
import { motion } from 'framer-motion';
import { Construction, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnderDevelopment = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="h-32 w-32 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                        <Construction className="h-16 w-16 text-yellow-600" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-gray-800 mb-4"
                >
                    Sedang Dalam Pengembangan
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 mb-8"
                >
                    Maaf, halaman yang Anda cari sedang dalam proses pengembangan.
                    Tim kami sedang bekerja keras untuk menyelesaikannya secepat mungkin.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl"
                    >
                        <Home className="h-5 w-5 mr-2" />
                        Kembali ke Beranda
                    </Link>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-sm text-gray-500"
                >
                    Estimasi selesai: 2-4 minggu ke depan
                </motion.p>
            </div>
        </div>
    );
};

export default UnderDevelopment;