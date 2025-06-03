import './globals.css'
import { Inter } from 'next/font/google'
import FloatingToolbar from './components/ui/FloatingToolbar'
import Script from 'next/script'
import KeyboardShortcutsProvider from './components/KeyboardShortcutsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Thiago Pinto | Product Designer & Developer',
  description: 'Product Designer & Developer based in Malta, focused on creating beautiful and functional digital experiences.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/favico.svg" type="image/svg+xml" />
        <link href="https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap" rel="stylesheet" />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        {/* Curved Scroll Progress Bar CSS */}
        <style>{`
          .progress-container {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            pointer-events: none;
          }
          .progress-container svg {
            display: block;
            width: 32px;
            height: 80vh;
            min-height: 300px;
            max-height: 700px;
          }
          .scroll-container {
            flex: 1 1 auto;
            height: 100vh;
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
            scroll-behavior: smooth;
          }
          section {
            height: 100vh;
            scroll-snap-align: start;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: 0.02em;
            /* background: #232323; */
            /* border-bottom: 1px solid #222; */
            transition: background 0.3s;
          }
          section:nth-child(odd) {
            /* background: #181818; */
          }
          @media (max-width: 600px) {
            .progress-container {
              width: 32px;
            }
            .progress-container svg {
              width: 16px;
              height: 60vh;
              min-height: 180px;
            }
            section {
              font-size: 1.2rem;
            }
          }
        `}</style>
      </head>
      <body className={inter.className}>
        {/* Curved Progress Bar Overlay */}
        <div className="progress-container">
          <svg id="progress-svg" viewBox="0 0 32 700" fill="none">
            <path
              id="progress-path"
              d="M16 20 Q32 120 16 220 Q0 320 16 420 Q32 520 16 620"
              stroke="#E74600"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {/* Main scrollable content wrapper */}
        <div className="scroll-container" id="scroll-container">
          {children}
        </div>
        {/* Curved Progress Bar JS */}
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            var scrollContainer = document.getElementById('scroll-container');
            var progressPath = document.getElementById('progress-path');
            if (!scrollContainer || !progressPath) return;
            var pathLength = progressPath.getTotalLength();
            progressPath.style.strokeDasharray = pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            function updateProgress() {
              var scrollTop = scrollContainer.scrollTop;
              var scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
              var progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
              progressPath.style.strokeDashoffset = pathLength - (pathLength * progress);
            }
            scrollContainer.addEventListener('scroll', updateProgress);
            window.addEventListener('resize', updateProgress);
            updateProgress();
          })();
        `}} />
        {/* KeyboardShortcutsProvider and FloatingToolbar remain outside scroll-container */}
        <KeyboardShortcutsProvider />
        <FloatingToolbar />
      </body>
    </html>
  )
} 