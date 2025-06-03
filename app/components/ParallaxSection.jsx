import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create different transform values for each layer to move at different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]); // Slowest layer
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Medium speed layer
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]); // Fastest layer
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={ref}
      className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden my-16"
      aria-hidden="true"
    >
      {/* Background layer - slowest moving */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"
        style={{ y: y1 }}
      />
      
      {/* Middle layer with shapes or patterns */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: y2, opacity }}
      >
        <div className="grid grid-cols-3 gap-8 w-full max-w-4xl px-4">
          <motion.div 
            className="aspect-square rounded-full bg-orange-500/20 backdrop-blur-sm"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div 
            className="aspect-square rounded-full bg-blue-500/20 backdrop-blur-sm translate-y-12"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          />
          <motion.div 
            className="aspect-square rounded-full bg-purple-500/20 backdrop-blur-sm"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
        </div>
      </motion.div>
      
      {/* Foreground layer with text - fastest moving */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: y3 }}
      >
        <div className="text-center px-4">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Creating Digital Experiences
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            That balance form and function
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
} 