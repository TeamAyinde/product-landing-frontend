import React, { useState } from 'react'

// src/pages/exactus.jsx
// Landing: pages/exactus - Exactus Payroll & Accounting - MOBILE RESPONSIVE

export default function Exactus({ go, onRequest }) {
  const [gross, setGross] = useState(5200)
  const [state, setState] = useState('New Jersey')
  const [hours, setHours] = useState(45)
  const [plan, setPlan] = useState('Growth')

  const STATE_TAX = { 'New Jersey': 0.055, 'California': 0.093, 'New York': 0.068, 'Texas': 0, 'Florida': 0, 'Delaware': 0.052 }
  const regularHours = Math.min(hours, 40)
  const otHours = Math.max(hours - 40, 0)
  const hourly = gross / 40
  const otPay = otHours * hourly * 1.5
  const grossWithOT = (regularHours * hourly) + otPay
  const federal = grossWithOT * 0.12
  const stateTax = grossWithOT * (STATE_TAX[state] || 0)
  const fica = grossWithOT * 0.0765
  const net = grossWithOT - federal - stateTax - fica

  const FEATURES = [
    { icon: 'bi-calculator-fill', title: 'Federal + State Tax — Automatic', desc: 'Exactus auto-calculates federal, state, and local tax for all 50 states. No spreadsheets, no year-end surprises.' },
    { icon: 'bi-bank', title: 'Direct Deposit in 2 Days', desc: 'Pay everyone on time via ACH. Employees get pay stubs instantly in their portal.' },
    { icon: 'bi-clock-history', title: 'Overtime, Perfectly Tracked', desc: '40+ hours? Time-and-a-half auto-applied. Shift differentials, PTO, and bonuses handled.' },
    { icon: 'bi-shield-check-fill', title: '【entity-IRS¦canonical_name=IRS】-Compliant Filings', desc: 'W-2, W-3, 941, 940 — generated and e-filed. Audit-ready reports in one click.' },
    { icon: 'bi-people-fill', title: 'Contractors & W-2 in One Place', desc: 'Pay employees and 1099 contractors together. 1099-NEC auto-generated in January.' },
    { icon: 'bi-graph-up-arrow', title: 'Accounting That Syncs', desc: 'Payroll journals post automatically to your books. No double-entry, no month-end scramble.' },
  ]

  const PLANS = [
    { name: 'Starter', price: '$39', per: '/mo + $5 / person', desc: 'For small teams up to 10 people.', features: ['Up to 10 Employees', 'Direct Deposit', 'Federal + 1 State Tax', 'Pay Stubs'], cta: 'Start Starter' },
    { name: 'Growth', price: '$79', per: '/mo + $5 / person', desc: 'For growing US businesses with multi-state teams.', features: ['Unlimited Employees', 'All 50 States Tax', 'Overtime + PTO', 'IRS Filings (941, W-2)', 'Accounting Sync'], cta: 'Start Growth', popular: true },
    { name: 'Scale', price: '$149', per: '/mo + $4 / person', desc: 'For 100+ employees, franchises & multi-entity.', features: ['All Growth Features', 'Multi-Entity / EIN', 'Dedicated Payroll Specialist', 'API + Benefits Sync'], cta: 'Talk to Sales' },
  ]

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', fontFamily: 'Inter, Arial, sans-serif', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .exactus-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 36px; align-items: center; }
        .exactus-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .exactus-hero-title { font-size: clamp(32px, 6vw, 48px); line-height: 1.08; margin: 12px 0; }
        .exactus-hero-sub { font-size: clamp(15px, 3.5vw, 18px); color: #475569; line-height: 1.7; }
        .exactus-btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
        .exactus-btn-row button { white-space: nowrap; }
        .exactus-stats { display: flex; gap: 18px; margin-top: 28px; flex-wrap: wrap; }
        .exactus-section { max-width: 1280px; margin: 0 auto; padding-left: 20px; padding-right: 20px; }
        .exactus-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
        .exactus-calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .exactus-filing-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; }

        @media (max-width: 900px) {
          .exactus-hero-grid { grid-template-columns: 1fr; gap: 24px; }
          .exactus-2col { grid-template-columns: 1fr; gap: 16px; }
          .exactus-section { padding-left: 16px; padding-right: 16px; }
        }
        @media (max-width: 600px) {
          .exactus-btn-row { flex-direction: column; }
          .exactus-btn-row button { width: 100%; text-align: center; justify-content: center; }
          .exactus-stats { gap: 14px; }
          .exactus-stats > div { flex: 1 1 40%; min-width: 120px; }
          .exactus-cta-row { flex-direction: column; align-items: stretch; }
          .exactus-cta-row button { width: 100%; }
          .exactus-calc-grid { grid-template-columns: 1fr; }
          .exactus-filing-row { flex-direction: column; align-items: flex-start; }
          .exactus-filing-row span { white-space: normal; }
        }
        @media (max-width: 400px) {
          .exactus-stats > div { flex: 1 1 100%; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg, #fef2f2 0%, #fff 100%)', padding: '32px 0 44px' }}>
        <div className="exactus-section exactus-hero-grid">
          <div style={{ minWidth: 0 }}>
            <button onClick={() => go('products')} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}><i className="bi bi-arrow-left"></i> All Products</button>
            <p style={{ color: '#DC2626', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 20 }}>pages/exactus — Ayinde Technologies</p>
            <h1 className="exactus-hero-title">Payday without<br /><span style={{ color: '#DC2626' }}>the headache.</span></h1>
            <p className="exactus-hero-sub">Exactus automates federal + state tax, direct deposit, overtime, and IRS filings. Run payroll in 4 minutes — compliant every single pay run.</p>

            <div className="exactus-btn-row">
              <button onClick={() => go('exactus-login')} style={{ background: '#DC2626', color: '#fff', padding: '14px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Enter Demo Dashboard <i className="bi bi-box-arrow-in-right"></i></button>
              <button onClick={onRequest} style={{ background: '#0f172a', color: '#fff', padding: '14px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request Exactus</button>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 14, lineHeight: 1.6 }}><i className="bi bi-patch-check-fill" style={{ color: '#DC2626' }}></i> IRS Compliant — Auto Tax — Direct Deposit — Demo login: any username / password</p>

            <div className="exactus-stats">
              <div><b style={{ fontSize: 20 }}>4 min</b><p style={{ fontSize: 13, color: '#64748b' }}>Avg. Payroll Run</p></div>
              <div><b style={{ fontSize: 20 }}>50 States</b><p style={{ fontSize: 13, color: '#64748b' }}>Tax Covered</p></div>
              <div><b style={{ fontSize: 20 }}>0 Penalties</b><p style={{ fontSize: 13, color: '#64748b' }}>Late Filings in 2025</p></div>
              <div><b style={{ fontSize: 20 }}>12,000+</b><p style={{ fontSize: 13, color: '#64748b' }}>Paychecks / Month</p></div>
            </div>
          </div>

          {/* PAYROLL CALCULATOR — INTERACTIVE */}
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', overflow: 'hidden', minWidth: 0, width: '100%' }}>
            <div style={{ background: '#0f172a', color: '#fff', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 14 }}><i className="bi bi-calculator-fill" style={{ color: '#fca5a5' }}></i> Paycheck Estimator — Try It</b>
              <span style={{ background: '#DC2626', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>LIVE DEMO</span>
            </div>
            <div style={{ padding: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700 }}>Monthly Gross Pay — ${gross.toLocaleString()}</label>
              <input type="range" min={2000} max={12000} step={100} value={gross} onChange={e => setGross(Number(e.target.value))} style={{ width: '100%', margin: '8px 0 14px', accentColor: '#DC2626' }} />
              <div className="exactus-calc-grid">
                <div><label style={{ fontSize: 13, fontWeight: 700 }}>State</label><select value={state} onChange={e => setState(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6 }}>{Object.keys(STATE_TAX).map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label style={{ fontSize: 13, fontWeight: 700 }}>Hours / Week — {hours}h</label><input type="range" min={20} max={60} value={hours} onChange={e => setHours(Number(e.target.value))} style={{ width: '100%', marginTop: 12, accentColor: '#DC2626' }} /></div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 14, marginTop: 16, display: 'grid', gap: 6, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><span>Gross + Overtime ({otHours}h OT)</span><b>${grossWithOT.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><span>Federal Tax (12%)</span><span style={{ color: '#DC2626' }}>− ${federal.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><span>{state} Tax</span><span style={{ color: '#DC2626' }}>− ${stateTax.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><span>FICA (7.65%)</span><span style={{ color: '#DC2626' }}>− ${fica.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: 8, fontSize: 15, fontWeight: 800, gap: 10 }}><span>Take-Home Pay</span><span style={{ color: '#059669' }}>${net.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
              </div>
              <button onClick={() => go('exactus-login')} style={{ width: '100%', marginTop: 14, background: '#DC2626', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Run This in Live Demo <i className="bi bi-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="exactus-section" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(24px, 5vw, 30px)' }}>Payroll + Accounting, finally in sync</h2>
        <p style={{ color: '#64748b', marginTop: 8, lineHeight: 1.6 }}>No more exporting CSVs to your accountant. Exactus posts payroll journals automatically.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 24 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: '#f8fafc', padding: 22, borderRadius: 18, border: '1px solid #eef2f7', minWidth: 0 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fee2e2', color: '#DC2626', display: 'grid', placeItems: 'center', fontSize: 22 }}><i className={`bi ${f.icon}`}></i></div>
              <h3 style={{ margin: '14px 0 8px', fontSize: 17 }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPLIANCE TIMELINE */}
      <section className="exactus-section" style={{ paddingBottom: 48 }}>
        <div className="exactus-2col">
          <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 280 }}>
            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&q=80" alt="Exactus accounting" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.78))', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
              <h3 style={{ fontSize: 'clamp(18px, 4vw, 22px)', lineHeight: 1.3 }}>Never miss a filing again.</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>941, 940, W-2, W-3, 1099-NEC — Exactus reminds you, prepares them, and e-files them.</p>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 20, padding: 24, minWidth: 0 }}>
            <h3 style={{ fontSize: 18 }}><i className="bi bi-calendar-check-fill" style={{ color: '#DC2626' }}></i> Upcoming Filings — Q3 2026</h3>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              {[['Form 941 — Q3', 'Due Oct 31, 2026', 'Auto-Prepared', '#059669'], ['W-2 Preview', 'Ready Dec 15', 'Review', '#F97316'], ['1099-NEC (Contractors)', 'Due Jan 31, 2027', 'Scheduled', '#2F80ED'], ['State — NJ WR-30', 'Due Oct 30, 2026', 'Auto-Prepared', '#059669']].map(([name, due, badge, col]) => (
                <div key={name} className="exactus-filing-row" style={{ background: '#f8fafc', borderRadius: 12, padding: 14 }}>
                  <div style={{ minWidth: 0 }}><b style={{ fontSize: 14 }}>{name}</b><p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{due}</p></div>
                  <span style={{ background: col, color: '#fff', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>{badge}</span>
                </div>
              ))}
            </div>
            <button onClick={() => go('exactus-login')} style={{ width: '100%', marginTop: 16, background: '#DC2626', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>See Filings in Demo <i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="exactus-section" style={{ paddingBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(24px, 5vw, 30px)', textAlign: 'center' }}>Transparent pricing. No per-payroll fees.</h2>
        <p style={{ color: '#64748b', textAlign: 'center', marginTop: 8 }}>Pay per person, not per pay run. Cancel anytime.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 32 }}>
          {PLANS.map(p => (
            <div key={p.name} onClick={() => setPlan(p.name)} style={{ background: p.popular ? '#0f172a' : '#fff', color: p.popular ? '#fff' : '#0f172a', border: p.popular ? '2px solid #DC2626' : '1px solid #e2e8f0', borderRadius: 20, padding: 24, cursor: 'pointer', position: 'relative', minWidth: 0 }}>
              {p.popular && <span style={{ position: 'absolute', top: -12, left: 20, background: '#DC2626', color: '#fff', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 800 }}>MOST POPULAR</span>}
              <h3>{p.name}</h3>
              <p style={{ fontSize: 34, fontWeight: 800, margin: '10px 0 2px' }}>{p.price} <span style={{ fontSize: 13, fontWeight: 400, color: p.popular ? '#cbd5e1' : '#64748b' }}>{p.per}</span></p>
              <p style={{ fontSize: 14, color: p.popular ? '#cbd5e1' : '#64748b', lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ display: 'grid', gap: 8, margin: '18px 0' }}>{p.features.map(f => <span key={f} style={{ fontSize: 14 }}><i className="bi bi-check-circle-fill" style={{ color: '#DC2626' }}></i> {f}</span>)}</div>
              <button onClick={onRequest} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: p.popular ? '#DC2626' : '#0f172a', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="exactus-section" style={{ paddingBottom: 48 }}>
        <div style={{ background: 'linear-gradient(135deg, #DC2626, #991B1B)', color: '#fff', borderRadius: 20, padding: '28px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', lineHeight: 1.3 }}>Want Exactus for your business?</h2>
          <p style={{ color: '#fecaca', marginTop: 8, lineHeight: 1.6, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>Try the live payroll demo now — run a pay cycle, see taxes, approve direct deposit. No signup.</p>
          <div className="exactus-cta-row">
            <button onClick={() => go('exactus-login')} style={{ background: '#fff', color: '#DC2626', padding: '13px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Try Live Demo <i className="bi bi-arrow-right"></i></button>
            <button onClick={onRequest} style={{ background: '#0f172a', color: '#fff', padding: '13px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request Exactus</button>
          </div>
        </div>
      </section>
    </div>
  )
}