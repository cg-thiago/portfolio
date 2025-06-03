"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { 
  ChevronRight, 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Menu, 
  X,
  ExternalLink,
  Plus
} from 'lucide-react';
import { projectsData } from '../../data/projects';

function CalendlyWidget() {
  useEffect(() => {
    if (!document.getElementById('calendly-widget-script')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.id = 'calendly-widget-script';
      document.body.appendChild(script);
    }
  }, []);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<div class="calendly-inline-widget" data-url="https://calendly.com/thiagovictor/30min?background_color=1a1a1a&text_color=bfbfbf&primary_color=e74600" style="min-width:320px;height:700px;"></div>`
      }}
    />
  );
}

export default function FloatingToolbar({ visible = true }) {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const toolbarRef = useRef(null);
  
  // Navigation items
  const navItems = [
    { label: 'Home', href: '/', color: '#eb4700' },
    { label: 'About', href: '/about', color: '#fff' },
    { label: 'Work', href: '/work', color: '#fff' },
  ];

  // Mensagem por página
  const pageMessages = {
    '/': 'Home: Welcome to my design space.',
    '/about': 'About: Designer and creative leader.',
    '/work': "Work: Explore experiences I've crafted",
  };
  let currentMessage = pageMessages[pathname] || '';
  if (expanded) {
    currentMessage = 'Clicking will open a project';
  }

  // Efeito typewriter ao navegar
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [blink, setBlink] = useState(true);

  // Handle scroll events to update toolbar state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to collapse expanded toolbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target) && expanded) {
        setExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expanded]);

  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Handle hover states
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Expande/colapsa ao clicar na barra ou no +
  const handleToolbarClick = (e) => {
    // Só não expande se clicar em um item de navegação ou no Book a Call
    if (
      e.target.closest('.toolbar-nav') ||
      e.target.closest('.toolbar-book')
    ) {
      return;
    }
    setExpanded((v) => !v);
    console.log('Toolbar clicked');
  };

  // Navegação
  const handleNav = (href) => {
    console.log('handleNav called with href:', href);
    router.push(href);
    setExpanded(false);
  };

  // Calendly Modal state
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const calendlyModalRef = useRef(null);
  const calendlyTriggerRef = useRef(null);

  // Book a Call abre Calendly Modal
  const handleBookCall = (e) => {
    e.stopPropagation();
    setShowCalendlyModal(true);
    setTimeout(() => {
      // Focus close button for accessibility
      const closeBtn = document.getElementById('calendly-modal-close-btn');
      if (closeBtn) closeBtn.focus();
    }, 100);
  };

  // Close modal handler
  const closeCalendlyModal = () => {
    setShowCalendlyModal(false);
    if (calendlyTriggerRef.current) calendlyTriggerRef.current.focus();
    document.body.style.overflow = '';
  };

  // Trap focus inside modal
  useEffect(() => {
    if (!showCalendlyModal) return;
    document.body.style.overflow = 'hidden';
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeCalendlyModal();
      if (e.key === 'Tab') {
        const modal = calendlyModalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showCalendlyModal]);

  // Find active nav item
  const activeItem = navItems.find(item =>
    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
  ) || navItems[0];

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      if (showMenu) {
        if (e.key === 'Escape') {
          setShowMenu(false);
        }
      }
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key.toLowerCase() === 'h') {
        router.push('/');
        setShowMenu(false);
      }
      if (e.key.toLowerCase() === 'a') {
        router.push('/about');
        setShowMenu(false);
      }
      if (e.key.toLowerCase() === 'w') {
        router.push('/work');
        setShowMenu(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMenu, router]);

  // Efeito typewriter ao navegar
  useEffect(() => {
    if (!currentMessage) return;
    setShowTypewriter(true);
    setTypewriterText('');
    setTypewriterIndex(0);
    setTypewriterDone(false);
    setBlink(true);
    let timeout;
    if (currentMessage) {
      timeout = setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          setTypewriterText(currentMessage.slice(0, i + 1));
          setTypewriterIndex(i + 1);
          i++;
          if (i === currentMessage.length) {
            clearInterval(interval);
            setTypewriterDone(true);
            // Após 2.5s, apaga a mensagem e volta ao texto inicial
            setTimeout(() => {
              setShowTypewriter(false);
              setTypewriterText('');
              setTypewriterIndex(0);
              setTypewriterDone(false);
            }, 2500);
          }
        }, 40);
      }, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  // Cursor piscando
  useEffect(() => {
    if (!showTypewriter) return;
    const interval = setInterval(() => {
      setBlink(b => !b);
    }, 500);
    return () => clearInterval(interval);
  }, [showTypewriter]);

  const [hoveringWork, setHoveringWork] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Carrega o script do Calendly automaticamente ao abrir o site
  useEffect(() => {
    if (!document.getElementById('calendly-widget-script')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.id = 'calendly-widget-script';
      document.body.appendChild(script);
    }
  }, []);

  // MOBILE: Overlay for expanded toolbar
  const [mobileToolbarOpen, setMobileToolbarOpen] = useState(false);

  // ESC to close mobile toolbar
  useEffect(() => {
    if (!mobileToolbarOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') setMobileToolbarOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileToolbarOpen]);

  if (!visible) return null;

  return (
    <>
      {/* MOBILE: Toolbar closed */}
      <div
        className="md:hidden flex flex-col items-center justify-center fixed left-1/2 bottom-8 z-50"
        style={{ width: 'min(330px, 100vw)', maxWidth: 330, minWidth: 280, transform: 'translateX(-50%)' }}
      >
        {!mobileToolbarOpen && (
          <div
            className="w-full h-12 flex flex-row items-center justify-between rounded-full border border-white/10 bg-[#141414] px-4 shadow-lg transition-all duration-300"
            style={{ height: 48 }}
          >
            {/* Icon + wordmark */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e74600] shadow-[0_3.368px_11.789px_0_rgba(0,0,0,0.35),0_3.368px_3.368px_0_rgba(0,0,0,0.25)]">
                <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_174_559)"><path d="M17.1579 4.54963V0.737305H2.8421V4.54963H7.76058V14.632H12.2394V4.54963H17.1579Z" fill="black"/><path d="M7.00952 15.4045V18.4907H4.05111V15.4045H7.00952ZM7.76515 14.6318H3.28632V19.2634H7.76515V14.6318Z" fill="black"/></g><defs><filter id="filter0_d_174_559" x="0.456137" y="0.737305" width="19.0877" height="23.2983" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2.38596"/><feGaussianBlur stdDeviation="1.19298"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_174_559"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_174_559" result="shape"/></filter></defs></svg>
              </div>
              <span className="text-[#717171] font-inter text-[16px] lowercase ml-2">/thiagopin.to</span>
            </div>
            {/* Expand button */}
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-150 ml-2"
              aria-label="Expand toolbar"
              onClick={() => setMobileToolbarOpen(true)}
            >
              <svg width={28} height={28} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 7L15 12" stroke="#F2500B" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}
        {/* MOBILE: Toolbar open (modal style) */}
        {mobileToolbarOpen && (
          <div>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setMobileToolbarOpen(false)}
              aria-label="Close toolbar overlay"
            />
            {/* Expanded toolbar */}
            <div
              className="fixed left-1/2 bottom-8 z-50 flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-[#141414] py-6 px-6 shadow-2xl transition-all duration-300"
              style={{ width: 'min(330px, 100vw)', maxWidth: 330, minWidth: 280, transform: 'translateX(-50%)' }}
            >
              {/* Close button */}
              <button
                className="absolute top-3 right-4 bg-none border-none text-2xl text-[#222] hover:text-[#e74600] focus:outline-none z-10"
                aria-label="Close toolbar"
                onClick={() => setMobileToolbarOpen(false)}
              >
                &times;
              </button>
              {/* Links vertical */}
              <nav className="flex flex-col items-center gap-6 mt-6 mb-2 w-full">
                <button className="text-white text-lg font-normal w-full py-2" style={{ fontFamily: 'Inter, sans-serif' }} onClick={() => { setMobileToolbarOpen(false); handleNav('/'); }}>Home</button>
                <button className="text-white text-lg font-normal w-full py-2" style={{ fontFamily: 'Inter, sans-serif' }} onClick={() => { setMobileToolbarOpen(false); handleNav('/about'); }}>About</button>
                <button className="text-white text-lg font-normal w-full py-2" style={{ fontFamily: 'Inter, sans-serif' }} onClick={() => { setMobileToolbarOpen(false); handleNav('/work'); }}>Work</button>
                <button className="text-white text-lg font-normal w-full py-2 toolbar-book" style={{ fontFamily: 'Inter, sans-serif' }} onClick={e => { e.stopPropagation(); setMobileToolbarOpen(false); handleBookCall(e); }}>Book a Call</button>
                <a href="https://www.linkedin.com/in/thiagovnpinto/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-2 bg-white rounded text-black text-lg font-bold gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="linkedin-icon" style={{ width: 16, height: 16, flexShrink: 0, fill: '#FFF' }}><path d="M0 1.646C0 1.013 0.526 0.5 1.175 0.5H14.825C15.474 0.5 16 1.013 16 1.646V15.354C16 15.987 15.474 16.5 14.825 16.5H1.175C0.526 16.5 0 15.987 0 15.354V1.646ZM4.943 13.894V6.669H2.542V13.894H4.943ZM3.743 5.682C4.58 5.682 5.101 5.128 5.101 4.434C5.086 3.725 4.581 3.186 3.759 3.186C2.937 3.186 2.4 3.726 2.4 4.434C2.4 5.128 2.921 5.682 3.727 5.682H3.743ZM8.651 13.894V9.859C8.651 9.643 8.667 9.427 8.731 9.273C8.904 8.842 9.299 8.395 9.963 8.395C10.832 8.395 11.179 9.057 11.179 10.029V13.894H13.58V9.75C13.58 7.53 12.396 6.498 10.816 6.498C9.542 6.498 8.971 7.198 8.651 7.691V7.716H8.635L8.651 7.691V6.669H6.251C6.281 7.347 6.251 13.894 6.251 13.894H8.651Z" fill="white"></path></svg>
                  LinkedIn
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
      {/* DESKTOP/TABLET: mantém comportamento atual */}
      <div className="items-center gap-2 w-full hidden md:flex">
        {/* Toolbar */}
        <div
          ref={toolbarRef}
          onClick={e => {
            if (
              e.target.closest('.toolbar-nav') ||
              e.target.closest('.toolbar-book')
            ) {
              return;
            }
            setExpanded(v => !v);
          }}
          className="flex justify-between items-center w-full max-w-xs sm:max-w-md md:w-[520px] md:max-w-[520px] h-[48px] px-3 py-2 box-border rounded-[100px] border border-white/10 bg-[#141414] fixed z-50 left-1/2 bottom-8 sm:bottom-12 md:bottom-16 transition-all duration-300 cursor-pointer"
          style={{ 
            boxShadow: expanded ? '0 8px 32px rgba(0,0,0,0.18)' : 'none',
            transform: 'translateX(-50%)',
            left: '50%'
          }}
        >
          {/* Conteúdo principal: ícone, texto, links */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Ícone com troca garantida */}
            <div
              className="flex items-center justify-center h-8 w-8 rounded-full bg-[#e74600] shadow-[0_3.368px_11.789px_0_rgba(0,0,0,0.35),0_3.368px_3.368px_0_rgba(0,0,0,0.25)] overflow-hidden"
              style={{ minWidth: 32, minHeight: 32, maxWidth: 32, maxHeight: 32 }}
            >
              {hoveredLink === 'home' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H10V4H8V6H6V8H4V10H2V12H4V22H11V16H13V22H20V12H22V10H20V8H18V6H16V4H14V2ZM14 4V6H16V8H18V10H20V12H18V20H15V14H9V20H6V12H4V10H6V8H8V6H10V4H14Z" fill="black"/></svg>
              )}
              {hoveredLink === 'about' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3H19.5V5H5.5V3ZM5.5 19H3.5V5H5.5V19ZM19.5 19V21H5.5V19H19.5ZM19.5 19H21.5V5H19.5V19ZM10.5 8H8.5V10H10.5V8ZM14.5 8H16.5V10H14.5V8ZM9.5 14V12H7.5V14H9.5ZM15.5 14V16H9.5V14H15.5ZM15.5 14H17.5V12H15.5V14Z" fill="black"/></svg>
              )}
              {hoveredLink === 'work' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H11V6H13V2ZM15 8H9V10H7V14H9V18H15V14H17V10H15V8ZM15 10V14H13V16H11V14H9V10H15ZM9 20H15V22H9V20ZM23 11V13H19V11H23ZM5 13V11H1V13H5ZM17 6H19V8H17V6ZM19 6H21V4H19V6ZM5 6H7V8H5V6ZM5 6V4H3V6H5Z" fill="black"/></svg>
              )}
              {hoveredLink === 'book' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 2H15V4H9V2H7V4H3V22H21V4H17V2ZM7 6H19V8H5V6H7ZM5 20V10H19V20H5ZM11 16H9V18H11V16ZM11 14V12H9V14H11ZM13 14H11V16H13V18H15V16H13V14ZM13 14V12H15V14H13Z" fill="black"/></svg>
              )}
              {hoveredLink === 'linkedin' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3H20V5H22V11H20V19H18V5H6V3ZM14 17V15H6V5H4V15H2V19H4V21H18V19H16V17H14ZM14 17V19H4V17H14ZM8 7H16V9H8V7ZM16 11H8V13H16V11Z" fill="black"/></svg>
              )}
              {!hoveredLink && (
                <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_174_559)">
                    <path d="M17.1579 4.54963V0.737305H2.8421V4.54963H7.76058V14.632H12.2394V4.54963H17.1579Z" fill="black"/>
                    <path d="M7.00952 15.4045V18.4907H4.05111V15.4045H7.00952ZM7.76515 14.6318H3.28632V19.2634H7.76515V14.6318Z" fill="black"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_174_559" x="0.456137" y="0.737305" width="19.0877" height="23.2983" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="2.38596"/>
                      <feGaussianBlur stdDeviation="1.19298"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_174_559"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_174_559" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              )}
            </div>
            {/* Texto /thiagopin.to ou typewriter - escondido em telas pequenas */}
            {!expanded && (
              <span className="text-[#717171] font-inter text-[16px] lowercase flex items-center md:flex hidden" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, minHeight: 20 }}>
                {showTypewriter ? (
                  <>
                    {typewriterText}
                    <span style={{
                      display: 'inline-block',
                      width: 10,
                      color: typewriterDone ? '#717171' : '#eb4700',
                      opacity: blink ? 1 : 0
                    }}>|</span>
                  </>
                ) : (
                  '/thiagopin.to'
                )}
              </span>
            )}
            {/* Links principais - só em desktop/tablet (md+), quando expandido */}
            {expanded && (
              <div className="md:flex hidden items-center gap-2 flex-nowrap whitespace-nowrap flex-1 ml-4">
                <button
                  className={`whitespace-nowrap text-base font-normal px-2 rounded transition-colors duration-150 ${pathname === '/' ? 'text-[#eb4700]' : 'text-white hover:bg-white/5'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  onClick={e => { e.stopPropagation(); handleNav('/'); }}
                  onMouseEnter={() => setHoveredLink('home')}
                  onMouseLeave={() => setHoveredLink(null)}
                >Home</button>
                <button
                  className={`whitespace-nowrap text-base font-normal px-2 rounded transition-colors duration-150 ${pathname === '/about' ? 'text-[#eb4700]' : 'text-white hover:bg-white/5'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  onClick={e => { e.stopPropagation(); handleNav('/about'); }}
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                >About</button>
                <button
                  className={`whitespace-nowrap text-base font-normal px-2 rounded transition-colors duration-150 ${pathname === '/work' ? 'text-[#eb4700]' : 'text-white hover:bg-white/5'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  onClick={e => { e.stopPropagation(); handleNav('/work'); }}
                  onMouseEnter={() => setHoveredLink('work')}
                  onMouseLeave={() => setHoveredLink(null)}
                >Work</button>
                <button
                  ref={calendlyTriggerRef}
                  className={`toolbar-book whitespace-nowrap text-base font-normal px-2 rounded transition-colors duration-150 text-white hover:bg-white/5`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  onClick={e => { e.stopPropagation(); handleBookCall(e); }}
                  onMouseEnter={() => setHoveredLink('book')}
                  onMouseLeave={() => setHoveredLink(null)}
                >Book a Call</button>
                <a href="https://www.linkedin.com/in/thiagovnpinto/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 bg-white rounded text-black text-base font-bold ml-2 whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={() => setHoveredLink('linkedin')}
                  onMouseLeave={() => setHoveredLink(null)}
                >in</a>
              </div>
            )}
          </div>
          {/* Botão de expansão/colapso sempre na extrema direita */}
          <div className="flex items-center ml-2 flex-shrink-0">
            <button 
              className="flex items-center justify-center w-10 h-10 md:w-7 md:h-7 rounded-full hover:bg-white/10 transition-colors duration-150" 
              onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
            >
              {!expanded ? (
                <svg width={24} height={24} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4V16" stroke="#F2500B" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4 10H16" stroke="#F2500B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width={24} height={24} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15" stroke="#F2500B" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5 5L15 15" stroke="#F2500B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Calendly Modal Overlay */}
      {showCalendlyModal && (
        <div
          id="calendly-modal-overlay"
          className="calendly-modal-overlay fixed inset-0 z-[9999] flex justify-center items-center bg-black/80"
          tabIndex={-1}
          aria-hidden={!showCalendlyModal}
          onClick={e => { if (e.target.id === 'calendly-modal-overlay') closeCalendlyModal(); }}
        >
          <div
            ref={calendlyModalRef}
            className="calendly-modal-content bg-white rounded-2xl shadow-2xl relative w-[95vw] max-w-[420px] h-[80vh] max-h-[700px] flex flex-col overflow-hidden animate-[calendly-modal-in_0.2s]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendly-modal-title"
          >
            <button
              id="calendly-modal-close-btn"
              className="calendly-modal-close absolute top-3 right-4 bg-none border-none text-2xl text-[#222] hover:text-[#e74600] focus:outline-none z-10"
              aria-label="Close modal"
              onClick={closeCalendlyModal}
            >
              &times;
            </button>
            <iframe
              id="calendly-iframe"
              src="https://calendly.com/thiagovictor/30min?background_color=1a1a1a&text_color=bfbfbf&primary_color=e74600"
              title="Book a Call with Thiago"
              frameBorder="0"
              allowTransparency="true"
              allow="fullscreen"
              className="calendly-iframe flex-1 w-full h-full min-h-[400px] bg-[#1a1a1a] rounded-b-2xl"
              style={{ minHeight: 400 }}
            ></iframe>
          </div>
          <style jsx global>{`
            .calendly-modal-overlay { transition: background 0.2s; }
            .calendly-modal-content { animation: calendly-modal-in 0.2s; }
            @keyframes calendly-modal-in {
              from { transform: translateY(40px) scale(0.98); opacity: 0; }
              to   { transform: none; opacity: 1; }
            }
            @media (max-width: 600px) {
              .calendly-modal-content {
                max-width: 98vw;
                width: 98vw;
                max-height: 90vh;
                height: 90vh;
                border-radius: 10px;
              }
              .calendly-modal-close {
                top: 8px;
                right: 10px;
                font-size: 1.7rem;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
} 