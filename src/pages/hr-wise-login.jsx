import React, { useState } from 'react'

// src/pages/hr-wise-login.jsx
// Page: pages/hr-wise-login - Login as HR
// Demo: any username + any password works

export default function HrWiseLogin({ go, onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Please enter any username and any password to continue demo.')
      return
    }
    setError('')
    setLoading(true)
    // Demo only - no backend
    setTimeout(() => {
      setLoading(false)
      onLoginSuccess(username.trim())
    }, 700)
  }

  const quickLogin = (name) => {
    setUsername(name)
    setPassword('demo123')
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLoginSuccess(name)
    }, 600)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr' }} className="hr-login-grid">
      {/* LEFT - BRAND */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#7C3AED' }}>
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80" alt="HR-Wise" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 36, color: '#fff', background: 'linear-gradient(180deg, rgba(124,58,237,0.6), rgba(15,23,42,0.95))' }}>
          <div>
            <button onClick={() => go('product-hrwise')} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}><i className="bi bi-arrow-left"></i> Back to HR-Wise</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32 }}>
              <span style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', color: '#7C3AED', display: 'grid', placeItems: 'center', fontSize: 24 }}><i className="bi bi-people-fill"></i></span>
              <div><h2 style={{ fontSize: 24 }}>HR-Wise</h2><p style={{ color: '#ddd6fe', fontSize: 13 }}>By Ayinde Technologies</p></div>
            </div>
            <h1 style={{ fontSize: 36, lineHeight: 1.15, marginTop: 28 }}>HR that feels<br />effortless.</h1>
            <p style={{ color: '#e9d5ff', lineHeight: 1.7, marginTop: 12, maxWidth: 420 }}>Hire, onboard, stay compliant, and grow your people. All in one secure portal built for US businesses.</p>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: 16, display: 'flex', gap: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', color: '#7C3AED', display: 'grid', placeItems: 'center', fontWeight: 800 }}>AR</span>
              <div><p style={{ fontSize: 14, lineHeight: 1.6 }}>"We cut time-to-hire from 28 days to 9 days. HR-Wise paid for itself in month one."</p><b style={{ fontSize: 13 }}>Amanda Ruiz - HR Director, Texas</b></div>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#ddd6fe' }}><span><b style={{ color: '#fff' }}>500+</b> Companies</span><span><b style={{ color: '#fff' }}>12 hrs</b> saved / week</span><span><b style={{ color: '#fff' }}>98%</b> Compliance</span></div>
          </div>
        </div>
      </div>

      {/* RIGHT - FORM */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ width: 64, height: 64, borderRadius: 18, background: '#ede9fe', color: '#7C3AED', display: 'inline-grid', placeItems: 'center', fontSize: 30 }}><i className="bi bi-person-badge-fill"></i></span>
            <h2 style={{ fontSize: 28, marginTop: 16 }}>Login as HR</h2>
            <p style={{ color: '#64748b', marginTop: 6, lineHeight: 1.6 }}>Welcome back. Manage hiring, onboarding, compliance and performance.</p>
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 14, padding: '14px 16px', marginTop: 20, display: 'flex', gap: 10 }}>
            <i className="bi bi-info-circle-fill" style={{ color: '#2F80ED', fontSize: 18, flexShrink: 0 }}></i>
            <div><b style={{ fontSize: 14, color: '#1e40af' }}>Demo Mode - No real account needed</b><p style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.6, marginTop: 2 }}>Enter <b>any username</b> and <b>any password</b> to login and explore the full dashboard. Nothing is saved.</p></div>
          </div>

          <form onSubmit={submit} style={{ marginTop: 20 }}>
            <label className="field-label">Username *</label>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-person-fill" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
              <input className="field" style={{ paddingLeft: 40 }} placeholder="e.g. hr.manager, sophia, demo" value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <label className="field-label">Password *</label>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-lock-fill" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
              <input className="field" style={{ paddingLeft: 40, paddingRight: 44 }} type={showPassword ? 'text' : 'password'} placeholder="Enter any password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i></button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 18px', fontSize: 13 }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label>
              <span style={{ color: '#7C3AED', fontWeight: 700, cursor: 'pointer' }}>Forgot password?</span>
            </div>

            {error && <p style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#DC2626', padding: '10px 12px', borderRadius: 10, fontSize: 13, marginBottom: 12 }}>{error}</p>}

            <button type="submit" disabled={loading} style={{ width: '100%', padding: 15, background: '#7C3AED', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Logging you in...' : 'Login to Dashboard'} <i className="bi bi-arrow-right"></i>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0', color: '#94a3b8', fontSize: 12 }}><span style={{ flex: 1, height: 1, background: '#e2e8f0' }}></span>OR TRY QUICK DEMO<span style={{ flex: 1, height: 1, background: '#e2e8f0' }}></span></div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button type="button" onClick={() => quickLogin('sophia.hr')} style={{ padding: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-person-fill"></i> Login as Sophia</button>
              <button type="button" onClick={() => quickLogin('hr.manager')} style={{ padding: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-person-badge-fill"></i> Login as Manager</button>
            </div>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 18 }}>New to HR-Wise? <span onClick={() => go('contact')} style={{ color: '#7C3AED', fontWeight: 700, cursor: 'pointer' }}>Request a build</span> - Sales: +1-302-515-0227</p>
          </form>
        </div>
      </div>
    </div>
  )
}