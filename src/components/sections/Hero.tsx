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
