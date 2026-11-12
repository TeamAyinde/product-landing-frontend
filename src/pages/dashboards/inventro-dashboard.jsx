import React, { useState } from 'react'

// src/pages/dashboards/inventro-dashboard.jsx
// Dashboard: dashboards/inventro-dashboard
// Sidebar scrollable + Logout stuck to bottom — same vein as HR-Wise / Verus / Exactus - MOBILE RESPONSIVE (drawer)

const INITIAL_STOCK = [
  { id: 1, name: 'Iced Latte Beans — 25lb', sku: 'INV-1001', cat: 'Beverage', stock: 42, min: 30, price: 89.00, supplier: 'BeanCo Roasters', weekly: 28, emoji: '☕', barcode: '8401231001' },
  { id: 2, name: 'Cold Brew Cans — 12 Pack', sku: 'INV-1002', cat: 'Beverage', stock: 126, min: 40, price: 24.00, supplier: 'BrewWorks Co.', weekly: 18, emoji: '🥤', barcode: '8401231002' },
  { id: 3, name: 'Croissant Mix — 50lb', sku: 'INV-1003', cat: 'Food', stock: 8, min: 20, price: 64.00, supplier: 'BakeSupply Inc.', weekly: 32, emoji: '🥐', barcode: '8401231003' },
  { id: 4, name: 'T-Shirt — Black M', sku: 'INV-2001', cat: 'Retail', stock: 0, min: 25, price: 12.00, supplier: 'Apparel Direct', weekly: 22, emoji: '👕', barcode: '8401232001' },
  { id: 5, name: 'Cap — Verus Logo', sku: 'INV-2002', cat: 'Retail', stock: 15, min: 20, price: 9.50, supplier: 'Apparel Direct', weekly: 12, emoji: '🧢', barcode: '8401232002' },
  { id: 6, name: 'Chocolate Cake Mix', sku: 'INV-1004', cat: 'Food', stock: 54, min: 15, price: 32.00, supplier: 'BakeSupply Inc.', weekly: 14, emoji: '🍰', barcode: '8401231004' },
  { id: 7, name: 'Espresso Pods — 100ct', sku: 'INV-1005', cat: 'Beverage', stock: 88, min: 30, price: 45.00, supplier: 'BeanCo Roasters', weekly: 24, emoji: '☕', barcode: '8401231005' },
]

