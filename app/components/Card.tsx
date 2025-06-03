import React, { useState, useEffect } from 'react';
import { CardData, CardSize } from '../types';
import { ExpandIcon, ShrinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeedbackText } from '../utils/feedbackText';

interface CardProps {
  data: CardData;
  onSizeChange: (id: string, expanded: boolean) => void;
}

const Card: React.FC<CardProps> = ({ data, onSizeChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleToggleSize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSizeChange(data.id, !data.expanded);
  };

  const getCardSizeClasses = (size: CardSize, expanded: boolean): string => {
    if (expanded) {
      return 'col-span-2 row-span-2 z-10';
    }
    
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1';
      case 'medium':
        return 'col-span-1 row-span-2';
      case 'large':
        return 'col-span-2 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  const getBgColor = (type?: string): string => {
    switch (type) {
      case 'about':
        return 'bg-gradient-to-br from-teal-700 to-teal-600';
      case 'experience':
        return 'bg-gradient-to-br from-purple-700 to-purple-600';
      case 'skills':
        return 'bg-gradient-to-br from-orange-500 to-orange-400';
      case 'projects':
        return 'bg-gradient-to-br from-indigo-600 to-indigo-500';
      case 'contact':
        return 'bg-gradient-to-br from-gray-700 to-gray-600';
      default:
        return 'bg-gradient-to-br from-gray-800 to-gray-700';
    }
  };

  useEffect(() => {
    if (!isClient) return
    // uso de APIs do navegador
  }, [isClient])

  return (
    <Link href={data.link}>
      <div
        className={`
          h-full w-full
          rounded-xl shadow-lg overflow-hidden
          transform transition-all duration-500 ease-in-out
          hover:shadow-xl relative
          cursor-pointer
          group
          ${getBgColor(data.type)}
        `}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => {
          setIsHovered(true);
          setTimeout(() => getFeedbackText('card-hover', { title: data.title }), 10);
        }}
        onMouseLeave={() => { setIsHovered(false); }}
      >
        <div className="relative w-full h-full">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-white">{data.title}</h2>
              <button
                onClick={handleToggleSize}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all
                  opacity-0 group-hover:opacity-100"
                style={{ cursor: 'pointer' }}
                aria-label={data.expanded ? "Shrink card" : "Expand card"}
              >
                {data.expanded ? (
                  <ShrinkIcon size={16} className="text-white" />
                ) : (
                  <ExpandIcon size={16} className="text-white" />
                )}
              </button>
            </div>

            <div className="transition-all duration-500 ease-in-out text-gray-200 text-sm">
              {data.content ? (
                data.expanded ? data.content.expanded : data.content.short
              ) : (
                data.description
              )}
            </div>
            
            {isHovered && !data.expanded && (
              <div className="absolute bottom-4 right-4 text-xs font-medium text-white/80">
                Click to expand
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;