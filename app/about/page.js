"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ParallaxSection from "../components/ParallaxSection";
import { InfiniteScrollProvider } from "../components/InfiniteScrollProvider";
import TypewriterHero from '../components/TypewriterHero';
import { usePathname } from 'next/navigation';
import styles from "./ExperienceSection.module.css";
import ExpertiseCarousel from "./ExpertiseCarousel";

const textBlocks = [
  `I'm Thiago Pinto. As a designer who's traveled from the vibrant creative scenes of Brazil to the innovative tech hubs of Europe, I've picked up a unique perspective on what makes design truly impactful.`,
  `Currently, I'm heading up the design team at CasinoGrounds.com, part of LeoVegas/MGM Resorts, where I get to blend my passion for creating meaningful digital experiences with strategic leadership. It's a role that brings together everything I love about design – solving complex problems, crafting intuitive interfaces, and building brands that resonate with people.`,
  `My Journey\nMy journey into design wasn't a straight line. I started in Brazil's advertising industry as an Art Director, where I fell in love with visual storytelling and brand communication. Those early years taught me how powerful design can be when it connects with people emotionally. As my career evolved, I found myself drawn to the strategic side of branding, helping businesses define who they are and how they speak to the world.\nThe shift to UI/UX design felt natural – a way to apply my branding expertise to digital products while learning new skills in interaction design. There's something incredibly satisfying about creating digital experiences that not only look beautiful but actually make people's lives easier or more enjoyable.`,
  `Design Philosophy\nWhat drives me as a designer is the belief that great design goes beyond aesthetics. It solves real problems. It creates meaningful connections. Every project I take on starts with understanding the why – the business objectives, the user needs, the human element behind the screens and interfaces.\nMy approach has been shaped by working across different cultures and markets. From South America to Malta to Spain, I've learned that while design principles may be universal, how people interact with and respond to design varies enormously. This international perspective has become one of my greatest assets, helping me create work that resonates across cultural boundaries.`,
  `Areas of Passion\nI'm particularly passionate about the intersection of branding and digital product design. In today's world, a brand isn't just a logo or a color palette – it's the sum of all interactions people have with your product or service. Creating cohesive experiences that feel consistent and meaningful across all touchpoints is where I thrive.\nWhen I'm not designing, you'll likely find me exploring the beautiful landscapes of Andalusia, camera in hand, or soaking in the rich cultural heritage of Málaga. These experiences away from the screen keep me inspired and bring fresh perspectives to my work.`,
  `Looking Forward\nI believe in continuous learning and evolution. The digital landscape never stops changing, and neither do I. Whether it's staying current with design trends, exploring new technologies, or simply finding better ways to solve problems, I'm committed to growing as a designer and as a leader.\nIf you're looking to elevate your digital product, refresh your brand, or simply connect with a fellow design enthusiast, I'd love to hear from you. Great design happens through collaboration, and I'm always open to new projects and conversations that might lead to creating something meaningful together.\nLet's build something that matters.`
];

const EXPERIENCE_CARDS = [
  {
    company: "CasinoGrounds.com",
    title: "Head of Design",
    period: "2021–Present",
    locations: "Málaga, Spain / Sliema, Malta / Florianópolis, Brazil"
  },
  {
    company: "Altenar",
    title: "Senior Graphic Designer — UI/UX Designer",
    period: "2019–2020",
    locations: "Malta"
  },
  {
    company: "Redorange Image Consultants",
    title: "Senior Graphic Designer",
    period: "2018–2019",
    locations: "Malta"
  },
  {
    company: "Espinafre Comunicadores",
    title: "Brand Strategist",
    period: "2012–2018",
    locations: "Campinas, Brazil"
  },
  {
    company: "TAG Comunicação",
    title: "Senior Art Director",
    period: "2010–2012",
    locations: "Campinas, Brazil"
  },
  {
    company: "Humann Comunicação",
    title: "Art Director",
    period: "2010",
    locations: "Sumaré, Brazil"
  },
  {
    company: "VSCOM / Blancolima / Desafio",
    title: "Art Director",
    period: "2008–2010",
    locations: "Campinas, Brazil"
  },
];

const EXPERTISE_CARDS = [
  {
    title: "Experience Design (UI/UX)",
    description: "Developing intuitive user interfaces, detailed wireframes, UI elements, and engaging micro-interactions to ensure a seamless and cohesive user experience."
  },
  {
    title: "Branding & Strategy",
    description: "Building comprehensive brand identities (including logos, signatures, taglines, and brand books), designing research and brand development methodologies, and offering strategic thought leadership to tackle marketing and brand challenges."
  },
  {
    title: "Graphic Design",
    description: "Producing a wide array of visual assets, promotional materials (video, photography, graphic design), and complete artwork and layouts for both print and digital platforms."
  },
  {
    title: "Design Leadership & Collaboration",
    description: "Managing and guiding design teams, working effectively with cross-functional units including Product Managers, Team Leads, and Software Engineers, and overseeing projects through the entire design cycle from inception to successful completion."
  },
  {
    title: "Strategic Problem-Solving",
    description: "Employing data analysis and creativity to develop effective strategies that resolve complex problems."
  },
];

