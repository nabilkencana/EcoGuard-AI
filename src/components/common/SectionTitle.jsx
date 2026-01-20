import { motion } from 'framer-motion';

const SectionTitle = ({
    title,
    subtitle,
    description,
    align = 'center',
    tag,
    tagColor = 'green',
    className = '',
}) => {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto',
    };

    const tagColors = {
        green: 'bg-green-100 text-green-700',
        blue: 'bg-blue-100 text-blue-700',
        purple: 'bg-purple-100 text-purple-700',
        amber: 'bg-amber-100 text-amber-700',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`max-w-3xl ${alignClasses[align]} ${className}`}
        >
            {tag && (
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${tagColors[tagColor]}`}>
                    {tag}
                </span>
            )}

            {title && (
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {title}
                </h2>
            )}

            {subtitle && (
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    {subtitle}
                </h3>
            )}

            {description && (
                <p className="text-xl text-gray-600">
                    {description}
                </p>
            )}
        </motion.div>
    );
};

export default SectionTitle;