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
