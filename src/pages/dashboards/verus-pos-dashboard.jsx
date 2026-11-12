import React, { useState } from 'react'

// src/pages/dashboards/verus-pos-dashboard.jsx
// Dashboard: dashboards/verus-pos-dashboard
// Sidebar scrollable + Logout stuck to bottom — same vein as HR-Wise - MOBILE RESPONSIVE (drawer)

const CATALOG = [
  { id: 1, name: 'Iced Latte', price: 4.50, cat: 'Drinks', stock: 42, color: '#fef3c7', emoji: '☕' },
  { id: 2, name: 'Cold Brew', price: 5.00, cat: 'Drinks', stock: 126, color: '#dbeafe', emoji: '🧋' },
  { id: 3, name: 'Croissant', price: 3.20, cat: 'Food', stock: 8, color: '#ffedd5', emoji: '🥐' },
  { id: 4, name: 'Blueberry Muffin', price: 2.80, cat: 'Food', stock: 24, color: '#dcfce7', emoji: '🧁' },
  { id: 5, name: 'T-Shirt - Black M', price: 24.00, cat: 'Retail', stock: 0, color: '#ede9fe', emoji: '👕' },
  { id: 6, name: 'Cap - Verus', price: 18.00, cat: 'Retail', stock: 15, color: '#fee2e2', emoji: '🧢' },
  { id: 7, name: 'Espresso', price: 3.00, cat: 'Drinks', stock: 88, color: '#fef9c3', emoji: '☕' },
  { id: 8, name: 'Chocolate Cake', price: 6.50, cat: 'Food', stock: 11, color: '#fce7f3', emoji: '🍰' },
]

