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
