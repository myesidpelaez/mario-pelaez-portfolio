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
