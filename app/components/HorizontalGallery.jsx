'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function HorizontalGallery({ images }) {
  const galleryRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  
  // Calculate the width needed for the gallery
  const galleryWidth = images.length * 85; // Each image takes ~85vw
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${galleryWidth - 100}vw`]
  );
  
  return (
    <div ref={galleryRef} className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full flex items-center"
        style={{ x }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-full w-[80vw] flex-shrink-0 mx-[2.5vw]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <p className="text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
} 