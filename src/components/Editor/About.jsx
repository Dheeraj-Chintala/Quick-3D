import React from 'react';
import { motion } from 'framer-motion';

const AboutContent = ({ isDesktop }) => {
    // Semantic overrides for Desktop (which uses inverted colors)
    const textPrimary = isDesktop ? 'text-[var(--color-bg-main)]' : 'text-[var(--color-text-primary)]';
    const textSecondary = isDesktop ? 'opacity-80' : 'text-[var(--color-text-secondary)]';
    const borderColor = isDesktop ? 'border-[var(--color-bg-main)]/20' : 'border-[var(--color-border)]';

    return (
        <>
             <div className="mb-12">
                <h3 className={`text-2xl font-bold font-croboto ${textPrimary} mb-6 border-l-4 border-[var(--color-accent)] pl-4`}>
                Tips for Better 3D Output
                </h3>
                <div className={`${textSecondary} leading-relaxed space-y-4`}>
                    <ul className="list-disc pl-5 space-y-2 font-inter italic text-sm tracking-wide">
                        <li><strong className="font-bold">High Contrast </strong> Images with strong separation between light and dark areas work best.</li>
                        <li><strong className="font-bold">Grayscale </strong> Black & White images (depth maps) yield the most predictable results.</li>
                        <li><strong className="font-bold">Simple Shapes </strong> Avoid overly busy textures if you want clean geometry.</li>
                        <li><strong className="font-bold">Resolution </strong> Images around 500x500px provide a good balance of detail and performance.</li>
                    </ul>
                </div>
            </div>


            <div className={`pt-12 border-t ${borderColor} text-center`}>
                <p className={textSecondary}>
                    Developed by <strong className={textPrimary}>Dheeraj Chintala</strong>
                </p>
                <p className={`text-xs ${textSecondary} mt-2 opacity-60`}>
                    © {new Date().getFullYear()} Quick-3D. All rights reserved.
                </p>
            </div>
        </>
    );
};

const About = () => {
    return (
        <section className="w-full relative z-10 md:mt-0">
            {/* Mobile (Card Style) */}
            <div className="md:hidden w-full max-w-5xl mx-auto px-6 py-24">
                 <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-3xl p-8 shadow-2xl">
                    <AboutContent />
                 </div>
            </div>

            {/* Desktop (Full Width Footer Style) */}
            <div className="hidden md:block w-full bg-[var(--color-text-primary)] text-[var(--color-bg-main)] py-24 px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <AboutContent isDesktop={true} />
                </div>
            </div>
        </section>
    );
};

export default About;
