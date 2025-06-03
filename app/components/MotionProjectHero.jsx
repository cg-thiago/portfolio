"use client";
import { motion } from 'framer-motion';

export default function MotionProjectHero({ title, projectType, client, year, description, ORANGE }) {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
        style={{ color: ORANGE }}
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-lg md:text-2xl font-medium text-white/90 mb-2"
        role="doc-subtitle"
      >
        {projectType && <span>{projectType} · </span>}
        {client && <span>{client} · </span>}
        {year && <span>{year}</span>}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-2xl md:text-3xl leading-relaxed font-light mb-10 relative"
      >
        {description}
      </motion.p>
    </>
  );
} 