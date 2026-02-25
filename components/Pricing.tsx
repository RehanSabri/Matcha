"use client";

import { motion } from "framer-motion";

export default function Pricing() {
    const tiers = [
        {
            name: "The Essentials",
            price: "$24",
            description: "A one-time taste of botanical alchemy.",
            features: [
                "1x Artisanal Iced Matcha Latte",
                "Sustainably sourced from Uji, Japan",
                "Delivered in a chilled glass flask",
                "Includes a tasting guide",
            ],
            buttonText: "Order Now",
            isPopular: false,
        },
        {
            name: "The Ritual",
            price: "$20",
            period: "/week",
            description: "Elevate your daily routine with a recurring infusion.",
            features: [
                "Weekly delivery of 1x Artisanal Latte",
                "Early access to seasonal blends",
                "Complimentary bamboo whisk on first order",
                "Cancel anytime",
            ],
            buttonText: "Subscribe",
            isPopular: true,
        },
    ];

    return (
        <section id="pricing" className="relative bg-black text-white min-h-screen py-32 px-6 md:px-24 flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 md:mb-24 text-center"
                >
                    <h2 className="text-[#D4E0D1]/60 text-sm md:text-base uppercase tracking-[0.4em] font-light mb-4 md:mb-6">
                        Offerings
                    </h2>
                    <h3 className="text-4xl md:text-7xl font-semibold tracking-tighter leading-none text-white/90">
                        CHOOSE YOUR EXPERIENCE
                    </h3>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative flex flex-col p-8 md:p-12 rounded-2xl border transition-colors duration-500
                ${tier.isPopular
                                    ? "bg-[#D4E0D1]/5 border-[#D4E0D1]/40 hover:border-[#D4E0D1]"
                                    : "bg-transparent border-white/10 hover:border-white/30"
                                }`}
                        >
                            {tier.isPopular && (
                                <div className="absolute top-0 right-8 -translate-y-1/2">
                                    <span className="bg-[#D4E0D1] text-black text-xs font-semibold uppercase tracking-wider py-1 px-3 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-8">
                                <h4 className="text-2xl font-medium tracking-tight mb-2 text-white/90">
                                    {tier.name}
                                </h4>
                                <p className="text-[#D4E0D1]/60 text-sm font-light min-h-[40px]">
                                    {tier.description}
                                </p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-5xl md:text-6xl font-light tracking-tighter">
                                    {tier.price}
                                </span>
                                {tier.period && (
                                    <span className="text-[#D4E0D1]/40 text-sm font-light">
                                        {tier.period}
                                    </span>
                                )}
                            </div>

                            <ul className="mb-10 space-y-4 flex-grow">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm text-white/70 font-light">
                                        <svg className="w-5 h-5 text-[#D4E0D1] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-full uppercase tracking-[0.2em] text-xs font-medium transition-all duration-300
                  ${tier.isPopular
                                        ? "bg-[#D4E0D1] text-black hover:bg-white"
                                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30"
                                    }`}
                            >
                                {tier.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
