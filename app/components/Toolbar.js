"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { useToolbar } from './ToolbarContext'

// Dynamic import with SSR disabled for client-only component
const NavigationOverlay = dynamic(() => import('./NavigationOverlay'), { 
  ssr: false,
  loading: () => null // No loading state needed as it's initially hidden
})

const HINT_TEXT = 'click or press arrow up go to deeper'
const RETURN_TEXT = 'click or press arrow down to return'
const DEFAULT_TEXT = '/thiagopin.to'

const DROPDOWN_LINKS = [
  {
    label: 'Home',
    href: '/',
    icon: '/images/globe.svg',
    shortcut: 'H'
  },
  {
    label: 'Work',
    href: '/work',
    icon: '/images/eye.svg',
    shortcut: 'W'
  },
  {
    label: 'About',
    href: '/profile',
    icon: '/images/avatar.png',
    shortcut: 'A'
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: '/images/work/icon-cs.png',
    shortcut: 'C'
  },
  { separator: true },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thiagovnpinto/',
    icon: 'linkedin',
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thiagopin_to',
    icon: 'instagram',
    external: true,
  },
]

// NAV_HINTS agora é função para filtrar a página ativa
function getNavHints(currentPath) {
  return [
    { text: 'Press H to go Home', key: 'H', href: '/' },
    { text: 'Press W to see my work', key: 'W', href: '/work' },
    { text: 'Press A to learn more about me', key: 'A', href: '/profile' },
    { text: 'Press C to contact me', key: 'C', href: '/contact' },
  ].filter(hint => hint.href !== currentPath);
}

// Slot-style icon animation for toolbar
function SlotIcon({ isActive, direction }) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-md shadow-[0px_4px_14px_rgba(0,0,0,0.35)] transition-colors duration-300 ${isActive ? 'bg-[#EB4700]' : 'bg-primary'}`}>
      <div className="relative h-[24px] w-[24px] flex items-center justify-center">
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          <Image
            src="/images/T.svg"
            alt="T"
            width={17}
            height={13}
            className="mx-auto transition-all duration-300"
            style={{zIndex: 2}}
          />
        </span>
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${direction === 'down' ? 'rotate-180' : ''}`}> 
          <Image
            src="/images/arrow-up.svg"
            alt="arrow"
            width={24}
            height={24}
            className="mx-auto transition-all duration-300"
          />
        </span>
      </div>
    </div>
  )
}

// Separate client-only component for dynamic content
function DynamicToolbarContent({ 
  isHovered, 
  scrollFeedback, 
  displayed, 
  showCursor, 
  isClient 
}) {
  // Only animate slot if scrollFeedback is active
  const isActive = isClient && !!scrollFeedback;
  const direction = scrollFeedback?.icon === 'down' ? 'down' : 'up';
  return (
    <>
      <SlotIcon isActive={isActive} direction={direction} />
      <span className="font-mono text-xs font-semibold tracking-[0.08em] text-light flex-1 flex items-center justify-center min-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis text-left pr-2 min-h-[40px]">
        {isClient ? (scrollFeedback ? scrollFeedback.text : displayed) : DEFAULT_TEXT}
        {isClient && (
          <span className={`ml-1 w-2 ${showCursor ? 'opacity-100' : 'opacity-0'} animate-blink`}>|</span>
        )}
      </span>
    </>
  )
}

