import React, { useState } from 'react'

// src/pages/hr-wise.jsx
// Landing Page for HR-Wise by Ayinde Technologies

export default function HrWise({ go, onRequest }) {
  const [activeTab, setActiveTab] = useState('ATS')
  const [openFaq, setOpenFaq] = useState(0)

  const TABS = {
    ATS: { title: 'Applicant Tracking System', desc: 'Post once, hire faster. Every applicant in one pipeline, from Applied to Hired.', points: ['One-click posting to job boards', 'Resume parsing + auto ranking', 'Interview scheduling + reminders', 'Offer letters in 1 click'], image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80' },
    Onboarding: { title: 'Automated Onboarding', desc: 'Offer signed, paperwork done, accounts ready. New hire is Day 1 ready without HR chasing.', points: ['Digital offer + e-signature', 'Welcome checklist auto-assigned', 'Laptop, accounts + training ready', 'Day 1 ready dashboard'], image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80' },
    Compliance: { title: 'Compliance Without Fear', desc: 'Built for US businesses. I-9, E-Verify, state forms, expiry alerts, all handled.', points: ['I-9 + E-Verify tracking', 'State + federal forms library', 'Expiry alerts for visas + certs', 'Audit-ready document vault'], image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80' },
    Performance: { title: 'Performance + Growth', desc: 'Goals, 1-on-1s, reviews in one place. See who is growing and who is ready for promotion.', points: ['OKRs + goals tracking', '360 reviews + 1-on-1 notes', 'Promotion readiness score', 'Engagement pulse surveys'], image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80' },
  }

  const FEATURES = [
    { icon: 'bi-funnel-fill', title: 'Applicant Tracking (ATS)', desc: 'Post jobs, collect resumes, rank candidates, schedule interviews, send offers.' },
    { icon: 'bi-rocket-takeoff-fill', title: 'Automated Onboarding', desc: 'Offer to Day 1 in minutes. E-signatures, welcome packets, accounts, training.' },
    { icon: 'bi-shield-fill-check', title: 'Compliance Documentation', desc: 'I-9, E-Verify, W-4, state forms, policy acknowledgements. Expiry alerts included.' },
    { icon: 'bi-graph-up-arrow', title: 'Performance Reviews', desc: 'Goals, OKRs, 1-on-1s, 360 reviews. Promote with confidence.' },
    { icon: 'bi-people-fill', title: 'Employee Directory', desc: 'One secure directory with org chart, roles, manager, location, start date.' },
    { icon: 'bi-calendar-check-fill', title: 'Time Off + Scheduling', desc: 'PTO requests, approvals, balances, team calendar. No more email chains.' },
    { icon: 'bi-file-earmark-text-fill', title: 'Documents Vault', desc: 'Contracts, handbooks, policies, certs in one secure, audit-ready vault.' },
    { icon: 'bi-bar-chart-line-fill', title: 'HR Analytics', desc: 'Headcount, turnover, time-to-hire, diversity, cost per hire. Real reports.' },
  ]

  const FAQS = [
    { q: 'Is HR-Wise compliant for US businesses?', a: 'Yes. Built for US businesses with I-9, E-Verify, W-4, state forms, and secure document storage. You get expiry alerts and an audit-ready vault.' },
    { q: 'How long does setup take?', a: 'Most teams are live in 1 day. Import employees via CSV, add your logo, pick your onboarding checklist, post your first job.' },
    { q: 'Can employees use it themselves?', a: 'Yes. Employees get a self-service portal to update info, request time off, view documents, sign forms, and see goals.' },
    { q: 'Does it work for small teams?', a: 'Yes. From 5 to 5,000 employees. Start with ATS + Onboarding, then add Performance, Time Off, Analytics as you grow.' },
    { q: 'Is my data secure?', a: 'Yes. Encrypted storage, role-based permissions, audit logs. Only people you approve see sensitive HR data.' },
  ]

  return (
    <div style={{ width: '100%', background: '#fff' }}>
      {/* HR-WISE SUB NAV - WITH LOGIN BUTTON */}
      <div style={{ position: 'sticky', top: 64, zIndex: 10, background: '#fff', borderBottom: '1px solid #eef2f7' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, background: '#7C3AED', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 18 }}><i className="bi bi-people-fill"></i></span>
            <b style={{ fontSize: 17 }}>HR-Wise</b><span style={{ background: '#ede9fe', color: '#7C3AED', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>BY AYINDE</span>
          </div>
          <div style={{ display: 'flex', gap: 18, marginLeft: 'auto', fontSize: 14, fontWeight: 600, flexWrap: 'wrap' }}>
            <a href="#hr-features" style={{ color: '#334155' }}>Features</a>
            <a href="#hr-how" style={{ color: '#334155' }}>How It Works</a>
            <a href="#hr-pricing" style={{ color: '#334155' }}>Pricing</a>
            <a href="#hr-faq" style={{ color: '#334155' }}>FAQ</a>
          </div>
          <button onClick={() => go('hr-wise-login')} style={{ background: '#0f172a', color: '#fff', padding: '10px 20px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-box-arrow-in-right"></i> Login as HR</button>
          <button onClick={() => onRequest()} style={{ background: '#7C3AED', color: '#fff', padding: '10px 20px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Request Demo</button>
        </div>
      </div>

      {/* HERO */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'center' }} className="hr-hero">
          <div>
            <p style={{ color: '#7C3AED', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Ayinde Technologies - HR-Wise</p>
            <h1 style={{ fontSize: 52, lineHeight: 1.05, margin: '12px 0' }}>Hire Faster.<br />Onboard Easier.<br /><span style={{ color: '#7C3AED' }}>Grow Your People.</span></h1>
            <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.7, maxWidth: 560 }}>HR-Wise is the all-in-one HR platform for modern US businesses. Applicant tracking, onboarding, compliance, performance, and analytics in one secure portal.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
              <button onClick={() => go('hr-wise-login')} style={{ background: '#7C3AED', color: '#fff', padding: '14px 26px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}><i className="bi bi-box-arrow-in-right"></i> Login to HR Dashboard</button>
              <button onClick={() => onRequest()} style={{ background: '#fff', padding: '14px 26px', borderRadius: 999, border: '1px solid #e2e8f0', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}><i className="bi bi-send-fill"></i> Request HR-Wise</button>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 14 }}><i className="bi bi-patch-check-fill" style={{ color: '#7C3AED' }}></i> Demo: Any username + any password - 500+ Companies - SOC 2 Secure - US Compliant</p>
            <div style={{ display: 'flex', gap: 24, marginTop: 22, flexWrap: 'wrap' }}>
              <div><b style={{ fontSize: 22 }}>12 hrs</b><p style={{ color: '#64748b', fontSize: 13 }}>saved per week</p></div>
              <div><b style={{ fontSize: 22 }}>3x faster</b><p style={{ color: '#64748b', fontSize: 13 }}>time to hire</p></div>
              <div><b style={{ fontSize: 22 }}>100%</b><p style={{ color: '#64748b', fontSize: 13 }}>compliance ready</p></div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&q=80" alt="HR-Wise team" style={{ width: '100%', height: 440, objectFit: 'cover', borderRadius: 24 }} />
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#fff', borderRadius: 14, padding: '12px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ width: 36, height: 36, borderRadius: '50%', background: '#dcfce7', color: '#059669', display: 'grid', placeItems: 'center' }}><i className="bi bi-check-lg"></i></span>
              <div><b style={{ fontSize: 13 }}>Compliance Score</b><p style={{ fontSize: 12, color: '#64748b' }}>98% - Audit Ready</p></div>
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 12px 30px rgba(0,0,0,0.12)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ede9fe', color: '#7C3AED', display: 'grid', placeItems: 'center', fontSize: 20 }}><i className="bi bi-check-circle-fill"></i></div>
              <div><b style={{ fontSize: 14 }}>New hire onboarded</b><p style={{ color: '#64748b', fontSize: 13 }}>Sarah Johnson - Day 1 ready - I-9 verified</p></div>
              <span style={{ marginLeft: 'auto', background: '#dcfce7', color: '#059669', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Done</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="hr-features" style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 32px' }}>
        <h2 style={{ fontSize: 32 }}>Everything HR needs. Nothing it does not.</h2>
        <p style={{ color: '#64748b', marginTop: 8, maxWidth: 640 }}>Eight modules that work together. Turn on what you need today, add more as you grow.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 20 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 20, padding: 22 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#ede9fe', color: '#7C3AED', display: 'grid', placeItems: 'center', fontSize: 22 }}><i className={`bi ${f.icon}`}></i></div>
              <h3 style={{ margin: '14px 0 6px', fontSize: 17 }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TABS */}
      <section id="hr-how" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px' }}>
        <h2 style={{ fontSize: 28 }}>See how it works in real life</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setActiveTab(k)} style={{ padding: '11px 18px', borderRadius: 999, border: activeTab === k ? 'none' : '1px solid #e2e8f0', background: activeTab === k ? '#7C3AED' : '#fff', color: activeTab === k ? '#fff' : '#334155', fontWeight: 700, cursor: 'pointer' }}>{k}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20, alignItems: 'start' }} className="hr-2col">
          <div>
            <h3 style={{ fontSize: 24 }}>{TABS[activeTab].title}</h3>
            <p style={{ color: '#475569', lineHeight: 1.7, marginTop: 10 }}>{TABS[activeTab].desc}</p>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              {TABS[activeTab].points.map(p => (
                <div key={p} style={{ display: 'flex', gap: 10, background: '#f8fafc', padding: '11px 14px', borderRadius: 12, fontSize: 14 }}><i className="bi bi-check-circle-fill" style={{ color: '#7C3AED' }}></i> {p}</div>
              ))}
            </div>
            <button onClick={() => go('hr-wise-login')} style={{ marginTop: 18, background: '#0f172a', color: '#fff', padding: '13px 22px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Try {activeTab} in Dashboard <i className="bi bi-arrow-right"></i></button>
          </div>
          <div style={{ borderRadius: 20, overflow: 'hidden' }}><img src={TABS[activeTab].image} alt={TABS[activeTab].title} style={{ width: '100%', height: 320, objectFit: 'cover' }} /></div>
        </div>
      </section>

      {/* PRICING */}
      <section id="hr-pricing" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px' }}>
        <h2 style={{ fontSize: 28, textAlign: 'center' }}>Simple pricing. Start small, grow fast.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 20 }}>
          {[
            { name: 'Starter', price: 'For teams 5-25', features: ['ATS + Job Posting', 'Onboarding Checklist', 'Employee Directory', 'Time Off'], popular: false },
            { name: 'Growth', price: 'For teams 25-200', features: ['Everything in Starter', 'Compliance + I-9', 'Performance + Reviews', 'HR Analytics'], popular: true },
            { name: 'Enterprise', price: 'For teams 200+', features: ['Everything in Growth', 'Custom Workflows', 'SSO + Advanced Security', 'Dedicated Success Manager'], popular: false },
          ].map(p => (
            <div key={p.name} style={{ background: p.popular ? '#7C3AED' : '#fff', color: p.popular ? '#fff' : '#0f172a', border: p.popular ? 'none' : '1px solid #e2e8f0', borderRadius: 20, padding: 24, position: 'relative' }}>
              {p.popular && <span style={{ position: 'absolute', top: -12, left: 24, background: '#F97316', color: '#fff', padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>MOST POPULAR</span>}
              <h3>{p.name}</h3>
              <p style={{ color: p.popular ? '#ddd6fe' : '#64748b', fontSize: 14, marginTop: 4 }}>{p.price}</p>
              <div style={{ display: 'grid', gap: 8, margin: '16px 0 20px' }}>{p.features.map(f => <span key={f} style={{ fontSize: 14 }}><i className="bi bi-check-lg"></i> {f}</span>)}</div>
              <button onClick={() => onRequest()} style={{ width: '100%', padding: '12px', background: p.popular ? '#fff' : '#0f172a', color: p.popular ? '#7C3AED' : '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Request {p.name} Quote</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="hr-faq" style={{ maxWidth: 900, margin: '0 auto', padding: '24px 32px 40px' }}>
        <h2 style={{ fontSize: 28, textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
          {FAQS.map((f, i) => (
            <div key={f.q} style={{ border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#fff', border: 'none', fontWeight: 700, textAlign: 'left', cursor: 'pointer' }}>{f.q} <i className={`bi ${openFaq === i ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i></button>
              {openFaq === i && <p style={{ padding: '0 20px 18px', color: '#475569', lineHeight: 1.7, fontSize: 14 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 60px' }}>
        <div style={{ background: '#0f172a', color: '#fff', borderRadius: 24, padding: 36, textAlign: 'center' }}>
          <h2 style={{ fontSize: 32 }}>Ready to make HR easy?</h2>
          <p style={{ color: '#cbd5e1', margin: '10px auto 22px', maxWidth: 560, lineHeight: 1.6 }}>Login to see the full dashboard, then request your own HR-Wise build. We customize it for your company.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => go('hr-wise-login')} style={{ background: '#7C3AED', color: '#fff', padding: '14px 26px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Login as HR <i className="bi bi-box-arrow-in-right"></i></button>
            <button onClick={() => onRequest()} style={{ background: '#fff', color: '#0f172a', padding: '14px 26px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request HR-Wise</button>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 16 }}>Sales: +1-302-515-0227 - sales@ayindetechnologies.com</p>
        </div>
      </section>
    </div>
  )
}