export default function VerusPosDashboard({ go, user, onLogout }) {
  const [menu, setMenu] = useState('Overview')
  const [store, setStore] = useState('Downtown - Newark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cart, setCart] = useState([{ ...CATALOG[0], qty: 1 }, { ...CATALOG[2], qty: 2 }])
  const [catFilter, setCatFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [payment, setPayment] = useState('Card')
  const [showReceipt, setShowReceipt] = useState(false)
  const [lastTotal, setLastTotal] = useState(0)
  const [inventory, setInventory] = useState(CATALOG)
  const [transactions, setTransactions] = useState([
    { id: '#1024', items: 'Iced Latte x2', total: 9.00, method: 'Card', time: '2 min ago', status: 'Completed' },
    { id: '#1023', items: 'T-Shirt x1, Cap x1', total: 42.00, method: 'Tap to Pay', time: '14 min ago', status: 'Completed' },
    { id: '#1022', items: 'Croissant x3', total: 9.60, method: 'Cash', time: '28 min ago', status: 'Completed' },
    { id: '#1021', items: 'Cold Brew x1', total: 5.00, method: 'Card', time: '41 min ago', status: 'Refunded' },
  ])

  const MENU_GROUPS = [
    { label: 'MAIN', items: [['Overview', 'bi-grid-1x2-fill', null], ['Analytics', 'bi-bar-chart-line-fill', null], ['Reports', 'bi-file-earmark-bar-graph-fill', 'New']] },
    { label: 'SELL', items: [['POS Terminal', 'bi-cart-check-fill', null], ['Orders', 'bi-receipt', '84'], ['Customers', 'bi-people-fill', null], ['Gift Cards', 'bi-gift-fill', null]] },
    { label: 'MANAGE', items: [['Inventory', 'bi-box-seam-fill', '3'], ['Products', 'bi-tags-fill', null], ['Staff', 'bi-person-badge-fill', null], ['Stores', 'bi-shop', '3']] },
    { label: 'SYSTEM', items: [['Payments', 'bi-credit-card-2-front-fill', null], ['Settings', 'bi-gear-fill', null], ['Help & Support', 'bi-question-circle-fill', null]] },
  ]

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const addToCart = (p) => {
    setCart(prev => {
      const found = prev.find(i => i.id === p.id)
      if (found) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
  }
  const changeQty = (id, d) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + d) } : i).filter(i => i.qty > 0))
  const checkout = () => {
    if (!cart.length) return alert('Cart is empty — tap a product to add it')
    setLastTotal(total)
    setTransactions(prev => [{ id: '#' + (1025 + prev.length), items: cart.map(c => `${c.name} x${c.qty}`).join(', '), total: Number(total.toFixed(2)), method: payment, time: 'Just now', status: 'Completed' }, ...prev])
    setCart([]); setShowReceipt(true)
  }
  const adjustStock = (id, d) => setInventory(prev => prev.map(i => i.id === id ? { ...i, stock: Math.max(0, i.stock + d) } : i))
  const filteredCatalog = CATALOG.filter(p => (catFilter === 'All' || p.cat === catFilter) && p.name.toLowerCase().includes(search.toLowerCase()))
  const filteredInventory = inventory.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  const pickMenu = (label) => { setMenu(label); setSidebarOpen(false) }

  return (
    <div className="verus-dash-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .verus-dash-sidebar { width: 272px; background: #0f172a; color: #fff; display: flex; flex-direction: column; height: 100vh; position: sticky; top: 0; flex-shrink: 0; overflow: hidden; }
        .verus-dash-mobile-topbar { display: none; }
        .verus-dash-overlay { display: none; }
        .verus-dash-topbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 28px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap; position: sticky; top: 0; z-index: 5; }
        .verus-dash-search-wrap { position: relative; }
        .verus-dash-search-wrap input { padding: 10px 14px 10px 36px; border-radius: 999px; border: 1px solid #e2e8f0; width: 240px; }
        .verus-dash-main-pad { padding: 28px; display: grid; gap: 20px; }
        .verus-dash-kpis { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 16px; }
        .verus-pos-terminal-grid { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 16px; }
        .verus-pos-split-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 16px; }
        .verus-pos-cart { background: #0f172a; color: #fff; border-radius: 18px; padding: 20px; height: fit-content; position: sticky; top: 90px; }

        @media (max-width: 900px) {
          .verus-dash-layout { flex-direction: column; }
          .verus-dash-mobile-topbar { display: flex; align-items: center; gap: 12px; background: #0f172a; color: #fff; padding: 14px 16px; position: sticky; top: 0; z-index: 60; width: 100%; }
          .verus-dash-sidebar { position: fixed; left: 0; top: 0; bottom: 0; z-index: 80; transform: translateX(-110%); transition: transform 0.25s ease; box-shadow: 20px 0 60px rgba(0,0,0,0.35); max-width: 86vw; }
          .verus-dash-sidebar.open { transform: translateX(0); }
          .verus-dash-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 70; }
          .verus-pos-terminal-grid, .verus-pos-split-grid { grid-template-columns: 1fr; }
          .verus-pos-cart { position: static; }
          .verus-dash-main-pad { padding: 16px; gap: 16px; }
          .verus-dash-topbar { padding: 14px 16px; top: 52px; }
          .verus-dash-search-wrap { flex: 1 1 100%; }
          .verus-dash-search-wrap input { width: 100%; }
        }
        @media (max-width: 600px) {
          .verus-dash-kpis { grid-template-columns: 1fr 1fr; gap: 12px; }
        }
        @media (max-width: 400px) {
          .verus-dash-kpis { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* MOBILE TOPBAR — HAMBURGER */}
      <div className="verus-dash-mobile-topbar">
        <button onClick={() => setSidebarOpen(true)} style={{ background: '#059669', border: 'none', color: '#fff', width: 38, height: 38, borderRadius: 10, fontSize: 18, cursor: 'pointer' }}><i className="bi bi-list"></i></button>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 32, height: 32, borderRadius: 9, background: '#059669', display: 'grid', placeItems: 'center' }}><i className="bi bi-cart-check-fill"></i></span><b>Verus POS</b></span>
        <span style={{ marginLeft: 'auto', background: '#1e293b', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#34d399' }}>LIVE DEMO</span>
      </div>

      {sidebarOpen && <div className="verus-dash-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* ============ SIDEBAR - SCROLLABLE + LOGOUT STUCK ============ */}
      <aside className={`verus-dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '20px 20px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: '#059669', display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0 }}><i className="bi bi-cart-check-fill"></i></span>
            <div><b style={{ fontSize: 18 }}>Verus POS</b><p style={{ color: '#94a3b8', fontSize: 12 }}>By Ayinde Technologies</p></div>
            <span style={{ marginLeft: 'auto', background: '#1e293b', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#34d399' }}>LIVE DEMO</span>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 14, marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#059669', display: 'grid', placeItems: 'center', fontWeight: 800, flexShrink: 0 }}>{(user || 'SM').slice(0, 2).toUpperCase()}</span>
            <div style={{ minWidth: 0 }}><b style={{ fontSize: 14, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user || 'Store Manager'}</b><p style={{ color: '#94a3b8', fontSize: 12 }}>{store} — Manager</p></div>
          </div>
          <select value={store} onChange={e => setStore(e.target.value)} style={{ width: '100%', marginTop: 12, padding: '10px 12px', borderRadius: 10, border: '1px solid #1e293b', background: '#1e293b', color: '#fff', fontSize: 13 }}>
            <option>Downtown - Newark</option><option>Inglewood - CA</option><option>Online Store</option>
          </select>
        </div>

        {/* SCROLLABLE NAV */}
        <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '4px 12px 12px 20px', scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}>
          {MENU_GROUPS.map(g => (
            <div key={g.label} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, letterSpacing: '0.1em', fontWeight: 800, color: '#64748b', padding: '8px 8px 6px' }}>{g.label}</p>
              <div style={{ display: 'grid', gap: 2 }}>
                {g.items.map(([label, icon, badge]) => (
                  <button key={label} onClick={() => pickMenu(label)} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '11px 12px', borderRadius: 10, border: 'none', background: menu === label ? '#059669' : 'transparent', color: menu === label ? '#fff' : '#cbd5e1', fontWeight: menu === label ? 700 : 500, textAlign: 'left', cursor: 'pointer', fontSize: 14, width: '100%' }}>
                    <i className={`bi ${icon}`} style={{ fontSize: 16, flexShrink: 0 }}></i><span style={{ flex: 1 }}>{label}</span>
                    {badge && <span style={{ background: menu === label ? '#fff' : '#DC2626', color: menu === label ? '#059669' : '#fff', padding: '2px 7px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{badge}</span>}
                    {menu === label && <i className="bi bi-chevron-right" style={{ fontSize: 12 }}></i>}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', borderRadius: 14, padding: 16 }}>
            <b style={{ fontSize: 13 }}><i className="bi bi-lightning-charge-fill"></i> Today’s Goal</b>
            <p style={{ fontSize: 12, color: '#a7f3d0', margin: '6px 0 10px', lineHeight: 1.5 }}>$2,418 of $3,000 target. 81% done.</p>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 999, overflow: 'hidden' }}><div style={{ width: '81%', height: '100%', background: '#fff' }}></div></div>
            <p style={{ fontSize: 12, fontWeight: 700, marginTop: 8 }}>81% complete</p>
          </div>
          <p style={{ fontSize: 11, color: '#475569', textAlign: 'center', padding: '14px 0 4px' }}>Verus POS v3.1 — Demo Build</p>
        </nav>

        {/* STUCK BOTTOM — LOGOUT */}
        <div style={{ flexShrink: 0, padding: 16, background: '#0f172a', borderTop: '1px solid #1e293b', boxShadow: '0 -8px 20px rgba(0,0,0,0.25)', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button onClick={() => go('product-verus')} style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-arrow-left"></i> Back to Site</button>
            <button onClick={() => go('contact')} style={{ flex: 1, background: '#fff', border: 'none', color: '#0f172a', padding: '10px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-send-fill"></i> Request Build</button>
          </div>
          <button onClick={onLogout} style={{ width: '100%', background: '#DC2626', border: 'none', color: '#fff', padding: '13px', borderRadius: 12, fontWeight: 800, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <i className="bi bi-box-arrow-right"></i> Logout — {user || 'Store Manager'}
          </button>
          <p style={{ fontSize: 11, color: '#64748b', textAlign: 'center', marginTop: 8 }}>Register Open • {store}</p>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
        <div className="verus-dash-topbar">
          <div style={{ minWidth: 0 }}><h1 style={{ fontSize: 'clamp(18px, 5vw, 22px)' }}>{menu}</h1><p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>Welcome back, {user || 'Store Manager'} — {store} is open & synced.</p></div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="verus-dash-search-wrap"><i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i><input placeholder="Search products, orders..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <button style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: 999, fontWeight: 600 }}><i className="bi bi-bell-fill"></i> 3</button>
            <button onClick={() => setMenu('POS Terminal')} style={{ background: '#059669', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 700, whiteSpace: 'nowrap' }}>+ New Sale</button>
          </div>
        </div>

        <div className="verus-dash-main-pad">

          {/* KPIs */}
          <div className="verus-dash-kpis">
            {[
              ['Today Sales', '$2,418.60', '+18% vs yesterday', 'bi-cash-stack', '#059669', '#dcfce7'],
              ['Orders Today', '84', 'Avg. $28.79 / order', 'bi-receipt', '#2F80ED', '#dbeafe'],
              ['Items Sold', '212', 'Best: Iced Latte', 'bi-bag-check-fill', '#F97316', '#ffedd5'],
              ['Low Stock', '3 items', 'Croissant, T-Shirt + 1', 'bi-exclamation-triangle-fill', '#DC2626', '#fee2e2'],
              ['Active Staff', '6 on shift', '2 cashiers, 4 floor', 'bi-people-fill', '#7C3AED', '#ede9fe'],
              ['Returns', '1 today', '$5.00 refunded', 'bi-arrow-counterclockwise', '#64748b', '#f1f5f9'],
            ].map(([label, val, sub, icon, col, bg]) => (
              <div key={label} style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 18, minWidth: 0 }}>
                <span style={{ width: 40, height: 40, borderRadius: 12, background: bg, color: col, display: 'grid', placeItems: 'center', fontSize: 18 }}><i className={`bi ${icon}`}></i></span>
                <h3 style={{ fontSize: 22, margin: '12px 0 2px' }}>{val}</h3>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{label}</p>
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* POS TERMINAL — interactive */}
          {(menu === 'Overview' || menu === 'POS Terminal') && (
            <div className="verus-pos-terminal-grid">
              <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <h3><i className="bi bi-cart-check-fill" style={{ color: '#059669' }}></i> POS Terminal — Tap to add</h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['All', 'Drinks', 'Food', 'Retail'].map(c => <button key={c} onClick={() => setCatFilter(c)} style={{ padding: '7px 12px', borderRadius: 999, border: 'none', background: catFilter === c ? '#059669' : '#f1f5f9', color: catFilter === c ? '#fff' : '#334155', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{c}</button>)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 12, marginTop: 16 }}>
                  {filteredCatalog.map(p => (
                    <button key={p.id} onClick={() => addToCart(p)} style={{ background: p.color, border: 'none', borderRadius: 14, padding: 14, cursor: 'pointer', textAlign: 'left', minWidth: 0 }}>
                      <span style={{ fontSize: 24 }}>{p.emoji}</span><b style={{ display: 'block', fontSize: 13, marginTop: 6 }}>{p.name}</b><span style={{ fontSize: 12, color: '#475569' }}>${p.price.toFixed(2)} • {p.stock} in stock</span>
                      <span style={{ display: 'block', marginTop: 8, fontSize: 12, fontWeight: 800, color: '#059669' }}>+ Add to Cart</span>
                    </button>
                  ))}
                </div>
                {filteredCatalog.length === 0 && <p style={{ color: '#64748b', marginTop: 16 }}>No products match “{search}” in {catFilter}.</p>}
              </div>

              <div className="verus-pos-cart">
                <h3>Current Sale</h3>
                <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{store} • Cashier: {user || 'Store Manager'}</p>
                <div style={{ display: 'grid', gap: 10, marginTop: 16, maxHeight: 220, overflowY: 'auto' }}>
                  {cart.length === 0 && <p style={{ color: '#94a3b8', fontSize: 13 }}>Cart is empty. Tap a product to start a sale.</p>}
                  {cart.map(i => (
                    <div key={i.id} style={{ background: '#1e293b', borderRadius: 10, padding: 12, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 20 }}>{i.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}><b style={{ fontSize: 13 }}>{i.name}</b><p style={{ fontSize: 12, color: '#94a3b8' }}>${i.price.toFixed(2)} each</p></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button onClick={() => changeQty(i.id, -1)} style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: '#334155', color: '#fff', cursor: 'pointer' }}>−</button>
                        <b>{i.qty}</b>
                        <button onClick={() => changeQty(i.id, 1)} style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: '#059669', color: '#fff', cursor: 'pointer' }}>+</button>
                      </div>
                      <b>${(i.price * i.qty).toFixed(2)}</b>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px dashed #334155', marginTop: 14, paddingTop: 12, display: 'grid', gap: 6, fontSize: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800 }}><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>{['Cash', 'Card', 'Tap to Pay'].map(m => <button key={m} onClick={() => setPayment(m)} style={{ flex: 1, padding: '10px 6px', borderRadius: 10, border: 'none', background: payment === m ? '#059669' : '#1e293b', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{m}</button>)}</div>
                <button onClick={checkout} style={{ width: '100%', marginTop: 12, background: '#059669', color: '#fff', border: 'none', padding: 13, borderRadius: 10, fontWeight: 800, cursor: 'pointer' }}>Charge ${total.toFixed(2)} • {payment}</button>
                <button onClick={() => setCart([])} style={{ width: '100%', marginTop: 8, background: 'transparent', border: '1px solid #334155', color: '#cbd5e1', padding: 10, borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>Clear Cart</button>
              </div>
            </div>
          )}

          {/* SALES CHART + INVENTORY */}
          <div className="verus-pos-split-grid">
            <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <h3><i className="bi bi-bar-chart-line-fill" style={{ color: '#059669' }}></i> Sales This Week — By Day</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160, marginTop: 18, padding: '0 4px', overflowX: 'auto' }}>
                {[['Mon', 62], ['Tue', 78], ['Wed', 55], ['Thu', 92], ['Fri', 100], ['Sat', 84], ['Sun', 70]].map(([d, h]) => (
                  <div key={d} style={{ flex: '1 0 36px', textAlign: 'center' }}><div style={{ height: h * 1.4, maxHeight: 140, background: d === 'Fri' ? '#059669' : '#dcfce7', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6, fontSize: 11, fontWeight: 700, color: d === 'Fri' ? '#fff' : '#059669' }}>${(h * 28).toLocaleString()}</div><p style={{ fontSize: 12, marginTop: 6, fontWeight: 600 }}>{d}</p></div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}><span style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Best Day: Friday — $2,800</span><span style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Avg. Ticket: $28.79</span></div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <h3><i className="bi bi-box-seam-fill" style={{ color: '#F97316' }}></i> Inventory — Try Adjust Stock</h3>
              <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                {filteredInventory.map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', borderRadius: 12, padding: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 20 }}>{p.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}><b style={{ fontSize: 13 }}>{p.name}</b><p style={{ fontSize: 12, color: '#64748b' }}>{p.cat} • ${p.price.toFixed(2)}</p></div>
                    <span style={{ background: p.stock === 0 ? '#fee2e2' : p.stock < 15 ? '#ffedd5' : '#dcfce7', color: p.stock === 0 ? '#DC2626' : p.stock < 15 ? '#EA580C' : '#059669', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{p.stock === 0 ? 'OUT' : p.stock < 15 ? 'LOW' : 'IN STOCK'}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button onClick={() => adjustStock(p.id, -1)} style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}>−</button>
                      <b style={{ minWidth: 22, textAlign: 'center' }}>{p.stock}</b>
                      <button onClick={() => adjustStock(p.id, 1)} style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: '#059669', color: '#fff', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT TRANSACTIONS */}
          <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
            <h3><i className="bi bi-receipt" style={{ color: '#059669' }}></i> Recent Transactions</h3>
            <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
              {transactions.map(t => (
                <div key={t.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#f8fafc', borderRadius: 12, padding: 14, flexWrap: 'wrap' }}>
                  <span style={{ background: '#0f172a', color: '#fff', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{t.id}</span>
                  <div style={{ flex: 1, minWidth: 160 }}><b style={{ fontSize: 14 }}>{t.items}</b><p style={{ fontSize: 12, color: '#64748b' }}>{t.time} • {t.method}</p></div>
                  <b>${t.total.toFixed(2)}</b>
                  <span style={{ background: t.status === 'Completed' ? '#dcfce7' : '#fee2e2', color: t.status === 'Completed' ? '#059669' : '#DC2626', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* RECEIPT MODAL */}
      {showReceipt && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 90, padding: 16 }} onClick={() => setShowReceipt(false)}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 28, maxWidth: 380, width: '100%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 48, color: '#059669' }}><i className="bi bi-check-circle-fill"></i></div>
            <h3 style={{ margin: '12px 0 6px' }}>Payment Successful!</h3>
            <p style={{ color: '#64748b', fontSize: 14 }}>Charged <b>${lastTotal.toFixed(2)}</b> via {payment} at {store}.</p>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>Receipt sent to customer • Inventory synced to all stores</p>
            <button onClick={() => setShowReceipt(false)} style={{ marginTop: 18, width: '100%', padding: 12, background: '#059669', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Back to Register</button>
          </div>
        </div>
      )}
    </div>
  )
}