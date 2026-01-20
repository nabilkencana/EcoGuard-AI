import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const Home = () => {
    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <Benefits />
            <Testimonials />
            <CTASection />
        </>
    );
};

export default Home;