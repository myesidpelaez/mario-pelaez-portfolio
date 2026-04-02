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
