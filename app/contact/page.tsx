"use client";
import React from "react";
import ContactGrid from "./ContactGrid";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto">
        <ContactGrid />
      </div>
    </main>
  );
} 