export default function Toolbar() {
  // State initialization with default values
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selected, setSelected] = useState('Home')
  const { hoverText } = useToolbar()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [displayed, setDisplayed] = useState(DEFAULT_TEXT)
  const [hintText, setHintText] = useState('');

  // Client-side initialization
  useEffect(() => { 
    setIsClient(true)
    setDisplayed(DEFAULT_TEXT)
  }, [])

  // Keyboard event handling
  useEffect(() => {
    if (!isClient) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') setIsOpen(true)
      if (e.key === 'ArrowDown') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isClient])

  // Hint display logic (agora aparece em todas as páginas)
  useEffect(() => {
    if (!isClient || isOpen) return;
    let interval;
    function showRandomHint() {
      const hints = getNavHints(pathname);
      if (hints.length === 0) return;
      const idx = Math.floor(Math.random() * hints.length);
      setHintText(hints[idx].text);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3200);
    }
    showRandomHint();
    interval = setInterval(showRandomHint, 18000);
    return () => clearInterval(interval);
  }, [isOpen, isClient, pathname]);

  // Hover hint logic
  useEffect(() => {
    if (!isClient) return
    if (isHovered) setShowHint(true)
    else setTimeout(() => setShowHint(false), 300)
  }, [isHovered, isClient])

  // Scroll detection
  useEffect(() => {
    if (!isClient) return
    function checkScroll() {
      const scrollY = window.scrollY
      const innerH = window.innerHeight
      const bodyH = document.body.offsetHeight
      setCanScrollDown(innerH + scrollY < bodyH - 10)
      setAtBottom(innerH + scrollY >= bodyH - 10)
    }
    checkScroll()
    window.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [isClient])

  // Text content management
  const defaultText = isOpen ? RETURN_TEXT : DEFAULT_TEXT
  const targetText = isClient
    ? (showHint && hintText
        ? hintText
        : (hoverText || defaultText))
    : DEFAULT_TEXT;

  // Typewriter animation
  useEffect(() => {
    if (!isClient) return
    if (displayed === targetText) return
    let timeout
    setDisplayed('')
    let i = 0
    function type() {
      setDisplayed(targetText.slice(0, i))
      if (i <= targetText.length) {
        timeout = setTimeout(type, 18 + Math.random() * 40)
        i++
      }
    }
    type()
    return () => clearTimeout(timeout)
  }, [targetText, isClient])

  // Cursor blinking
  useEffect(() => {
    if (!isClient) return
    const interval = setInterval(() => setShowCursor((c) => !c), 500)
    return () => clearInterval(interval)
  }, [isClient])

  // Scroll feedback
  const scrollFeedback = isHovered
    ? canScrollDown
      ? atBottom
        ? { icon: 'up', text: 'Back to top' }
        : { icon: 'down', text: 'Scroll down for more' }
      : null
    : null;

  // Smooth scroll handler
  function handleToolbarClick() {
    if (!isClient || !scrollFeedback) return
    if (scrollFeedback.icon === 'down') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    } else if (scrollFeedback.icon === 'up') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Active link detection
  const activeLink = DROPDOWN_LINKS.find(
    l => !l.separator && !l.external && (pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href)))
  ) || DROPDOWN_LINKS[0]

  return (
    <>
      <NavigationOverlay isOpen={isOpen} />
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
        <div
          className={`relative flex w-[520px] max-w-full items-center justify-between gap-[24px] rounded-2xl border border-white/10 bg-dark px-6 py-4 cursor-pointer transition-all duration-500 translate-y-0 opacity-100 scale-100 pointer-events-auto
            ${isHovered ? 'ring-2 ring-[#EB4700]/40 border-[#EB4700] scale-105 shadow-[0_0_24px_0_rgba(235,71,0,0.18)]' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleToolbarClick}
        >
          <div className="flex items-center gap-4">
            <DynamicToolbarContent
              isHovered={isHovered}
              scrollFeedback={scrollFeedback}
              displayed={displayed}
              showCursor={showCursor}
              isClient={isClient}
            />
          </div>
          <div
            className="flex items-center gap-2 select-none relative ml-2 flex-shrink-0"
            onClick={e => e.stopPropagation()}
            style={{height: 40}}
          >
            <DropdownMenu />
          </div>
        </div>
      </div>
      <style jsx global>{`
        .animate-blink { animation: blink 1s steps(2, start) infinite; }
        @keyframes blink { to { opacity: 0; } }
        .animate-fadeInUp { animation: fadeInUp 0.18s cubic-bezier(.39,.575,.565,1.000) both; }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const { setHoverText } = useToolbar();
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef(null);
  const activeLink = DROPDOWN_LINKS.find(
    l => !l.separator && !l.external && (pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href)))
  ) || DROPDOWN_LINKS[0];

  // Feedback customizado para cada link
  function getHoverText(link) {
    switch (link.label) {
      case 'Home': return 'Go to Home';
      case 'Work': return 'See my work';
      case 'About': return 'Learn more about me';
      case 'Contact': return 'Contact me';
      case 'LinkedIn': return 'Visit my LinkedIn (opens in new tab)';
      case 'Instagram': return 'See my Instagram (opens in new tab)';
      default: return `Go to ${link.label}`;
    }
  }

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Suporte a teclado
  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o);
    if (e.key === 'Escape') setOpen(false);
  }

  // Agrupar links internos e externos
  const internalLinks = DROPDOWN_LINKS.filter(l => !l.separator && !l.external);
  const externalLinks = DROPDOWN_LINKS.filter(l => l.external);

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const key = e.key.toLowerCase();
      const link = DROPDOWN_LINKS.find(l => l.shortcut.toLowerCase() === key);
      
      if (link) {
        e.preventDefault();
        router.push(link.href);
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center h-10 gap-2 rounded-xl bg-transparent hover:bg-white/5 transition-colors focus:outline-none px-2 flex-shrink-0 min-w-[120px]"
        onClick={() => setOpen(open => !open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{minWidth: 0}}
        onMouseEnter={() => {
          setHoverText('');
          setTimeout(() => setHoverText(getHoverText(activeLink)), 10);
        }}
        onMouseLeave={() => setHoverText('')}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <span className="flex items-center justify-center w-[30px] h-[30px] rounded-[4px] bg-black">
          <Image src={activeLink.icon} alt="icon" width={20} height={20} className="object-contain" />
        </span>
        <span className="text-white font-inter text-[16px] font-normal leading-none flex items-center" style={{height: 40, minWidth: 60}}>{activeLink.label}</span>
        {/* Chevron à direita */}
        <span className="flex items-center justify-center w-4 h-10 ml-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform ${open ? 'rotate-180' : ''}`}> <polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </button>
      {open && (
        <div className="absolute left-0 bottom-14 min-w-[200px] z-50 bg-dark rounded-2xl shadow-lg border border-white/10 py-2 animate-fadeInUp" style={{marginBottom: '4px'}} role="listbox">
          {/* Grupo de links internos */}
          <div className="overflow-hidden rounded-t-2xl">
            {internalLinks.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block px-4 py-2 text-sm ${
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                } transition-colors`}
                onClick={() => setOpen(false)}
                onMouseEnter={() => {
                  setHoverText('');
                  setTimeout(() => setHoverText(getHoverText(link)), 10);
                }}
                onMouseLeave={() => setHoverText('')}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  <span className="text-xs text-gray-400 font-mono bg-white/5 px-1.5 py-0.5 rounded">{link.shortcut}</span>
                </div>
              </Link>
            ))}
          </div>
          {/* Separador */}
          <div className="border-t border-white/10 my-2 mx-2" />
          {/* Grupo de links externos */}
          <div className="overflow-hidden rounded-b-2xl">
            {externalLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center h-12 gap-3 w-full px-3 text-white text-[16px] font-normal cursor-pointer transition-colors focus:outline-none
                  hover:bg-white/10
                  ${idx === 0 ? 'rounded-t-xl' : ''}
                  ${idx === externalLinks.length - 1 ? 'rounded-b-2xl' : ''}`}
                onMouseEnter={() => {
                  setHoverText('');
                  setTimeout(() => setHoverText(getHoverText(link)), 10);
                }}
                onMouseLeave={() => setHoverText('')}
                tabIndex={0}
              >
                <span className="flex items-center justify-center w-[30px] h-[30px] rounded-[4px] bg-black">
                  {link.icon === 'linkedin' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/></svg>
                  ) : link.icon === 'instagram' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  ) : (
                    <Image src={link.icon} alt="icon" width={20} height={20} className="object-contain" />
                  )}
                </span>
                {link.label}
                <span className="ml-auto text-xs text-gray-400">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.18s cubic-bezier(.39,.575,.565,1.000) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 