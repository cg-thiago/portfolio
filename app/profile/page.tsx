import React from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-b from-[#EB4700] to-black">
              <Image
                src="/images/avatar.png"
                alt="Thiago Pinto"
                fill
                className="object-cover mix-blend-multiply opacity-90"
                priority
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Thiago Pinto</h1>
            <p className="text-xl text-gray-300 font-semibold">
              Brand & Experience Designer
            </p>
            <p className="text-lg text-gray-400">
              Crafting meaningful brands and user-centered experiences
            </p>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">About Me</h2>
              <p className="text-gray-300 leading-relaxed">
                Designer with 15+ years of experience, currently Head of Design at CasinoGrounds. I lead branding, UI/UX, and product design across platforms — from iGaming to digital tools. My work bridges strategy, tech, and user-focused design.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'GraphQL'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Tools & Others</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'CI/CD', 'Jest', 'Cypress', 'Figma', 'Agile'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Contact</h2>
              <div className="flex gap-4">
                <a
                  href="https://github.com/thiagopinto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/thiagopinto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:hello@thiagopin.to"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 