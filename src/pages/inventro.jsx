import React, { useState } from 'react'

// src/pages/inventro.jsx
// Landing: pages/inventro - Inventro Supply Chain - MOBILE RESPONSIVE

export default function Inventro({ go, onRequest }) {
  const [product, setProduct] = useState('Iced Latte Beans — 25lb Bag')
  const [warehouse, setWarehouse] = useState('Newark — Main Warehouse')
  const [plan, setPlan] = useState('Growth')

  const FORECAST = {
    'Iced Latte Beans — 25lb Bag': { stock: 42, weekly: 28, forecast: [28, 32, 30, 36, 38, 34], reorder: 'Reorder 80 units by Fri', status: 'Reorder Soon', color: '#F97316' },
    'Cold Brew Cans — 12 Pack': { stock: 126, weekly: 18, forecast: [18, 20, 19, 22, 21, 24], reorder: 'Stock healthy for 6 weeks', status: 'Healthy', color: '#059669' },
    'T-Shirt — Black M': { stock: 0, weekly: 22, forecast: [22, 25, 28, 30, 32, 35], reorder: 'URGENT — Out of stock, order 120 now', status: 'Out of Stock', color: '#DC2626' },
  }
  const data = FORECAST[product]
  const maxF = Math.max(...data.forecast)

  const FEATURES = [
    { icon: 'bi-upc-scan', title: 'Barcode Scan in 0.3s', desc: 'Scan with any phone or scanner. Receiving, picking, and stock counts in seconds — no manual entry.' },
    { icon: 'bi-bell-fill', title: 'Low-Stock Alerts Before You Run Out', desc: 'Set min levels per product. Get alerts by email, SMS, and dashboard the moment you dip below.' },
    { icon: 'bi-robot', title: 'ML Purchasing Forecast', desc: 'Inventro learns your seasonality, promos, and lead times — then tells you exactly what to order and when.' },
    { icon: 'bi-truck', title: 'Suppliers & Purchase Orders', desc: 'One-click POs to suppliers. Track ETA, partial deliveries, and costs per supplier.' },
    { icon: 'bi-diagram-3-fill', title: 'Multi-Warehouse View', desc: 'Newark, Inglewood, and 3PL in one screen. Transfer stock between warehouses in 2 clicks.' },
    { icon: 'bi-box-seam-fill', title: 'Distributor-Ready', desc: 'Lots, expiry, serials, and batch tracking for food, pharma, and retail distributors.' },
  ]

  const PLANS = [
    { name: 'Starter', price: '$49', per: '/mo / 1 warehouse', desc: 'For single-warehouse shops starting out.', features: ['1 Warehouse', '1,000 SKUs', 'Barcode Scan', 'Low-Stock Alerts'], cta: 'Start Starter' },
    { name: 'Growth', price: '$99', per: '/mo / 3 warehouses', desc: 'For distributors & retailers with 2-3 warehouses.', features: ['3 Warehouses', 'Unlimited SKUs', 'ML Forecast', 'Purchase Orders', 'Supplier Tracking'], cta: 'Start Growth', popular: true },
    { name: 'Scale', price: '$199', per: '/mo / unlimited', desc: 'For multi-warehouse chains & 3PLs.', features: ['Unlimited Warehouses', 'All Growth Features', 'Batch / Lot / Expiry', 'API + EDI'], cta: 'Talk to Sales' },
  ]

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', fontFamily: 'Inter, Arial, sans-serif', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .inventro-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 36px; align-items: center; }
        .inventro-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .inventro-hero-title { font-size: clamp(32px, 6vw, 48px); line-height: 1.08; margin: 12px 0; }
        .inventro-hero-sub { font-size: clamp(15px, 3.5vw, 18px); color: #475569; line-height: 1.7; }
        .inventro-btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
        .inventro-btn-row button { white-space: nowrap; }
        .inventro-stats { display: flex; gap: 18px; margin-top: 28px; flex-wrap: wrap; }
        .inventro-section { max-width: 1280px; margin: 0 auto; padding-left: 20px; padding-right: 20px; }
        .inventro-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
        .inventro-forecast-stats { display: flex; gap: 10px; margin-bottom: 14px; }
        .inventro-alert-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; }

        @media (max-width: 900px) {
          .inventro-hero-grid { grid-template-columns: 1fr; gap: 24px; }
          .inventro-2col { grid-template-columns: 1fr; gap: 16px; }
          .inventro-section { padding-left: 16px; padding-right: 16px; }
        }
        @media (max-width: 600px) {
          .inventro-btn-row { flex-direction: column; }
          .inventro-btn-row button { width: 100%; text-align: center; justify-content: center; }
          .inventro-stats { gap: 14px; }
          .inventro-stats > div { flex: 1 1 40%; min-width: 120px; }
          .inventro-cta-row { flex-direction: column; align-items: stretch; }
          .inventro-cta-row button { width: 100%; }
          .inventro-forecast-stats { flex-wrap: wrap; }
          .inventro-forecast-stats > div { flex: 1 1 30%; min-width: 90px; }
          .inventro-alert-row { flex-direction: column; align-items: flex-start; }
          .inventro-alert-row span { white-space: normal; }
        }
        @media (max-width: 400px) {
          .inventro-stats > div { flex: 1 1 100%; }
          .inventro-forecast-stats > div { flex: 1 1 100%; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg, #fff7ed 0%, #fff 100%)', padding: '32px 0 44px' }}>
        <div className="inventro-section inventro-hero-grid">
          <div style={{ minWidth: 0 }}>
            <button onClick={() => go('products')} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}><i className="bi bi-arrow-left"></i> All Products</button>
            <p style={{ color: '#F97316', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 20 }}>pages/inventro — Ayinde Technologies</p>
            <h1 className="inventro-hero-title">Never stock out.<br /><span style={{ color: '#F97316' }}>Never overstock.</span></h1>
            <p className="inventro-hero-sub">Inventro for US distributors & retailers. Scan barcodes, get low-stock alerts before you run out, and let ML predict what to order next.</p>

            <div className="inventro-btn-row">
              <button onClick={() => go('inventro-login')} style={{ background: '#F97316', color: '#fff', padding: '14px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Enter Demo Dashboard <i className="bi bi-box-arrow-in-right"></i></button>
              <button onClick={onRequest} style={{ background: '#0f172a', color: '#fff', padding: '14px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request Inventro</button>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 14, lineHeight: 1.6 }}><i className="bi bi-patch-check-fill" style={{ color: '#F97316' }}></i> Barcode Scan — ML Forecast — Low-Stock Alerts — Demo login: any username / password</p>

            <div className="inventro-stats">
              <div><b style={{ fontSize: 20 }}>94%</b><p style={{ fontSize: 13, color: '#64748b' }}>Forecast Accuracy</p></div>
              <div><b style={{ fontSize: 20 }}>-32%</b><p style={{ fontSize: 13, color: '#64748b' }}>Stockouts</p></div>
              <div><b style={{ fontSize: 20 }}>-28%</b><p style={{ fontSize: 13, color: '#64748b' }}>Overstock</p></div>
              <div><b style={{ fontSize: 20 }}>0.3s</b><p style={{ fontSize: 13, color: '#64748b' }}>Barcode Scan</p></div>
            </div>
          </div>

          {/* ML FORECAST — INTERACTIVE */}
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', overflow: 'hidden', minWidth: 0, width: '100%' }}>
            <div style={{ background: '#0f172a', color: '#fff', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 14 }}><i className="bi bi-robot" style={{ color: '#fdba74' }}></i> ML Forecast — Try It</b>
              <span style={{ background: '#F97316', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>LIVE DEMO</span>
            </div>
            <div style={{ padding: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700 }}>Product</label>
              <select value={product} onChange={e => setProduct(e.target.value)} style={{ width: '100%', padding: 11, borderRadius: 10, border: '1px solid #e2e8f0', margin: '6px 0 8px', fontSize: 14 }}>
                {Object.keys(FORECAST).map(p => <option key={p}>{p}</option>)}
              </select>
              <label style={{ fontSize: 13, fontWeight: 700 }}>Warehouse</label>
              <select value={warehouse} onChange={e => setWarehouse(e.target.value)} style={{ width: '100%', padding: 11, borderRadius: 10, border: '1px solid #e2e8f0', margin: '6px 0 14px', fontSize: 14 }}>
                <option>Newark — Main Warehouse</option><option>Inglewood — West Coast</option><option>3PL — Dallas</option>
              </select>

              <div className="inventro-forecast-stats">
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 10, padding: 12, textAlign: 'center' }}><b>{data.stock}</b><p style={{ fontSize: 11, color: '#64748b' }}>In Stock</p></div>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 10, padding: 12, textAlign: 'center' }}><b>{data.weekly}/wk</b><p style={{ fontSize: 11, color: '#64748b' }}>Avg. Sales</p></div>
                <div style={{ flex: 1, background: '#fff7ed', borderRadius: 10, padding: 12, textAlign: 'center' }}><b style={{ color: data.color, fontSize: 13 }}>{data.status}</b><p style={{ fontSize: 11, color: '#64748b' }}>ML Status</p></div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
                {data.forecast.map((v, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
                    <div style={{ height: (v / maxF) * 90, background: i === 3 ? '#F97316' : '#fed7aa', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 4, fontSize: 11, fontWeight: 700, color: i === 3 ? '#fff' : '#9a3412' }}>{v}</div>
                    <p style={{ fontSize: 11, marginTop: 4, fontWeight: 600 }}>W{i + 1}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: '#64748b', textAlign: 'center', marginTop: 6, lineHeight: 1.5 }}>Predicted demand — next 6 weeks • {warehouse}</p>

              <div style={{ background: data.color === '#DC2626' ? '#fef2f2' : data.color === '#F97316' ? '#fff7ed' : '#f0fdf4', border: `1px solid ${data.color}33`, borderRadius: 12, padding: 12, marginTop: 12, fontSize: 13, lineHeight: 1.5 }}>
                <b><i className="bi bi-lightbulb-fill"></i> ML Recommendation:</b> {data.reorder}
              </div>
              <button onClick={() => go('inventro-login')} style={{ width: '100%', marginTop: 12, background: '#F97316', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>See Forecast in Live Demo <i className="bi bi-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="inventro-section" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(24px, 5vw, 30px)' }}>Control your supply chain, end to end</h2>
        <p style={{ color: '#64748b', marginTop: 8, lineHeight: 1.6 }}>From receiving to shelf to reorder — one system, no spreadsheets.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 24 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: '#f8fafc', padding: 22, borderRadius: 18, border: '1px solid #eef2f7', minWidth: 0 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#ffedd5', color: '#F97316', display: 'grid', placeItems: 'center', fontSize: 22 }}><i className={`bi ${f.icon}`}></i></div>
              <h3 style={{ margin: '14px 0 8px', fontSize: 17 }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BARCODE + WAREHOUSE DEMO */}
      <section className="inventro-section" style={{ paddingBottom: 48 }}>
        <div className="inventro-2col">
          <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 280 }}>
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80" alt="Inventro warehouse" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.78))', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
              <h3 style={{ fontSize: 'clamp(18px, 4vw, 22px)', lineHeight: 1.3 }}>Scan. Count. Ship. Done.</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>Warehouse staff scan with any phone. Inventro updates stock everywhere, instantly.</p>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 20, padding: 24, minWidth: 0 }}>
            <h3 style={{ fontSize: 18 }}><i className="bi bi-upc-scan" style={{ color: '#F97316' }}></i> Live Alerts — Newark Warehouse</h3>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              {[['T-Shirt — Black M', '0 left — OUT OF STOCK', 'Order 120 now', '#DC2626'], ['Croissant Mix — 50lb', '8 left — LOW', 'Reorder in 2 days', '#F97316'], ['Iced Latte Beans', '42 left — OK', 'Reorder by Fri', '#F97316'], ['Cold Brew Cans', '126 left — Healthy', 'No action', '#059669']].map(([name, stock, action, col]) => (
                <div key={name} className="inventro-alert-row" style={{ background: '#f8fafc', borderRadius: 12, padding: 14 }}>
                  <div style={{ minWidth: 0 }}><b style={{ fontSize: 14 }}>{name}</b><p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{stock}</p></div>
                  <span style={{ background: col, color: '#fff', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>{action}</span>
                </div>
              ))}
            </div>
            <button onClick={() => go('inventro-login')} style={{ width: '100%', marginTop: 16, background: '#F97316', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Open Warehouse in Demo <i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="inventro-section" style={{ paddingBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(24px, 5vw, 30px)', textAlign: 'center' }}>Pricing that scales with your warehouses</h2>
        <p style={{ color: '#64748b', textAlign: 'center', marginTop: 8 }}>Start free for 14 days. No per-scan fees.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 32 }}>
          {PLANS.map(p => (
            <div key={p.name} onClick={() => setPlan(p.name)} style={{ background: p.popular ? '#0f172a' : '#fff', color: p.popular ? '#fff' : '#0f172a', border: p.popular ? '2px solid #F97316' : '1px solid #e2e8f0', borderRadius: 20, padding: 24, cursor: 'pointer', position: 'relative', minWidth: 0 }}>
              {p.popular && <span style={{ position: 'absolute', top: -12, left: 20, background: '#F97316', color: '#fff', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 800 }}>MOST POPULAR</span>}
              <h3>{p.name}</h3>
              <p style={{ fontSize: 34, fontWeight: 800, margin: '10px 0 2px' }}>{p.price} <span style={{ fontSize: 13, fontWeight: 400, color: p.popular ? '#cbd5e1' : '#64748b' }}>{p.per}</span></p>
              <p style={{ fontSize: 14, color: p.popular ? '#cbd5e1' : '#64748b', lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ display: 'grid', gap: 8, margin: '18px 0' }}>{p.features.map(f => <span key={f} style={{ fontSize: 14 }}><i className="bi bi-check-circle-fill" style={{ color: '#F97316' }}></i> {f}</span>)}</div>
              <button onClick={onRequest} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: p.popular ? '#F97316' : '#0f172a', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="inventro-section" style={{ paddingBottom: 48 }}>
        <div style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', color: '#fff', borderRadius: 20, padding: '28px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', lineHeight: 1.3 }}>Want Inventro for your warehouse?</h2>
          <p style={{ color: '#ffedd5', marginTop: 8, lineHeight: 1.6, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>Try the live demo — scan a barcode, see ML forecast, create a purchase order. No signup.</p>
          <div className="inventro-cta-row">
            <button onClick={() => go('inventro-login')} style={{ background: '#fff', color: '#F97316', padding: '13px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Try Live Demo <i className="bi bi-arrow-right"></i></button>
            <button onClick={onRequest} style={{ background: '#0f172a', color: '#fff', padding: '13px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request Inventro</button>
          </div>
        </div>
      </section>
    </div>
  )
}