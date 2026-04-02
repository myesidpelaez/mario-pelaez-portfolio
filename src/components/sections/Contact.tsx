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
