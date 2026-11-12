import React, { useState } from 'react'

// src/pages/how-it-works.jsx
// Page: pages/how-it-works — Beautiful Timeline

const STEPS = [
  {
    id: 1,
    step: 'STEP 01',
    title: 'Explore the Template',
    subtitle: 'See it before you buy it',
    desc: 'Browse our 5 ready-made product templates with real images, real UI, and real flows. No screenshots, no guesswork — you see exactly what your customers will see.',
    points: ['5 live product templates', 'Real images + real UI', 'See features, pricing & demo'],
    color: '#2F80ED',
    icon: 'bi-search',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
    tag: '2 mins',
    stat: '5 Templates',
    statLabel: 'Ready to explore'
  },
  {
    id: 2,
    step: 'STEP 02',
    title: 'Login & Interact with the Demo',
    subtitle: 'Try it like a real user',
    desc: 'Click any product, login with the demo account, and navigate the dashboard like a real user. Click tabs, try actions, test the flow. It feels real because the UI is real — only the backend is dummy.',
    points: ['Login: demo@ayinde.tech', 'Navigate tabs & dashboards', 'Try actions, no risk'],
    color: '#7C3AED',
    icon: 'bi-mouse2-fill',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
    tag: '5 mins',
    stat: '100% Interactive',
    statLabel: 'No backend needed'
  },
  {
    id: 3,
    step: 'STEP 03',
    title: 'Request Your Product',
    subtitle: 'Tell us what you need',
    desc: 'Love what you saw? Hit Request Product and tell us what to change — your logo, your colors, your stores, your rules. We reply within 24 hours with next steps and a clear quote.',
    points: ['Full Name + Email form', 'Tell us your custom needs', 'Reply within 24 hours'],
    color: '#059669',
    icon: 'bi-send-fill',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
    tag: '1 min to request',
    stat: '24h Reply',
    statLabel: 'Fast response'
  },
  {
    id: 4,
    step: 'STEP 04',
    title: 'We Build Your Backend + Customize It',
    subtitle: 'This is where we do the magic',
    desc: 'We wire the real backend, connect your database, payments, auth, and emails. We rebrand it with your logo, colors, and domain. You get weekly updates and a staging link to test.',
    points: ['Real backend + database', 'Payments, auth & emails', 'Your brand, your domain'],
    color: '#F97316',
    icon: 'bi-code-slash',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80',
    tag: '2 - 4 weeks',
    stat: 'Weekly Updates',
    statLabel: 'Staging link to test'
  },
  {
    id: 5,
    step: 'STEP 05',
    title: 'You Launch & Grow',
    subtitle: 'Go live with confidence',
    desc: 'We deploy, test with you, train your team, and hand over everything. You launch to your customers. We stay on support so you keep growing without worrying about tech.',
    points: ['Deploy + test together', 'Team training included', 'Ongoing support'],
    color: '#DC2626',
    icon: 'bi-rocket-takeoff-fill',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80',
    tag: 'Launch day',
    stat: 'You Grow',
    statLabel: 'We handle the tech'
  },
]

const FAQS = [
  { q: 'Is the demo real?', a: 'The UI is real and interactive. The backend is a dummy mockup until you request a build — then we wire the real backend.' },
  { q: 'How long does a build take?', a: 'Most templates take 2 - 4 weeks to customize + wire backend, depending on your custom features.' },
  { q: 'Can I change colors, logo, and features?', a: 'Yes. Everything is customizable — logo, colors, domain, features, and workflows.' },
  { q: 'Do I need to pay to try the demo?', a: 'No. All demos are free. You only pay when you request your own build.' },
]

