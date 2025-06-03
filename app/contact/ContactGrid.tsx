"use client";

import React, { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { contactGridData } from "./contactGridData";
import ResizableCard from './ResizableCard';

function SortableCard({ id, content }: { id: string; content: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 50 : "auto",
        minWidth: 220,
        maxWidth: "100%",
      }}
      className="flex-1 min-w-[220px] max-w-full"
      {...attributes}
      {...listeners}
    >
      {content}
    </div>
  );
}

export default function ContactGrid() {
  const [items, setItems] = useState(contactGridData);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
  }

  function renderCard(item: any) {
    if (item.type === 'map') {
      return (
        <ResizableCard key={item.id} defaultSize="large">
          <iframe
            title="Florianópolis Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14136.96496435713!2d-48.5585405!3d-27.5953771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527381f5b6b1b0b%3A0x5e3b1b1b1b1b1b1b!2sFlorian%C3%B3polis%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="200"
            style={{
              border: 0,
              borderRadius: "1rem",
              boxShadow: "0 8px 32px 0 rgba(235,71,0,0.18)",
              filter:
                "grayscale(1) sepia(1) hue-rotate(-20deg) saturate(2) brightness(0.8)",
            }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </ResizableCard>
      );
    }
    if (item.type === 'headline') {
      return (
        <ResizableCard key={item.id}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact</h1>
          <p className="text-gray-300">
            Let's connect! You can reach me directly via LinkedIn or email.
          </p>
        </ResizableCard>
      );
    }
    if (item.type === 'linkedin') {
      return (
        <ResizableCard key={item.id}>
          <a
            href="https://linkedin.com/in/thiagopinto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#EB4700] hover:underline font-medium text-lg"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.599v5.597z"/>
            </svg>
            LinkedIn
          </a>
        </ResizableCard>
      );
    }
    if (item.type === 'email') {
      return (
        <ResizableCard key={item.id}>
          <a
            href="mailto:hi@thiagopin.to"
            className="flex items-center gap-2 text-[#EB4700] hover:underline font-medium text-lg"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 13.065l-11.985-8.065h23.97l-11.985 8.065zm-12-9.065v16h24v-16h-24zm22 2.236v11.764h-20v-11.764l10 6.736 10-6.736z"/>
            </svg>
            hi@thiagopin.to
          </a>
        </ResizableCard>
      );
    }
    return null;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-6 justify-center w-full">
          {items.map((item) => renderCard(item))}
        </div>
      </SortableContext>
    </DndContext>
  );
} 