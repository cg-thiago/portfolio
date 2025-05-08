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

  // Parallax effect + zoom
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const hero = document.getElementById('hero-section')
      const video = document.getElementById('hero-video')
      if (hero && video) {
        const scrollY = window.scrollY
        if (window.innerWidth >= 1024) {
          const scale = 1 + Math.min(scrollY / 1800, 0.22)
          video.style.transform = `translateY(${scrollY * 0.25}px) scale(${scale})`
        } else {
          video.style.transform = `translateY(${scrollY * 0.25}px) scale(1)`
        }
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
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black" role="main">
      {/* Hero Section */}
      <section id="hero-section" className="relative w-full min-h-[55vh] lg:min-h-screen flex flex-col items-center justify-start lg:justify-center pt-8 pb-4 sm:pt-16 sm:pb-8 lg:pt-0 lg:pb-0 overflow-hidden px-2 sm:px-4 md:px-8">
        {/* Parallax Video Background */}
        <div className="absolute inset-0 z-0 bg-black pointer-events-none will-change-transform h-full w-full">
          <HeroVideo src={src} />
          <VideoOverlay />
        </div>
        {/* Hero Text */}
        <div className="relative z-10 flex flex-col items-center w-full px-2 sm:px-4 h-full justify-center">
          <h1 className="text-center font-gasoek text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase leading-tight text-[#EB4700] whitespace-pre-line mb-2 sm:mb-6 drop-shadow-xl">
            {call}
          </h1>
          {/* Texto pequeno abaixo do call e acima da seta */}
          <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-2 sm:mb-4 text-center max-w-xs sm:max-w-md">
            Design is how I explore, connect, and simplify. I'm Thiago, and this is my space to shape ideas.
          </p>
          {/* Down Arrow logo abaixo do texto */}
          <button
            onClick={handleScrollToGrid}
            className="mt-4 sm:mt-8 z-20 animate-bounce bg-black/70 rounded-full p-4 sm:p-3 border border-white/10 hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-[#EB4700] focus:ring-offset-2"
            aria-label="Scroll to portfolio grid"
            tabIndex={0}
            onMouseEnter={() => { setHoverText(''); setTimeout(() => setHoverText(getFeedbackText('home-hero-arrow')), 10); }}
            onMouseLeave={() => setHoverText('')}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            <span className="sr-only">Ver portfólio</span>
          </button>
        </div>
      </section>

      {/* Grid Section abaixo da hero */}
      <section ref={gridRef} className="relative z-10 w-full max-w-4xl mx-auto mt-8 sm:mt-16 flex flex-col items-center px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-center">You're in Control.</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 text-center max-w-xs sm:max-w-xl md:max-w-2xl">
          Drag. Drop. Resize. This portfolio adapts to your perspective — because good design puts the user in charge.
        </p>
        <Grid />
      </section>
    </main>
  )
} 