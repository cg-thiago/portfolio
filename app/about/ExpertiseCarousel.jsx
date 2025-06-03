"use client";
import React, { useRef, useEffect, useState } from "react";
import expertiseStyles from "./ExpertiseCarousel.module.css";

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
];

function chunkArray(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default function ExpertiseCarousel({ showEdgeArrows }) {
  const [page, setPage] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardPairs = chunkArray(EXPERTISE_CARDS, 2);

  // Navegação por swipe (mobile)
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50 && page > 0) setPage(page - 1);
    if (delta < -50 && page < cardPairs.length - 1) setPage(page + 1);
    touchStartX.current = null;
  };

  // Reset page on resize
  useEffect(() => {
    const onResize = () => setPage(0);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section className={expertiseStyles.carouselSection}>
      {/* Mobile: 2 cards por página, carrossel horizontal com dots */}
      <div className="block md:hidden w-full">
        <div
          className="w-full flex flex-row overflow-x-hidden"
          style={{ touchAction: 'pan-x' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {cardPairs.map((pair, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 flex flex-col gap-4 transition-transform duration-300"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pair.map((card) => (
                <div key={card.title} className="bg-transparent border-none shadow-none rounded-xl p-4 min-h-[180px] flex flex-col justify-center" style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
                  <div className="font-bold text-lg mb-2 break-words text-white">{card.title}</div>
                  <div className="text-base text-gray-300 break-words">{card.description}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {cardPairs.map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full ${page === idx ? 'bg-[#eb4700]' : 'bg-gray-600'} transition-colors`}
              onClick={() => setPage(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Desktop/tablet: carrossel horizontal tradicional */}
      <div className="hidden md:block">
        <div className={expertiseStyles.carouselNavWrapper} style={{ position: 'relative' }}>
          <div className={expertiseStyles.carouselWrapper}>
            <div className={expertiseStyles.carouselNoScroll}>
              {EXPERTISE_CARDS.map((card, idx) => (
                <div key={card.title} className={expertiseStyles.card} style={{ cursor: 'pointer', overflow: 'hidden', wordBreak: 'break-word' }}>
                  <div className={expertiseStyles.cardTitle + ' break-words'}>{card.title}</div>
                  <div className={expertiseStyles.cardDescription + ' break-words'}>{card.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 