export default function InventroDashboard({ go, user, onLogout }) {
  const [menu, setMenu] = useState('Overview')
  const [warehouse, setWarehouse] = useState('Newark — Main Warehouse')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stock, setStock] = useState(INITIAL_STOCK)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [scanLog, setScanLog] = useState([
    { id: 1, item: 'Iced Latte Beans — 25lb', action: 'Stock In +12', time: '2 min ago' },
    { id: 2, item: 'Cold Brew Cans — 12 Pack', action: 'Picked −6', time: '18 min ago' },
    { id: 3, item: 'Croissant Mix — 50lb', action: 'Count Verified', time: '41 min ago' },
  ])
  const [pos, setPos] = useState([
    { id: 'PO-881', supplier: 'BeanCo Roasters', items: 'Iced Latte Beans x80', total: 7120, eta: 'Nov 14', status: 'In Transit' },
    { id: 'PO-880', supplier: 'Apparel Direct', items: 'T-Shirt Black M x120', total: 1440, eta: 'Nov 13', status: 'Pending' },
    { id: 'PO-879', supplier: 'BakeSupply Inc.', items: 'Croissant Mix x40', total: 2560, eta: 'Nov 10', status: 'Delivered' },
  ])
  const [toast, setToast] = useState('')

  const MENU_GROUPS = [
    { label: 'MAIN', items: [['Overview', 'bi-grid-1x2-fill', null], ['Analytics', 'bi-bar-chart-line-fill', null], ['Reports', 'bi-file-earmark-bar-graph-fill', 'New']] },
    { label: 'INVENTORY', items: [['Inventory', 'bi-box-seam-fill', '3'], ['Scan Barcode', 'bi-upc-scan', null], ['Low Stock', 'bi-bell-fill', '3'], ['Transfers', 'bi-arrow-left-right', null]] },
    { label: 'SUPPLY', items: [['Purchase Orders', 'bi-truck', '2'], ['Suppliers', 'bi-building-fill', null], ['ML Forecast', 'bi-robot', 'AI']] },
    { label: 'SYSTEM', items: [['Settings', 'bi-gear-fill', null], ['Integrations', 'bi-plug-fill', null], ['Help & Support', 'bi-question-circle-fill', null]] },
  ]

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2600) }
  const adjustStock = (id, d) => {
    setStock(prev => prev.map(s => s.id === id ? { ...s, stock: Math.max(0, s.stock + d) } : s))
  }
  const simulateScan = () => {
    const item = stock[Math.floor(Math.random() * stock.length)]
    const qty = Math.floor(Math.random() * 8) + 1
    setStock(prev => prev.map(s => s.id === item.id ? { ...s, stock: s.stock + qty } : s))
    setScanLog(prev => [{ id: Date.now(), item: item.name, action: `Scanned +${qty} — Barcode ${item.barcode}`, time: 'Just now' }, ...prev].slice(0, 6))
    showToast(`Scanned: ${item.name} +${qty} — Stock updated everywhere`)
  }
  const createPO = (item) => {
    const qty = Math.max(item.min * 3, 60)
    const newPO = { id: 'PO-' + (882 + pos.length), supplier: item.supplier, items: `${item.name} x${qty}`, total: qty * item.price, eta: 'Nov 18', status: 'Pending' }
    setPos(prev => [newPO, ...prev])
    showToast(`PO created: ${newPO.id} — ${item.name} x${qty} to ${item.supplier}`)
  }
  const receivePO = (id) => setPos(prev => prev.map(p => p.id === id ? { ...p, status: 'Delivered' } : p))

  const filtered = stock.filter(s => (catFilter === 'All' || s.cat === catFilter) && (s.name + s.sku + s.supplier).toLowerCase().includes(search.toLowerCase()))
  const lowStock = stock.filter(s => s.stock <= s.min)
  const inventoryValue = stock.reduce((sum, s) => sum + s.stock * s.price, 0)
  const totalUnits = stock.reduce((sum, s) => sum + s.stock, 0)
  const pickMenu = (label) => { setMenu(label); setSidebarOpen(false) }

  return (
    <div className="inventro-dash-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .inventro-dash-sidebar { width: 272px; background: #0f172a; color: #fff; display: flex; flex-direction: column; height: 100vh; position: sticky; top: 0; flex-shrink: 0; overflow: hidden; }
        .inventro-dash-mobile-topbar { display: none; }
        .inventro-dash-overlay { display: none; }
        .inventro-dash-topbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 28px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap; position: sticky; top: 0; z-index: 5; }
        .inventro-dash-search-wrap { position: relative; }
        .inventro-dash-search-wrap input { padding: 10px 14px 10px 36px; border-radius: 999px; border: 1px solid #e2e8f0; width: 260px; }
        .inventro-dash-main-pad { padding: 28px; display: grid; gap: 20px; }
        .inventro-dash-kpis { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 16px; }
        .inventro-dash-2col { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 16px; }
        .inventro-dash-2col-wide { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 16px; }
        .inventro-toast { margin: 16px 28px 0; background: #0f172a; color: #fff; padding: 12px 16px; border-radius: 12px; font-size: 13px; font-weight: 600; display: flex; gap: 8px; }

        @media (max-width: 900px) {
          .inventro-dash-layout { flex-direction: column; }
          .inventro-dash-mobile-topbar { display: flex; align-items: center; gap: 12px; background: #0f172a; color: #fff; padding: 14px 16px; position: sticky; top: 0; z-index: 60; width: 100%; }
          .inventro-dash-sidebar { position: fixed; left: 0; top: 0; bottom: 0; z-index: 80; transform: translateX(-110%); transition: transform 0.25s ease; box-shadow: 20px 0 60px rgba(0,0,0,0.35); max-width: 86vw; }
          .inventro-dash-sidebar.open { transform: translateX(0); }
          .inventro-dash-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 70; }
          .inventro-dash-2col, .inventro-dash-2col-wide { grid-template-columns: 1fr; }
          .inventro-dash-main-pad { padding: 16px; gap: 16px; }
          .inventro-dash-topbar { padding: 14px 16px; top: 52px; }
          .inventro-dash-search-wrap { flex: 1 1 100%; }
          .inventro-dash-search-wrap input { width: 100%; }
          .inventro-toast { margin: 12px 16px 0; }
        }
        @media (max-width: 600px) {
          .inventro-dash-kpis { grid-template-columns: 1fr 1fr; gap: 12px; }
        }
        @media (max-width: 400px) {
          .inventro-dash-kpis { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* MOBILE TOPBAR — HAMBURGER */}
      <div className="inventro-dash-mobile-topbar">
        <button onClick={() => setSidebarOpen(true)} style={{ background: '#F97316', border: 'none', color: '#fff', width: 38, height: 38, borderRadius: 10, fontSize: 18, cursor: 'pointer' }}><i className="bi bi-list"></i></button>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 32, height: 32, borderRadius: 9, background: '#F97316', display: 'grid', placeItems: 'center' }}><i className="bi bi-box-seam-fill"></i></span><b>Inventro</b></span>
        <span style={{ marginLeft: 'auto', background: '#1e293b', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#34d399' }}>LIVE DEMO</span>
      </div>

      {sidebarOpen && <div className="inventro-dash-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* ============ SIDEBAR - SCROLLABLE + LOGOUT STUCK ============ */}
      <aside className={`inventro-dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '20px 20px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: '#F97316', display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0 }}><i className="bi bi-box-seam-fill"></i></span>
            <div><b style={{ fontSize: 18 }}>Inventro</b><p style={{ color: '#94a3b8', fontSize: 12 }}>By Ayinde Technologies</p></div>
            <span style={{ marginLeft: 'auto', background: '#1e293b', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#34d399' }}>LIVE DEMO</span>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 14, marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#F97316', display: 'grid', placeItems: 'center', fontWeight: 800, flexShrink: 0 }}>{(user || 'WM').slice(0, 2).toUpperCase()}</span>
            <div style={{ minWidth: 0 }}><b style={{ fontSize: 14, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user || 'Warehouse Manager'}</b><p style={{ color: '#94a3b8', fontSize: 12 }}>{warehouse}</p></div>
          </div>
          <select value={warehouse} onChange={e => setWarehouse(e.target.value)} style={{ width: '100%', marginTop: 12, padding: '10px 12px', borderRadius: 10, border: '1px solid #1e293b', background: '#1e293b', color: '#fff', fontSize: 13 }}>
            <option>Newark — Main Warehouse</option><option>Inglewood — West Coast</option><option>3PL — Dallas</option>
          </select>
        </div>

        {/* SCROLLABLE NAV */}
        <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '4px 12px 12px 20px', scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}>
          {MENU_GROUPS.map(g => (
            <div key={g.label} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, letterSpacing: '0.1em', fontWeight: 800, color: '#64748b', padding: '8px 8px 6px' }}>{g.label}</p>
              <div style={{ display: 'grid', gap: 2 }}>
                {g.items.map(([label, icon, badge]) => (
                  <button key={label} onClick={() => pickMenu(label)} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '11px 12px', borderRadius: 10, border: 'none', background: menu === label ? '#F97316' : 'transparent', color: menu === label ? '#fff' : '#cbd5e1', fontWeight: menu === label ? 700 : 500, textAlign: 'left', cursor: 'pointer', fontSize: 14, width: '100%' }}>
                    <i className={`bi ${icon}`} style={{ fontSize: 16, flexShrink: 0 }}></i><span style={{ flex: 1 }}>{label}</span>
                    {badge && <span style={{ background: menu === label ? '#fff' : '#DC2626', color: menu === label ? '#F97316' : '#fff', padding: '2px 7px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{badge}</span>}
                    {menu === label && <i className="bi bi-chevron-right" style={{ fontSize: 12 }}></i>}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', borderRadius: 14, padding: 16 }}>
            <b style={{ fontSize: 13 }}><i className="bi bi-robot"></i> ML Insight</b>
            <p style={{ fontSize: 12, color: '#ffedd5', margin: '6px 0 10px', lineHeight: 1.5 }}>Demand for T-Shirts will rise 32% next month. Order before Nov 14 to avoid stockout.</p>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 999, overflow: 'hidden' }}><div style={{ width: '94%', height: '100%', background: '#fff' }}></div></div>
            <p style={{ fontSize: 12, fontWeight: 700, marginTop: 8 }}>94% Forecast Accuracy</p>
          </div>
          <p style={{ fontSize: 11, color: '#475569', textAlign: 'center', padding: '14px 0 4px' }}>Inventro v3.2 — Demo Build</p>
        </nav>

        {/* STUCK BOTTOM — LOGOUT */}
        <div style={{ flexShrink: 0, padding: 16, background: '#0f172a', borderTop: '1px solid #1e293b', boxShadow: '0 -8px 20px rgba(0,0,0,0.25)', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button onClick={() => go('product-inventro')} style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-arrow-left"></i> Back to Site</button>
            <button onClick={() => go('contact')} style={{ flex: 1, background: '#fff', border: 'none', color: '#0f172a', padding: '10px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-send-fill"></i> Request Build</button>
          </div>
          <button onClick={onLogout} style={{ width: '100%', background: '#DC2626', border: 'none', color: '#fff', padding: '13px', borderRadius: 12, fontWeight: 800, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <i className="bi bi-box-arrow-right"></i> Logout — {user || 'Warehouse Manager'}
          </button>
          <p style={{ fontSize: 11, color: '#64748b', textAlign: 'center', marginTop: 8 }}>{warehouse} • Synced 2s ago</p>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
        <div className="inventro-dash-topbar">
          <div style={{ minWidth: 0 }}><h1 style={{ fontSize: 'clamp(18px, 5vw, 22px)' }}>{menu}</h1><p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>Welcome back, {user || 'Warehouse Manager'} — {warehouse}</p></div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="inventro-dash-search-wrap"><i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i><input placeholder="Search SKU, product, supplier..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <button style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: 999, fontWeight: 600 }}><i className="bi bi-bell-fill"></i> {lowStock.length}</button>
            <button onClick={simulateScan} style={{ background: '#F97316', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 700, whiteSpace: 'nowrap' }}><i className="bi bi-upc-scan"></i> Simulate Scan</button>
          </div>
        </div>

        {toast && <div className="inventro-toast"><i className="bi bi-check-circle-fill" style={{ color: '#34d399' }}></i> {toast}</div>}

        <div className="inventro-dash-main-pad">

          {/* KPIs */}
          <div className="inventro-dash-kpis">
            {[
              ['Total SKUs', '1,284', 'Across 3 warehouses', 'bi-box-seam-fill', '#F97316', '#ffedd5'],
              ['Inventory Value', `$${inventoryValue.toLocaleString()}`, `${totalUnits} units in ${warehouse}`, 'bi-cash-stack', '#059669', '#dcfce7'],
              ['Low Stock Alerts', `${lowStock.length} items`, 'Need reorder now', 'bi-exclamation-triangle-fill', '#DC2626', '#fee2e2'],
              ['Open Purchase Orders', `${pos.filter(p => p.status !== 'Delivered').length} POs`, '$8,560 in transit', 'bi-truck', '#2F80ED', '#dbeafe'],
              ['Forecast Accuracy', '94%', 'ML — last 90 days', 'bi-robot', '#7C3AED', '#ede9fe'],
              ['Stockouts Prevented', '18 this month', 'By ML alerts', 'bi-shield-check-fill', '#059669', '#dcfce7'],
            ].map(([label, val, sub, icon, col, bg]) => (
              <div key={label} style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 18, minWidth: 0 }}>
                <span style={{ width: 40, height: 40, borderRadius: 12, background: bg, color: col, display: 'grid', placeItems: 'center', fontSize: 18 }}><i className={`bi ${icon}`}></i></span>
                <h3 style={{ fontSize: 20, margin: '12px 0 2px' }}>{val}</h3>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{label}</p>
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* BARCODE SCAN + LOW STOCK */}
          <div className="inventro-dash-2col">
            <div style={{ background: '#0f172a', color: '#fff', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <h3><i className="bi bi-upc-scan" style={{ color: '#fdba74' }}></i> Barcode Scanner — Try It</h3>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>Click Simulate Scan — Inventro scans, updates stock, and logs it everywhere.</p>
              <div style={{ background: '#fff', color: '#0f172a', borderRadius: 14, padding: 16, marginTop: 16, textAlign: 'center', overflow: 'hidden' }}>
                <div style={{ fontSize: 'clamp(18px, 5vw, 28px)', letterSpacing: 4, fontWeight: 800, wordBreak: 'break-all' }}>|||| || ||| |||| | || |||</div>
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Ready to scan — Point at any barcode</p>
                <button onClick={simulateScan} style={{ marginTop: 10, background: '#F97316', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 999, fontWeight: 800, cursor: 'pointer', width: '100%', maxWidth: 280 }}> <i className="bi bi-upc-scan"></i> Simulate Barcode Scan</button>
              </div>
              <div style={{ display: 'grid', gap: 8, marginTop: 16, maxHeight: 180, overflowY: 'auto' }}>
                {scanLog.map(l => (
                  <div key={l.id} style={{ background: '#1e293b', borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 0 }}><b style={{ fontSize: 13 }}>{l.item}</b><p style={{ fontSize: 12, color: '#94a3b8' }}>{l.action}</p></div>
                    <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{l.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <h3><i className="bi bi-bell-fill" style={{ color: '#DC2626' }}></i> Low-Stock Alerts — Act Now</h3>
              <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                {lowStock.length === 0 && <p style={{ color: '#059669', fontSize: 14 }}>All stocked! No alerts right now.</p>}
                {lowStock.map(s => (
                  <div key={s.id} style={{ background: s.stock === 0 ? '#fef2f2' : '#fff7ed', border: `1px solid ${s.stock === 0 ? '#fecaca' : '#fed7aa'}`, borderRadius: 12, padding: 12, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><b style={{ fontSize: 13 }}>{s.emoji} {s.name}</b><span style={{ background: s.stock === 0 ? '#DC2626' : '#F97316', color: '#fff', padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{s.stock === 0 ? 'OUT' : 'LOW'}</span></div>
                    <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.stock} left • Min {s.min} • Supplier: {s.supplier}</p>
                    <button onClick={() => createPO(s)} style={{ marginTop: 8, width: '100%', padding: 9, background: '#F97316', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Create Purchase Order →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* INVENTORY TABLE */}
          {(menu === 'Overview' || menu === 'Inventory' || menu === 'Low Stock') && (
            <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <h3><i className="bi bi-box-seam-fill" style={{ color: '#F97316' }}></i> Inventory — {filtered.length} items — Try Adjust Stock</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['All', 'Beverage', 'Food', 'Retail'].map(c => <button key={c} onClick={() => setCatFilter(c)} style={{ padding: '7px 12px', borderRadius: 999, border: 'none', background: catFilter === c ? '#F97316' : '#f1f5f9', color: catFilter === c ? '#fff' : '#334155', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{c}</button>)}</div>
              </div>
              <div style={{ overflowX: 'auto', marginTop: 16 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 860 }}>
                  <thead><tr style={{ background: '#f8fafc', textAlign: 'left' }}><th style={{ padding: 12 }}>Product</th><th style={{ padding: 12 }}>SKU / Barcode</th><th style={{ padding: 12 }}>Stock</th><th style={{ padding: 12 }}>Status</th><th style={{ padding: 12 }}>ML Forecast</th><th style={{ padding: 12 }}>Value</th><th style={{ padding: 12 }}>Action</th></tr></thead>
                  <tbody>
                    {filtered.map(s => {
                      const pct = Math.min((s.stock / Math.max(s.min * 2, 1)) * 100, 100)
                      const status = s.stock === 0 ? 'OUT' : s.stock <= s.min ? 'LOW' : 'OK'
                      const col = status === 'OUT' ? '#DC2626' : status === 'LOW' ? '#F97316' : '#059669'
                      return (
                        <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                          <td style={{ padding: 12 }}><b>{s.emoji} {s.name}</b><p style={{ color: '#64748b', fontSize: 12 }}>{s.cat} • {s.supplier}</p></td>
                          <td style={{ padding: 12 }}><span style={{ fontWeight: 700 }}>{s.sku}</span><p style={{ color: '#64748b', fontSize: 12 }}>{s.barcode}</p></td>
                          <td style={{ padding: 12 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><button onClick={() => adjustStock(s.id, -1)} style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}>−</button><b>{s.stock}</b><button onClick={() => adjustStock(s.id, 1)} style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: '#F97316', color: '#fff', cursor: 'pointer' }}>+</button></div><div style={{ height: 6, background: '#f1f5f9', borderRadius: 999, marginTop: 6, overflow: 'hidden', width: 90 }}><div style={{ width: pct + '%', height: '100%', background: col }}></div></div></td>
                          <td style={{ padding: 12 }}><span style={{ background: col, color: '#fff', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{status}</span></td>
                          <td style={{ padding: 12 }}>{s.weekly}/wk • {s.stock <= s.min ? <b style={{ color: '#DC2626' }}>Order Now</b> : <span style={{ color: '#059669' }}>Healthy</span>}</td>
                          <td style={{ padding: 12 }}><b>${(s.stock * s.price).toLocaleString()}</b></td>
                          <td style={{ padding: 12 }}><button onClick={() => createPO(s)} style={{ padding: '8px 12px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>Order →</button></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && <p style={{ color: '#64748b', marginTop: 12 }}>No items match “{search}” in {catFilter}.</p>}
            </div>
          )}

          {/* ML FORECAST + POs */}
          <div className="inventro-dash-2col-wide">
            <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <h3><i className="bi bi-robot" style={{ color: '#F97316' }}></i> ML Forecast — Next 6 Weeks Demand</h3>
              <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
                {stock.slice(0, 4).map(s => {
                  const forecast = s.weekly * 6
                  const need = Math.max(forecast - s.stock, 0)
                  return (
                    <div key={s.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, gap: 8, flexWrap: 'wrap' }}><span>{s.emoji} {s.name}</span><span>{need > 0 ? `Need ${need} more` : 'Covered'} • {forecast} predicted</span></div>
                      <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, marginTop: 6, overflow: 'hidden' }}><div style={{ width: Math.min((s.stock / forecast) * 100, 100) + '%', height: '100%', background: s.stock >= forecast ? '#059669' : s.stock <= s.min ? '#DC2626' : '#F97316' }}></div></div>
                    </div>
                  )
                })}
              </div>
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: 12, marginTop: 16, fontSize: 13, lineHeight: 1.6 }}><b>ML Tip:</b> Order T-Shirts and Croissant Mix this week — demand is rising and both are at/below minimum. Inventro already drafted the POs below.</div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <h3><i className="bi bi-truck" style={{ color: '#F97316' }}></i> Purchase Orders</h3>
              <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                {pos.map(p => (
                  <div key={p.id} style={{ background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><b style={{ fontSize: 13 }}>{p.id} — {p.supplier}</b><span style={{ background: p.status === 'Delivered' ? '#dcfce7' : p.status === 'In Transit' ? '#dbeafe' : '#fef9c3', color: p.status === 'Delivered' ? '#059669' : p.status === 'In Transit' ? '#1D4ED8' : '#854d0e', padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{p.status}</span></div>
                    <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{p.items} • ${p.total.toLocaleString()} • ETA {p.eta}</p>
                    {p.status !== 'Delivered' && <button onClick={() => receivePO(p.id)} style={{ marginTop: 8, padding: '8px 12px', background: '#059669', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Mark Received ✓</button>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}