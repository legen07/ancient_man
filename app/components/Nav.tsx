'use client'

import { useEffect, useState, useCallback } from 'react'

export default function Nav() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('aa-theme') as 'dark' | 'light' | null
    const initial = saved || 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('aa-theme', next)
  }, [theme])

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    function onScroll() {
      let current = ''
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 120) {
          current = s.id
        }
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav id="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a className="nav-logo" href="#hero">anti<span>-ancient</span></a>
          <ul className="nav-links">
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#services" className={activeSection === 'services' ? 'active' : ''}>Services</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#faq" className={activeSection === 'faq' ? 'active' : ''}>FAQ</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '☀' : '☽'}
            </button>
            <a className="nav-cta" href="#contact">Start a project</a>
            <button
              className="hamburger"
              onClick={toggleMenu}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        id="mobileMenu"
        role="dialog"
        aria-label="Mobile navigation"
      >
        <a href="#skills" className="mob-link" onClick={closeMenu}>Skills</a>
        <a href="#services" className="mob-link" onClick={closeMenu}>Services</a>
        <a href="#projects" className="mob-link" onClick={closeMenu}>Projects</a>
        <a href="#faq" className="mob-link" onClick={closeMenu}>FAQ</a>
        <a href="#contact" className="mob-link" onClick={closeMenu}>Contact</a>
      </div>
    </>
  )
}
