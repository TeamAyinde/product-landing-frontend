import React, { useState } from 'react'

// src/pages/inventro-login.jsx
// Login: pages/inventro-login - Full screen, no header/footer - MOBILE RESPONSIVE

export default function InventroLogin({ go, onLoginSuccess }) {
  const [username, setUsername] = useState('warehouse-manager')
  const [password, setPassword] = useState('demo123')
  const [warehouse, setWarehouse] = useState('Newark — Main Warehouse')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!username || !password) return alert('Enter any username and password for demo')
    setLoading(true)
    setTimeout(() => onLoginSuccess(username || 'Warehouse Manager'), 600)
  }

  return (
    <div className="inventro-login-grid" style={{ minHeight: '100vh', display: 'grid', fontFamily: 'Inter, Arial, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .inventro-login-grid { grid-template-columns: 1.05fr 0.95fr; }
        .inventro-login-left { background: linear-gradient(160deg, #F97316 0%, #EA580C 55%, #0f172a 100%); color: #fff; padding: 36px; display: flex; flex-direction: column; }
        .inventro-login-right { background: #fff; padding: 40px 36px; display: flex; flex-direction: column; justify-content: center; }
        .inventro-login-title { font-size: clamp(26px, 6vw, 36px); line-height: 1.2; margin: 22px 0 10px; }
        .inventro-login-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 14px; text-align: center; }
        .inventro-login-quick { display: flex; gap: 10px; margin-top: 12px; }

        @media (max-width: 900px) {
          .inventro-login-grid { grid-template-columns: 1fr; min-height: auto; }
          .inventro-login-left { padding: 24px 20px; }
          .inventro-login-right { padding: 28px 20px 32px; }
        }
        @media (max-width: 600px) {
          .inventro-login-left { padding: 20px 16px; }
          .inventro-login-right { padding: 24px 16px 28px; }
          .inventro-login-stats { gap: 6px; }
          .inventro-login-stats > div { padding: 8px 4px; }
          .inventro-login-quick { flex-direction: column; }
          .inventro-login-quick button { width: 100%; }
        }
      `}</style>

      {/* LEFT - BRAND */}
      <div className="inventro-login-left">
        <button onClick={() => go('product-inventro')} style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}><i className="bi bi-arrow-left"></i> Back to Inventro</button>

        <div style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', color: '#F97316', display: 'grid', placeItems: 'center', fontSize: 24, flexShrink: 0 }}><i className="bi bi-box-seam-fill"></i></span>
            <div><h2 style={{ fontSize: 26 }}>Inventro</h2><p style={{ color: '#ffedd5', fontSize: 13 }}>By Ayinde Technologies</p></div>
          </div>
          <h1 className="inventro-login-title">Know what to order.<br />Before you run out.</h1>
          <p style={{ color: '#ffedd5', lineHeight: 1.6, maxWidth: 440 }}>Scan barcodes, track every warehouse, and let ML forecast your next purchase order. This is a demo — no real stock moves.</p>
        </div>

        <div style={{ background: '#fff', color: '#0f172a', borderRadius: 16, padding: 16, marginTop: 24, maxWidth: 440, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><b style={{ fontSize: 14 }}>Today — {warehouse}</b><span style={{ background: '#ffedd5', color: '#EA580C', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>3 ALERTS</span></div>
          <div className="inventro-login-stats">
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>1,284 SKUs</b><p style={{ fontSize: 11, color: '#64748b' }}>In Stock</p></div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>$184k</b><p style={{ fontSize: 11, color: '#64748b' }}>Inventory Value</p></div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>94%</b><p style={{ fontSize: 11, color: '#64748b' }}>Forecast Acc.</p></div>
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#ffedd5', marginTop: 24, paddingTop: 0 }}>© 2026 Ayinde Technologies Corporation — Demo templates, no backend wiring until requested.</p>
      </div>

      {/* RIGHT - LOGIN FORM */}
      <div className="inventro-login-right">
        <div style={{ maxWidth: 440, margin: '0 auto', width: '100%' }}>
          <span style={{ background: '#ffedd5', color: '#EA580C', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block' }}><i className="bi bi-upc-scan"></i> INVENTRO — DEMO LOGIN</span>
          <h2 style={{ fontSize: 'clamp(24px, 6vw, 30px)', margin: '16px 0 6px' }}>Welcome back, Manager</h2>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>Login to open your warehouse. Use <b>any username & password</b> for this demo.</p>

          <form onSubmit={submit} style={{ marginTop: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Warehouse</label>
            <select value={warehouse} onChange={e => setWarehouse(e.target.value)} style={{ width: '100%', padding: 13, borderRadius: 10, border: '1px solid #e2e8f0', margin: '6px 0 16px', fontSize: 14 }}>
              <option>Newark — Main Warehouse</option>
              <option>Inglewood — West Coast</option>
              <option>3PL — Dallas</option>
            </select>

            <label style={{ fontSize: 13, fontWeight: 700 }}>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. warehouse-manager" style={{ width: '100%', padding: 13, borderRadius: 10, border: '1px solid #e2e8f0', margin: '6px 0 16px', fontSize: 14, boxSizing: 'border-box' }} />

            <label style={{ fontSize: 13, fontWeight: 700 }}>Password</label>
            <div style={{ position: 'relative', margin: '6px 0 6px' }}>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Any password works" style={{ width: '100%', padding: '13px 44px 13px 13px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><i className={`bi ${showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i></button>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Demo: <b>warehouse-manager / demo123</b> or any login works</p>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: 14, background: '#F97316', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              {loading ? 'Opening Warehouse...' : <>Open Warehouse Dashboard <i className="bi bi-arrow-right"></i></>}
            </button>

            <div className="inventro-login-quick">
              <button type="button" onClick={() => { setUsername('picker-01'); setPassword('demo123') }} style={{ flex: 1, padding: 11, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-person-fill"></i> Use Picker</button>
              <button type="button" onClick={() => { setUsername('owner'); setPassword('demo123') }} style={{ flex: 1, padding: 11, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-star-fill"></i> Use Owner</button>
            </div>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, fontSize: 13, gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => go('product-inventro')} style={{ background: 'none', border: 'none', color: '#EA580C', fontWeight: 700, cursor: 'pointer' }}>← Back to Inventro</button>
            <button onClick={() => go('home')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>Back to Home</button>
          </div>

          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: 12, marginTop: 20, fontSize: 13, color: '#7c2d12', lineHeight: 1.6 }}>
            <b><i className="bi bi-shield-check-fill"></i> Demo Mode:</b> No real backend. Your login just opens the dashboard. Scans & forecasts are mock data.
          </div>
        </div>
      </div>
    </div>
  )
}