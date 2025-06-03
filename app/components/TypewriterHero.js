"use client";
import { useMemo, useRef, useState, useEffect } from 'react';

const FONTS = [
  'var(--font-gasoek)',
  'var(--font-inter)',
  'Roboto Mono, monospace',
  'Orbitron, sans-serif',
  'Indie Flower, cursive',
];

export default function TypewriterHero({ text, subtext }) {
  const lines = text.split('\n');
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState(['']);
  const [done, setDone] = useState(false);
  const [fontIdx, setFontIdx] = useState({});
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Typewriter multi-linha corrigido
  useEffect(() => {
    if (!isMounted) return; // Só anima no client
    if (done) return;
    if (currentChar <= lines[currentLine].length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = lines[currentLine].slice(0, currentChar);
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      }, 40 + Math.random() * 40);
      return () => clearTimeout(timeout);
    } else if (currentLine < lines.length - 1) {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
      setDisplayedLines((prev) => [...prev, '']);
    } else {
      setDone(true);
    }
  }, [currentChar, currentLine, lines, done, isMounted]);

  // Accordion font cycling on hover
  function handleMouseEnter(i) {
    setHoveredIdx(i);
    setFontIdx((prev) => ({ ...prev, [i]: 1 }));
    if (i > 0) setTimeout(() => setFontIdx((prev) => ({ ...prev, [i - 1]: 2 })), 80);
    if (i < displayedLines.join('').length - 1) setTimeout(() => setFontIdx((prev) => ({ ...prev, [i + 1]: 2 })), 80);
  }
  function handleMouseLeave(i) {
    setHoveredIdx(null);
    setTimeout(() => setFontIdx((prev) => {
      const newIdx = { ...prev };
      newIdx[i] = 0;
      if (i > 0) newIdx[i - 1] = 0;
      if (i < displayedLines.join('').length - 1) newIdx[i + 1] = 0;
      return newIdx;
    }), 120);
  }

  // Super zoom no vídeo ao hover global
  useEffect(() => {
    const video = document.getElementById('hero-video');
    if (video) {
      if (isHovered) {
        video.style.transition = 'transform 0.7s cubic-bezier(.4,1.6,.4,1)';
        // Aplica super zoom extra, mantendo o parallax/zoom do scroll
        const current = video.style.transform.match(/scale\(([^)]+)\)/);
        let baseScale = 1;
        if (current && current[1]) baseScale = parseFloat(current[1]);
        // Se já tem super zoom, não soma de novo
        if (baseScale < 1.5) {
          video.style.transform = video.style.transform.replace(/scale\([^)]+\)/, `scale(${baseScale * 1.5})`);
        }
      } else {
        video.style.transition = 'transform 0.7s cubic-bezier(.4,1.6,.4,1)';
        // Remove apenas o super zoom, mantendo o parallax/zoom normal
        const current = video.style.transform.match(/scale\(([^)]+)\)/);
        let baseScale = 1;
        if (current && current[1]) baseScale = parseFloat(current[1]);
        // Se estava com super zoom, volta para o base
        if (baseScale > 1) {
          video.style.transform = video.style.transform.replace(/scale\([^)]+\)/, 'scale(1)');
        }
      }
    }
  }, [isHovered]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="group"
        style={{ cursor: isHovered ? 'zoom-in' : 'default' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isMounted
          ? displayedLines.map((line, lineIdx) => (
              <h1
                key={lineIdx}
                className="text-center font-gasoek text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase leading-tight text-[#EB4700] whitespace-pre-line mb-2 sm:mb-4 drop-shadow-lg"
                style={{ letterSpacing: 'normal' }}
              >
                {line.split('').map((char, i) => {
                  const globalIdx = displayedLines.slice(0, lineIdx).reduce((acc, l) => acc + l.length, 0) + i;
                  if (char === ' ') {
                    return <span key={globalIdx} style={{ display: 'inline-block', width: '0.6em' }}>{' '}</span>;
                  }
                  return (
                    <span
                      key={globalIdx}
                      style={{
                        fontFamily: FONTS[fontIdx[globalIdx] || 0],
                        transition: 'font-family 0.6s cubic-bezier(.4,1.6,.4,1)',
                        cursor: 'inherit',
                        display: 'inline-block',
                      }}
                      onMouseEnter={() => handleMouseEnter(globalIdx)}
                      onMouseLeave={() => handleMouseLeave(globalIdx)}
                    >
                      {char}
                      {/* Cursor ao final da linha em digitação */}
                      {lineIdx === currentLine && i === line.length - 1 && <span className="animate-blink">|</span>}
                    </span>
                  );
                })}
              </h1>
            ))
          : lines.map((line, lineIdx) => (
              <h1
                key={lineIdx}
                className="text-center font-gasoek text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase leading-tight text-[#EB4700] whitespace-pre-line mb-2 sm:mb-4 drop-shadow-lg"
                style={{ letterSpacing: 'normal' }}
              >
                {line}
              </h1>
            ))}
      </div>
      {done && isMounted && (
        <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 text-center max-w-xs sm:max-w-md animate-fadeInUp">
          {subtext}
        </p>
      )}
      {!isMounted && subtext && (
        <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 text-center max-w-xs sm:max-w-md">
          {subtext}
        </p>
      )}
    </div>
  );
} 