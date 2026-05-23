'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    num: '01',
    title: 'AI Automation Systems',
    desc: 'End-to-end intelligent pipelines that read, decide, and act — without human intervention. From inbox triage to contract drafting.',
    tags: ['LLMs', 'Agents', 'OpenAI', 'Claude API'],
  },
  {
    num: '02',
    title: 'Business Workflow Automation',
    desc: 'Map your manual processes once. I rebuild them as automated systems — faster, cheaper, and error-free at any scale.',
    tags: ['n8n', 'Zapier', 'Custom APIs'],
  },
  {
    num: '03',
    title: 'Full-Stack Web Development',
    desc: 'Production-grade web platforms — from SaaS dashboards to high-conversion marketing sites — built to perform at scale.',
    tags: ['Next.js', 'React', 'Node', 'PostgreSQL'],
  },
  {
    num: '04',
    title: 'Telegram & WhatsApp Automation',
    desc: 'Smart messaging bots that handle customer support, lead qualification, appointment booking, and payment flows — 24/7.',
    tags: ['Telegram API', 'WhatsApp Cloud', 'Bot logic'],
  },
  {
    num: '05',
    title: 'Web Scraping & Data Pipelines',
    desc: 'Structured data extraction from any website, piped directly into your database, spreadsheet, or reporting dashboard.',
    tags: ['Playwright', 'Puppeteer', 'Python', 'Scrapy'],
  },
  {
    num: '06',
    title: 'Custom Internal Tools & SaaS',
    desc: 'Private dashboards, admin panels, CRMs, and internal tooling that replace spreadsheet chaos with structured, automated workflows.',
    tags: ['Custom SaaS', 'Admin panels', 'CRM'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll<HTMLElement>(
      '.reveal, .section-label, .service-card'
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
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    revealEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="services" aria-labelledby="services-heading" ref={sectionRef}>
      <div className="inner">
        <div className="section-label reveal">02 — Services</div>
        <h2 className="section-title reveal" id="services-heading">Systems that work<br />while you sleep</h2>
        <p className="section-sub reveal">Every service is engineered to reduce human dependency, eliminate repetitive work, and build leverage into your operations.</p>

        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card reveal" key={s.num}>
              <div className="service-num">{s.num}</div>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map((t) => (
                  <span className="service-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
