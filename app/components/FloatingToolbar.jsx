"use client";

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Book a Call', href: '#', isModal: true },
]

const PAGE_DESCRIPTIONS = {
  '/': 'Portfolio Home – Brand & Experience Designer',
  '/about': 'About – My journey, philosophy, and design leadership',
  '/work': 'Work – Selected projects & case studies',
};

// Project descriptions for hover effect
const PROJECT_DESCRIPTIONS = {
  'brand-design': 'Brand Design – Creating memorable brand identities',
  'digital-products': 'Digital Products – Designing intuitive user experiences',
  'motion-design': 'Motion Design – Bringing designs to life',
  'ui-design': 'UI Design – Crafting beautiful interfaces',
  'ux-design': 'UX Design – Shaping user-centered experiences',
};

export default function FloatingToolbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentText, setCurrentText] = useState('/thiagopin.to')
  const [isPlusHovered, setIsPlusHovered] = useState(false)
  const [isCloseHovered, setIsCloseHovered] = useState(false)
  const [showCalendlyInline, setShowCalendlyInline] = useState(false)
  const [isToolbarHovered, setIsToolbarHovered] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)
  const pathname = usePathname();
  const router = useRouter();
  const [showHomeTooltip, setShowHomeTooltip] = useState(false);

  // Typewriter effect for page descriptions
  useEffect(() => {
    if (PAGE_DESCRIPTIONS[pathname]) {
      const text = PAGE_DESCRIPTIONS[pathname];
      let currentIndex = 0;
      setIsTyping(true);

      // Type out the text
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          
          // Wait for 2 seconds before starting to erase
          setTimeout(() => {
            // Erase the text
            const eraseInterval = setInterval(() => {
              if (currentIndex > 0) {
                currentIndex--;
                setDisplayText(text.slice(0, currentIndex));
              } else {
                clearInterval(eraseInterval);
                setIsTyping(false);
                setDisplayText('/thiagopin.to');
              }
            }, 20);
          }, 2000);
        }
      }, 50);
    } else {
      setDisplayText('/thiagopin.to');
    }
  }, [pathname]);

  // Handle project hover
  const handleProjectHover = (projectId) => {
    if (projectId && PROJECT_DESCRIPTIONS[projectId]) {
      setHoveredProject(projectId);
      setDisplayText(PROJECT_DESCRIPTIONS[projectId]);
    } else {
      setHoveredProject(null);
      setDisplayText('/thiagopin.to');
    }
  };

  const handleToolbarClick = () => {
    console.log('Toolbar clicked, isExpanded:', isExpanded);
    if (!isExpanded) {
      setIsExpanded(true)
      // Animate text deletion
      let text = '/thiagopin.to'
      const interval = setInterval(() => {
        if (text.length > 0) {
          text = text.slice(0, -1)
          setCurrentText(text)
        } else {
          clearInterval(interval)
        }
      }, 20)
    } else {
      setIsExpanded(false)
      // Animate text restoration
      let text = ''
      const interval = setInterval(() => {
        if (text.length < '/thiagopin.to'.length) {
          text = '/thiagopin.to'.slice(0, text.length + 1)
          setCurrentText(text)
        } else {
          clearInterval(interval)
        }
      }, 20)
    }
  }

  const handleNavigationClick = (e, item) => {
    console.log('Navigation clicked, item:', item);
    e.stopPropagation()
    if (item.isModal) {
      setShowCalendlyInline(true)
    }
    setIsExpanded(false)
  }

  const handleNav = (href) => {
    console.log('handleNav called with href:', href);
    router.push(href);
    setIsExpanded(false);
  };

  // SVGs exatos fornecidos
  const ToolbarLogo = (
    <svg width="32" height="39" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_174_540)">
        <path d="M20 4.52714V0H3V4.52714H8.84069V16.5H14.1593V4.52714H20Z" fill="black"/>
        <path d="M7.9488 17.4176V21.0824H4.43568V17.4176H7.9488ZM8.84611 16.5H3.5275V22H8.84611V16.5Z" fill="black"/>
      </g>
      <defs>
        <filter id="filter0_d_174_540" x="0.166667" y="0" width="22.6667" height="27.6667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2.83333"/>
          <feGaussianBlur stdDeviation="1.41667"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_174_540"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_174_540" result="shape"/>
        </filter>
      </defs>
    </svg>
  );

  // Plus icon SVGs
  const PlusIcon = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_174_569)">
        <path d="M19.5 13.5V14.5H19V15H15V19H14.5V19.5H13.5V19H13V15H9V14.5H8.5V13.5H9V13H13V9H13.5V8.5H14.5V9H15V13H19V13.5H19.5Z" fill="#F2500B"/>
      </g>
      <defs>
        <clipPath id="clip0_174_569">
          <rect width="12" height="12" fill="white" transform="translate(8 8)"/>
        </clipPath>
      </defs>
    </svg>
  );
  const PlusIconHover = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="white" fillOpacity="0.05"/>
      <g clipPath="url(#clip0_174_569)">
        <path d="M19.5 13.5V14.5H19V15H15V19H14.5V19.5H13.5V19H13V15H9V14.5H8.5V13.5H9V13H13V9H13.5V8.5H14.5V9H15V13H19V13.5H19.5Z" fill="#F2500B"/>
      </g>
      <defs>
        <clipPath id="clip0_174_569">
          <rect width="12" height="12" fill="white" transform="translate(8 8)"/>
        </clipPath>
      </defs>
    </svg>
  );

  // Close icon SVGs
  const CloseIcon = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_174_566)">
        <path d="M19.0711 8.92893L19.7782 9.63604L19.4246 9.98959L19.7782 10.3431L16.9497 13.1716L19.7782 15.9999L19.4246 16.3535L19.7782 16.707L19.0711 17.4141L18.7175 17.0606L18.364 17.4141L15.5355 14.5857L12.7071 17.4141L12.3536 17.0606L12 17.4141L11.2929 16.707L11.6464 16.3535L11.2929 15.9999L14.1213 13.1716L11.2929 10.3431L11.6464 9.98959L11.2929 9.63604L12 8.92893L12.3536 9.28248L12.7071 8.92893L15.5355 11.7574L18.364 8.92893L18.7175 9.28248L19.0711 8.92893Z" fill="#F2500B"/>
      </g>
      <defs>
        <clipPath id="clip0_174_566">
          <rect width="12" height="12" fill="white" transform="translate(8 8)"/>
        </clipPath>
      </defs>
    </svg>
  );
  const CloseIconHover = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="white" fillOpacity="0.05"/>
      <g clipPath="url(#clip0_174_566)">
        <path d="M19.0711 8.92893L19.7782 9.63604L19.4246 9.98959L19.7782 10.3431L16.9497 13.1716L19.7782 15.9999L19.4246 16.3535L19.7782 16.707L19.0711 17.4141L18.7175 17.0606L18.364 17.4141L15.5355 14.5857L12.7071 17.4141L12.3536 17.0606L12 17.4141L11.2929 16.707L11.6464 16.3535L11.2929 15.9999L14.1213 13.1716L11.2929 10.3431L11.6464 9.98959L11.2929 9.63604L12 8.92893L12.3536 9.28248L12.7071 8.92893L15.5355 11.7574L18.364 8.92893L18.7175 9.28248L19.0711 8.92893Z" fill="#F2500B"/>
      </g>
      <defs>
        <clipPath id="clip0_174_566">
          <rect width="12" height="12" fill="white" transform="translate(8 8)"/>
        </clipPath>
      </defs>
    </svg>
  );

  const LinkedInIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-4 h-4 relative" preserveAspectRatio="xMidYMid meet">
      <g clipPath="url(#clip0_172_302)">
        <path d="M-0.00146484 1.146C-0.00146484 0.513 0.524535 0 1.17354 0H14.8235C15.4725 0 15.9985 0.513 15.9985 1.146V14.854C15.9985 15.487 15.4725 16 14.8235 16H1.17354C0.524535 16 -0.00146484 15.487 -0.00146484 14.854V1.146ZM4.94153 13.394V6.169H2.54054V13.394H4.94153ZM3.74154 5.182C4.57854 5.182 5.09953 4.628 5.09953 3.934C5.08453 3.225 4.57954 2.686 3.75754 2.686C2.93554 2.686 2.39854 3.226 2.39854 3.934C2.39854 4.628 2.91954 5.182 3.72554 5.182H3.74154ZM8.64954 13.394V9.359C8.64954 9.143 8.66554 8.927 8.72954 8.773C8.90254 8.342 9.29754 7.895 9.96154 7.895C10.8305 7.895 11.1775 8.557 11.1775 9.529V13.394H13.5785V9.25C13.5785 7.03 12.3945 5.998 10.8145 5.998C9.54054 5.998 8.96954 6.698 8.64954 7.191V7.216H8.63354L8.64954 7.191V6.169H6.24954C6.27954 6.847 6.24954 13.394 6.24954 13.394H8.64954Z" fill="#C2C2C2"></path>
      </g>
      <defs>
        <clipPath id="clip0_172_302"><rect width="16" height="16" fill="white" transform="translate(-0.00146484)"></rect></clipPath>
      </defs>
    </svg>
  );

  // Atalho B abre Calendly inline
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key.toLowerCase() === 'b') {
        setShowCalendlyInline(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToolbarKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToolbarClick();
    }
  };

  return (
    <>
      {/* Calendly Inline Widget */}
      {showCalendlyInline && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 font-inter" onClick={() => setShowCalendlyInline(false)}>
          <div className="bg-[#1a1a1a] rounded-xl shadow-xl p-0 relative font-inter" style={{ minWidth: 320, width: '100%', maxWidth: 480, height: 700 }} onClick={e => e.stopPropagation()}>
            <div className="absolute top-2 right-2 z-10">
              <button onClick={() => setShowCalendlyInline(false)} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 font-inter">✕</button>
            </div>
            <div className="w-full h-full">
              <div className="calendly-inline-widget" data-url="https://calendly.com/thiagovictor/30min?background_color=1a1a1a&text_color=c5c3c3&primary_color=eb4700" style={{ minWidth: 320, height: 700 }}></div>
            </div>
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          </div>
        </div>
      )}
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex justify-between items-center ${isExpanded ? 'w-[620px] h-10' : 'w-[308px]'} p-2 rounded-[100px] font-inter cursor-pointer toolbar-cursor transition-all duration-300 ease-in-out ${isToolbarHovered ? 'bg-[#181818] scale-[1.025] shadow-toolbar-pulse' : 'bg-[#141414]'}`}
        data-toolbar-cursor="true"
        style={{ boxShadow: isToolbarHovered ? '0 0 0 0.5rem rgba(235,71,0,0.08), 0px 3.4px 12px 0 rgba(0,0,0,0.35), 0px 3.4px 3.4px 0 rgba(0,0,0,0.25)' : '0px 3.4px 12px 0 rgba(0,0,0,0.35), 0px 3.4px 3.4px 0 rgba(0,0,0,0.25)', pointerEvents: 'auto', cursor: 'pointer' }}
        onClick={handleToolbarClick}
        onKeyDown={handleToolbarKeyDown}
        onMouseEnter={() => setIsToolbarHovered(true)}
        onMouseLeave={() => {
          setIsToolbarHovered(false);
          handleProjectHover(null);
        }}
        role="button"
        tabIndex={0}
        aria-label="Expandir ou recolher toolbar"
      >
        {/* Logo */}
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2">
          <div
            className="flex flex-col justify-end items-center flex-grow-0 flex-shrink-0 h-7 w-7 relative overflow-hidden gap-[6.736842155456543px] p-[6.736842155456543px] rounded-[42.11px] bg-[#e74600] transition-all duration-300 ease-in-out"
            style={{ boxShadow: '0px 3.3684210777282715px 11.789473533630371px 0 rgba(0,0,0,0.35), 0px 3.3684210777282715px 3.3684210777282715px 0 rgba(0,0,0,0.25)' }}
          >
            {ToolbarLogo && typeof ToolbarLogo === 'object' &&
              ToolbarLogo.type === 'svg'
              ? <ToolbarLogo.type {...ToolbarLogo.props} style={{ ...ToolbarLogo.props.style, pointerEvents: 'none' }} />
              : ToolbarLogo}
          </div>
          {!isExpanded && (
            <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#f1f1f1] transition-all duration-300 ease-in-out" style={{ minWidth: 0, maxWidth: 220, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <span className="flex-grow-0 flex-shrink-0 text-base font-bold text-left lowercase text-[#f1f1f1] transition-all duration-300 ease-in-out">
                {displayText}
                <span className="inline-block w-[2px] h-[1em] ml-[2px] align-middle animate-blink" style={{background:isTyping?'#E74600':'#666'}}></span>
              </span>
            </p>
          )}
        </div>
        {/* Menu expandido */}
        {isExpanded && (
          <>
            <div style={{position:'relative',display:'inline-block'}} onMouseEnter={()=>setShowHomeTooltip(true)} onMouseLeave={()=>setShowHomeTooltip(false)}>
              <p 
                className={`flex-grow-0 flex-shrink-0 text-base text-left ${pathname === '/' ? 'text-[#eb4700]' : 'text-white'} cursor-pointer transition-all duration-300 ease-in-out hover:text-[#eb4700]`} 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} 
                onClick={e => { e.stopPropagation(); handleNav('/'); }}
              >
                Home
              </p>
              {showHomeTooltip && (
                <span style={{position:'absolute',top:'110%',left:'50%',transform:'translateX(-50%)',background:'#222',color:'#fff',padding:'6px 14px',borderRadius:'8px',fontSize:'13px',whiteSpace:'nowrap',zIndex:100,boxShadow:'0 2px 8px rgba(0,0,0,0.18)'}}>
                  Ir para a página inicial
                </span>
              )}
            </div>
            <p 
              className={`flex-grow-0 flex-shrink-0 text-base text-left ${pathname === '/about' ? 'text-[#eb4700]' : 'text-white'} cursor-pointer transition-all duration-300 ease-in-out hover:text-[#eb4700]`} 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} 
              onClick={e => { e.stopPropagation(); handleNav('/about'); }}
            >
              About
            </p>
            <p 
              className={`flex-grow-0 flex-shrink-0 text-base text-left ${pathname === '/work' ? 'text-[#eb4700]' : 'text-white'} cursor-pointer transition-all duration-300 ease-in-out hover:text-[#eb4700]`} 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} 
              onClick={e => { 
                e.stopPropagation(); 
                handleNav('/work'); 
              }}
              onMouseEnter={() => handleProjectHover('brand-design')}
              onMouseLeave={() => handleProjectHover(null)}
            >
              Work
            </p>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[152.34px] relative gap-6">
              <p 
                className="flex-grow-0 flex-shrink-0 text-base text-left text-white cursor-pointer transition-all duration-300 ease-in-out hover:text-[#eb4700]" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} 
                onClick={e => handleNavigationClick(e, { isModal: true })}
              >
                Book a Call
              </p>
              {LinkedInIcon}
            </div>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 h-7 gap-2.5 rounded-[50px] bg-white/5 transition-all duration-300 ease-in-out">
              <div
                className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1 px-2 rounded-lg bg-transparent transition-all duration-300 ease-in-out"
                onMouseEnter={() => setIsCloseHovered(true)}
                onMouseLeave={() => setIsCloseHovered(false)}
              >
                {isCloseHovered ? CloseIconHover : CloseIcon}
              </div>
            </div>
          </>
        )}
        {!isExpanded && (
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 h-7 gap-2.5 rounded-[50px] expand-btn" onClick={e => { e.stopPropagation(); setIsExpanded(true); }}>
            <div
              className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1 px-2 rounded-lg transition-colors"
              onMouseEnter={() => setIsPlusHovered(true)}
              onMouseLeave={() => setIsPlusHovered(false)}
            >
              {isPlusHovered ? PlusIconHover : PlusIcon}
            </div>
          </div>
        )}
      </div>
    </>
  )
} 