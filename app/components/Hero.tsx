'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const tLine1Ref = useRef<HTMLSpanElement>(null)
  const tOut1Ref = useRef<HTMLDivElement>(null)
  const tLine2WrapRef = useRef<HTMLDivElement>(null)
  const tLine2Ref = useRef<HTMLSpanElement>(null)
  const tOut2Ref = useRef<HTMLDivElement>(null)
  const tLine3WrapRef = useRef<HTMLDivElement>(null)
  const tLine3Ref = useRef<HTMLSpanElement>(null)
  const tOut3Ref = useRef<HTMLDivElement>(null)
  const tCursorWrapRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heroEls = [
      badgeRef.current,
      headingRef.current,
      subRef.current,
      actionsRef.current,
      statsRef.current,
      terminalRef.current,
    ].filter(Boolean) as Element[]

    heroEls.forEach((el, i) => {
      el.animate(
        [
          { opacity: '0', transform: 'translateY(18px)' },
          { opacity: '1', transform: 'none' },
        ],
        {
          duration: 700,
          delay: 150 + i * 100,
          easing: 'cubic-bezier(0.4,0,0.2,1)',
          fill: 'forwards',
        }
      )
    })

    /* Terminal typewriter */
    const lines = [
      {
        el: tLine1Ref.current,
        out: tOut1Ref.current,
        wrap: null,
        cmd: 'diagnose --business workflows',
        result: '<span class="t-warn">⚠  Found 14 manual processes consuming ~38hr/week</span>',
        delay: 400,
      },
      {
        el: tLine2Ref.current,
        out: tOut2Ref.current,
        wrap: tLine2WrapRef.current,
        cmd: 'automate --priority high --deploy',
        result: '<span class="t-success">✓  7 workflows automated · 31hr/week recovered</span>',
        delay: 2600,
      },
      {
        el: tLine3Ref.current,
        out: tOut3Ref.current,
        wrap: tLine3WrapRef.current,
        cmd: 'status --all',
        result: '<span class="t-success">✓  All systems operational · Running 24/7</span>',
        delay: 5000,
      },
    ]

    function typeText(el: HTMLSpanElement, text: string, cb?: () => void) {
      let i = 0
      function tick() {
        el.textContent = text.slice(0, ++i)
        if (i < text.length) setTimeout(tick, 35 + Math.random() * 20)
        else if (cb) setTimeout(cb, 200)
      }
      tick()
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(
      setTimeout(() => {
        lines.forEach((line, idx) => {
          timers.push(
            setTimeout(() => {
              if (line.wrap) line.wrap.style.display = ''
              if (tCursorWrapRef.current) tCursorWrapRef.current.style.display = 'none'
              if (!line.el || !line.out) return
              typeText(line.el, line.cmd, () => {
                setTimeout(() => {
                  line.out!.innerHTML = line.result
                  if (idx === lines.length - 1 && tCursorWrapRef.current) {
                    tCursorWrapRef.current.style.display = ''
                  }
                }, 300)
              })
            }, line.delay)
          )
        })
      }, 1200)
    )

    /* Grid ambient motion */
    const grid = gridRef.current
    let raf: number
    let offset = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (grid && !reducedMotion) {
      function animGrid() {
        offset += 0.015
        if (grid) {
          grid.style.backgroundPosition = `${offset}px ${offset * 0.5}px`
        }
        raf = requestAnimationFrame(animGrid)
      }
      animGrid()

      function handleVisibility() {
        if (document.hidden) cancelAnimationFrame(raf)
        else animGrid()
      }
      document.addEventListener('visibilitychange', handleVisibility)

      return () => {
        timers.forEach(clearTimeout)
        cancelAnimationFrame(raf)
        document.removeEventListener('visibilitychange', handleVisibility)
      }
    }

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <section id="hero" aria-label="Hero">
      <div className="hero-grid" aria-hidden="true" ref={gridRef}></div>
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="hero-inner">
        <div className="hero-badge" ref={badgeRef}>
          <span className="hero-badge-dot" aria-hidden="true"></span>
          Available for projects
        </div>

        <h1 className="hero-heading" ref={headingRef}>
          Stop running your business<br />like it&apos;s <em>ancient.</em>
        </h1>

        <p className="hero-sub" ref={subRef}>
          I build AI automation systems, full-stack platforms, and intelligent infrastructure that replaces manual work — permanently.
        </p>

        <div className="hero-actions" ref={actionsRef}>
          <a href="#services" className="btn-primary">See what I build</a>
          <a href="#contact" className="btn-ghost">Start a conversation →</a>
        </div>

        <div className="hero-stats" ref={statsRef}>
          <div className="stat-item">
            <div className="stat-num">40<span>+</span></div>
            <div className="stat-label">Automations deployed</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">12<span>+</span></div>
            <div className="stat-label">Businesses transformed</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">5<span>yr</span></div>
            <div className="stat-label">Engineering experience</div>
          </div>
        </div>

        <div className="hero-terminal" id="heroTerminal" aria-label="Terminal demonstration" role="region" ref={terminalRef}>
          <div className="terminal-bar">
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <span className="terminal-title">anti-ancient — system check</span>
          </div>
          <div className="terminal-body" aria-live="polite">
            <div><span className="t-prompt">▸ </span><span className="t-cmd" ref={tLine1Ref}></span></div>
            <div ref={tOut1Ref}></div>
            <div ref={tLine2WrapRef} style={{ display: 'none' }}><span className="t-prompt">▸ </span><span className="t-cmd" ref={tLine2Ref}></span></div>
            <div ref={tOut2Ref}></div>
            <div ref={tLine3WrapRef} style={{ display: 'none' }}><span className="t-prompt">▸ </span><span className="t-cmd" ref={tLine3Ref}></span></div>
            <div ref={tOut3Ref}></div>
            <div ref={tCursorWrapRef}><span className="t-prompt">▸ </span><span className="t-cursor" aria-hidden="true"></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
