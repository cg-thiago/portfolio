'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ProjectHero({ project }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  
  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <p className="text-lg mb-2 opacity-90">{project.category}</p>
          <h1 className="text-4xl md:text-6xl font-bold">{project.title}</h1>
        </div>
      </div>
    </div>
  );
} 