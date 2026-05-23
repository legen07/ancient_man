'use client'

import { useEffect, useRef, useState } from 'react'

const faqs = [
  {
    q: 'What exactly does "AI automation" mean for my business?',
    a: 'It means replacing the repetitive, rule-based parts of your operations with software that runs without human input. Think: automatically qualifying leads from your contact form, routing them to the right sales rep, drafting a personalized email, and logging everything to your CRM — with zero human touch. That\'s one example of hundreds.',
  },
  {
    q: 'Do I need to be a tech company to benefit from this?',
    a: 'No. The businesses that benefit most are often the non-tech ones — logistics companies, law firms, e-commerce brands, restaurants, agencies — because they still rely on manual processes that can be automated. If your team does the same thing more than 10 times a week, it can almost certainly be automated.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A focused automation (single workflow, clear scope) typically takes 1–3 weeks. A full AI system or web platform is usually 4–12 weeks depending on complexity. I prioritize scoping properly at the start so timelines are reliable, not guesses.',
  },
  {
    q: 'What does the process look like from first contact to delivery?',
    a: 'We start with a discovery call to understand your current workflow and identify high-leverage automation opportunities. Then I produce a technical scope and proposal. Once agreed, development happens in structured sprints with regular demos. Delivery includes documentation, handover, and a support window.',
  },
  {
    q: 'Will the automation break when things change?',
    a: 'All systems I build are designed for maintainability. I use monitored pipelines, error alerts, and fallback logic. When an upstream service changes, the system flags it rather than silently failing. I also offer ongoing maintenance retainers for clients who want zero-stress ownership.',
  },
  {
    q: "What's your pricing model?",
    a: "Projects are priced on scope, not hours. After understanding your needs I provide a flat project fee — you know the full cost before anything starts. For ongoing retainers (maintenance, continued development), I offer monthly arrangements. I don't do ambiguous hourly billing.",
  },
  {
    q: 'Can you work with my existing tools and software?',
    a: 'Almost always yes. I integrate with most major platforms — HubSpot, Salesforce, Notion, Airtable, Google Workspace, Shopify, WooCommerce, and hundreds more via their APIs. If your tool has an API or webhook capability, I can connect it.',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll<HTMLElement>(
      '.reveal, .section-label, .faq-item'
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
              { opacity: '0', transform: 'translateY(10px)' },
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

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" ref={sectionRef}>
      <div className="section-label reveal">04 — FAQ</div>
      <h2 className="section-title reveal" id="faq-heading">Honest answers<br />to real questions</h2>

      <div className="faq-list" id="faqList">
        {faqs.map((f, idx) => (
          <div className={`faq-item reveal${openIndex === idx ? ' open' : ''}`} key={idx}>
            <button
              className="faq-q"
              aria-expanded={openIndex === idx}
              onClick={() => toggle(idx)}
            >
              {f.q}
              <span className="faq-icon" aria-hidden="true">+</span>
            </button>
            <div className="faq-a" role="region">
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
