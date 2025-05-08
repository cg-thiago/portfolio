import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { initialCards } from '../../data/initialCards';

interface ProjectPageProps {
  params: {
    project: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = initialCards.find(card => card.id === params.project);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-sm text-gray-400 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline text-gray-200">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/work" className="hover:underline text-gray-200">Work</Link>
        <span className="mx-1">/</span>
        <span className="text-white font-semibold">{project.title}</span>
      </nav>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
          <p className="text-xl text-gray-300">{project.description}</p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Project Overview</h2>
            <div className="prose prose-invert max-w-none">
              {project.id === 'casinogrounds' && (
                <>
                  <p>
                    CasinoGrounds is a comprehensive platform that revolutionizes the casino game development
                    industry by providing developers with a complete suite of tools and resources. The platform
                    streamlines the entire development lifecycle, from initial concept to final deployment.
                  </p>
                  <h3>Key Features</h3>
                  <ul>
                    <li>Advanced game development SDK with TypeScript support and comprehensive documentation</li>
                    <li>Automated testing and certification tools ensuring compliance with industry standards</li>
                    <li>Real-time analytics dashboard for tracking game performance and player engagement</li>
                    <li>Integrated developer community with forums, knowledge base, and support system</li>
                    <li>Automated deployment pipeline with version control and rollback capabilities</li>
                  </ul>
                  <h3>Impact</h3>
                  <p>
                    Since its launch, CasinoGrounds has helped developers reduce their time-to-market by 60%
                    and has become the go-to platform for casino game development, hosting over 500 active
                    games and serving more than 100 development studios worldwide.
                  </p>
                </>
              )}

              {project.id === 'casinoscores' && (
                <>
                  <p>
                    CasinoScores is a cutting-edge analytics platform that provides real-time insights into
                    casino game performance and player behavior. The platform helps operators make data-driven
                    decisions to optimize their game offerings and maximize player engagement.
                  </p>
                  <h3>Key Features</h3>
                  <ul>
                    <li>Real-time game statistics with customizable dashboards and reporting tools</li>
                    <li>Advanced player behavior analytics with machine learning-powered insights</li>
                    <li>Comprehensive performance monitoring with automated alerts and recommendations</li>
                    <li>Custom reporting tools with export capabilities and API integration</li>
                    <li>Multi-tenant architecture supporting multiple casino operators</li>
                  </ul>
                  <h3>Impact</h3>
                  <p>
                    CasinoScores has helped operators increase player retention by 40% and optimize their
                    game selection, resulting in a 25% increase in revenue. The platform currently processes
                    over 1 billion game events daily and serves major casino operators across multiple
                    jurisdictions.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.id === 'casinogrounds' && (
                <>
                  {[
                    'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS',
                    'GraphQL', 'Redis', 'Jest', 'Cypress', 'Terraform', 'Kubernetes'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </>
              )}

              {project.id === 'casinoscores' && (
                <>
                  {[
                    'Next.js', 'TypeScript', 'GraphQL', 'MongoDB', 'Redis', 'Kubernetes',
                    'Python', 'TensorFlow', 'Docker', 'AWS', 'Terraform', 'Prometheus'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">My Role</h2>
            <div className="prose prose-invert max-w-none">
              {project.id === 'casinogrounds' && (
                <p>
                  As the lead developer, I architected and implemented the core platform infrastructure,
                  including the SDK, testing framework, and deployment pipeline. I also led a team of
                  5 developers, established coding standards, and implemented CI/CD practices that
                  significantly improved development efficiency and code quality.
                </p>
              )}

              {project.id === 'casinoscores' && (
                <p>
                  I served as the technical lead, responsible for designing the real-time analytics
                  architecture and implementing the machine learning models for player behavior
                  analysis. I also developed the multi-tenant infrastructure and led the integration
                  with various casino operators' systems.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 