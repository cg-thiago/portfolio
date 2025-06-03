import React from 'react';
import InteractiveHero from '../components/InteractiveHero';

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Playground: Interactive Hero Experiments</h1>
      <section className="w-full max-w-3xl bg-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Interactive Hero</h2>
        <InteractiveHero />
      </section>
    </main>
  );
} 