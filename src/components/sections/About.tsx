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
