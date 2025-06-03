'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, onClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:shadow-xl"
      onClick={() => onClick(project)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        {!imageError ? (
          <Image
            src={`/images/projects/${project.slug}-thumb.jpg`}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">Image not available</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex h-full flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-2 text-sm text-gray-200">{project.category}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{project.year}</span>
            <span className="text-sm font-medium text-white">View Project</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 