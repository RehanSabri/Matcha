"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function AboutMatcha() {
    const containerRef = useRef<HTMLDivElement>(null);

    const steps = [
        {
            title: "SHADE-GROWN",
            description: "Cultivated under specialized covers for weeks before harvest to boost chlorophyll and L-theanine levels.",
        },
        {
            title: "STONE-GROUND",
            description: "Slowly milled using traditional granite stone wheels to preserve the delicate nutrients and vibrant color.",
        },
        {
            title: "BAMBOO WHISKED",
            description: "Authentically prepared to create the signature frothy texture that perfectly suspends in premium dairy.",
        },
    ];

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-black text-white min-h-screen py-32 px-6 md:px-24 overflow-hidden flex flex-col items-center justify-center"
        >
            <div className="max-w-6xl w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20 md:mb-32 text-center md:text-left"
                >
                    <h2 className="text-[#D4E0D1]/60 text-sm md:text-base uppercase tracking-[0.4em] font-light mb-4 md:mb-6">
                        The Craft
                    </h2>
                    <h3 className="text-4xl md:text-7xl font-semibold tracking-tighter leading-none text-white/90">
                        HOW WE MAKE IT
                    </h3>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center md:items-start text-center md:text-left border-t border-[#D4E0D1]/20 pt-8"
                        >
                            <span className="text-[#D4E0D1]/40 text-sm font-mono mb-6">
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <h4 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 text-white/90">
                                {step.title}
                            </h4>
                            <p className="text-[#D4E0D1]/70 font-light leading-relaxed text-sm md:text-base">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer Element */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="mt-32 md:mt-48 w-full flex justify-center"
            >
                <p className="text-[#D4E0D1]/40 text-xs uppercase tracking-[0.3em] font-light">
                    Pure Botanical Energy
                </p>
            </motion.div>
        </section>
    );
}
