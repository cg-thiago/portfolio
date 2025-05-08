import React from 'react';
import { ProjectGrid } from '../components/Grid';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Projetos</h1>
        <ProjectGrid />
      </div>
    </main>
  );
} 