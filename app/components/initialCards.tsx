import React from 'react';
import { CardData } from '../types';
import { Code, Briefcase, User, FolderKanban, Mail, Palette, Layout, Smartphone } from 'lucide-react';

const initialCards: CardData[] = [
  {
    id: 'about',
    type: 'about',
    title: 'About Me',
    size: 'medium',
    expanded: false,
    content: {
      short: (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <User className="mr-2" size={20} />
            <span className="font-medium">UI/UX Designer</span>
          </div>
          <p className="text-sm opacity-80 line-clamp-4">
            Creative designer with a passion for crafting beautiful, functional interfaces that deliver exceptional user experiences.
          </p>
        </div>
      ),
      expanded: (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <User className="mr-2" size={20} />
            <span className="font-medium">UI/UX Designer</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm opacity-90">
              Creative designer with a passion for crafting beautiful, functional interfaces that deliver exceptional user experiences. I specialize in translating complex problems into simple, intuitive designs that users love.
            </p>
            <p className="text-sm opacity-90">
              With over 5 years of experience in the design industry, I've developed a keen eye for detail and a strong understanding of user behavior. My approach combines aesthetics with functionality, ensuring that every design decision is purposeful and user-focused.
            </p>
            <div className="pt-2">
              <h3 className="text-sm font-bold mb-2">Design Philosophy</h3>
              <p className="text-sm opacity-90">
                "Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials."
              </p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'experience',
    type: 'experience',
    title: 'Work Experience',
    size: 'large',
    expanded: false,
    content: {
      short: (
        <div className="flex items-center">
          <Briefcase className="mr-2" size={20} />
          <div>
            <p className="font-medium">Senior UI/UX Designer</p>
            <p className="text-xs opacity-80">Creative Agency, 2020-Present</p>
          </div>
        </div>
      ),
      expanded: (
        <div className="space-y-4">
          <div className="flex items-start">
            <Briefcase className="mr-2 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium">Senior UI/UX Designer</p>
              <p className="text-xs opacity-80 mb-2">Creative Agency, 2020-Present</p>
              <p className="text-sm opacity-90">Led design team in creating innovative digital products for Fortune 500 clients. Implemented design systems that increased team efficiency by 40%.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Briefcase className="mr-2 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium">UI Designer</p>
              <p className="text-xs opacity-80 mb-2">Tech Startup, 2018-2020</p>
              <p className="text-sm opacity-90">Designed user interfaces for mobile applications with over 1M downloads. Conducted user research and testing to optimize conversion rates.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Briefcase className="mr-2 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium">Graphic Designer</p>
              <p className="text-xs opacity-80 mb-2">Design Studio, 2016-2018</p>
              <p className="text-sm opacity-90">Created visual assets for digital and print campaigns. Collaborated with marketing teams to develop brand identities.</p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'skills',
    type: 'skills',
    title: 'Skills',
    size: 'small',
    expanded: false,
    content: {
      short: (
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Figma</span>
          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Adobe XD</span>
          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Sketch</span>
        </div>
      ),
      expanded: (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold mb-2">Design Tools</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Figma</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Adobe XD</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Sketch</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Illustrator</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Photoshop</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold mb-2">Design Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">UI Design</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">UX Research</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Prototyping</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Design Systems</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Visual Design</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Interaction Design</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold mb-2">Other</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">HTML/CSS</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Design Thinking</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Usability Testing</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">User Research</span>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'project-ecommerce',
    type: 'projects',
    title: 'E-commerce Redesign',
    size: 'medium',
    expanded: false,
    content: {
      short: (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Layout className="mr-2" size={20} />
            <span className="font-medium">UX/UI Design</span>
          </div>
          <p className="text-sm opacity-80 line-clamp-3">
            Complete redesign of an e-commerce platform resulting in 35% increase in conversions.
          </p>
        </div>
      ),
      expanded: (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Layout className="mr-2" size={20} />
            <span className="font-medium">E-commerce Platform Redesign</span>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">UX Design</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">UI Design</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Research</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Prototyping</span>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Led the complete redesign of a major e-commerce platform, focusing on improving the user experience and conversion rates. The project involved extensive user research, competitive analysis, and iterative design processes.
            </p>
            <div className="space-y-2">
              <p className="text-sm opacity-90">🎯 35% increase in conversion rate</p>
              <p className="text-sm opacity-90">📊 25% decrease in cart abandonment</p>
              <p className="text-sm opacity-90">⭐️ 98% positive user feedback</p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'project-finance',
    type: 'projects',
    title: 'Finance App',
    size: 'small',
    expanded: false,
    content: {
      short: (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Smartphone className="mr-2" size={20} />
            <span className="font-medium">Mobile App</span>
          </div>
          <p className="text-sm opacity-80 line-clamp-2">
            Personal finance management app with focus on data visualization.
          </p>
        </div>
      ),
      expanded: (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Smartphone className="mr-2" size={20} />
            <span className="font-medium">Finance Management App</span>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Mobile Design</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">UI Components</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Data Viz</span>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Designed an intuitive mobile interface for personal finance management, with a strong focus on data visualization and accessibility. Created a comprehensive design system for consistent UI components.
            </p>
            <div className="space-y-2">
              <p className="text-sm opacity-90">📱 4.8/5 App Store rating</p>
              <p className="text-sm opacity-90">📈 500K+ active users</p>
              <p className="text-sm opacity-90">🏆 Best Finance App 2024</p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'project-health',
    type: 'projects',
    title: 'Health Dashboard',
    size: 'large',
    expanded: false,
    content: {
      short: (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <FolderKanban className="mr-2" size={20} />
            <span className="font-medium">Dashboard Design</span>
          </div>
          <p className="text-sm opacity-80 line-clamp-3">
            Comprehensive health metrics dashboard for healthcare professionals with complex data visualization.
          </p>
        </div>
      ),
      expanded: (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <FolderKanban className="mr-2" size={20} />
            <span className="font-medium">Healthcare Analytics Dashboard</span>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Dashboard Design</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Information Architecture</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Data Visualization</span>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Created a comprehensive health metrics dashboard for healthcare professionals, focusing on complex data visualization and intuitive information architecture. The system helps doctors and nurses monitor patient health metrics in real-time.
            </p>
            <div className="space-y-2">
              <p className="text-sm opacity-90">⚡️ 40% faster decision making</p>
              <p className="text-sm opacity-90">🏥 Used in 50+ hospitals</p>
              <p className="text-sm opacity-90">📊 100+ custom data visualizations</p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'contact',
    type: 'contact',
    title: 'Contact',
    size: 'small',
    expanded: false,
    content: {
      short: (
        <div className="flex items-center">
          <Mail className="mr-2" size={20} />
          <span className="font-medium">Get in touch</span>
        </div>
      ),
      expanded: (
        <div className="space-y-4">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold mb-2">Let's Connect</h3>
            <div className="space-y-2">
              <p className="text-sm flex items-center">
                <Mail className="mr-2" size={16} />
                <span>hello@designer.com</span>
              </p>
              <p className="text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                <span>@designername</span>
              </p>
              <p className="text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span>linkedin.com/designer</span>
              </p>
            </div>
          </div>
          
          <div className="pt-2">
            <button className="w-full py-2 px-4 bg-white text-gray-800 rounded-lg font-medium transition-all hover:bg-opacity-90">
              Send Message
            </button>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'code',
    type: 'skills',
    title: 'Coding',
    size: 'medium',
    expanded: false,
    content: {
      short: (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Code className="mr-2" size={20} />
            <span className="font-medium">Frontend Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs">HTML/CSS</span>
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs">JavaScript</span>
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs">React</span>
          </div>
        </div>
      ),
      expanded: (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Code className="mr-2" size={20} />
            <span className="font-medium">Frontend Development</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm opacity-90">
              As a designer who codes, I bridge the gap between design and development, creating more feasible and efficient designs that can be implemented seamlessly.
            </p>
            <div>
              <h3 className="text-sm font-bold mb-2">Languages & Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">HTML/CSS</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">JavaScript</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">TypeScript</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">React</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Vue</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Tailwind CSS</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2">Tools</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Git</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">VS Code</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Webpack</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">npm/yarn</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  },
];

export default initialCards;