import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

const Card = ({
    children,
    title,
    subtitle,
    icon: Icon,
    variant = 'default',
    hoverEffect = true,
    className = '',
    onClick,
    ...props
}) => {
    const variants = {
        default: 'bg-white border border-gray-200',
        elevated: 'bg-white shadow-lg border border-gray-100',
        gradient: 'bg-gradient-to-br from-green-50 to-blue-50 border border-green-100',
        dark: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700',
    };

    const baseStyles = 'rounded-2xl p-6 transition-all duration-300';
    const hoverStyles = hoverEffect ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : '';

    return (
        <motion.div
            whileHover={hoverEffect ? { scale: 1.02 } : {}}
            className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
            onClick={onClick}
            {...props}
        >
            {(title || Icon) && (
                <div className="mb-6">
                    {Icon && (
                        <div className="inline-flex p-3 bg-gradient-to-br from-green-500 to-green-400 rounded-xl mb-4">
                            <Icon className="h-6 w-6 text-white" />
                        </div>
                    )}
                    {title && (
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-gray-600 text-sm">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            {children}
        </motion.div>
    );
};

export default Card;