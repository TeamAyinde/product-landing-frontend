import React, { useState } from 'react'

// src/pages/verus-pos.jsx
// Landing: pages/verus-pos - Verus POS - MOBILE RESPONSIVE

export default function VerusPos({ go, onRequest }) {
  const [store, setStore] = useState('Downtown - Newark')
  const [plan, setPlan] = useState('Growth')

  const FEATURES = [
    { icon: 'bi-lightning-charge-fill', title: '0.4s Blazing-Fast Checkout', desc: 'Scan, tap, done. No lag at the till even on Black Friday rush. Offline mode keeps selling when Wi-Fi drops.' },
    { icon: 'bi-arrow-repeat', title: 'Real-Time Multi-Store Sync', desc: 'Sell a jacket in Newark, stock updates instantly in Inglewood. No overselling, no manual counts.' },
    { icon: 'bi-credit-card-2-front-fill', title: 'Secure Payments', desc: 'Cards, cash, tap-to-pay, Apple Pay, Google Pay. PCI-compliant with end-to-end encryption.' },
    { icon: 'bi-bar-chart-line-fill', title: 'Live Sales Reports', desc: 'See sales by store, staff, product and hour. Know your best seller before lunch ends.' },
    { icon: 'bi-box-seam-fill', title: 'Smart Inventory', desc: 'Barcode scan, low-stock alerts, auto reorder. Never run out of your best sellers again.' },
    { icon: 'bi-people-fill', title: 'Staff & Permissions', desc: 'Cashier, Manager, Owner roles. Track who sold what, clock-in, and commissions.' },
  ]

  const PLANS = [
    { name: 'Starter', price: '$29', per: '/mo / 1 register', desc: 'For single-store shops just starting out.', features: ['1 Register', '1,000 Products', 'Basic Reports', 'Card + Cash'], cta: 'Start Starter' },
    { name: 'Growth', price: '$69', per: '/mo / 3 registers', desc: 'For growing retail & hospitality with 2-3 stores.', features: ['3 Registers', 'Unlimited Products', 'Multi-Store Sync', 'Low-Stock Alerts', 'Staff Roles & Reports'], cta: 'Start Growth', popular: true },
    { name: 'Scale', price: '$129', per: '/mo / unlimited', desc: 'For chains, franchises & high-volume stores.', features: ['Unlimited Registers', 'All Growth Features', 'API + Integrations', 'Dedicated Support'], cta: 'Talk to Sales' },
  ]

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', fontFamily: 'Inter, Arial, sans-serif', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .verus-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 36px; align-items: center; }
        .verus-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .verus-pos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .verus-hero-title { font-size: clamp(32px, 6vw, 48px); line-height: 1.08; margin: 12px 0; }
        .verus-hero-sub { font-size: clamp(15px, 3.5vw, 18px); color: #475569; line-height: 1.7; }
        .verus-btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
        .verus-btn-row button { white-space: nowrap; }
        .verus-stats { display: flex; gap: 18px; margin-top: 28px; flex-wrap: wrap; }
        .verus-section { max-width: 1280px; margin: 0 auto; padding-left: 20px; padding-right: 20px; }
        .verus-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }

        @media (max-width: 900px) {
          .verus-hero-grid { grid-template-columns: 1fr; gap: 24px; }
          .verus-2col { grid-template-columns: 1fr; gap: 16px; }
          .verus-section { padding-left: 16px; padding-right: 16px; }
        }
        @media (max-width: 600px) {
          .verus-btn-row { flex-direction: column; }
          .verus-btn-row button { width: 100%; text-align: center; justify-content: center; }
          .verus-pos-grid { grid-template-columns: repeat(2, 1fr); }
          .verus-stats { gap: 14px; }
          .verus-stats > div { flex: 1 1 40%; min-width: 120px; }
          .verus-cta-row { flex-direction: column; align-items: stretch; }
          .verus-cta-row button { width: 100%; }
        }
        @media (max-width: 400px) {
          .verus-pos-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .verus-stats > div { flex: 1 1 100%; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg, #ecfdf5 0%, #fff 100%)', padding: '32px 0 44px' }}>
        <div className="verus-section verus-hero-grid">
          <div style={{ minWidth: 0 }}>
            <button onClick={() => go('products')} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}><i className="bi bi-arrow-left"></i> All Products</button>
            <p style={{ color: '#059669', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 20 }}>pages/verus-pos — Ayinde Technologies</p>
            <h1 className="verus-hero-title">Checkout in <span style={{ color: '#059669' }}>0.4 seconds.</span><br />Sell everywhere.</h1>
            <p className="verus-hero-sub">Verus POS for retail & hospitality. Sync inventory across all stores in real-time, take secure payments, and see live sales reports by store, staff and product.</p>

            <div className="verus-btn-row">
              <button onClick={() => go('verus-pos-login')} style={{ background: '#059669', color: '#fff', padding: '14px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Enter Demo Dashboard <i className="bi bi-box-arrow-in-right"></i></button>
              <button onClick={onRequest} style={{ background: '#0f172a', color: '#fff', padding: '14px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request Verus POS</button>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 14, lineHeight: 1.6 }}><i className="bi bi-patch-check-fill" style={{ color: '#059669' }}></i> 0.4s Checkout — Multi-Store Sync — Live Reports — Demo login: any username / password</p>

            <div className="verus-stats">
              <div><b style={{ fontSize: 20 }}>1,200+</b><p style={{ fontSize: 13, color: '#64748b' }}>Stores Live</p></div>
              <div><b style={{ fontSize: 20 }}>$48M+</b><p style={{ fontSize: 13, color: '#64748b' }}>Processed / Year</p></div>
              <div><b style={{ fontSize: 20 }}>4.9 / 5</b><p style={{ fontSize: 13, color: '#64748b' }}>Store Owner Rating</p></div>
              <div><b style={{ fontSize: 20 }}>99.99%</b><p style={{ fontSize: 13, color: '#64748b' }}>Uptime</p></div>
            </div>
          </div>

          {/* POS PREVIEW MOCK */}
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', overflow: 'hidden', minWidth: 0, width: '100%' }}>
            <div style={{ background: '#0f172a', color: '#fff', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 14 }}><i className="bi bi-cart-check-fill" style={{ color: '#34d399' }}></i> Verus POS — Terminal</b>
              <span style={{ background: '#059669', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>LIVE DEMO</span>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                {['All', 'Drinks', 'Food', 'Retail'].map((c, i) => <span key={c} style={{ padding: '7px 12px', borderRadius: 999, background: i === 0 ? '#059669' : '#f1f5f9', color: i === 0 ? '#fff' : '#334155', fontSize: 12, fontWeight: 700 }}>{c}</span>)}
              </div>
              <div className="verus-pos-grid">
                {[['Iced Latte', '$4.50', '#fef3c7'], ['Croissant', '$3.20', '#ffedd5'], ['Cold Brew', '$5.00', '#dbeafe'], ['Muffin', '$2.80', '#dcfce7'], ['T-Shirt', '$24.00', '#ede9fe'], ['Cap', '$18.00', '#fee2e2']].map(([n, p, bg]) => (
                  <div key={n} style={{ background: bg, borderRadius: 12, padding: 12, textAlign: 'center', minWidth: 0 }}><b style={{ fontSize: 13, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</b><p style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{p}</p></div>
                ))}
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 14, marginTop: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, gap: 10 }}><span>Iced Latte x 1</span><b>$4.50</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6, gap: 10 }}><span>Croissant x 2</span><b>$6.40</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, marginTop: 10, paddingTop: 10, borderTop: '1px dashed #e2e8f0' }}><span>Total</span><span>$10.90</span></div>
                <button onClick={() => go('verus-pos-login')} style={{ width: '100%', marginTop: 12, background: '#059669', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-credit-card-fill"></i> Charge $10.90 — Try Live Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORE SWITCHER STRIP */}
      <section className="verus-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div style={{ background: '#0f172a', color: '#fff', borderRadius: 16, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <b style={{ fontSize: 14 }}><i className="bi bi-shop"></i> Your Stores — Live Sync:</b>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
            {['Downtown - Newark', 'Inglewood - CA', 'Online Store'].map(s => (
              <button key={s} onClick={() => setStore(s)} style={{ padding: '8px 14px', borderRadius: 999, border: 'none', background: store === s ? '#059669' : '#1e293b', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>{s} {store === s && '✓'}</button>
            ))}
          </div>
          <span style={{ fontSize: 13, color: '#94a3b8', width: '100%' }}>Viewing: <b style={{ color: '#fff' }}>{store}</b> — Stock synced 2s ago</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="verus-section" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(24px, 5vw, 30px)' }}>Everything a modern store needs</h2>
        <p style={{ color: '#64748b', marginTop: 8, lineHeight: 1.6 }}>Built for retail, cafés, restaurants & boutiques. No clunky hardware, no training manual.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 24 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: '#f8fafc', padding: 22, borderRadius: 18, border: '1px solid #eef2f7', minWidth: 0 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#dcfce7', color: '#059669', display: 'grid', placeItems: 'center', fontSize: 22 }}><i className={`bi ${f.icon}`}></i></div>
              <h3 style={{ margin: '14px 0 8px', fontSize: 17 }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INVENTORY SYNC DEMO */}
      <section className="verus-section" style={{ paddingBottom: 48 }}>
        <div className="verus-2col">
          <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 280 }}>
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=80" alt="Verus POS store" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.75))', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
              <h3 style={{ fontSize: 'clamp(18px, 4vw, 22px)', lineHeight: 1.3 }}>One inventory. Every store. Every channel.</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>Sell in-store, online, or at a pop-up — Verus keeps stock in sync everywhere.</p>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 20, padding: 24, minWidth: 0 }}>
            <h3 style={{ fontSize: 18 }}><i className="bi bi-box-seam-fill" style={{ color: '#059669' }}></i> Live Inventory — {store}</h3>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              {[['Iced Latte Beans', '42 in stock', 'Healthy', '#059669', '92%'], ['Croissant', '8 left — Low', 'Reorder', '#F97316', '22%'], ['T-Shirt - Black M', '0 — Out', 'Urgent', '#DC2626', '0%'], ['Cold Brew Cans', '126 in stock', 'Healthy', '#059669', '88%']].map(([name, stock, badge, col, pct]) => (
                <div key={name} style={{ background: '#f8fafc', borderRadius: 12, padding: 14, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, gap: 10, flexWrap: 'wrap' }}><b style={{ minWidth: 0 }}>{name}</b><span style={{ background: col, color: '#fff', padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{badge}</span></div>
                  <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{stock}</p>
                  <div style={{ height: 6, background: '#e2e8f0', borderRadius: 999, marginTop: 8, overflow: 'hidden' }}><div style={{ width: pct, height: '100%', background: col }}></div></div>
                </div>
              ))}
            </div>
            <button onClick={() => go('verus-pos-login')} style={{ width: '100%', marginTop: 16, background: '#059669', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Open Inventory in Demo <i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="verus-section" style={{ paddingBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(24px, 5vw, 30px)', textAlign: 'center' }}>Simple pricing. No hidden fees.</h2>
        <p style={{ color: '#64748b', textAlign: 'center', marginTop: 8 }}>Start free for 14 days. Cancel anytime. Hardware optional.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 32 }}>
          {PLANS.map(p => (
            <div key={p.name} onClick={() => setPlan(p.name)} style={{ background: p.popular ? '#0f172a' : '#fff', color: p.popular ? '#fff' : '#0f172a', border: p.popular ? '2px solid #059669' : '1px solid #e2e8f0', borderRadius: 20, padding: 24, cursor: 'pointer', position: 'relative', minWidth: 0 }}>
              {p.popular && <span style={{ position: 'absolute', top: -12, left: 20, background: '#059669', color: '#fff', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 800 }}>MOST POPULAR</span>}
              <h3>{p.name}</h3>
              <p style={{ fontSize: 34, fontWeight: 800, margin: '10px 0 2px' }}>{p.price} <span style={{ fontSize: 13, fontWeight: 400, color: p.popular ? '#cbd5e1' : '#64748b' }}>{p.per}</span></p>
              <p style={{ fontSize: 14, color: p.popular ? '#cbd5e1' : '#64748b', lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ display: 'grid', gap: 8, margin: '18px 0' }}>{p.features.map(f => <span key={f} style={{ fontSize: 14 }}><i className="bi bi-check-circle-fill" style={{ color: '#059669' }}></i> {f}</span>)}</div>
              <button onClick={onRequest} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: p.popular ? '#059669' : '#0f172a', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="verus-section" style={{ paddingBottom: 48 }}>
        <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', color: '#fff', borderRadius: 20, padding: '28px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', lineHeight: 1.3 }}>Want Verus POS for your store?</h2>
          <p style={{ color: '#d1fae5', marginTop: 8, lineHeight: 1.6, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>Try the live demo now — no signup. Then request your own build and we wire it for your stores.</p>
          <div className="verus-cta-row">
            <button onClick={() => go('verus-pos-login')} style={{ background: '#fff', color: '#059669', padding: '13px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Try Live Demo <i className="bi bi-arrow-right"></i></button>
            <button onClick={onRequest} style={{ background: '#0f172a', color: '#fff', padding: '13px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request Verus POS</button>
          </div>
        </div>
      </section>
    </div>
  )
}