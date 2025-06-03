"use client";
import dynamic from 'next/dynamic';
const HorizontalGallery = dynamic(() => import('./HorizontalGallery'), { ssr: false });
export default function ProjectHorizontalGallery(props) {
  return <HorizontalGallery {...props} />;
} 