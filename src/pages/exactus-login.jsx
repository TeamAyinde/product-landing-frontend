import React, { useState } from 'react'

// src/pages/exactus-login.jsx
// Login: pages/exactus-login - Full screen, no header/footer - MOBILE RESPONSIVE

export default function ExactusLogin({ go, onLoginSuccess }) {
  const [username, setUsername] = useState('payroll-admin')
  const [password, setPassword] = useState('demo123')
  const [company, setCompany] = useState('Ayinde Retail Group — EIN ••4821')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!username || !password) return alert('Enter any username and password for demo')
    setLoading(true)
    setTimeout(() => onLoginSuccess(username || 'Payroll Admin'), 600)
  }

  return (
    <div className="exactus-login-grid" style={{ minHeight: '100vh', display: 'grid', fontFamily: 'Inter, Arial, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .exactus-login-grid { grid-template-columns: 1.05fr 0.95fr; }
        .exactus-login-left { background: linear-gradient(160deg, #DC2626 0%, #991B1B 55%, #0f172a 100%); color: #fff; padding: 36px; display: flex; flex-direction: column; }
        .exactus-login-right { background: #fff; padding: 40px 36px; display: flex; flex-direction: column; justify-content: center; }
        .exactus-login-title { font-size: clamp(26px, 6vw, 36px); line-height: 1.2; margin: 22px 0 10px; }
        .exactus-login-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 14px; text-align: center; }
        .exactus-login-quick { display: flex; gap: 10px; margin-top: 12px; }

        @media (max-width: 900px) {
          .exactus-login-grid { grid-template-columns: 1fr; min-height: auto; }
          .exactus-login-left { padding: 24px 20px; }
          .exactus-login-right { padding: 28px 20px 32px; }
        }
        @media (max-width: 600px) {
          .exactus-login-left { padding: 20px 16px; }
          .exactus-login-right { padding: 24px 16px 28px; }
          .exactus-login-stats { gap: 6px; }
          .exactus-login-stats > div { padding: 8px 4px; }
          .exactus-login-quick { flex-direction: column; }
          .exactus-login-quick button { width: 100%; }
        }
      `}</style>

      {/* LEFT - BRAND */}
      <div className="exactus-login-left">
        <button onClick={() => go('product-exactus')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}><i className="bi bi-arrow-left"></i> Back to Exactus</button>

        <div style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', color: '#DC2626', display: 'grid', placeItems: 'center', fontSize: 24, flexShrink: 0 }}><i className="bi bi-calculator-fill"></i></span>
            <div><h2 style={{ fontSize: 26 }}>Exactus</h2><p style={{ color: '#fecaca', fontSize: 13 }}>By Ayinde Technologies</p></div>
          </div>
          <h1 className="exactus-login-title">Payroll, done<br />in 4 minutes.</h1>
          <p style={{ color: '#fecaca', lineHeight: 1.6, maxWidth: 440 }}>Tax calculated, overtime handled, direct deposit scheduled, 【entity-IRS¦canonical_name=IRS】 filings prepared. This is a demo — no real money moves.</p>
        </div>

        <div style={{ background: '#fff', color: '#0f172a', borderRadius: 16, padding: 16, marginTop: 24, maxWidth: 440, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><b style={{ fontSize: 14 }}>Next Pay Run — Nov 15, 2026</b><span style={{ background: '#fee2e2', color: '#DC2626', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>IN 3 DAYS</span></div>
          <div className="exactus-login-stats">
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>$38,420</b><p style={{ fontSize: 11, color: '#64748b' }}>Gross Payroll</p></div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>24 People</b><p style={{ fontSize: 11, color: '#64748b' }}>To Be Paid</p></div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>100%</b><p style={{ fontSize: 11, color: '#64748b' }}>Compliant</p></div>
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#fecaca', marginTop: 24 }}>© 2026 Ayinde Technologies Corporation — Demo templates, no backend wiring until requested.</p>
      </div>

      {/* RIGHT - LOGIN FORM */}
      <div className="exactus-login-right">
        <div style={{ maxWidth: 440, margin: '0 auto', width: '100%' }}>
          <span style={{ background: '#fee2e2', color: '#DC2626', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block' }}><i className="bi bi-shield-check-fill"></i> EXACTUS — DEMO LOGIN</span>
          <h2 style={{ fontSize: 'clamp(24px, 6vw, 30px)', margin: '16px 0 6px' }}>Welcome back, Payroll Admin</h2>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>Login to run payroll. Use <b>any username & password</b> for this demo.</p>

          <form onSubmit={submit} style={{ marginTop: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Company / Entity</label>
            <select value={company} onChange={e => setCompany(e.target.value)} style={{ width: '100%', padding: 13, borderRadius: 10, border: '1px solid #e2e8f0', margin: '6px 0 16px', fontSize: 14 }}>
              <option>Ayinde Retail Group — EIN ••4821</option>
              <option>Ayinde Hospitality LLC — EIN ••9930</option>
              <option>Demo Company — EIN ••0001</option>
            </select>

            <label style={{ fontSize: 13, fontWeight: 700 }}>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. payroll-admin" style={{ width: '100%', padding: 13, borderRadius: 10, border: '1px solid #e2e8f0', margin: '6px 0 16px', fontSize: 14, boxSizing: 'border-box' }} />

            <label style={{ fontSize: 13, fontWeight: 700 }}>Password</label>
            <div style={{ position: 'relative', margin: '6px 0 6px' }}>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Any password works" style={{ width: '100%', padding: '13px 44px 13px 13px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><i className={`bi ${showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i></button>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Demo: <b>payroll-admin / demo123</b> or any login works</p>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: 14, background: '#DC2626', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              {loading ? 'Opening Payroll...' : <>Open Payroll Dashboard <i className="bi bi-arrow-right"></i></>}
            </button>

            <div className="exactus-login-quick">
              <button type="button" onClick={() => { setUsername('owner'); setPassword('demo123') }} style={{ flex: 1, padding: 11, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-star-fill"></i> Use Owner</button>
              <button type="button" onClick={() => { setUsername('accountant'); setPassword('demo123') }} style={{ flex: 1, padding: 11, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-person-fill"></i> Use Accountant</button>
            </div>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, fontSize: 13, gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => go('product-exactus')} style={{ background: 'none', border: 'none', color: '#DC2626', fontWeight: 700, cursor: 'pointer' }}>← Back to Exactus</button>
            <button onClick={() => go('home')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>Back to Home</button>
          </div>

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 12, marginTop: 20, fontSize: 13, color: '#7f1d1d', lineHeight: 1.6 }}>
            <b><i className="bi bi-shield-check-fill"></i> Demo Mode:</b> No real backend. Your login just opens the dashboard. Taxes & deposits are mock data.
          </div>
        </div>
      </div>
    </div>
  )
}