export default function HowItWorks({ go, onRequest }) {
  const [activeStep, setActiveStep] = useState(1)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div style={{ width: '100%', background: '#fff' }}>
      {/* SMALL TITLE - NOT A HERO */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 32px 8px' }}>
        <button onClick={() => go('home')} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}><i className="bi bi-arrow-left"></i> Back Home</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
          <div>
            <p style={{ color: '#2F80ED', fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>How It Works - pages/how-it-works</p>
            <h1 style={{ fontSize: 36, margin: '8px 0 0', lineHeight: 1.15 }}>From Template to Launch<br />in 5 Simple Steps.</h1>
            <p style={{ color: '#64748b', fontSize: 15, marginTop: 10, maxWidth: 620, lineHeight: 1.6 }}>No backend is wired until you request. Explore, test, request — we build the rest.</p>
          </div>
          <button onClick={() => go('products')} style={{ background: '#0f172a', color: '#fff', padding: '13px 22px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Explore Demos <i className="bi bi-arrow-right"></i></button>
        </div>
      </div>

      {/* PROGRESS PILLS - CLICK TO JUMP */}
      <div style={{ position: 'sticky', top: 72, zIndex: 50, background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
          {STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveStep(s.id); document.getElementById('step-' + s.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}
              style={{
                flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 999,
                border: activeStep === s.id ? `2px solid ${s.color}` : '1px solid #e2e8f0',
                background: activeStep === s.id ? s.color + '1A' : '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', color: activeStep === s.id ? s.color : '#334155'
              }}
            >
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: activeStep === s.id ? s.color : '#f1f5f9', color: activeStep === s.id ? '#fff' : '#64748b', display: 'grid', placeItems: 'center', fontSize: 12 }}>{s.id}</span>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* BEAUTIFUL TIMELINE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 20px', position: 'relative' }}>
        {/* CENTER LINE - DESKTOP */}
        <div style={{ position: 'absolute', left: '50%', top: 40, bottom: 20, width: 4, background: 'linear-gradient(180deg,#2F80ED,#7C3AED,#059669,#F97316,#DC2626)', borderRadius: 999, transform: 'translateX(-50%)', opacity: 0.18 }} className="timeline-line" />

        {STEPS.map((s, idx) => {
          const isLeft = idx % 2 === 0
          return (
            <div key={s.id} id={'step-' + s.id} style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48, alignItems: 'center' }} className="timeline-row">
              {/* CENTER DOT */}
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 2, width: 64, height: 64, borderRadius: '50%', background: '#fff', border: `3px solid ${s.color}`, display: 'grid', placeItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: s.color, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 20 }}><i className={`bi ${s.icon}`}></i></div>
              </div>

              {/* TEXT CARD */}
              <div style={{ gridColumn: isLeft ? '1' : '2', gridRow: 1 }}>
                <div
                  onClick={() => setActiveStep(s.id)}
                  style={{ background: '#fff', border: activeStep === s.id ? `2px solid ${s.color}` : '1px solid #e2e8f0', borderRadius: 24, padding: 28, boxShadow: activeStep === s.id ? `0 20px 50px ${s.color}22` : '0 8px 24px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ background: s.color + '1A', color: s.color, padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>{s.step}</span>
                    <span style={{ background: '#f1f5f9', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}><i className="bi bi-clock"></i> {s.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 26, margin: '14px 0 4px', lineHeight: 1.25 }}>{s.title}</h3>
                  <p style={{ color: s.color, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{s.subtitle}</p>
                  <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                    {s.points.map((p) => (
                      <span key={p} style={{ background: '#f8fafc', border: '1px solid #eef2f7', padding: '7px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}><i className="bi bi-check-circle-fill" style={{ color: s.color }}></i> {p}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                    {s.id === 1 && <button onClick={(e) => { e.stopPropagation(); go('products') }} style={{ padding: '11px 18px', background: s.color, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Browse Templates <i className="bi bi-arrow-right"></i></button>}
                    {s.id === 2 && <button onClick={(e) => { e.stopPropagation(); go('products') }} style={{ padding: '11px 18px', background: s.color, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Try a Demo <i className="bi bi-play-circle-fill"></i></button>}
                    {s.id === 3 && <button onClick={(e) => { e.stopPropagation(); onRequest({ name: 'General Build', color: s.color, image: s.image }) }} style={{ padding: '11px 18px', background: s.color, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Request Now <i className="bi bi-send-fill"></i></button>}
                    {s.id === 5 && <button onClick={(e) => { e.stopPropagation(); go('contact') }} style={{ padding: '11px 18px', background: s.color, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Start Your Launch <i className="bi bi-rocket-takeoff-fill"></i></button>}
                  </div>
                </div>
              </div>

              {/* IMAGE + STAT CARD */}
              <div style={{ gridColumn: isLeft ? '2' : '1', gridRow: 1 }}>
                <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', height: 300, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
                  <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${s.color}E6)` }} />
                  <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{s.stat}</div>
                      <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{s.statLabel}</div>
                    </div>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff', color: s.color, display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}><i className={`bi ${s.icon}`}></i></div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* HOW LONG BANNER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 40px' }}>
        <div style={{ background: '#0f172a', color: '#fff', borderRadius: 24, padding: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 24, textAlign: 'center' }}>
          <div><div style={{ fontSize: 32, fontWeight: 800 }}>2 mins</div><div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>To explore</div></div>
          <div><div style={{ fontSize: 32, fontWeight: 800 }}>5 mins</div><div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>To try demo</div></div>
          <div><div style={{ fontSize: 32, fontWeight: 800 }}>24 hours</div><div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>To get reply</div></div>
          <div><div style={{ fontSize: 32, fontWeight: 800 }}>2 - 4 weeks</div><div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>To launch yours</div></div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 60px' }}>
        <h2 style={{ fontSize: 28, textAlign: 'center', marginBottom: 20 }}>Questions? Answered.</h2>
        {FAQS.map((f, i) => (
          <div key={f.q} style={{ border: '1px solid #e2e8f0', borderRadius: 16, marginBottom: 12, overflow: 'hidden' }}>
            <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: openFaq === i ? '#eff6ff' : '#fff', border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
              {f.q} <i className={openFaq === i ? 'bi bi-chevron-up' : 'bi bi-chevron-down'}></i>
            </button>
            {openFaq === i && <div style={{ padding: '0 20px 18px', color: '#475569', fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>}
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button onClick={() => go('products')} style={{ padding: '14px 28px', background: '#2F80ED', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 700, cursor: 'pointer', marginRight: 12 }}>Start at Step 1 - Explore <i className="bi bi-arrow-right"></i></button>
          <button onClick={() => go('contact')} style={{ padding: '14px 28px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 999, fontWeight: 700, cursor: 'pointer' }}>Contact Us</button>
        </div>
      </div>
    </div>
  )
}