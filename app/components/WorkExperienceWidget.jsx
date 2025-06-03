import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

// Experience data structure with real content
const experiences = [
  {
    id: 1,
    company: "CasinoGrounds.com",
    position: "Head of Design",
    startDate: "2023-01",
    endDate: "Present",
    location: "Málaga, Andalusia, Spain",
    responsibilities: [
      "Lead the design team and establish design direction for the platform",
      "Oversee UI/UX strategy for the world's largest casino streaming community",
      "Manage design systems and ensure consistent brand implementation"
    ],
    achievements: [
      "Elevated the brand's visual identity across all digital touchpoints",
      "Implemented user-centered design processes improving overall platform experience"
    ],
    skills: ["Design Leadership", "Brand Strategy", "UI/UX Design", "Team Management"],
    relatedProjects: "casinogrounds-rebrand"
  },
  {
    id: 2,
    company: "CasinoGrounds.com",
    position: "Lead UI/UX Designer",
    startDate: "2021-01",
    endDate: "2023-01",
    location: "Málaga, Andalusia, Spain",
    responsibilities: [
      "Led the redesign and brand facelift of the platform",
      "Created comprehensive UI/UX solutions for web and mobile interfaces",
      "Collaborated with development team to implement design solutions"
    ],
    achievements: [
      "Successfully executed the 2021 rebrand that modernized the platform's visual identity",
      "Improved user engagement metrics through intuitive interface design"
    ],
    skills: ["UI Design", "UX Design", "Brand Identity", "Prototyping"],
    relatedProjects: "casinogrounds-rebrand"
  },
  {
    id: 3,
    company: "Altenar",
    position: "Senior Graphic Designer • UI/UX Designer",
    startDate: "2019-07",
    endDate: "2020-12",
    location: "Malta",
    responsibilities: [
      "Designed user interfaces for sports betting and casino platforms",
      "Created visual assets and brand materials for digital products",
      "Collaborated on improving user experience for betting applications"
    ],
    achievements: [
      "Contributed to redesigning key user journeys resulting in improved conversion rates"
    ],
    skills: ["UI Design", "Graphic Design", "Sports Betting Platforms", "Casino Interfaces"],
    relatedProjects: null
  },
  {
    id: 4,
    company: "Redorange Image Consultants",
    position: "Senior Graphic Designer",
    startDate: "2018-08",
    endDate: "2019-06",
    location: "Malta",
    responsibilities: [
      "Developed brand identities and visual systems for diverse clients",
      "Created print and digital marketing materials",
      "Collaborated with clients to translate business goals into visual solutions"
    ],
    achievements: [
      "Delivered comprehensive brand identity systems for multiple high-profile clients"
    ],
    skills: ["Brand Identity", "Visual Design", "Print Design", "Digital Design"],
    relatedProjects: null
  },
  {
    id: 5,
    company: "Espinafre Comunicadores",
    position: "Brand Strategist",
    startDate: "2012-03",
    endDate: "2018-12",
    location: "Campinas, Brazil",
    responsibilities: [
      "Developed brand strategies and positioning for clients across various industries",
      "Led strategic brand workshops and discovery sessions",
      "Translated business objectives into actionable brand guidelines"
    ],
    achievements: [
      "Created successful brand strategies that aligned with business goals and market positioning"
    ],
    skills: ["Brand Strategy", "Strategic Planning", "Market Positioning", "Brand Workshops"],
    relatedProjects: null
  },
  {
    id: 6,
    company: "TAG Comunicação",
    position: "Senior Art Director",
    startDate: "2010-11",
    endDate: "2012-02",
    location: "Campinas Area, Brazil",
    responsibilities: [
      "Directed visual aspects of advertising campaigns",
      "Managed design teams and creative processes",
      "Presented creative concepts to clients"
    ],
    achievements: [
      "Led award-winning advertising campaigns that increased client market presence"
    ],
    skills: ["Art Direction", "Advertising", "Team Leadership", "Creative Concept Development"],
    relatedProjects: null
  },
  {
    id: 7,
    company: "Desafio Comunicação Integrada",
    position: "Diretor de arte",
    startDate: "2010-08",
    endDate: "2010-10",
    location: "Brazil",
    responsibilities: [
      "Created advertising campaign concepts",
      "Developed graphic materials for clients across various segments",
      "Collaborated with copywriters and marketing teams"
    ],
    achievements: [],
    skills: ["Art Direction", "Graphic Design", "Advertising Campaigns"],
    relatedProjects: null
  },
  {
    id: 8,
    company: "Humann - Marketing e Comunicação",
    position: "Diretor de Arte",
    startDate: "2010-04",
    endDate: "2010-07",
    location: "Sumaré, Brazil",
    responsibilities: [
      "Created advertising campaign concepts",
      "Developed graphic materials for diverse client segments"
    ],
    achievements: [],
    skills: ["Art Direction", "Graphic Design", "Marketing Materials"],
    relatedProjects: null
  },
  {
    id: 9,
    company: "VSCOM",
    position: "Diretor de Arte",
    startDate: "2009-03",
    endDate: "2010-03",
    location: "Brazil",
    responsibilities: [
      "Created advertising campaign concepts",
      "Developed graphic materials for clients across various segments"
    ],
    achievements: [],
    skills: ["Art Direction", "Graphic Design", "Visual Communication"],
    relatedProjects: null
  },
  {
    id: 10,
    company: "Blancolima",
    position: "Diretor de Arte",
    startDate: "2008-03",
    endDate: "2009-03",
    location: "Brazil",
    responsibilities: [
      "Created advertising campaign concepts",
      "Developed graphic materials for clients across various segments"
    ],
    achievements: [],
    skills: ["Art Direction", "Graphic Design", "Creative Concept Development"],
    relatedProjects: null
  }
];

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Define simplified categories and a mapping from skills to categories
const CATEGORY_MAP = {
  'Design Leadership': 'Leadership',
  'Team Management': 'Leadership',
  'Brand Strategy': 'Branding',
  'Brand Identity': 'Branding',
  'Brand Workshops': 'Branding',
  'Strategic Planning': 'Strategy',
  'Market Positioning': 'Strategy',
  'UI/UX Design': 'UI/UX',
  'UI Design': 'UI/UX',
  'UX Design': 'UI/UX',
  'Prototyping': 'UI/UX',
  'Graphic Design': 'Design',
  'Visual Design': 'Design',
  'Print Design': 'Design',
  'Digital Design': 'Design',
  'Art Direction': 'Design',
  'Advertising': 'Design',
  'Creative Concept Development': 'Design',
  'Sports Betting Platforms': 'Design',
  'Casino Interfaces': 'Design',
  'Visual Communication': 'Design',
  'Marketing Materials': 'Design',
};

