"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 174;

export default function MatchaCanvasAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false);

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Make the animation reach 100% early (at 70% of scroll).
    // This provides a generous 30% scroll buffer so the spring fully settles
    // and the cup naturally completes its animation LONG before it un-sticks.
    const scrollYProgressClamped = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

    const smoothProgress = useSpring(scrollYProgressClamped, {
        stiffness: 300,
        damping: 40,
        restDelta: 0.001,
    });

    // Preload images
    useEffect(() => {
        let loaded = 0;
        const imgArray: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const num = String(i).padStart(3, "0");
            img.src = `/sequence/matcha/matcha_${num}.webp`;
            img.onload = () => {
                loaded++;
                setLoadedCount(loaded);
                if (loaded === FRAME_COUNT) {
                    setIsReady(true);
                }
            };
            // In case of error, still increment to avoid infinite loading
            img.onerror = () => {
                loaded++;
                setLoadedCount(loaded);
                if (loaded === FRAME_COUNT) {
                    setIsReady(true);
                }
            }
            imgArray.push(img);
        }
        setImages(imgArray);
    }, []);

    // Frame rendering relative to progress
    useEffect(() => {
        if (!isReady || images.length === 0) return;

        let animationFrameId: number;

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;

            const progress = smoothProgress.get();
            let frameIndex = Math.floor(progress * FRAME_COUNT);
            if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;
            if (frameIndex < 0) frameIndex = 0;

            const img = images[frameIndex];
            // Note: img.complete check is implicit since we preloaded, but if onerror fired it might not draw.
            if (!img || !img.width) return;

            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;

            const scale = Math.min(cw / iw, ch / ih);
            const w = iw * scale;
            const h = ih * scale;
            const x = (cw - w) / 2;
            const y = (ch - h) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, x, y, w, h);
        };

        const unsubscribe = smoothProgress.on("change", render);

        // Initial draw and resize handler
        const handleResize = () => {
            if (canvasRef.current) {
                // Adjust canvas resolution handling for high DPI
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                const ctx = canvasRef.current.getContext("2d");
                if (ctx) ctx.scale(dpr, dpr);

                // Logical width/height for CSS
                canvasRef.current.style.width = `${window.innerWidth}px`;
                canvasRef.current.style.height = `${window.innerHeight}px`;

                // Reset canvas context before render because changing width/height resets transform
                if (ctx) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                }

                render();
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // set initial size and draw

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, [isReady, images, smoothProgress]);

    // Text Beat Configs
    // Beat A: 0-20% (Fade in 0-2%, Fade out 18-20%)
    const opacityA = useTransform(smoothProgress, [0, 0.02, 0.18, 0.20], [0, 1, 1, 0]);
    const yA = useTransform(smoothProgress, [0, 0.02, 0.18, 0.20], [20, 0, 0, -20]);

    // Beat B: 25-45%
    const opacityB = useTransform(smoothProgress, [0.25, 0.27, 0.43, 0.45], [0, 1, 1, 0]);
    const yB = useTransform(smoothProgress, [0.25, 0.27, 0.43, 0.45], [20, 0, 0, -20]);

    // Beat C: 50-70%
    const opacityC = useTransform(smoothProgress, [0.50, 0.52, 0.68, 0.70], [0, 1, 1, 0]);
    const yC = useTransform(smoothProgress, [0.50, 0.52, 0.68, 0.70], [20, 0, 0, -20]);

    // Beat D: 75-100%
    const opacityD = useTransform(smoothProgress, [0.75, 0.77, 0.95, 1.0], [0, 1, 1, 1]);
    const yD = useTransform(smoothProgress, [0.75, 0.77, 0.95, 1.0], [20, 0, 0, 0]);

    // Scroll Indicator (fades out by 10%)
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <div ref={containerRef} className="w-full bg-black" style={{ position: 'relative', height: '600vh' }}>
            {/* Loading Overlay */}
            {!isReady && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-[#D4E0D1]">
                    <div className="text-xl md:text-2xl font-light tracking-[0.3em] mb-8">BREWING</div>
                    <div className="w-64 max-w-[80vw] h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#D4E0D1] transition-all duration-300 ease-out"
                            style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Sticky Canvas Container */}
            <div className="w-full flex items-center justify-center overflow-hidden" style={{ position: 'sticky', top: 0, height: '100vh' }}>
                {/* We center the canvas explicitly so the seamless background works universally */}
                <canvas ref={canvasRef} className="block pointer-events-none" />

                {/* Text Beat A */}
                <motion.div
                    style={{ opacity: opacityA, y: yA }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8 text-center"
                >
                    <h1 className="text-white/90 text-7xl md:text-[8rem] leading-none font-semibold tracking-tighter mb-6">
                        BOTANICAL<br />ALCHEMY
                    </h1>
                    <p className="text-[#D4E0D1]/70 text-lg md:text-2xl max-w-2xl font-light">
                        Experience the perfect harmony of shade-grown ceremonial matcha and velvet dairy.
                    </p>
                </motion.div>

                {/* Text Beat B */}
                <motion.div
                    style={{ opacity: opacityB, y: yB }}
                    className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none p-8 md:p-24"
                >
                    <h2 className="text-white/90 text-6xl md:text-8xl font-semibold tracking-tighter mb-6">
                        THE<br />FOUNDATION
                    </h2>
                    <p className="text-[#D4E0D1]/70 text-lg md:text-2xl max-w-xl font-light">
                        A creamy, chilled canvas awaiting the infusion.
                    </p>
                </motion.div>

                {/* Text Beat C */}
                <motion.div
                    style={{ opacity: opacityC, y: yC }}
                    className="absolute inset-0 flex flex-col items-end text-right justify-center pointer-events-none p-8 md:p-24"
                >
                    <h2 className="text-white/90 text-6xl md:text-8xl font-semibold tracking-tighter mb-6">
                        THE<br />DIFFUSION
                    </h2>
                    <p className="text-[#D4E0D1]/70 text-lg md:text-2xl max-w-xl font-light w-full text-right">
                        Watch the vivid green strike the milk, creating complex, dynamic fluid gradients.
                    </p>
                </motion.div>

                {/* Text Beat D */}
                <motion.div
                    style={{ opacity: opacityD, y: yD }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8 text-center"
                >
                    <h2 className="text-white/90 text-7xl md:text-[8rem] leading-none font-semibold tracking-tighter mb-6">
                        TASTE THE CRAFT
                    </h2>
                    <p className="text-[#D4E0D1]/70 text-lg md:text-2xl max-w-2xl font-light mb-12">
                        Masterfully layered. Uncompromisingly bold.
                    </p>
                    <button className="pointer-events-auto border border-[#D4E0D1]/40 text-[#D4E0D1] px-10 py-4 rounded-full hover:bg-[#D4E0D1]/10 hover:border-[#D4E0D1]/60 transition-all uppercase tracking-[0.2em] text-sm">
                        Discover Our Menu
                    </button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none text-[#D4E0D1]/60"
                >
                    <span className="text-xs uppercase tracking-[0.3em] font-light mb-4">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-current to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}
