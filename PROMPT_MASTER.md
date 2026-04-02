# PROMPT MASTER — Portafolio Mario Peláez en React
## Instrucción completa para Antigravity + Claude Code

---

> **LEE ESTO PRIMERO:** Este documento es la instrucción completa para construir el portafolio profesional de Mario Peláez migrando desde HTML/CSS/JS vanilla a un stack moderno con Next.js 15, Tailwind CSS y Framer Motion. Sigue cada paso en orden. No improvises estructura — sigue exactamente la arquitectura definida aquí.

---

## PASO 1 — Verificar rama y entorno

```bash
git branch
# Debe mostrar: * develop
# Si no, ejecutar: git checkout develop

node --version   # Debe ser >= 18
npm --version
```

---

## PASO 2 — Crear el proyecto Next.js 15

Ejecuta este comando en la raíz del repositorio. Responde las preguntas interactivas EXACTAMENTE así:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Respuestas esperadas al CLI:
- TypeScript → Yes
- ESLint → Yes
- Tailwind CSS → Yes
- `src/` directory → Yes
- App Router → Yes
- Import alias → Yes (`@/*`)
- Git → No (ya existe el repo)

---

## PASO 3 — Instalar dependencias adicionales

```bash
npm install framer-motion lucide-react clsx
```

- `framer-motion` — animaciones de entrada scroll-triggered y micro-interacciones
- `lucide-react` — íconos limpios para stack, redes sociales
- `clsx` — utilidad para combinar clases Tailwind condicionalmente

---

## PASO 4 — Configurar el design system en Tailwind

