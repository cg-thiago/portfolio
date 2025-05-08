"use client";
import React from "react";

export default function HeroVideo({ src }: { src: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-contain mx-auto my-0 opacity-100"
      id="hero-video"
      style={{ background: 'black' }}
    >
      <source src={src} type="video/webm" />
    </video>
  );
} 