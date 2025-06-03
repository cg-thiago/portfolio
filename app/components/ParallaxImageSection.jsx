"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxImageSection({ src, alt, caption }) {
  const ref = useRef(null);
  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Parallax: move image slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          priority={false}
          unoptimized={src.endsWith('.gif')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </motion.div>
      {caption && (
        <div className="relative z-10 max-w-2xl mx-auto p-8 text-center">
          <span className="inline-block bg-black/60 text-white text-lg md:text-2xl px-6 py-3 rounded-xl font-medium shadow-lg">
            {caption}
          </span>
        </div>
      )}
    </section>
  );
} 