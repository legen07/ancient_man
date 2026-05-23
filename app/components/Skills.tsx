'use client'

import { useEffect, useRef } from 'react'

const skills = [
  { icon: '⚡', name: 'JavaScript / TypeScript', level: '95%', fill: 95 },
  { icon: '⚛', name: 'React / Next.js', level: '90%', fill: 90 },
  { icon: '🤖', name: 'AI & LLM Integration', level: '88%', fill: 88 },
  { icon: '🐍', name: 'Python / Automation', level: '85%', fill: 85 },
  { icon: '🗄', name: 'Node.js / Databases', level: '85%', fill: 85 },
  { icon: '🎨', name: 'HTML / CSS / SCSS', level: '98%', fill: 98 },
  { icon: '🔗', name: 'API & Webhooks', level: '92%', fill: 92 },
  { icon: '🕷', name: 'Web Scraping / Crawling', level: '88%', fill: 88 },
  { icon: '⚙', name: 'DevOps / CI-CD / Git', level: '80%', fill: 80 },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll<HTMLElement>(
      '.reveal, .section-label, .skill-cell'
    )
    if (!revealEls) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          if (el.dataset.revealed) return
          el.dataset.revealed = '1'

          const isBadge = el.classList.contains('section-label')
          el.animate(
            [
              { opacity: '0', transform: 'translateY(20px)' },
              { opacity: '1', transform: 'none' },
            ],
            {
              duration: isBadge ? 500 : 600,
              easing: 'cubic-bezier(0.4,0,0.2,1)',
              fill: 'forwards',
            }
          )

          const bar = el.querySelector<HTMLElement>('.skill-bar-fill')
          if (bar) {
            const target = parseInt(bar.dataset.fill || '0')
            setTimeout(() => {
              bar.animate(
                [{ width: '0%' }, { width: target + '%' }],
                { duration: 900, delay: 150, easing: 'cubic-bezier(0.4,0,0.2,1)', fill: 'forwards' }
              )
            }, 200)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    revealEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="skills" aria-labelledby="skills-heading" ref={sectionRef}>
      <div className="section-label reveal" id="skills-label">01 — Skills</div>
      <h2 className="section-title reveal" id="skills-heading">Technical depth<br />across the stack</h2>
      <p className="section-sub reveal">From pixel-perfect interfaces to AI pipelines and database architecture — every layer, built properly.</p>

      <div className="skills-grid" id="skillsGrid">
        {skills.map((s) => (
          <div className="skill-cell reveal" key={s.name}>
            <div className="skill-icon" aria-hidden="true">{s.icon}</div>
            <div className="skill-name">{s.name}</div>
            <div className="skill-level">{s.level}</div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" data-fill={String(s.fill)}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
