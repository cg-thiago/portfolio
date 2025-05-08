"use client";
import Image from 'next/image'
import VideoOverlay from './components/VideoOverlay'
import Toolbar from './components/Toolbar'
import Grid from './components/Grid'
import HeroVideo from './components/HeroVideo'
import { useMemo, useRef } from 'react'
import { useToolbar } from './components/ToolbarContext'

const VIDEOS = [
  {
    src: '/images/freediving.webm',
    call: 'Design is the surface.\nExperience is\nthe story beneath it.'
  },
  {
    src: '/images/cinemagraph.webm',
    call: 'When nothing distracts,\neverything speaks.'
  },
  {
    src: '/images/abstract-screens.webm',
    call: "Abstraction isn't lack of clarity.\nIt's a different kind.."
  },
  {
    src: '/images/retro.webm',
    call: "Design isn't bound by time.\nJust tuned to emotion."
  }
]

export default function Home() {
  const { src, call } = useMemo(() => {
    const idx = Math.floor(Math.random() * VIDEOS.length)
    return VIDEOS[idx]
  }, [])
  const gridRef = useRef(null)
  const { setHoverText, getFeedbackText } = useToolbar();

  // Parallax effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const hero = document.getElementById('hero-section')
      const video = document.getElementById('hero-video')
      if (hero && video) {
        const scrollY = window.scrollY
        video.style.transform = `translateY(${scrollY * 0.25}px)`
      }
    })
  }

  // Função de scroll suave com easing
  function smoothScrollTo(targetY, duration = 900) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start = null;
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, startY + diff * ease);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  const handleScrollToGrid = () => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - 24; // ajuste para respiro
      smoothScrollTo(targetY);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black">
      {/* Hero Section */}
      <section id="hero-section" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Parallax Video Background */}
        <div className="absolute inset-0 z-0 bg-black pointer-events-none will-change-transform">
          <HeroVideo src={src} />
          <VideoOverlay />
        </div>
        {/* Hero Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
          <h1 className="text-center font-gasoek text-[52px] font-normal uppercase leading-normal text-[#EB4700] md:text-4xl [font-family:var(--font-gasoek)] whitespace-pre-line mb-8">
            {call}
          </h1>
          {/* Texto pequeno abaixo do call e acima da seta */}
          <p className="text-xs md:text-sm text-gray-300 mb-4 text-center max-w-md">
            Design is how I explore, connect, and simplify. I'm Thiago, and this is my space to shape ideas.
          </p>
          {/* Down Arrow logo abaixo do texto */}
          <button
            onClick={handleScrollToGrid}
            className="mt-8 z-20 animate-bounce bg-black/60 rounded-full p-3 border border-white/10 hover:bg-black/80 transition"
            aria-label="Scroll to portfolio grid"
            onMouseEnter={() => { setHoverText(''); setTimeout(() => setHoverText(getFeedbackText('home-hero-arrow')), 10); }}
            onMouseLeave={() => setHoverText('')}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
          </button>
        </div>
      </section>

      {/* Grid Section abaixo da hero */}
      <section ref={gridRef} className="relative z-10 w-full max-w-4xl mx-auto mt-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">You're in Control.</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-2xl">
          Drag. Drop. Resize. This portfolio adapts to your perspective — because good design puts the user in charge.
        </p>
        <Grid />
      </section>

      {/* Toolbar */}
      <Toolbar />
    </main>
  )
} 