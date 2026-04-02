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
