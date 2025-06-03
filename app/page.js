"use client";
import Image from 'next/image'
import VideoOverlay from './components/VideoOverlay'
import Grid from './components/Grid'
import HeroJumpTypewriter from './components/HeroJumpTypewriter'
import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import TypewriterHero from './components/TypewriterHero'
import FloatingToolbar from './components/FloatingToolbar'
import NavigationOverlay from './components/NavigationOverlay'
import dynamic from 'next/dynamic'

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

const FONTS = [
  'var(--font-gasoek)',
  'var(--font-inter)',
  'Roboto Mono, monospace',
  'Orbitron, sans-serif',
  'Indie Flower, cursive',
];

const VIDEO_SRC = '/images/freediving.webm';

export default function Home() {
  const [videoIdx, setVideoIdx] = useState(0);
  const router = useRouter();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  // Memoize video source to prevent unnecessary re-renders
  const src = useMemo(() => VIDEOS[videoIdx].src, [videoIdx]);

  // Handle scroll to work page
  useEffect(() => {
    let triggered = false;
    function handleScroll() {
      if (!triggered && window.scrollY > 30) {
        triggered = true;
        router.push('/work');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  // Atalhos de teclado
  const handleKeyDown = useCallback((e) => {
    if (e.key.toLowerCase() === 'h') {
      router.push('/');
    }
    if (e.key.toLowerCase() === 'w') {
      router.push('/work');
    }
    if (e.key.toLowerCase() === 'a') {
      router.push('/about');
    }
    if (e.key.toLowerCase() === 'b') {
      window.open('https://cal.com/thiagopinto', '_blank');
    }
    if (e.key.toLowerCase() === 'l') {
      window.open('https://www.linkedin.com/in/thiagopinto/', '_blank');
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background video ocupa a tela toda */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-fallback.jpg"
        className="fixed inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 z-0 pointer-events-none"
      >
        <source src={VIDEO_SRC} type="video/webm" />
      </video>
      {/* Conteúdo centralizado */}
      <div className="w-full max-w-[95vw] min-h-screen px-2 sm:px-0 relative z-10 overflow-hidden flex flex-col items-center justify-center">
        {/* Importa a fonte Gasoek One no head */}
        <link href="https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap" rel="stylesheet" />
        {/* Hero centralizado */}
        <div className="w-full flex justify-center px-2">
          <HeroJumpTypewriter
            text={`Design is the surface.\nExperience is\nthe story beneath it.`}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gasoek text-[#eb4700] text-center leading-tight uppercase w-full max-w-[95vw] mx-auto"
            style={{
              fontWeight: 'bold',
              lineHeight: 1.1,
              marginTop: 0,
              marginBottom: 0,
              position: 'static',
              left: 'unset',
              top: 'unset',
              transform: 'none',
              width: '100%'
            }}
          />
        </div>
        {/* Atalhos logo abaixo */}
        <div className="mt-10 md:mt-40 flex-col items-center justify-center gap-2 text-xs sm:text-sm text-white/60 font-mono select-none hidden md:flex">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="home-shortcut flex items-center gap-1 cursor-pointer" onClick={() => router.push('/') } style={{ cursor: 'pointer' }}><span className="inline-block px-1 py-0.5 rounded bg-white/10 text-white">H</span> home</span>
            <span className="home-shortcut flex items-center gap-1 cursor-pointer" onClick={() => router.push('/work')} style={{ cursor: 'pointer' }}><span className="inline-block px-1 py-0.5 rounded bg-white/10 text-white">W</span> work</span>
            <span className="home-shortcut flex items-center gap-1 cursor-pointer" onClick={() => router.push('/about')} style={{ cursor: 'pointer' }}><span className="inline-block px-1 py-0.5 rounded bg-white/10 text-white">A</span> about</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="home-shortcut flex items-center gap-1 cursor-pointer" onClick={() => window.open('https://cal.com/thiagopinto', '_blank')} style={{ cursor: 'pointer' }}><span className="inline-block px-1 py-0.5 rounded bg-white/10 text-white">B</span> book a call</span>
            <span className="home-shortcut flex items-center gap-1 cursor-pointer" onClick={() => window.open('https://www.linkedin.com/in/thiagopinto/', '_blank')} style={{ cursor: 'pointer' }}><span className="inline-block px-1 py-0.5 rounded bg-white/10 text-white">L</span> linkedin</span>
          </div>
        </div>
      </div>

      {/* Navigation Overlay */}
      <NavigationOverlay 
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        navigationItems={navigationItems}
      />
    </div>
  );
} 