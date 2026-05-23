'use client'

import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formSuccessRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll<HTMLElement>(
      '.reveal, .section-label, .contact-info, .contact-form'
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

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSubmitted(true)
    if (formSuccessRef.current) {
      formSuccessRef.current.style.display = 'block'
      formSuccessRef.current.animate(
        [{ opacity: '0' }, { opacity: '1' }],
        { duration: 400, fill: 'forwards' }
      )
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" ref={sectionRef}>
      <div className="inner">
        <div className="section-label reveal">05 — Contact</div>
        <h2 className="section-title reveal" id="contact-heading">Let&apos;s build something<br />that matters</h2>
        <p className="section-sub reveal">Tell me what you&apos;re working on. I&apos;ll tell you what&apos;s possible.</p>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">@</div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-val">gafful07@gmail.com</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">✈</div>
              <div>
                <div className="contact-label">Telegram</div>
                <div className="contact-val">@anti_ancient_bot</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">☎</div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-val">+233 593 861 032</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">◎</div>
              <div>
                <div className="contact-label">Based in</div>
                <div className="contact-val">Accra, Ghana — Remote worldwide</div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                Current availability
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3dcf8e', animation: 'pulse 2s infinite' }}
                  aria-hidden="true"
                ></div>
                <span style={{ fontSize: '14px', color: 'var(--text-2)' }}>Open to new projects</span>
              </div>
            </div>
          </div>

          <div className="contact-form reveal">
            {!submitted ? (
              <div id="formWrap">
                <div className="form-row">
                  <label htmlFor="f-name">Name</label>
                  <input
                    type="text"
                    id="f-name"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="f-email">Email</label>
                  <input
                    type="email"
                    id="f-email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="f-service">What do you need?</label>
                  <select
                    id="f-service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    <option>AI Automation System</option>
                    <option>Business Workflow Automation</option>
                    <option>Full-Stack Web Development</option>
                    <option>Telegram / WhatsApp Bot</option>
                    <option>Web Scraping / Data Pipeline</option>
                    <option>Custom Internal Tool / SaaS</option>
                    <option>Consulting / Strategy</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="f-msg">Tell me about it</label>
                  <textarea
                    id="f-msg"
                    name="message"
                    rows={5}
                    placeholder="Describe your business, the problem you're trying to solve, and what success looks like…"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button className="form-submit" id="formSubmit" type="button" onClick={handleSubmit}>
                  Send message →
                </button>
              </div>
            ) : (
              <div
                className="form-success"
                id="formSuccess"
                ref={formSuccessRef}
                style={{ display: 'block' }}
              >
                ✓ Message received — I&apos;ll reply within 24 hours.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
