'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    status: 'live' as const,
    name: 'NutritionAI — Meal Planning Agent',
    desc: 'An AI agent that generates personalized meal plans based on dietary restrictions, budget, and local ingredient availability. Integrates with WhatsApp for daily delivery.',
    stack: ['Python', 'OpenAI', 'WhatsApp API', 'PostgreSQL'],
  },
  {
    status: 'live' as const,
    name: 'LeadFlow — Telegram Sales Bot',
    desc: 'Automated lead qualification and nurturing system for a B2B SaaS company. Reduced sales team workload by 60% while improving response time from hours to seconds.',
    stack: ['Node.js', 'Telegram Bot API', 'Claude API', 'MongoDB'],
  },
  {
    status: 'live' as const,
    name: 'PriceRadar — Competitor Intelligence Platform',
    desc: 'Distributed web scraping system that monitors 500+ competitor product listings in real time and sends price-change alerts with AI-generated strategy recommendations.',
    stack: ['Playwright', 'Redis', 'Next.js', 'GPT-4'],
  },
  {
    status: 'build' as const,
    name: 'DocuMind — AI Document Processing Engine',
    desc: 'Automated document intake, classification, data extraction, and routing system for a legal firm. Replaces 3 full-time admin staff workflows with a single pipeline.',
    stack: ['Python', 'LangChain', 'OCR', 'FastAPI'],
  },
  {
    status: 'live' as const,
    name: 'CRMPilot — Automated CRM Enrichment',
    desc: "Connects to a client's CRM and runs nightly AI enrichment passes — filling missing fields, scoring leads, flagging stale contacts, and drafting personalized follow-ups.",
    stack: ['n8n', 'OpenAI', 'HubSpot API', 'PostgreSQL'],
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll<HTMLElement>(
      '.reveal, .section-label, .project-row'
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
              {
                opacity: '0',
                transform: el.classList.contains('project-row') ? 'translateX(-16px)' : 'translateY(20px)',
              },
              { opacity: '1', transform: 'none' },
            ],
            {
              duration: isBadge ? 500 : 600,
              easing: 'cubic-bezier(0.4,0,0.2,1)',
              fill: 'forwards',
            }
          )
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    revealEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="projects" aria-labelledby="projects-heading" ref={sectionRef}>
      <div className="inner">
        <div className="section-label reveal">03 — Projects</div>
        <h2 className="section-title reveal" id="projects-heading">Built, shipped,<br />running in production</h2>
        <p className="section-sub reveal">AI and automation systems deployed for real businesses solving real operational problems.</p>

        <div className="projects-list">
          {projects.map((p) => (
            <div className="project-row reveal" key={p.name}>
              <div className="project-main">
                <div className="project-meta">
                  <span className={`project-status status-${p.status}`}>
                    {p.status === 'live' ? 'LIVE' : 'IN PROGRESS'}
                  </span>
                </div>
                <div className="project-name">{p.name}</div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-stack">
                  {p.stack.map((s) => (
                    <span className="stack-pill" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <a className="project-link" href="#" aria-label="View project">↗</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
