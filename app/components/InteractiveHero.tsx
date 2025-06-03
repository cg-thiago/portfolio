"use client";
import React, { useRef, useState, useEffect } from "react";

export default function InteractiveHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circle, setCircle] = useState({ x: 0.5, y: 0.5 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Wave animation parameters
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.05;

      // Draw waves
      const waveHeight = 20;
      const waveLength = 0.01;
      const waveSpeed = 0.05;
      const waveCount = 3;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * waveLength + time * waveSpeed + i * Math.PI / 2) * waveHeight;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(235, 71, 0, ${0.2 - i * 0.05})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw gradient based on circle position
      const gradient = ctx.createRadialGradient(
        circle.x * canvas.width,
        circle.y * canvas.height,
        0,
        circle.x * canvas.width,
        circle.y * canvas.height,
        200
      );
      gradient.addColorStop(0, "rgba(235, 71, 0, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [circle]);

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    let clientX, clientY;
    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCircle({
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    });
  }

  function handleEnter() {
    setIsActive(true);
  }
  function handleLeave() {
    setIsActive(false);
    setCircle({ x: 0.5, y: 0.5 });
  }

  return (
    <div
      ref={heroRef}
      className="relative w-full h-80 md:h-[32rem] flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-lg border border-neutral-800 cursor-pointer select-none"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* Dynamic Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      {/* Animated Circle */}
      <div
        className="absolute w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 pointer-events-none"
        style={{
          left: `${circle.x * 100}%`,
          top: `${circle.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          transition: isActive ? 'none' : 'all 0.3s ease-out',
        }}
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Interactive Hero
        </h1>
        <p className="text-lg md:text-2xl text-neutral-300 mb-6 max-w-xl">
          Move your mouse or touch to interact with the hero background. Try clicking or tapping for more effects!
        </p>
        <button
          className="px-6 py-3 rounded-full bg-[#EB4700] text-white font-semibold text-lg shadow-lg hover:bg-[#ff6a1a] transition-colors duration-200"
          onClick={() => alert("You clicked the interactive hero!")}
        >
          Try Me
        </button>
      </div>
    </div>
  );
} 