const SIMPLIFIED_CATEGORIES = ['All', 'Design', 'Branding', 'Leadership', 'UI/UX', 'Strategy'];

function getCategoriesForExperience(exp) {
  // Map each skill to a category, deduplicate
  const cats = exp.skills.map(skill => CATEGORY_MAP[skill]).filter(Boolean);
  return Array.from(new Set(cats));
}

export default function WorkExperienceWidget() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  
  // Filter experiences based on selected simplified category or show all
  const filteredExperiences = activeFilter === 'All'
    ? experiences
    : experiences.filter(exp => getCategoriesForExperience(exp).includes(activeFilter));
  
  return (
    <div className="w-full">
      {/* Tabmenu visual para filtros simplificados */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-zinc-800">
        <div className="flex gap-1">
          {SIMPLIFIED_CATEGORIES.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-t-lg font-mono text-sm transition-all focus:outline-none
                ${activeFilter === category
                  ? 'bg-zinc-900 text-orange-400 border-b-2 border-orange-400 shadow-sm'
                  : 'bg-transparent text-zinc-400 hover:text-orange-300'}
              `}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="relative min-h-[300px]">
        {/* Fade-in/fade-out para cards ao trocar filtro */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredExperiences.map((exp) => (
              <Card 
                key={exp.id}
                className="relative p-6 cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 text-gray-100 group"
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                style={{ minHeight: '180px' }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-orange-300 group-hover:text-orange-400 transition-colors">{exp.position}</h3>
                    {/* Dica visual de expandir */}
                    <span className="ml-1">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`inline transition-transform duration-300 ${expandedId === exp.id ? 'rotate-180 text-orange-400' : 'text-zinc-500 group-hover:text-orange-300'}`}
                      >
                        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-orange-400 mb-1 font-semibold">{exp.company}</h4>
                    <p className="text-xs text-zinc-400">
                      {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                </div>
                {/* Expanded content */}
                {expandedId === exp.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="mt-4"
                  >
                    {/* Responsibilities and achievements */}
                    <div className="mt-2">
                      <h5 className="font-medium text-orange-200">Responsibilities</h5>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="text-sm text-zinc-200">{item}</li>
                        ))}
                      </ul>
                    </div>
                    {exp.achievements.length > 0 && (
                      <div className="mt-3">
                        <h5 className="font-medium text-orange-200">Key Achievements</h5>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {exp.achievements.map((item, i) => (
                            <li key={i} className="text-sm text-zinc-200">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-orange-400 text-orange-200 bg-zinc-900">{skill}</Badge>
                      ))}
                    </div>
                    {/* Related projects link */}
                    {exp.relatedProjects && (
                      <Button 
                        variant="link" 
                        className="p-0 h-auto mt-2 text-orange-300 hover:text-orange-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigation logic to project page
                          // window.location.href = `/work/${exp.relatedProjects}`;
                        }}
                      >
                        View Related Project
                      </Button>
                    )}
                  </motion.div>
                )}
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 