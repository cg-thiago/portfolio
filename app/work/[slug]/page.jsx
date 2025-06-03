import { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageWithFallback from "../../components/ImageWithFallback";
import { Badge } from "../../components/ui/badge";
import dynamic from 'next/dynamic';
import ProjectHorizontalGallery from '../../components/ProjectHorizontalGallery';
import ParallaxImageSection from "../../components/ParallaxImageSection";
import Script from 'next/script';
import ErrorBoundary from '../../components/ErrorBoundary';
import MotionProjectHero from '../../components/MotionProjectHero';
import { projectsData } from '../../data/projects';

const ORANGE = "#FF6600";

export async function generateMetadata({ params }) {
  const project = projectsData.find(p => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | Thiago Pinto',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | Thiago Pinto`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Thiago Pinto`,
      description: project.description,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Thiago Pinto`,
      description: project.description,
      images: [project.heroImage],
    },
  };
}

export default function ProjectPage({ params }) {
  const project = projectsData.find(p => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": project.heroImage,
    "datePublished": project.year,
    "author": {
      "@type": "Person",
      "name": "Thiago Pinto"
    },
    "keywords": project.tags?.join(', '),
    "about": {
      "@type": "Thing",
      "name": project.projectType
    },
    "client": project.client,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://thiagopin.to/work/${project.slug}`
    }
  };

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-black text-white">
        <Script
          id="project-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-end" role="banner" aria-label={`${project.title} hero section`}>
          <ImageWithFallback
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover object-center z-0"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10 z-10" aria-hidden="true" />
          <div className="relative z-20 flex flex-col items-center justify-center p-8 md:p-16 max-w-3xl w-full">
            {/* Imagem Enemed x The Travellers no topo */}
            {project.slug === 'enemed-travellers' && (
              <div className="w-full flex justify-center mb-8">
                <img
                  src="/projects/enemed/1.png"
                  alt="Enemed x The Travellers logo"
                  className="max-w-[480px] w-full h-auto object-contain"
                  style={{ background: 'transparent' }}
                />
              </div>
            )}
            <MotionProjectHero
              title={project.title}
              projectType={project.projectType}
              client={project.client}
              year={project.year}
              description={project.description}
              ORANGE={ORANGE}
            />
          </div>
        </section>

        {/* INTRO / DESCRIPTION */}
        <section className="max-w-2xl mx-auto px-4 py-12 md:py-20" role="region" aria-label="Project description">
          <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Project tags">
            {project.tags?.map(tag => (
              <span key={tag} className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium" role="listitem">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* CHALLENGE & GOALS */}
        {(project.challenge || project.goals) && (
          <section className="max-w-2xl mx-auto px-4 py-8 border-l-4" style={{ borderColor: ORANGE }} role="region" aria-label="Challenge and goals">
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: ORANGE }}>Challenge & Goals</h2>
            {project.challenge && <p className="mb-2 text-white/90 text-lg">{project.challenge}</p>}
            {project.goals && (
              <ul className="list-disc list-inside text-white/80 text-base ml-4" role="list">
                {project.goals.map((goal, i) => <li key={i} role="listitem">{goal}</li>)}
              </ul>
            )}
          </section>
        )}

        {/* GALLERY / VISUAL DESIGN */}
        {project.visualDesign?.length > 0 && (
          <section className="w-full p-0 m-0" role="region" aria-label="Visual design gallery">
            {project.visualDesign.map((img, i) => (
              <ParallaxImageSection
                key={img}
                src={img}
                alt={`Visual ${i + 1}`}
                caption={project.visualDesignCaptions?.[i]}
              />
            ))}
          </section>
        )}

        {/* PROCESS, SOLUTION, OUTCOMES */}
        <section className="max-w-2xl mx-auto px-4 py-12 grid gap-10" role="region" aria-label="Process, solution, and outcomes">
          {project.process && (
            <div className="bg-white/5 rounded-xl p-6 border-l-4" style={{ borderColor: ORANGE }} role="article">
              <h3 className="text-lg font-bold mb-2" style={{ color: ORANGE }}>Process</h3>
              <p className="text-white/90">{project.process}</p>
            </div>
          )}
          {project.solution && (
            <div className="bg-white/5 rounded-xl p-6 border-l-4" style={{ borderColor: ORANGE }} role="article">
              <h3 className="text-lg font-bold mb-2" style={{ color: ORANGE }}>Solution</h3>
              <p className="text-white/90">{project.solution}</p>
            </div>
          )}
          {(project.outcomes?.length > 0 || project.learnings?.length > 0) && (
            <div className="bg-white/5 rounded-xl p-6 border-l-4" style={{ borderColor: ORANGE }} role="article">
              <h3 className="text-lg font-bold mb-2" style={{ color: ORANGE }}>Outcomes & Learnings</h3>
              {project.outcomes?.length > 0 && (
                <ul className="list-disc list-inside text-white/80 mb-2 ml-4" role="list">
                  {project.outcomes.map((o, i) => <li key={i} role="listitem">{o}</li>)}
                </ul>
              )}
              {project.learnings?.length > 0 && (
                <ul className="list-disc list-inside text-white/60 ml-4" role="list">
                  {project.learnings.map((l, i) => <li key={i} role="listitem">{l}</li>)}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* FINAL DESIGNS / GALLERY */}
        {project.finalDesigns?.length > 0 && (
          <section className="w-full py-16 px-0 md:px-8" role="region" aria-label="Final designs gallery">
            <h2 className="text-xl md:text-2xl font-bold mb-6 px-4" style={{ color: ORANGE }}>Final Designs</h2>
            <div className="overflow-x-auto hide-scrollbar" role="list" aria-label="Final design images">
              <div className="flex gap-8 px-4">
                {project.finalDesigns.map((img, i) => (
                  <div
                    key={img}
                    className="relative min-w-[340px] max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black/40 flex-shrink-0"
                    role="listitem"
                  >
                    <ImageWithFallback 
                      src={img} 
                      alt={`Final Design ${i + 1}`} 
                      fill 
                      className="object-cover" 
                      unoptimized={img.endsWith('.gif')}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TESTIMONIAL */}
        {project.testimonial && (
          <section className="max-w-2xl mx-auto px-4 py-12" role="region" aria-label="Testimonial">
            <blockquote className="italic text-xl md:text-2xl text-white/90 border-l-4 pl-6" style={{ borderColor: ORANGE }}>
              <span className="text-4xl font-bold mr-2" style={{ color: ORANGE }} aria-hidden="true">&ldquo;</span>
              {project.testimonial}
            </blockquote>
          </section>
        )}
      </main>
    </ErrorBoundary>
  );
} 