const PAGE_SIZE = 4;

function TabMenu({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'about', label: 'About' },
    { key: 'expertise', label: 'Key Areas of Expertise' }
  ];
  return (
    <div className="flex justify-center gap-2 mb-4">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`
            relative px-5 py-2 rounded-full font-semibold transition-all duration-200
            ${activeTab === tab.key
              ? 'text-[#eb4700] shadow-lg'
              : 'text-zinc-300 hover:text-[#eb4700]'}
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4700]`
          }
          style={{
            fontFamily: 'Inter, sans-serif',
            boxShadow: activeTab === tab.key
              ? '0 2px 16px 0 rgba(235,71,0,0.10)'
              : undefined
          }}
        >
          {tab.label}
          {activeTab === tab.key && (
            <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2/3 h-1 rounded-full bg-[#eb4700] transition-all" />
          )}
        </button>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const blocksRef = useRef([]);
  const sectionRef = useRef(null);
  const timelineWrapperRef = useRef(null);
  const [bg2Opacity, setBg2Opacity] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Quando o topo da seção 2 começa a aparecer, inicia o fade
      const fadeStart = windowHeight * 0.5;
      const fadeEnd = windowHeight * 0.1;
      let opacity = 0;
      if (rect.top < fadeStart) {
        opacity = Math.min(1, 1 - (rect.top - fadeEnd) / (fadeStart - fadeEnd));
      }
      setBg2Opacity(Math.max(0, Math.min(1, opacity)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Função para scrollar até a segunda seção
  const handleScrollClick = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const visibleExperiences = EXPERIENCE_CARDS.slice(0, visibleCount);
  const hasMore = visibleCount < EXPERIENCE_CARDS.length;

  // Controla gradiente do timeline
  useEffect(() => {
    const wrapper = timelineWrapperRef.current;
    if (!wrapper) return;
    const checkGradient = () => {
      if (wrapper.scrollLeft > 0 || wrapper.scrollWidth > wrapper.offsetWidth + 4) {
        wrapper.classList.add('showGradient');
      } else {
        wrapper.classList.remove('showGradient');
      }
    };
    checkGradient();
    wrapper.addEventListener('scroll', checkGradient);
    window.addEventListener('resize', checkGradient);
    return () => {
      wrapper.removeEventListener('scroll', checkGradient);
      window.removeEventListener('resize', checkGradient);
    };
  }, []);

  return (
    <InfiniteScrollProvider onLoadMore={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, EXPERIENCE_CARDS.length))}>
      <div className="relative w-full min-h-screen overflow-hidden" style={{ background: '#181818' }}>
        {/* Imagens de fundo sobrepostas para crossfade */}
        <img
          src="/about/bg-1.png"
          alt="Background 1"
          className="fixed inset-0 w-full h-full object-cover z-10 select-none pointer-events-none"
          style={{ pointerEvents: 'none', background: '#181818' }}
          onError={e => {
            e.target.style.display = 'none';
            document.body.style.background = '#181818 url(/images/placeholder.jpg) center/cover no-repeat';
            console.log('bg-1.png not found, showing fallback.');
          }}
        />
        <img
          src="/about/bg-2.png"
          alt="Background 2"
          className="fixed inset-0 w-full h-full object-cover z-20 select-none pointer-events-none transition-opacity duration-700"
          style={{ opacity: bg2Opacity, pointerEvents: 'none', background: 'transparent' }}
          onError={e => {
            e.target.style.display = 'none';
            console.log('bg-2.png not found, showing fallback.');
          }}
        />
        <section className="relative w-full h-screen flex items-center justify-center z-30 overflow-hidden">
          {/* Foreground Content */}
          <div
            id="about-hero-content"
            className="relative z-30 flex flex-col items-center justify-center text-center px-4"
          >
            <span className="text-xs md:text-sm tracking-widest uppercase text-white/80 font-semibold mb-6" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              Brand & Experience Designer
            </span>
            <h1
              className="text-center font-gasoek text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase leading-tight text-[#EB4700] whitespace-pre-line mb-2 sm:mb-4 drop-shadow-lg max-w-2xl md:max-w-3xl break-words px-2 mx-auto"
              style={{ letterSpacing: 'normal' }}
            >
              Designing with Purpose:<br />Branding, Experience, and Innovation
            </h1>
            <p
              className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 text-center max-w-xl md:max-w-2xl mx-auto break-words px-2 md:px-4 overflow-hidden"
              style={{ lineHeight: 1.7 }}
            >
              I'm Thiago Pinto, a multidisciplinary designer currently based in Florianópolis, Brazil. I am driven by a passion for creating meaningful experiences through design. My core expertise lies in <b>#branding</b>, <b>#experiencedesign</b>, and <b>#graphicdesign</b>, and I thrive on transforming complex challenges into solutions that are not only intuitive and impactful but also aesthetically engaging.
            </p>
            {/* Scroll Indicator */}
            <button
              type="button"
              onClick={handleScrollClick}
              className="flex flex-col items-center mt-4 animate-bounce focus:outline-none group"
              aria-label="Scroll to about section"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                <path d="M16 8V24" stroke="#EB4700" strokeWidth="3" strokeLinecap="round"/>
                <path d="M10 18L16 24L22 18" stroke="#EB4700" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs text-white/80 mt-1 tracking-widest uppercase">Scroll</span>
            </button>
          </div>
        </section>

        {/* Second Section: About Text Blocks */}
        <section
          ref={sectionRef}
          className="relative w-full min-h-[400px] flex flex-col items-center justify-center z-20 pt-16"
        >
          <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'about' && (
            <div className="relative z-30 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl w-full items-start justify-center">
              {/* Coluna 1 */}
              <div className="flex flex-col gap-8 min-w-0">
                {[ 
                  "I craft meaningful design experiences by blending user needs with business goals, solving complex challenges through creativity, data, and collaboration. And yes, if my ideas occasionally seem 'out there,' it's often just the \"crazy stuff\" in my mind igniting innovative sparks!",
                  "My journey features six foundational years at Espinafre Comunicadores in Campinas, São Paulo, Brazil, as Co-founder, Brand Strategist, and UI/UX Designer. There, I led a team on impactful branding projects, pioneered research methodologies, and used data-driven creativity to become a trusted strategic partner."
                ].map((text, i) => (
                  <div
                    key={i}
                    ref={el => blocksRef.current[i] = el}
                    className="text-gray-200 text-base md:text-lg leading-relaxed font-light whitespace-pre-line break-words max-w-2xl mx-auto max-w-full px-2 overflow-hidden"
                    style={{ fontFamily: 'Inter Tight, sans-serif' }}
                  >
                    {text}
                  </div>
                ))}
              </div>
              {/* Coluna 2 */}
              <div className="flex flex-col gap-8 min-w-0">
                {[
                  "Earlier, as Lead Designer at Tagom, I managed full design cycles for diverse online and print projects.",
                  "Currently, as Head of Design at CasinoGrounds (LeoVegas Group), operating between Malta and Spain, I lead a talented design team to deliver cohesive user experiences – from initial concept to engaging micro-interactions. Working closely with Product, Engineering, and Team Leads, we implement and iterate on features that uphold high-quality standards and drive our broader business goals.",
                  "My international experience in Malta further honed my skills. As a Senior Graphic Designer and UI/UX Designer at Altenar, I delivered cross-media branding, marketing, and UI projects for a global sportsbook. At Redorange Image Consultants, I produced a wide range of marketing materials and dynamic website designs."
                ].map((text, i) => (
                  <div
                    key={i}
                    ref={el => blocksRef.current[i + 2] = el}
                    className="text-gray-200 text-base md:text-lg leading-relaxed font-light whitespace-pre-line break-words max-w-2xl mx-auto max-w-full px-2 overflow-hidden"
                    style={{ fontFamily: 'Inter Tight, sans-serif' }}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'expertise' && (
            <div className="w-full flex justify-center">
              <ExpertiseCarousel showEdgeArrows />
            </div>
          )}
        </section>

        {/* Experience Section */}
        <section className="relative w-full py-20 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-200 mb-16 text-center tracking-tight">Experience</h2>
            <div className={styles.timelineHorizontalWrapper} ref={timelineWrapperRef}>
              <div className={styles.timelineHorizontalLine} />
              <div className={styles.timelineHorizontal}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 max-w-4xl mx-auto justify-center">
                  {EXPERIENCE_CARDS.map((exp, idx) => (
                    <div key={exp.title + exp.period} className={styles.timelineCard + ' ' + (idx === 0 ? styles.timelineCardActive : idx % 2 === 0 ? styles.timelineCardEven : styles.timelineCardOdd)}>
                      <div className={styles.timelineNode} />
                      <div className={styles.timelineCardContent}>
                        <div className={styles.timelineTitle}>{exp.title}</div>
                        <div className={styles.timelineMeta}>
                          <span className={styles.timelineCompany}>{exp.company}</span>
                          <span className={styles.timelinePeriod}>{exp.period}</span>
                          <span className={styles.timelineLocation}>{exp.locations}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </InfiniteScrollProvider>
  );
} 