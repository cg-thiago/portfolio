'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Dialog({ isOpen, onClose, project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!project) return null;

  const images = [
    `${project.slug}-1.jpg`,
    `${project.slug}-2.jpg`,
    `${project.slug}-3.jpg`,
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-4 z-50 overflow-y-auto rounded-lg bg-background p-6 shadow-xl md:inset-8"
          >
            <div className="flex h-full flex-col">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                )}
                <Image
                  src={`/images/projects/${images[currentImageIndex]}`}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  onLoadingComplete={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              </div>

              <div className="mb-6 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsLoading(true);
                    }}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      currentImageIndex === index
                        ? 'bg-primary'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="mb-6">
                <div className="mb-4 flex items-center gap-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                <p className="text-gray-600">{project.description}</p>
              </div>

              {project.technologies && (
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.link && (
                <div className="mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
                  >
                    View Project
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 