"use client";

import React, { useState, useEffect } from 'react';
import Card from './Card';
import { CardData } from '../types';
import { initialCards } from '../data/initialCards';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const STORAGE_KEY = 'portfolio_grid_order_v1';

function SortableCard({ card, onSizeChange }: { card: CardData; onSizeChange: (id: string, expanded: boolean) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        minWidth: 200,
        maxWidth: '100%',
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 50 : 'auto',
      }}
      className={`bg-transparent rounded-xl flex-shrink-0
        ${card.size === 'large' || card.expanded ? 'w-full md:w-[calc(50%-12px)] h-[420px]' : ''}
        ${card.size === 'medium' && !card.expanded ? 'w-full md:w-[calc(50%-12px)] h-[340px]' : ''}
        ${card.size === 'small' && !card.expanded ? 'w-full md:w-[calc(33.333%-12px)] h-[200px]' : ''}
        transition-transform duration-200`}
      {...attributes}
      {...listeners}
    >
      <Card data={card} onSizeChange={onSizeChange} />
    </div>
  );
}

const Grid: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [isAnimating, setIsAnimating] = useState(false);

  // Carrega ordem do localStorage ao montar
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        const ids = JSON.parse(stored);
        const ordered = ids
          .map((id: string) => initialCards.find(card => card.id === id))
          .filter(Boolean) as CardData[];
        const missing = initialCards.filter(card => !ids.includes(card.id));
        setCards([...ordered, ...missing]);
      } catch {}
    }
  }, []);

  const handleCardSizeChange = (id: string, expanded: boolean) => {
    setIsAnimating(true);
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, expanded } : card
      )
    );
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = cards.findIndex(card => card.id === active.id);
    const newIndex = cards.findIndex(card => card.id === over.id);
    const newCards = arrayMove(cards, oldIndex, newIndex);
    setCards(newCards);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards.map(card => card.id)));
    }
  }

  return (
    <div className="w-full p-4 md:p-8">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={cards.map(card => card.id)} strategy={rectSortingStrategy}>
          <div
            className={`flex flex-wrap gap-4 md:gap-6 justify-start
              transition-all duration-500 ease-in-out
              ${isAnimating ? 'scale-[0.99] opacity-95' : 'scale-100 opacity-100'}`}
          >
            {cards.map(card => (
              <SortableCard key={card.id} card={card} onSizeChange={handleCardSizeChange} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export const ProjectGrid: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(initialCards.filter(card => card.type === 'projects'));
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY + '_projects') : null;
    if (stored) {
      try {
        const ids = JSON.parse(stored);
        const ordered = ids
          .map((id: string) => initialCards.find(card => card.id === id && card.type === 'projects'))
          .filter(Boolean) as CardData[];
        const missing = initialCards.filter(card => card.type === 'projects' && !ids.includes(card.id));
        setCards([...ordered, ...missing]);
      } catch {}
    }
  }, []);

  const handleCardSizeChange = (id: string, expanded: boolean) => {
    setIsAnimating(true);
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, expanded } : card
      )
    );
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = cards.findIndex(card => card.id === active.id);
    const newIndex = cards.findIndex(card => card.id === over.id);
    const newCards = arrayMove(cards, oldIndex, newIndex);
    setCards(newCards);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY + '_projects', JSON.stringify(newCards.map(card => card.id)));
    }
  }

  return (
    <div className="w-full p-4 md:p-8">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={cards.map(card => card.id)} strategy={rectSortingStrategy}>
          <div
            className={`flex flex-wrap gap-4 md:gap-6 justify-start
              transition-all duration-500 ease-in-out
              ${isAnimating ? 'scale-[0.99] opacity-95' : 'scale-100 opacity-100'}`}
          >
            {cards.map(card => (
              <SortableCard key={card.id} card={card} onSizeChange={handleCardSizeChange} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Grid;