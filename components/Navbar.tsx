"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 md:top-8 left-0 w-full px-6 md:px-12 flex items-center justify-between z-[100] pointer-events-none"
        >
            {/* Left Logo */}
            <div className="pointer-events-auto">
                <Link href="/" className="text-white hover:text-white/80 transition-colors text-xl md:text-2xl font-serif tracking-[0.25em] font-light">
                    MATCHA
                </Link>
            </div>

            {/* Right Pill */}
            <div className="pointer-events-auto flex items-center gap-6 md:gap-8 bg-[#1e1e1e] backdrop-blur-md rounded-full p-1.5 pl-6 md:pl-8 border border-white/5 shadow-2xl">
                <div className="hidden lg:flex items-center gap-6 text-gray-300 text-sm font-medium tracking-wide">
                    <Link href="#about" className="hover:text-white transition-colors duration-300">About me</Link>
                    <Link href="#performance" className="hover:text-white transition-colors duration-300">Performance</Link>
                    <Link href="#projects" className="hover:text-white transition-colors duration-300">Projects</Link>
                </div>
                <Link href="#contact" className="bg-[#5EEAD4] hover:bg-[#4ddbd5] text-black text-sm font-medium px-8 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(94,234,212,0.4)]">
                    contact
                </Link>
            </div>
        </motion.nav>
    );
}
