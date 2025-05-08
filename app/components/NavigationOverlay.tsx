import React from 'react';
import type { FC } from 'react';
import Grid from './Grid';

interface NavigationOverlayProps {
  isOpen: boolean;
}

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen w-full flex flex-col items-center px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            You're in Control.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Drag. Drop. Resize. This portfolio adapts to your perspective — because good design puts the user in charge.
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <Grid />
        </div>
      </div>
    </div>
  );
};

export default NavigationOverlay; 