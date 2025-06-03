'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const greetings = [
  'Hola!', // Espanhol
  'Hello!', // Inglês
  'Olá!', // Português
  'Salut!', // Francês
  'Ciao!', // Italiano
  'Hallo!', // Alemão
  'Hej!', // Sueco/Dinamarquês
  'Привет!', // Russo
  'こんにちは!', // Japonês
  '你好!', // Chinês
  '안녕하세요!', // Coreano
  'مرحبا!', // Árabe
  'שלום!', // Hebraico
  'नमस्ते!', // Hindi
  'Sawubona!', // Zulu
];

export default function WelcomeAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const icon = iconRef.current;
    const text = textRef.current;
    if (!container || !icon || !text) return;

    // Forçar visibilidade para debug
    container.style.visibility = 'visible';
    // Temporário: cor de fundo para debug
    container.style.background = '#EB4700';

    // Duração máxima da animação
    const MAX_DURATION = 3; // segundos
    let completed = false;

    // GSAP timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        if (!completed) {
          completed = true;
          setShow(false);
          if (onComplete) { onComplete(); }
        }
      }
    });

    // Calcular tempo por saudação
    const greetingDuration = Math.max(0.3, (MAX_DURATION - 0.8 - 0.7) / greetings.length); // 0.8s in, 0.7s out

    // Show container
    tl.set(container, { autoAlpha: 1 });

    // Step 1: Animate greeting text in
    tl.from(text, { y: 60, opacity: 0, duration: 0.8 });

    // Step 2: Cycle through greetings
    greetings.forEach((greet, i) => {
      if (i === 0) return; // First already shown
      tl.to(text, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => setGreetingIdx(i)
      });
      tl.to(text, {
        opacity: 1,
        duration: 0.15
      });
      tl.to({}, { duration: greetingDuration });
    });

    // Step 3: Animate text and icon out
    tl.to(text, { opacity: 0, y: -40, duration: 0.3 }, "+=0.1");
    tl.to(icon, {
      width: '100%',
      height: '60px',
      borderRadius: '30px',
      y: -window.innerHeight / 2 + 50,
      duration: 0.4
    }, '<');

    // Step 4: Fade out container
    tl.to(container, { backgroundColor: 'transparent', duration: 0.3 });

    // Segurança: garantir que a animação não passe de 3 segundos
    const timeout = setTimeout(() => {
      if (!completed) {
        completed = true;
        tl.progress(1, false); // força timeline ao fim
        setShow(false);
        if (onComplete) { onComplete(); }
      }
    }, MAX_DURATION * 1000);

    return () => {
      tl.kill();
      clearTimeout(timeout);
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="welcome-container"
      style={{
        maxWidth: 'none',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: '#EB4700',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        visibility: 'hidden', // GSAP revela
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        <div
          ref={iconRef}
          style={{
            width: '188px',
            height: '188px',
            borderRadius: '16.2px',
            overflow: 'hidden',
            position: 'relative',
            background: '#fff',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            transition: 'all 0.3s',
          }}
        >
          <Image
            src="/images/icon2.svg"
            alt="Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div
          ref={textRef}
          style={{
            color: '#FFF',
            fontFamily: 'Gasoek One, sans-serif',
            fontSize: 'clamp(48px, 12vw, 140px)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            lineHeight: 1.1,
            textAlign: 'center',
            textShadow: '0 2px 16px rgba(0,0,0,0.18)',
            minHeight: '1em',
            transition: 'all 0.3s',
            userSelect: 'none',
          }}
        >
          {greetings[greetingIdx]}
        </div>
        <div
          style={{
            color: '#FFF',
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '0.03em',
            lineHeight: 1.2,
            textAlign: 'center',
            marginTop: '8px',
            userSelect: 'none',
          }}
        >
          I'm Thiago
        </div>
      </div>
    </div>
  );
} 