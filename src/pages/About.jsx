import { motion } from 'framer-motion';
import { Target, Users, Award, Globe, Linkedin, Mail, Github, Twitter , InstagramIcon} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/common/Card';

const About = () => {
    const values = [
        {
            icon: Target,
            title: 'Mission',
            description: 'Mengoptimalkan penggunaan sumber daya melalui teknologi AI untuk keberlanjutan lingkungan.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Users,
            title: 'Collaboration',
            description: 'Bekerja sama dengan semua pemangku kepentingan untuk dampak yang lebih besar.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'Memberikan solusi terbaik dengan standar kualitas tertinggi.',
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: Globe,
            title: 'Sustainability',
            description: 'Berkomitmen pada pembangunan berkelanjutan dan pelestarian lingkungan.',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    const milestones = [
        { year: '13 Januari 2026', event: 'Riset & Development' },
        { year: '15 Januari 2026', event: 'Launch Beta Version' },
        { year: '17 Januari 2026', event: 'Implementation' },
        { year: '20 Januari 2026', event: 'BluePrint IOT' },
        { year: '24 Januari 2026', event: 'Eco-Innovation Competition' },
    ];

    // Data team dengan path gambar dan social media
    const teamMembers = [
        {
            name: 'M. Nabil Anwar K.',
            role: 'Developer dan Project Manager',
            description: 'Membuat website dan aplikasi, Logika dan implementasi',
            image: '/images/team/nabil.jpeg',
            color: 'from-green-400 to-emerald-500',
            social: {
                linkedin: 'https://linkedin.com/in/nabilkencana',
                github: 'https://github.com/nabilkencana',
                Instagram: 'https://www.instagram.com/nabill.anwr',
                email: 'nabilkencana20@gmail.com'
            }
        },
        {
            name: 'Risky Nabil Pahlevi',
            role: 'QA Website',
            description: 'Pengetesan website dan quality assurance',
            image: '/images/team/risky.JPEG',
            color: 'from-blue-400 to-cyan-500',
            social: {
                linkedin: 'https://www.linkedin.com/in/nabil-risky-ba1904387',
                github: 'https://github.com/RiskyNabil213',
                Instagram: 'https://www.instagram.com/risky_nblp',
                email: 'nabilrisky390@gmail.com'
            }
        },
        {
            name: 'Styven Dwi Nugroho',
            role: 'Pemantapan Ide',
            description: 'Penyempurnaan Ide dan Pengembangan konsep awal',
            image: '/images/team/steven.jpeg',
            color: 'from-purple-400 to-pink-500',
            social: {
                linkedin: 'https://www.linkedin.com/in/styven-dwinugrohro-615810383',
                github: 'https://github.com/Styvenn',
                Instagram: 'https://www.instagram.com/svndyr',
                email: 'styvendwi123098@gmail.com'
            }
        },
        {
            name: 'Nauval Luthf Hisyam',
            role: 'Developer IOT',
            description: 'Pembuatan prototype IOT dan Pembuatan blueprint IOT',
            image: '/images/team/nopal.jpg',
            color: 'from-orange-400 to-red-500',
            social: {
                linkedin: 'https://www.linkedin.com/in/nauval-faiz-0b1436339',
                github: 'https://github.com/NauvalFaiz',
                Instagram: 'https://www.instagram.com/nfaix',
                email: 'nauvalfaizluthfhisyam33@gmail.com'
            }
        },
        {
            name: 'Elzidane Ardyansyah',
            role: 'QA Application',
            description: 'Pengetesan aplikasi EcoGuard',
            image: '/images/team/zidan.jpeg',
            color: 'from-amber-400 to-yellow-500',
            social: {
                linkedin: 'https://www.linkedin.com/in/zidane-ardyansyah-988006348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
                github: 'https://github.com/elzidane',
                Instagram: 'https://www.instagram.com/_elzdne',
                email: 'elzidaneardyansyah265@gmail.com'
            }
        },
    ];

    // Component untuk social media icons
    const SocialIcon = ({ type, url }) => {
        const icons = {
            linkedin: {
                icon: Linkedin,
                color: 'hover:bg-blue-100 hover:text-blue-600',
                tooltip: 'LinkedIn'
            },
            github: {
                icon: Github,
                color: 'hover:bg-gray-900 hover:text-white',
                tooltip: 'GitHub'
            },
            twitter: {
                icon: Twitter,
                color: 'hover:bg-sky-100 hover:text-sky-600',
                tooltip: 'Twitter'
            },
            email: {
                icon: Mail,
                color: 'hover:bg-red-100 hover:text-red-600',
                tooltip: 'Email'
            },
            Instagram: {
                icon: InstagramIcon,
                color: 'hover:bg-red-100 hover:text-red-600',
                tooltip: 'Instagram'
            }
        };

        const { icon: Icon, color, tooltip } = icons[type] || { icon: null, color: '', tooltip: '' };

        if (!Icon) return null;

        return (
            <a
                href={type === 'email' ? `mailto:${url}` : url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300 transform hover:scale-110 ${color} group relative`}
                title={tooltip}
            >
                <Icon className="h-4 w-4" />
                {/* Tooltip */}
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {tooltip}
                </span>
            </a>
        );
    };

    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-20">
                <div className="max-w-4xl mx-auto">
                    <SectionTitle
                        title1="Tentang EcoGuard AI"
                        subtitle="Inovasi untuk Masa Depan Berkelanjutan"
                        description="EcoGuard AI adalah solusi revolusioner yang menggabungkan kecerdasan buatan dengan monitoring lingkungan untuk menciptakan dunia yang lebih hijau dan efisien."
                        align="center"
                        tag="Our Story"
                    />
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="container mx-auto px-4 mb-20">
                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card
                            title="Visi Kami"
                            variant="gradient"
                            className="h-full"
                        >
                            <p className="text-lg text-gray-700 mb-6">
                                Menjadi pemimpin global dalam solusi teknologi untuk efisiensi sumber daya dan keberlanjutan lingkungan.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Transformasi digital sektor energi',
                                    'Pengurangan emisi karbon global',
                                    'Edukasi dan kesadaran lingkungan',
                                    'Inovasi berkelanjutan',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card
                            title="Misi Kami"
                            variant="gradient"
                            className="h-full"
                        >
                            <p className="text-lg text-gray-700 mb-6">
                                Mengembangkan dan mengimplementasikan solusi berbasis AI yang membantu organisasi mencapai efisiensi sumber daya maksimal.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: '30%', label: 'Target Efisiensi' },
                                    { value: '100+', label: 'Klien' },
                                    { value: '40%', label: 'Pengurangan Air' },
                                    { value: '95%', label: 'Kepuasan Klien' },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center p-4 bg-green-50 rounded-xl">
                                        <div className="text-2xl font-bold text-green-700">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Our Values */}
            <section className="container mx-auto px-4 mb-20">
                <SectionTitle
                    title="Nilai-Nilai Kami"
                    align="center"
                    className="mb-12"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                icon={value.icon}
                                title={value.title}
                                className="text-center h-full"
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                                    <value.icon className="h-8 w-8 text-white" />
                                </div>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="container mx-auto px-4 mb-20">
                <SectionTitle
                    title="Perjalanan Kami"
                    align="center"
                    className="mb-12"
                />

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-blue-400" />

                    {/* Milestones */}
                    <div className="relative">
                        {milestones.map((milestone, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className={`flex items-center mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                                >
                                    <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12'}`}>
                                        <Card
                                            className="relative"
                                            hoverEffect={false}
                                        >
                                            <div className={`absolute top-1/2 transform -translate-y-1/2 ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
                                                } w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 border-4 border-white`} />
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {milestone.year}
                                            </h3>
                                            <p className="text-gray-600">
                                                {milestone.event}
                                            </p>
                                        </Card>
                                    </div>
                                    <div className="w-1/2" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container mx-auto px-4">
                <SectionTitle
                    title="Tim di Balik EcoGuard AI"
                    subtitle="Para Ahli yang Berdedikasi"
                    align="center"
                    className="mb-12"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="text-center group hover:shadow-xl transition-all duration-300 p-6">
                                {/* Gambar Team Member */}
                                <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:shadow-xl">
                                    {/* Fallback gradient jika gambar tidak ada */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} group-hover:scale-110 transition-transform duration-500`} />

                                    {/* Gambar asli */}
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />

                                    {/* Overlay efek hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                                </div>

                                {/* Info Team Member */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-green-600 font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-sm mb-6">
                                    {member.description}
                                </p>

                                {/* Social Media Icons */}
                                <div className="mt-4 flex justify-center space-x-3">
                                    {Object.entries(member.social).map(([platform, url]) => (
                                        <SocialIcon
                                            key={platform}
                                            type={platform}
                                            url={url}
                                        />
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;