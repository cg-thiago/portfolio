"use client";
import React from "react";

export default function HeroVideo({ src }: { src: string }) {
  return (
    <div className="relative h-full w-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-fallback.jpg"
        className="h-full w-full object-cover object-top mx-auto my-0 opacity-80 sm:opacity-100"
        id="hero-video"
        style={{ background: 'black' }}
      >
        <source src={src} type="video/webm" />
      </video>
      {/* Fade-out no final do vídeo, só no mobile */}
      <div className="absolute bottom-0 left-0 w-full h-24 sm:hidden pointer-events-none" style={{background: 'linear-gradient(to bottom, transparent, black 90%)'}} />
    </div>
  );
} 