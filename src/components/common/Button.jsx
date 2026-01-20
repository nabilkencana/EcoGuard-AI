import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    icon: Icon,
    iconPosition = 'right',
    onClick,
    disabled = false,
    className = '',
    fullWidth = false,
    loading = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 focus:ring-green-500 shadow-lg hover:shadow-xl',
        secondary: 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 focus:ring-green-500',
        outline: 'bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50 focus:ring-green-500',
        ghost: 'bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500',
        danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-500',
    };

    const sizes = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const animationProps = !disabled && !loading ? {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 }
    } : {};

    return (
        <motion.button
            {...animationProps}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && (
                        <Icon className={`h-5 w-5 ${children ? 'mr-2' : ''}`} />
                    )}
                    {children}
                    {Icon && iconPosition === 'right' && (
                        <Icon className={`h-5 w-5 ${children ? 'ml-2' : ''}`} />
                    )}
                </>
            )}
        </motion.button>
    );
};

export default Button;