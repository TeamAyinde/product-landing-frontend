import React, { useState } from 'react'

// src/pages/verus-pos-login.jsx
// Login: pages/verus-pos-login - Full screen, no header/footer - MOBILE RESPONSIVE

export default function VerusPosLogin({ go, onLoginSuccess }) {
  const [username, setUsername] = useState('store-manager')
  const [password, setPassword] = useState('demo123')
  const [store, setStore] = useState('Downtown - Newark, DE')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!username || !password) return alert('Enter any username and password for demo')
    setLoading(true)
    setTimeout(() => onLoginSuccess(username || 'Store Manager'), 600)
  }

  return (
    <div className="verus-login-grid" style={{ minHeight: '100vh', display: 'grid', fontFamily: 'Inter, Arial, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .verus-login-grid { grid-template-columns: 1.05fr 0.95fr; }
        .verus-login-left { background: linear-gradient(160deg, #059669 0%, #047857 55%, #0f172a 100%); color: #fff; padding: 36px; display: flex; flex-direction: column; position: relative; overflow: hidden; }
        .verus-login-right { background: #fff; padding: 40px 36px; display: flex; flex-direction: column; justify-content: center; }
        .verus-login-title { font-size: clamp(26px, 6vw, 36px); line-height: 1.2; margin: 22px 0 10px; }
        .verus-login-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 14px; text-align: center; }
        .verus-login-quick { display: flex; gap: 10px; margin-top: 12px; }

        @media (max-width: 900px) {
          .verus-login-grid { grid-template-columns: 1fr; min-height: auto; }
          .verus-login-left { padding: 24px 20px; }
          .verus-login-right { padding: 28px 20px 32px; }
        }
        @media (max-width: 600px) {
          .verus-login-left { padding: 20px 16px; }
          .verus-login-right { padding: 24px 16px 28px; }
          .verus-login-stats { gap: 6px; }
          .verus-login-stats > div { padding: 8px 4px; }
          .verus-login-quick { flex-direction: column; }
          .verus-login-quick button { width: 100%; }
        }
      `}</style>

      {/* LEFT - BRAND + POS PREVIEW */}
      <div className="verus-login-left">
        <button onClick={() => go('product-verus')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}><i className="bi bi-arrow-left"></i> Back to Verus POS</button>

        <div style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', color: '#059669', display: 'grid', placeItems: 'center', fontSize: 24, flexShrink: 0 }}><i className="bi bi-cart-check-fill"></i></span>
            <div><h2 style={{ fontSize: 26 }}>Verus POS</h2><p style={{ color: '#a7f3d0', fontSize: 13 }}>By Ayinde Technologies</p></div>
          </div>
          <h1 className="verus-login-title">Sell faster.<br />Sync everywhere.</h1>
          <p style={{ color: '#d1fae5', lineHeight: 1.6, maxWidth: 440 }}>Open the register, take payments, sync inventory across stores — all from one dashboard. This is a demo, no real money moves.</p>
        </div>

        <div style={{ background: '#fff', color: '#0f172a', borderRadius: 16, padding: 16, marginTop: 24, maxWidth: 440, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><b style={{ fontSize: 14 }}>Today — {store}</b><span style={{ background: '#dcfce7', color: '#059669', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>OPEN</span></div>
          <div className="verus-login-stats">
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>$2,418</b><p style={{ fontSize: 11, color: '#64748b' }}>Today Sales</p></div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>84</b><p style={{ fontSize: 11, color: '#64748b' }}>Orders</p></div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 10 }}><b style={{ fontSize: 14 }}>3 Stores</b><p style={{ fontSize: 11, color: '#64748b' }}>Synced</p></div>
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#a7f3d0', marginTop: 24 }}>© 2026 Ayinde Technologies Corporation — Demo templates, no backend wiring until requested.</p>
      </div>

      {/* RIGHT - LOGIN FORM */}
      <div className="verus-login-right">
        <div style={{ maxWidth: 440, margin: '0 auto', width: '100%' }}>
          <span style={{ background: '#dcfce7', color: '#059669', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block' }}><i className="bi bi-lightning-charge-fill"></i> VERUS POS — DEMO LOGIN</span>
          <h2 style={{ fontSize: 'clamp(24px, 6vw, 30px)', margin: '16px 0 6px' }}>Welcome back, Manager</h2>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>Login to open your register. Use <b>any username & password</b> for this demo.</p>

          <form onSubmit={submit} style={{ marginTop: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Store Location</label>
            <select value={store} onChange={e => setStore(e.target.value)} style={{ width: '100%', padding: 13, borderRadius: 10, border: '1px solid #e2e8f0', margin: '6px 0 16px', fontSize: 14 }}>
              <option>Downtown - Newark, DE</option>
              <option>Inglewood - CA</option>
              <option>Online Store</option>
            </select>

            <label style={{ fontSize: 13, fontWeight: 700 }}>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. store-manager" style={{ width: '100%', padding: 13, borderRadius: 10, border: '1px solid #e2e8f0', margin: '6px 0 16px', fontSize: 14, boxSizing: 'border-box' }} />

            <label style={{ fontSize: 13, fontWeight: 700 }}>Password</label>
            <div style={{ position: 'relative', margin: '6px 0 6px' }}>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Any password works" style={{ width: '100%', padding: '13px 44px 13px 13px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><i className={`bi ${showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i></button>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Demo: <b>store-manager / demo123</b> or any login works</p>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: 14, background: '#059669', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              {loading ? 'Opening Register...' : <>Open Register <i className="bi bi-arrow-right"></i></>}
            </button>

            <div className="verus-login-quick">
              <button type="button" onClick={() => { setUsername('cashier-01'); setPassword('demo123') }} style={{ flex: 1, padding: 11, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-person-fill"></i> Use Cashier</button>
              <button type="button" onClick={() => { setUsername('owner'); setPassword('demo123') }} style={{ flex: 1, padding: 11, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-star-fill"></i> Use Owner</button>
            </div>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, fontSize: 13, gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => go('product-verus')} style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 700, cursor: 'pointer' }}>← Back to Verus POS</button>
            <button onClick={() => go('home')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>Back to Home</button>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 12, marginTop: 20, fontSize: 13, color: '#166534', lineHeight: 1.6 }}>
            <b><i className="bi bi-shield-check-fill"></i> Demo Mode:</b> No real backend. Your login just opens the dashboard. Payments & inventory are mock data.
          </div>
        </div>
      </div>
    </div>
  )
}