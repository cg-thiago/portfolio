import { Metadata } from "next";
import ProjectsGrid from "../components/ProjectsGrid";

export const metadata = {
  title: "Work | Thiago Pinto",
  description: "Explore my latest projects and work in software development, design, and innovation.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">My Work</h1>
        <ProjectsGrid />
      </div>
    </main>
  );
} 