Reemplaza el contenido de `tailwind.config.ts` con:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fondos — de más oscuro a más claro
        dark:    '#0D0D0B',
        dark2:   '#141412',
        dark3:   '#1C1C19',
        dark4:   '#242420',
        // Texto
        text:        '#E8E6DF',
        'text-dim':  '#8A8880',
        'text-dimmer': '#555450',
        // Acento ámbar
        amber:       '#EF9F27',
        'amber-dim': '#BA7517',
        // Estado
        terminal:    '#22c55e',
      },
      fontFamily: {
        mono:  ['DM Mono', 'monospace'],
        sans:  ['DM Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      maxWidth: {
        content: '900px',
      },
      animation: {
        'scroll-left': 'scrollLeft 28s linear infinite',
        'blink': 'blink 2s infinite',
      },
      keyframes: {
        scrollLeft: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## PASO 5 — Configurar fuentes en layout global

Reemplaza `src/app/layout.tsx` con:

```tsx
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
```

---

## PASO 6 — CSS global

Reemplaza `src/app/globals.css` con:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

@layer utilities {
  .amber-glow {
    background-color: rgba(239, 159, 39, 0.12);
  }
  .amber-border {
    border-color: rgba(239, 159, 39, 0.3);
  }
  .border-subtle {
    border-color: rgba(255, 255, 255, 0.07);
  }
}
```

---

## PASO 7 — Arquitectura de componentes

Crea la siguiente estructura de carpetas dentro de `src/`:

```
src/
├── app/
│   ├── layout.tsx          ← ya configurado
│   ├── globals.css         ← ya configurado
│   └── page.tsx            ← página principal — importa todas las secciones
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      ← navegación sticky
│   │   ├── Footer.tsx      ← pie de página
│   │   └── WhatsAppFloat.tsx ← botón flotante
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── AIAction.tsx
│       ├── Stack.tsx
│       ├── Experience.tsx
│       ├── Certificates.tsx
│       └── Contact.tsx
├── data/
│   ├── certificates.ts     ← array de certificados
│   ├── experience.ts       ← array de experiencia laboral
│   ├── stack.ts            ← array de herramientas
│   └── ia-services.ts      ← array de servicios de IA
└── lib/
    └── utils.ts            ← función cn() para clsx + tailwind-merge
```

---

## PASO 8 — Archivos de datos (data layer)

### `src/data/certificates.ts`
```typescript
export interface Certificate {
  name: string
  issuer: string
  year: string
}

export const certificates: Certificate[] = [
  { name: 'Implementación de IA para Eficiencia Competitiva Empresarial', issuer: 'SENA', year: '2025' },
  { name: 'Inteligencia de Negocios y Minería de Datos', issuer: 'Uniguajira · Diplomado 150h', year: '2025' },
  { name: 'Servicio al Cliente: Un Reto Personal', issuer: 'SENA', year: '2025' },
  { name: 'Formación en Criptomonedas y Blockchain', issuer: 'Bit2Me Academy', year: '2023' },
  { name: 'Video Assist', issuer: 'Congo Films School', year: '2023' },
  { name: 'Sandbox Audiovisual Colombia', issuer: 'BID · Netflix · Min. Culturas', year: '2024' },
  { name: 'Certificación Subsistema Horizontal de Cableado Estructurado', issuer: 'SENA', year: '2021' },
  { name: 'Diseño de Cableado de Redes de Datos para Telecomunicaciones', issuer: 'SENA', year: '2021' },
  { name: 'Diseño de Redes Inalámbricas', issuer: 'SENA', year: '2021' },
  { name: 'Fundamentos de Redes de Datos', issuer: 'SENA', year: '2021' },
  { name: 'Proponer Alternativas de Solución de Conflictos y Liderazgo', issuer: 'SENA', year: '2016' },
  { name: 'Ciencias Básicas en Matemáticas y Física', issuer: 'SENA', year: '2017' },
]
```

### `src/data/experience.ts`
```typescript
export interface ExperienceItem {
  period: string
  type: string
  role: string
  company: string
  location: string
  description: string
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    period: 'AGO 2025',
    type: 'INDEPENDIENTE',
    role: 'Desarrollador de Software & Automatización',
    company: 'Centro Coworking',
    location: 'Riohacha, La Guajira',
    description: 'Sistema digital completo de gestión de clientes, servicios y caja — reemplazando flujos manuales en Excel. Dashboards financieros y operativos en Looker Studio. Construido íntegramente con Claude Code + Firebase.',
    tags: ['Claude Code', 'Firebase', 'Looker Studio', 'React'],
  },
  {
    period: 'FEB 2024 – AGO 2024',
    type: 'PRÁCTICAS',
    role: 'Practicante – Coordinación de Contratos',
    company: 'Cerrejón (Glencore)',
    location: 'Albania, La Guajira',
    description: 'Digitalización y gestión estructurada de información contractual bajo estándares estrictos. Desarrollo de aplicación en Power Apps para automatizar solicitudes internas.',
    tags: ['Power Apps', 'Digitalización', 'Contratos'],
  },
  {
    period: 'FEB 2022 – NOV 2024',
    type: 'TIEMPO COMPLETO',
    role: 'Analista Junior de Datos',
    company: 'ALVITEK S.A.S',
    location: 'Fonseca, La Guajira',
    description: 'Extracción, transformación y análisis de datos para decisiones estratégicas. Reportes interactivos en Power BI que redujeron tiempos de análisis. Evaluación de costos y rentabilidad de proyectos.',
    tags: ['Power BI', 'SQL', 'Análisis de datos', 'ETL'],
  },
]
```

### `src/data/stack.ts`
```typescript
export interface StackItem {
  badge: string
  name: string
  description: string
}

export const stack: StackItem[] = [
  { badge: 'AI',  name: 'Claude Code + Claude AI', description: 'Ecosistema principal de desarrollo' },
  { badge: 'n8n', name: 'n8n',                    description: 'Automatización y flujos de trabajo' },
  { badge: 'FB',  name: 'Firebase',               description: 'Base de datos y backend' },
  { badge: 'BI',  name: 'Power BI · Looker Studio',description: 'Análisis y visualización de datos' },
  { badge: 'SQL', name: 'SQL',                    description: 'Gestión y consulta de bases de datos' },
  { badge: 'PA',  name: 'Power Apps',             description: 'Apps empresariales low-code' },
  { badge: 'GH',  name: 'GitHub',                 description: 'Control de versiones y colaboración' },
  { badge: 'API', name: 'Webhooks · APIs REST',   description: 'Integraciones y conectividad' },
]
```

### `src/data/ia-services.ts`
```typescript
export interface IAService {
  icon: string
  title: string
  description: string
}

export const iaServices: IAService[] = [
  { icon: '>_',  title: 'Automatización de procesos',    description: 'Flujos n8n, webhooks y APIs que reemplazan tareas manuales repetitivas con precisión quirúrgica.' },
  { icon: '</>',  title: 'Desarrollo sin código manual',  description: 'Aplicaciones web completas construidas con Claude Code + Claude AI como ecosistema de ingeniería.' },
  { icon: '◈',   title: 'Análisis e inteligencia de datos', description: 'Dashboards en Power BI y Looker Studio. Decisiones basadas en datos, no en intuición.' },
  { icon: '⬡',   title: 'Digitalización empresarial',   description: 'Transformo flujos manuales en Excel en sistemas digitales con Firebase y bases de datos estructuradas.' },
  { icon: '◎',   title: 'Formación en IA para PYMEs',   description: 'Programas prácticos de entrenamiento para que equipos adopten IA en su operación diaria.' },
  { icon: '⟡',   title: 'Arquitectura de soluciones',   description: 'Diseño de sistemas multi-agente y flujos complejos con herramientas de última generación.' },
]
```

### `src/lib/utils.ts`
```typescript
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
```

---

## PASO 9 — Página principal

### `src/app/page.tsx`
```tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import AIAction from '@/components/sections/AIAction'
import Stack from '@/components/sections/Stack'
import Experience from '@/components/sections/Experience'
import Certificates from '@/components/sections/Certificates'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <AIAction />
        <Stack />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
```

---

## PASO 10 — Componentes de layout

### `src/components/layout/Navbar.tsx`

Navegación sticky con efecto glassmorphism oscuro. Usa `'use client'` porque necesita estado para el scroll activo.

```tsx
'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'inicio',       href: '#hero' },
  { label: 'sobre mí',     href: '#sobre' },
  { label: 'IA',           href: '#ia' },
  { label: 'stack',        href: '#stack' },
  { label: 'experiencia',  href: '#experiencia' },
  { label: 'certificados', href: '#certificados' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between px-8 h-14 border-b border-white/[0.07] transition-all ${
      scrolled ? 'bg-dark/95 backdrop-blur-md' : 'bg-dark/80'
    }`}>
      {/* Logo */}
      <div className="font-mono text-[13px] tracking-wide">
        <span className="text-amber">mp</span>
        <span className="text-text-dim">@portfolio</span>
        {' '}
        <span className="text-terminal">~</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-mono text-[12px] text-text-dim px-4 h-14 flex items-center border-b-2 border-transparent hover:text-amber hover:border-amber transition-all tracking-wider"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contacto"
        className="font-mono text-[12px] bg-amber text-dark px-4 py-[7px] rounded font-medium tracking-wide hover:opacity-85 transition-opacity"
      >
        contacto →
      </a>
    </nav>
  )
}
```

### `src/components/layout/Footer.tsx`
```tsx
export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/[0.07] py-6 px-8 text-center">
      <p className="font-mono text-[11px] text-text-dimmer tracking-wide">
        Diseñado y construido con{' '}
        <span className="text-amber">Claude Code + Claude AI</span>
        {' '}· Mario Peláez © 2025 · Medellín, Colombia
      </p>
    </footer>
  )
}
```

### `src/components/layout/WhatsAppFloat.tsx`
```tsx
export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/573006707219"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-[52px] h-[52px] rounded-full bg-[#25d366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  )
}
```

---

## PASO 11 — Componentes de secciones

### Patrón común para TODAS las secciones

Cada sección usa este patrón de header:
```tsx
<div className="flex items-center gap-4 mb-10">
  <span className="font-mono text-[11px] text-amber/70 uppercase tracking-widest whitespace-nowrap">
    0N / nombre sección
  </span>
  <div className="flex-1 h-px bg-white/[0.07]" />
</div>
<h2 className="font-serif text-[2rem] text-text mb-5">Título</h2>
```

Y este wrapper para secciones normales:
```tsx
<section id="id-seccion" className="py-20 px-8 max-w-content mx-auto">
```

Para secciones wide (fondo dark2):
```tsx
<section id="id-seccion" className="py-20 px-8 bg-dark2">
  <div className="max-w-content mx-auto">
```

---

### `src/components/sections/Hero.tsx`
```tsx
'use client'
import { motion } from 'framer-motion'

const stats = [
  { num: '3+', label: 'años de experiencia' },
  { num: '10+', label: 'certificaciones' },
  { num: '100%', label: 'AI-powered workflow' },
  { num: '∞', label: 'posibilidades con IA' },
]

export default function Hero() {
  return (
    <section id="hero" className="py-16 px-8 max-w-content mx-auto">
      {/* Terminal tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 font-mono text-[12px] text-terminal tracking-wider"
      >
        <span className="w-2 h-2 rounded-full bg-terminal animate-blink" />
        disponible para proyectos · Medellín, Colombia
      </motion.div>

      {/* Nombre */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif text-[clamp(2.8rem,7vw,5rem)] leading-[1.05] text-text mt-2"
      >
        Mario<br />
        <em className="text-amber not-italic italic">Peláez</em>
      </motion.h1>

      {/* Título profesional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-mono text-[14px] text-amber-dim uppercase tracking-[0.08em] mt-1"
      >
        AI Systems Engineer · Automatización Inteligente · Fundador MeJorÍA
      </motion.div>

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-[16px] leading-[1.7] text-text-dim max-w-[600px] mt-3"
      >
        Ingeniero de Sistemas con enfoque en la aplicación práctica de Inteligencia
        Artificial para digitalizar procesos, automatizar flujos y crear soluciones
        de software reales — sin escribir una sola línea de código tradicional.
      </motion.p>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex gap-3 mt-6 flex-wrap"
      >
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 bg-amber text-dark font-mono text-[13px] font-medium px-6 py-3 rounded tracking-wide hover:opacity-88 hover:-translate-y-px transition-all"
        >
          Hablemos ↗
        </a>
        <a
          href="#experiencia"
          className="inline-flex items-center gap-2 bg-transparent text-text-dim border border-white/[0.07] font-mono text-[13px] px-6 py-3 rounded tracking-wide hover:border-amber/30 hover:text-amber transition-all"
        >
          Ver experiencia →
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex gap-8 mt-10 pt-8 border-t border-white/[0.07] flex-wrap"
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <div className="font-serif text-[2rem] text-amber leading-none">{s.num}</div>
            <div className="font-mono text-[11px] text-text-dimmer uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
```

### `src/components/sections/About.tsx`
```tsx
'use client'
import { motion } from 'framer-motion'

const education = [
  { name: 'Ingeniería de Sistemas', institution: 'Universidad de La Guajira · 2025' },
  { name: 'Diplomado en Inteligencia de Negocios y Minería de Datos', institution: 'Uniguajira · 2025 · 150 horas' },
  { name: 'IA para la Eficiencia Competitiva', institution: 'SENA · 2025 · 40 horas' },
]

export default function About() {
  return (
    <section id="sobre" className="py-20 px-8 max-w-content mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <span className="font-mono text-[11px] text-amber/70 uppercase tracking-widest whitespace-nowrap">01 / sobre mí</span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>
      <h2 className="font-serif text-[2rem] text-text mb-8">El perfil</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[15px] leading-[1.8] text-text-dim mb-4">
            Soy Ingeniero de Sistemas egresado en 2025, con un perfil autodidacta y orientado a resultados.
            Me especializo en usar Inteligencia Artificial como herramienta de construcción — no como
            asistente, sino como ecosistema completo de trabajo.
          </p>
          <p className="text-[15px] leading-[1.8] text-text-dim mb-6">
            Trabajo con Claude Code, n8n, Firebase y herramientas de análisis para transformar
            requerimientos en soluciones funcionales. No escribo código de forma tradicional —
            lo <em className="text-amber not-italic">orquesto</em>.
          </p>

          {/* Educación */}
          <div className="mt-4">
            {education.map((edu, i) => (
              <div key={i} className="flex gap-3 items-start py-3 border-b border-white/[0.07]">
                <div className="w-2 h-2 rounded-full bg-amber mt-[5px] flex-shrink-0" />
                <div>
                  <div className="text-[14px] font-medium text-text">{edu.name}</div>
                  <div className="font-mono text-[11px] text-text-dimmer mt-0.5">{edu.institution}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Columna derecha */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Quote filosofía */}
          <div className="bg-dark3 border border-amber/20 border-l-[3px] border-l-amber rounded-lg p-6">
            <p className="font-serif text-[1.1rem] italic text-text leading-relaxed mb-3">
              "No toco código — lo pienso. La IA es mi equipo de desarrollo,
              y yo soy el arquitecto de las soluciones."
            </p>
            <span className="font-mono text-[11px] text-text-dimmer tracking-wide">
              — Mario Peláez · filosofía de trabajo
            </span>
          </div>

          {/* MeJorÍA */}
          <div className="bg-dark3 border border-white/[0.07] rounded-lg p-5">
            <div className="font-mono text-[11px] text-text-dimmer uppercase tracking-wider mb-2.5">
              MeJorÍA Agency
            </div>
            <p className="text-[14px] text-text-dim leading-[1.7]">
              Fundador de MeJorÍA, agencia de entrenamiento en IA y automatización para PYMEs.
              Servicios centrados en n8n, Claude y workflows inteligentes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

### `src/components/sections/AIAction.tsx`
```tsx
'use client'
import { motion } from 'framer-motion'
import { iaServices } from '@/data/ia-services'

export default function AIAction() {
  return (
    <section id="ia" className="py-20 px-8 bg-dark2">
      <div className="max-w-content mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[11px] text-amber/70 uppercase tracking-widest whitespace-nowrap">02 / IA en acción</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>
        <h2 className="font-serif text-[2rem] text-text mb-4">Lo que hago con IA</h2>
        <p className="text-[15px] leading-[1.8] text-text-dim max-w-[640px] mb-10">
          La Inteligencia Artificial democratizó el desarrollo de software. Hoy cualquier
          profesional con visión clara puede construir soluciones reales sin un equipo de
          10 ingenieros. Yo soy la prueba.
        </p>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {iaServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-dark3 border border-white/[0.07] rounded-lg p-5 hover:border-amber/30 transition-colors"
            >
              <span className="font-mono text-[18px] text-amber mb-3 block">{service.icon}</span>
              <h4 className="text-[14px] font-medium text-text mb-1.5">{service.title}</h4>
              <p className="text-[13px] text-text-dim leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Nota Claude */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex gap-3 items-start bg-amber/[0.12] border border-amber/30 rounded-lg px-6 py-5"
        >
          <span className="font-mono text-[13px] text-amber flex-shrink-0 mt-0.5">◆ Claude</span>
          <p className="text-[13px] text-text-dim leading-[1.7]">
            Este portafolio fue construido íntegramente con{' '}
            <strong className="text-amber font-medium">Claude Code + Claude AI</strong>.
            No hay una sola línea de código escrita manualmente — todo fue orquestado con IA.
            Eso es exactamente lo que ofrezco a mis clientes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

### `src/components/sections/Stack.tsx`
```tsx
'use client'
import { motion } from 'framer-motion'
import { stack } from '@/data/stack'

export default function Stack() {
  return (
    <section id="stack" className="py-20 px-8 max-w-content mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <span className="font-mono text-[11px] text-amber/70 uppercase tracking-widest whitespace-nowrap">03 / stack</span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>
      <h2 className="font-serif text-[2rem] text-text mb-8">Herramientas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stack.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex items-center gap-3 bg-dark3 border border-white/[0.07] rounded-md px-4 py-3.5 hover:border-amber/30 transition-colors"
          >
            <div className="font-mono text-[11px] text-amber bg-amber/[0.12] border border-amber/30 px-2 py-1 rounded flex-shrink-0 tracking-wide">
              {item.badge}
            </div>
            <div>
              <div className="text-[14px] font-medium text-text">{item.name}</div>
              <div className="text-[12px] text-text-dimmer mt-0.5">{item.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

### `src/components/sections/Experience.tsx`
```tsx
'use client'
import { motion } from 'framer-motion'
import { experience } from '@/data/experience'

export default function Experience() {
  return (
    <section id="experiencia" className="py-20 px-8 max-w-content mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <span className="font-mono text-[11px] text-amber/70 uppercase tracking-widest whitespace-nowrap">04 / experiencia</span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>
      <h2 className="font-serif text-[2rem] text-text mb-10">Trayectoria</h2>

      <div className="relative pl-6">
        {/* Línea vertical */}
        <div className="absolute left-0 top-2 bottom-0 w-px bg-white/[0.07]" />

        {experience.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pb-10"
          >
            {/* Punto */}
            <div className="absolute -left-6 w-[9px] h-[9px] rounded-full bg-amber border-2 border-dark -translate-x-1 top-[5px]" />

            <div className="font-mono text-[11px] text-text-dimmer tracking-wide mb-1.5">
              {item.period} · {item.type}
            </div>
            <div className="text-[16px] font-medium text-text mb-0.5">{item.role}</div>
            <div className="text-[14px] text-amber-dim mb-2.5">
              {item.company} – {item.location}
            </div>
            <p className="text-[14px] text-text-dim leading-[1.7] mb-3">{item.description}</p>
            <div className="flex gap-1.5 flex-wrap">
              {item.tags.map((tag) => (
                <span key={tag} className="font-mono text-[11px] text-text-dimmer bg-dark4 border border-white/[0.07] px-2 py-0.5 rounded tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

### `src/components/sections/Certificates.tsx`
```tsx
'use client'
import { certificates } from '@/data/certificates'

export default function Certificates() {
  const doubled = [...certificates, ...certificates]

  return (
    <section id="certificados" className="py-20 px-8 max-w-content mx-auto pb-8">
      <div className="flex items-center gap-4 mb-10">
        <span className="font-mono text-[11px] text-amber/70 uppercase tracking-widest whitespace-nowrap">05 / certificados</span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>
      <h2 className="font-serif text-[2rem] text-text mb-2">Formación continua</h2>
      <p className="text-[14px] text-text-dim mb-6">Hover para pausar · IA aplicada, datos, redes, blockchain y más.</p>

      {/* Slider */}
      <div className="overflow-hidden rounded-lg border border-white/[0.07] relative">
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
          {doubled.map((cert, i) => (
            <div
              key={i}
              className="bg-dark3 border-r border-white/[0.07] px-7 py-6 min-w-[280px] flex-shrink-0"
            >
              <div className="font-mono text-[10px] text-amber uppercase tracking-widest mb-2">{cert.issuer}</div>
              <div className="text-[14px] font-medium text-text leading-snug mb-1.5">{cert.name}</div>
              <div className="font-mono text-[11px] text-text-dimmer">{cert.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `src/components/sections/Contact.tsx`
```tsx
'use client'
import { motion } from 'framer-motion'

const socials = [
  { badge: 'WA', label: 'WhatsApp',  sub: '+57 300 670 7219',                    href: 'https://wa.me/573006707219' },
  { badge: 'LI', label: 'LinkedIn',  sub: 'mario-yesid-pelaez-sanchez',          href: 'https://linkedin.com/in/mario-yesid-pelaez-sanchez-111b16242' },
  { badge: 'ML', label: 'Email',     sub: 'myesidpelaez@gmail.com',              href: 'mailto:myesidpelaez@gmail.com' },
]

export default function Contact() {
  return (
    <section id="contacto" className="py-20 px-8 bg-dark2">
      <div className="max-w-content mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[11px] text-amber/70 uppercase tracking-widest whitespace-nowrap">06 / contacto</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>
        <h2 className="font-serif text-[2rem] text-text mb-8">Hablemos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Links sociales */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[15px] text-text-dim leading-[1.8] mb-6">
              ¿Tienes un proyecto en mente? ¿Quieres saber cómo la IA puede transformar
              tu operación? Estoy disponible para proyectos de automatización, desarrollo
              y consultoría.
            </p>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.badge}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-md border border-white/[0.07] bg-dark3 hover:border-amber/30 hover:translate-x-1 transition-all"
                >
                  <span className="font-mono text-[11px] text-amber bg-amber/[0.12] border border-amber/30 px-2 py-0.5 rounded flex-shrink-0">
                    {s.badge}
                  </span>
                  <div>
                    <div className="text-[14px] text-text">{s.label}</div>
                    <div className="font-mono text-[11px] text-text-dimmer">{s.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-dark3 border border-white/[0.07] rounded-lg p-6"
          >
            <h4 className="font-mono text-[12px] text-amber uppercase tracking-wider mb-4">// enviar mensaje</h4>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block font-mono text-[11px] text-text-dimmer uppercase tracking-wide mb-1.5">nombre</label>
                <input type="text" placeholder="Tu nombre" className="w-full bg-dark4 border border-white/[0.07] rounded px-3 py-2.5 text-text text-[14px] outline-none focus:border-amber/30 transition-colors" />
              </div>
              <div>
                <label className="block font-mono text-[11px] text-text-dimmer uppercase tracking-wide mb-1.5">email</label>
                <input type="email" placeholder="tu@email.com" className="w-full bg-dark4 border border-white/[0.07] rounded px-3 py-2.5 text-text text-[14px] outline-none focus:border-amber/30 transition-colors" />
              </div>
              <div>
                <label className="block font-mono text-[11px] text-text-dimmer uppercase tracking-wide mb-1.5">mensaje</label>
                <textarea rows={4} placeholder="Cuéntame sobre tu proyecto..." className="w-full bg-dark4 border border-white/[0.07] rounded px-3 py-2.5 text-text text-[14px] outline-none focus:border-amber/30 transition-colors resize-none" />
              </div>
              <button className="w-full bg-amber text-dark font-mono text-[13px] font-medium py-2.5 rounded tracking-wide hover:opacity-90 transition-opacity mt-1">
                enviar mensaje →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

## PASO 12 — Verificar y correr el servidor

```bash
# Verificar que todo compile sin errores
npm run build

# Si hay errores de tipos, corregirlos antes de continuar
# Luego correr en desarrollo
npm run dev
```

Abrir `http://localhost:3000` y verificar que todas las secciones renderizan correctamente.

---

## PASO 13 — Commit y push a develop

```bash
git add .
git status
git commit -m "feat: portafolio migrado a Next.js 15 + Tailwind + Framer Motion"
git push origin develop
```

**IMPORTANTE:** Nunca pushear directo a `main`. Todo va a `develop` primero.

---

## REFERENCIAS CLAVE

- Repo: https://github.com/myesidpelaez/mario-pelaez-portfolio
- Branch activa: `develop`
- Branch producción: `main`
- Blueprint completo: `BLUEPRINT.md` en rama `main`
- Stack: Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · lucide-react · clsx
- Deploy objetivo: Vercel (conectar repo, auto-deploy desde `main`)
- WhatsApp: https://wa.me/573006707219
- LinkedIn: https://linkedin.com/in/mario-yesid-pelaez-sanchez-111b16242
