import type { Metadata } from 'next'
import { DM_Sans, DM_Mono, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Mario Peláez · AI Systems Engineer',
  description: 'Portafolio profesional de Mario Peláez — AI Systems Engineer, Automatización Inteligente y Fundador de MeJorÍA. Medellín, Colombia.',
  keywords: ['Mario Peláez', 'Ingeniero de Sistemas', 'IA', 'Automatización', 'Claude Code', 'n8n', 'Firebase', 'Colombia'],
  openGraph: {
    title: 'Mario Peláez · AI Systems Engineer',
    description: 'Automatización inteligente & desarrollo con IA aplicada.',
    locale: 'es_CO',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${dmMono.variable} ${dmSerif.variable}`}>
      <body className="bg-dark text-text font-sans min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
