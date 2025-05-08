import './globals.css'
import { Inter, Gasoek_One } from 'next/font/google'
import Toolbar from './components/Toolbar'
import { ToolbarProvider } from './components/ToolbarContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const gasoek = Gasoek_One({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gasoek',
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: 'Thiago Pinto - Design & Experience',
  description: 'Design is the surface. Experience is the story beneath it.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${gasoek.variable}`}>
      <head>
        <link rel="icon" href="/images/favico.svg" type="image/svg+xml" />
      </head>
      <body className="font-inter bg-black text-light">
        <ToolbarProvider>
          {children}
          <Toolbar />
        </ToolbarProvider>
      </body>
    </html>
  )
} 