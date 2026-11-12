import React, { useState } from 'react'

// src/pages/dashboards/exactus-dashboard.jsx
// Dashboard: dashboards/exactus-dashboard
// LAYOUT KEPT: Sidebar scrollable + Logout stuck to bottom — same vein as HR-Wise / Verus POS
// DESIGN DIFFERENT: Payday Vault / 【entity-Ledger¦canonical_name=Ledger】 — warm paper, check + receipt styling, 【entity-IRS¦canonical_name=IRS】 vault stamps
// MOBILE RESPONSIVE (drawer)

const INITIAL_STAFF = [
  { id: 1, name: 'Sarah Johnson', role: 'Store Manager', type: 'W-2', state: 'NJ', rate: 32.00, hours: 45, bonus: 0, selected: true },
  { id: 2, name: 'Marcus Lee', role: 'Sales Associate', type: 'W-2', state: 'CA', rate: 22.50, hours: 42, bonus: 150, selected: true },
  { id: 3, name: 'Priya Patel', role: 'HR Assistant', type: 'W-2', state: 'NJ', rate: 28.00, hours: 40, bonus: 0, selected: true },
  { id: 4, name: 'James Carter', role: 'Operations', type: 'W-2', state: 'NY', rate: 30.00, hours: 48, bonus: 200, selected: true },
  { id: 5, name: 'Elena Gomez', role: 'Accountant', type: 'W-2', state: 'DE', rate: 35.00, hours: 38, bonus: 0, selected: false },
  { id: 6, name: 'David Kim', role: 'Designer (Contractor)', type: '1099', state: 'CA', rate: 45.00, hours: 20, bonus: 0, selected: true },
]

const STATE_RATE = { NJ: 0.055, CA: 0.093, NY: 0.068, DE: 0.052, TX: 0, FL: 0 }

function calcPay(p) {
  const reg = Math.min(p.hours, 40)
  const ot = Math.max(p.hours - 40, 0)
  const gross = (reg * p.rate) + (ot * p.rate * 1.5) + p.bonus
  const federal = p.type === '1099' ? 0 : gross * 0.12
  const stateTax = p.type === '1099' ? 0 : gross * (STATE_RATE[p.state] || 0)
  const fica = p.type === '1099' ? 0 : gross * 0.0765
  const net = gross - federal - stateTax - fica
  return { reg, ot, gross, federal, stateTax, fica, net }
}

export default function ExactusDashboard({ go, user, onLogout }) {
  const [menu, setMenu] = useState('Overview')
  const [staff, setStaff] = useState(INITIAL_STAFF)
  const [search, setSearch] = useState('')
  const [payPeriod, setPayPeriod] = useState('Nov 01 - Nov 15, 2026')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showPayrollModal, setShowPayrollModal] = useState(false)
  const [payHistory, setPayHistory] = useState([
    { id: 'PR-1042', period: 'Oct 16 - Oct 31, 2026', total: 38420, people: 24, status: 'Paid', method: 'Direct Deposit' },
    { id: 'PR-1041', period: 'Oct 01 - Oct 15, 2026', total: 37210, people: 23, status: 'Paid', method: 'Direct Deposit' },
    { id: 'PR-1040', period: 'Sep 16 - Sep 30, 2026', total: 36180, people: 23, status: 'Paid', method: 'Direct Deposit' },
  ])

  const MENU_GROUPS = [
    { label: 'MAIN', items: [['Overview', 'bi-grid-1x2-fill', null], ['Analytics', 'bi-bar-chart-line-fill', null], ['Reports', 'bi-file-earmark-bar-graph-fill', 'New']] },
    { label: 'PAYROLL', items: [['Payroll Run', 'bi-cash-stack', '3 days'], ['Employees', 'bi-people-fill', null], ['Contractors', 'bi-person-badge-fill', '6'], ['Time & Overtime', 'bi-clock-history', '4']] },
    { label: 'TAX & COMPLIANCE', items: [['Tax Filings', 'bi-shield-check-fill', '2'], ['W-2 / 1099', 'bi-file-earmark-text-fill', null], ['Accounting', 'bi-journal-text', null]] },
    { label: 'SYSTEM', items: [['Settings', 'bi-gear-fill', null], ['Integrations', 'bi-plug-fill', null], ['Help & Support', 'bi-question-circle-fill', null]] },
  ]

  const toggleSelect = (id) => setStaff(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s))
  const changeHours = (id, d) => setStaff(prev => prev.map(s => s.id === id ? { ...s, hours: Math.max(0, Math.min(80, s.hours + d)) } : s))
  const changeBonus = (id, v) => setStaff(prev => prev.map(s => s.id === id ? { ...s, bonus: Math.max(0, Number(v) || 0) } : s))

  const selected = staff.filter(s => s.selected)
  const totals = selected.reduce((acc, p) => { const c = calcPay(p); acc.gross += c.gross; acc.federal += c.federal; acc.state += c.stateTax; acc.fica += c.fica; acc.net += c.net; return acc }, { gross: 0, federal: 0, state: 0, fica: 0, net: 0 })
  const filtered = staff.filter(s => (s.name + s.role + s.state).toLowerCase().includes(search.toLowerCase()))
  const totalTax = totals.federal + totals.state + totals.fica
  const otTotal = selected.reduce((s, p) => s + Math.max(p.hours - 40, 0), 0)
  const pickMenu = (label) => { setMenu(label); setSidebarOpen(false) }

  const runPayroll = () => {
    if (!selected.length) return alert('Select at least 1 person to pay')
    setPayHistory(prev => [{ id: 'PR-' + (1043 + prev.length), period: payPeriod, total: Math.round(totals.net), people: selected.length, status: 'Scheduled', method: 'Direct Deposit' }, ...prev])
    setShowPayrollModal(true)
  }

  return (
    <div className="exactus-dash-layout" style={{ display: 'flex', minHeight: '100vh', background: '#FDF6F0', fontFamily: 'Inter, Arial, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .exactus-dash-sidebar { width: 272px; background: #1A0F0F; color: #fff; display: flex; flex-direction: column; height: 100vh; position: sticky; top: 0; flex-shrink: 0; overflow: hidden; border-right: 3px solid #DC2626; }
        .exactus-dash-mobile-topbar { display: none; }
        .exactus-dash-overlay { display: none; }
        .exactus-dash-topbar { background: #FFFBF5; border-bottom: 2px solid #FED7AA; padding: 16px 28px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap; position: sticky; top: 0; z-index: 5; }
        .exactus-dash-search-wrap { position: relative; }
        .exactus-dash-search-wrap input { padding: 10px 14px 10px 36px; border-radius: 999px; border: 1px solid #FED7AA; background: #fff; width: 240px; }
        .exactus-dash-main-pad { padding: 28px; display: grid; gap: 20px; }
        .exactus-dash-2col { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 16px; }
        .exactus-flow { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 12px; align-items: center; margin-top: 20px; }
        .exactus-flow-arrow { font-size: 22px; color: #FCA5A5; }

        @media (max-width: 900px) {
          .exactus-dash-layout { flex-direction: column; }
          .exactus-dash-mobile-topbar { display: flex; align-items: center; gap: 12px; background: #1A0F0F; color: #fff; padding: 14px 16px; position: sticky; top: 0; z-index: 60; width: 100%; border-bottom: 2px solid #DC2626; }
          .exactus-dash-sidebar { position: fixed; left: 0; top: 0; bottom: 0; z-index: 80; transform: translateX(-110%); transition: transform 0.25s ease; box-shadow: 20px 0 60px rgba(0,0,0,0.35); max-width: 86vw; }
          .exactus-dash-sidebar.open { transform: translateX(0); }
          .exactus-dash-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 70; }
          .exactus-dash-2col { grid-template-columns: 1fr; }
          .exactus-flow { grid-template-columns: 1fr; gap: 8px; }
          .exactus-flow-arrow { transform: rotate(90deg); justify-self: center; }
          .exactus-dash-main-pad { padding: 16px; gap: 16px; }
          .exactus-dash-topbar { padding: 14px 16px; top: 52px; }
          .exactus-dash-search-wrap { flex: 1 1 100%; }
          .exactus-dash-search-wrap input { width: 100%; }
        }
      `}</style>

      {/* MOBILE TOPBAR — HAMBURGER */}
      <div className="exactus-dash-mobile-topbar">
        <button onClick={() => setSidebarOpen(true)} style={{ background: '#DC2626', border: 'none', color: '#fff', width: 38, height: 38, borderRadius: 10, fontSize: 18, cursor: 'pointer' }}><i className="bi bi-list"></i></button>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 32, height: 32, borderRadius: 9, background: '#DC2626', display: 'grid', placeItems: 'center' }}><i className="bi bi-calculator-fill"></i></span><b>Exactus</b></span>
        <span style={{ marginLeft: 'auto', background: '#2A1A1A', border: '1px solid #7F1D1D', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#FCA5A5' }}>● LIVE DEMO</span>
      </div>

      {sidebarOpen && <div className="exactus-dash-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* ============ SIDEBAR - SCROLLABLE + LOGOUT STUCK (LAYOUT KEPT) ============ */}
      <aside className={`exactus-dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '20px 20px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: '#DC2626', display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0, boxShadow: '0 6px 16px rgba(220,38,38,0.4)' }}><i className="bi bi-calculator-fill"></i></span>
            <div><b style={{ fontSize: 18, letterSpacing: '-0.02em' }}>Exactus</b><p style={{ color: '#D6A5A5', fontSize: 12 }}>By Ayinde Technologies</p></div>
            <span style={{ marginLeft: 'auto', background: '#2A1A1A', border: '1px solid #7F1D1D', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#FCA5A5' }}>● LIVE DEMO</span>
          </div>
          <div style={{ background: '#2A1A1A', border: '1px solid #3A1F1F', borderRadius: 14, padding: 14, marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#DC2626', display: 'grid', placeItems: 'center', fontWeight: 800, flexShrink: 0, border: '2px solid #FCA5A5' }}>{(user || 'PA').slice(0, 2).toUpperCase()}</span>
            <div style={{ minWidth: 0 }}><b style={{ fontSize: 14, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user || 'Payroll Admin'}</b><p style={{ color: '#D6A5A5', fontSize: 12 }}>Payroll Admin — Full Access</p></div>
          </div>
          <label style={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 800, color: '#D6A5A5', display: 'block', marginTop: 14, marginBottom: 6 }}>PAY PERIOD • CHECK NO. 1043</label>
          <select value={payPeriod} onChange={e => setPayPeriod(e.target.value)} style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: '1px solid #7F1D1D', background: '#2A1A1A', color: '#fff', fontSize: 13, fontWeight: 600 }}>
            <option>Nov 01 - Nov 15, 2026</option><option>Nov 16 - Nov 30, 2026</option><option>Dec 01 - Dec 15, 2026</option>
          </select>
        </div>

        {/* SCROLLABLE NAV */}
        <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '4px 12px 12px 20px', scrollbarWidth: 'thin', scrollbarColor: '#7F1D1D transparent' }}>
          {MENU_GROUPS.map(g => (
            <div key={g.label} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, letterSpacing: '0.12em', fontWeight: 800, color: '#A16262', padding: '8px 8px 6px' }}>{g.label}</p>
              <div style={{ display: 'grid', gap: 2 }}>
                {g.items.map(([label, icon, badge]) => (
                  <button key={label} onClick={() => pickMenu(label)} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '11px 12px', borderRadius: 10, border: 'none', background: menu === label ? 'linear-gradient(90deg, #DC2626, #991B1B)' : 'transparent', color: menu === label ? '#fff' : '#E7CFCF', fontWeight: menu === label ? 700 : 500, textAlign: 'left', cursor: 'pointer', fontSize: 14, width: '100%', boxShadow: menu === label ? '0 4px 14px rgba(220,38,38,0.35)' : 'none' }}>
                    <i className={`bi ${icon}`} style={{ fontSize: 16, flexShrink: 0 }}></i><span style={{ flex: 1 }}>{label}</span>
                    {badge && <span style={{ background: menu === label ? '#fff' : '#DC2626', color: menu === label ? '#DC2626' : '#fff', padding: '2px 7px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{badge}</span>}
                    {menu === label && <i className="bi bi-chevron-right" style={{ fontSize: 12 }}></i>}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {/* VAULT WIDGET — DIFFERENT FROM OTHERS: STAMP STYLE */}
          <div style={{ background: '#FFF7ED', color: '#1A0F0F', borderRadius: 14, padding: 16, border: '2px dashed #DC2626', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 10, right: 10, border: '2px solid #059669', color: '#059669', padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 900, transform: 'rotate(8deg)', letterSpacing: '0.08em' }}>✓ AUDITED</div>
            <b style={{ fontSize: 13 }}><i className="bi bi-bank2" style={{ color: '#DC2626' }}></i> IRS Vault — Compliance</b>
            <p style={{ fontSize: 12, color: '#7C2D12', margin: '6px 0 10px', lineHeight: 1.5 }}>100% — All filings on time.<br />Next: <b>Form 941 due Oct 31.</b></p>
            <div style={{ display: 'flex', gap: 4 }}>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <div key={i} style={{ flex: 1, height: 8, background: '#DC2626', borderRadius: 999 }}></div>)}</div>
            <p style={{ fontSize: 12, fontWeight: 800, marginTop: 8, color: '#991B1B' }}>100% Compliant • $0 Penalties</p>
          </div>
          <p style={{ fontSize: 11, color: '#8A5A5A', textAlign: 'center', padding: '14px 0 4px' }}>Exactus v2.8 — Demo Build • Check #1043</p>
        </nav>

        {/* STUCK BOTTOM — LOGOUT */}
        <div style={{ flexShrink: 0, padding: 16, background: '#1A0F0F', borderTop: '1px solid #3A1F1F', boxShadow: '0 -8px 20px rgba(0,0,0,0.35)', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button onClick={() => go('product-exactus')} style={{ flex: 1, background: '#2A1A1A', border: '1px solid #7F1D1D', color: '#fff', padding: '10px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-arrow-left"></i> Back to Site</button>
            <button onClick={() => go('contact')} style={{ flex: 1, background: '#fff', border: 'none', color: '#1A0F0F', padding: '10px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-send-fill"></i> Request Build</button>
          </div>
          <button onClick={onLogout} style={{ width: '100%', background: '#DC2626', border: 'none', color: '#fff', padding: '13px', borderRadius: 12, fontWeight: 800, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <i className="bi bi-box-arrow-right"></i> Logout — {user || 'Payroll Admin'}
          </button>
          <p style={{ fontSize: 11, color: '#A16262', textAlign: 'center', marginTop: 8 }}>Pay Run: {payPeriod} • Vault Locked 🔒</p>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
        <div className="exactus-dash-topbar">
          <div style={{ minWidth: 0 }}><h1 style={{ fontSize: 'clamp(18px, 5vw, 22px)', letterSpacing: '-0.02em' }}>{menu} <span style={{ fontSize: 12, background: '#DC2626', color: '#fff', padding: '3px 8px', borderRadius: 999, verticalAlign: 'middle', marginLeft: 6, whiteSpace: 'nowrap' }}>PAYDAY IN 3 DAYS</span></h1><p style={{ color: '#9A6A6A', fontSize: 13, lineHeight: 1.5 }}>Welcome back, {user || 'Payroll Admin'} — Pay period: {payPeriod}</p></div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="exactus-dash-search-wrap"><i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#C08A8A' }}></i><input placeholder="Search payee, check..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <button style={{ background: '#fff', border: '1px solid #FED7AA', padding: '10px 14px', borderRadius: 999, fontWeight: 600 }}><i className="bi bi-bell-fill" style={{ color: '#DC2626' }}></i> 2</button>
            <button onClick={runPayroll} style={{ background: '#DC2626', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 700, boxShadow: '0 6px 16px rgba(220,38,38,0.3)', whiteSpace: 'nowrap' }}>Run Payroll →</button>
          </div>
        </div>

        <div className="exactus-dash-main-pad">

          {/* PAYDAY VAULT — REPLACES GENERIC KPI CARDS — MONEY FLOW DIAGRAM */}
          <div style={{ background: '#1A0F0F', color: '#fff', borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden', border: '1px solid #7F1D1D', minWidth: 0 }}>
            <div style={{ position: 'absolute', top: 16, right: 18, border: '2px solid #34D399', color: '#34D399', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 900, transform: 'rotate(6deg)', letterSpacing: '0.1em' }}>✓ IRS READY</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ minWidth: 0 }}><p style={{ fontSize: 12, letterSpacing: '0.1em', fontWeight: 800, color: '#FCA5A5' }}>PAYDAY VAULT • {payPeriod.toUpperCase()}</p><h2 style={{ fontSize: 'clamp(20px, 5vw, 26px)', margin: '8px 0 4px' }}>Where does the money go?</h2><p style={{ color: '#D6A5A5', fontSize: 13, lineHeight: 1.5 }}>Gross → Tax → Net. Exactus splits it automatically, every pay run.</p></div>
              <div style={{ textAlign: 'right' }}><p style={{ fontSize: 12, color: '#D6A5A5' }}>NEXT DEPOSIT</p><b style={{ fontSize: 20 }}>Nov 15 • 9:00 AM</b></div>
            </div>

            {/* FLOW: Gross → Tax → Net */}
            <div className="exactus-flow">
              <div style={{ background: '#fff', color: '#1A0F0F', borderRadius: 14, padding: 16, textAlign: 'center', borderTop: '4px solid #2F80ED' }}><p style={{ fontSize: 11, fontWeight: 800, color: '#2F80ED' }}>GROSS PAY</p><b style={{ fontSize: 22 }}>${totals.gross.toLocaleString(undefined, { maximumFractionDigits: 0 })}</b><p style={{ fontSize: 12, color: '#6B7280' }}>{selected.length} people • {otTotal}h OT</p></div>
              <div className="exactus-flow-arrow">→</div>
              <div style={{ background: '#DC2626', color: '#fff', borderRadius: 14, padding: 16, textAlign: 'center' }}><p style={{ fontSize: 11, fontWeight: 800, color: '#FECACA' }}>TAX WITHHELD</p><b style={{ fontSize: 22 }}>−${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</b><p style={{ fontSize: 12, color: '#FECACA' }}>Fed ${totals.federal.toFixed(0)} • State ${totals.state.toFixed(0)} • FICA ${totals.fica.toFixed(0)}</p></div>
              <div className="exactus-flow-arrow">→</div>
              <div style={{ background: '#059669', color: '#fff', borderRadius: 14, padding: 16, textAlign: 'center' }}><p style={{ fontSize: 11, fontWeight: 800, color: '#D1FAE5' }}>NET • DIRECT DEPOSIT</p><b style={{ fontSize: 22 }}>${totals.net.toLocaleString(undefined, { maximumFractionDigits: 0 })}</b><p style={{ fontSize: 12, color: '#D1FAE5' }}>Lands Nov 15 • No checks</p></div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <button onClick={runPayroll} style={{ background: '#fff', color: '#1A0F0F', border: 'none', padding: '12px 20px', borderRadius: 999, fontWeight: 800, cursor: 'pointer' }}>Deposit ${totals.net.toFixed(0)} Now →</button>
              <button onClick={() => setMenu('Tax Filings')} style={{ background: 'transparent', color: '#fff', border: '1px solid #7F1D1D', padding: '12px 20px', borderRadius: 999, fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-shield-check-fill"></i> View Tax Vault</button>
              <span style={{ marginLeft: 'auto', background: '#2A1A1A', border: '1px solid #7F1D1D', padding: '10px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Compliance: 100% • $0 Penalties</span>
            </div>
          </div>

          {/* PAY LEDGER — CHECK-STYLE TABLE (NOT GENERIC TABLE) */}
          {(menu === 'Overview' || menu === 'Payroll Run') && (
            <div style={{ background: '#FFFBF5', border: '1px solid #FED7AA', borderRadius: 18, padding: 20, boxShadow: '0 10px 30px rgba(220,38,38,0.06)', minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, paddingBottom: 14, borderBottom: '2px dashed #FED7AA' }}>
                <h3 style={{ fontSize: 18 }}> <i className="bi bi-journal-check" style={{ color: '#DC2626' }}></i> Pay Ledger — {payPeriod}</h3>
                <span style={{ background: '#1A0F0F', color: '#fff', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>✂ {selected.length} checks • Net ${totals.net.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <p style={{ fontSize: 13, color: '#9A6A6A', margin: '12px 0' }}>Try it: change hours with <b>+ / −</b>, type a bonus, uncheck someone — the Vault above updates instantly.</p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 840 }}>
                  <thead><tr style={{ background: '#1A0F0F', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px', borderRadius: '10px 0 0 0' }}>Pay?</th><th style={{ padding: 12 }}>Payee / Check</th><th style={{ padding: 12 }}>Hours</th><th style={{ padding: 12 }}>OT</th><th style={{ padding: 12 }}>Bonus</th><th style={{ padding: 12 }}>Gross</th><th style={{ padding: 12 }}>Tax</th><th style={{ padding: '12px', borderRadius: '0 10px 0 0' }}>Net Pay</th>
                  </tr></thead>
                  <tbody>
                    {filtered.map((p, idx) => { const c = calcPay(p); return (
                      <tr key={p.id} style={{ borderBottom: '1px dashed #FED7AA', background: p.selected ? '#fff' : '#FFF7ED', opacity: p.selected ? 1 : 0.6 }}>
                        <td style={{ padding: 12 }}><input type="checkbox" checked={p.selected} onChange={() => toggleSelect(p.id)} style={{ width: 20, height: 20, accentColor: '#DC2626' }} /></td>
                        <td style={{ padding: 12 }}><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ width: 36, height: 36, borderRadius: '50%', background: p.type === '1099' ? '#FEF3C7' : '#FEE2E2', color: p.type === '1099' ? '#92400E' : '#DC2626', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{p.name.split(' ').map(n => n[0]).join('')}</span><div><b>{p.name}</b><p style={{ color: '#9A6A6A', fontSize: 12 }}>Check #{1043 + idx} • {p.role} • {p.type} • {p.state} • ${p.rate.toFixed(2)}/hr</p></div></div></td>
                        <td style={{ padding: 12 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><button onClick={() => changeHours(p.id, -1)} style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid #FED7AA', background: '#fff', cursor: 'pointer' }}>−</button><b>{p.hours}h</b><button onClick={() => changeHours(p.id, 1)} style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: '#DC2626', color: '#fff', cursor: 'pointer' }}>+</button></div></td>
                        <td style={{ padding: 12 }}>{c.ot > 0 ? <span style={{ background: '#FFEDD5', color: '#EA580C', padding: '4px 8px', borderRadius: 999, fontWeight: 700, fontSize: 11, border: '1px dashed #FDBA74' }}>{c.ot}h OT • 1.5x</span> : <span style={{ color: '#C4A5A5' }}>—</span>}</td>
                        <td style={{ padding: 12 }}><span style={{ fontSize: 12, color: '#9A6A6A' }}>$</span><input type="number" value={p.bonus} onChange={e => changeBonus(p.id, e.target.value)} style={{ width: 66, padding: '7px 8px', borderRadius: 8, border: '1px dashed #FDBA74', background: '#FFFBF5', fontWeight: 700 }} /></td>
                        <td style={{ padding: 12 }}><b>${c.gross.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b></td>
                        <td style={{ padding: 12, color: '#DC2626', fontWeight: 700 }}>− ${(c.federal + c.stateTax + c.fica).toFixed(2)}</td>
                        <td style={{ padding: 12 }}><b style={{ color: '#059669', background: '#D1FAE5', padding: '6px 10px', borderRadius: 999 }}>${c.net.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b><p style={{ fontSize: 11, color: '#9A6A6A', marginTop: 4 }}>Direct Deposit ✓</p></td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18, alignItems: 'center' }}>
                <div style={{ background: '#1A0F0F', color: '#fff', borderRadius: 12, padding: '14px 18px', flex: 1, minWidth: 260, display: 'flex', justifyContent: 'space-between', border: '1px dashed #FCA5A5', flexWrap: 'wrap', gap: 10 }}>
                  <div><p style={{ fontSize: 12, color: '#FCA5A5' }}>TOTAL NET TO DEPOSIT • {selected.length} CHECKS</p><h3 style={{ fontSize: 22 }}>${totals.net.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3></div>
                  <div style={{ textAlign: 'right', fontSize: 12, color: '#E7CFCF' }}><p>Gross ${totals.gross.toFixed(2)}</p><p>Tax ${(totals.federal + totals.state + totals.fica).toFixed(2)}</p></div>
                </div>
                <button onClick={runPayroll} style={{ background: '#DC2626', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 12, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 18px rgba(220,38,38,0.3)', flex: '1 1 100%' }}>Run Payroll — Deposit ${totals.net.toFixed(0)} <i className="bi bi-arrow-right"></i></button>
                <button onClick={() => setStaff(INITIAL_STAFF)} style={{ background: '#fff', border: '1px solid #FED7AA', padding: '14px 18px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Reset Demo</button>
              </div>
            </div>
          )}

          {/* TAX VAULT + HISTORY — FILING CABINET STYLE */}
          <div className="exactus-dash-2col">
            <div style={{ background: '#fff', border: '1px solid #FED7AA', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><h3><i className="bi bi-folder-fill" style={{ color: '#DC2626' }}></i> Tax Vault — This Pay Run</h3><span style={{ background: '#FEE2E2', color: '#991B1B', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>3 FILINGS</span></div>
              <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
                {[['Federal Income Tax', totals.federal, totals.gross ? (totals.federal / totals.gross * 100) : 0, '#DC2626', 'Form 941'], ['State Tax (NJ, CA, NY, DE)', totals.state, totals.gross ? (totals.state / totals.gross * 100) : 0, '#2F80ED', 'State Filing'], ['FICA — Social + Medicare', totals.fica, totals.gross ? (totals.fica / totals.gross * 100) : 0, '#F97316', 'Form 941']].map(([label, val, pct, col, tag]) => (
                  <div key={label} style={{ background: '#FFFBF5', border: '1px solid #FED7AA', borderRadius: 12, padding: 14, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, gap: 8, flexWrap: 'wrap' }}><span>{label} <span style={{ fontSize: 11, background: '#1A0F0F', color: '#fff', padding: '2px 7px', borderRadius: 999, marginLeft: 6, whiteSpace: 'nowrap' }}>{tag}</span></span><span>${Number(val).toFixed(2)}</span></div>
                    <div style={{ height: 8, background: '#FEE2E2', borderRadius: 999, marginTop: 8, overflow: 'hidden' }}><div style={{ width: Math.max(pct, 2) + '%', height: '100%', background: col }}></div></div>
                    <p style={{ fontSize: 12, color: '#9A6A6A', marginTop: 6 }}>{pct.toFixed(1)}% of gross • Auto-calculated</p>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FFFBEB', border: '2px dashed #F59E0B', borderRadius: 12, padding: 14, marginTop: 16, fontSize: 13, lineHeight: 1.6, position: 'relative' }}><span style={{ position: 'absolute', top: -10, right: 12, background: '#fff', padding: '2px 8px', border: '1.5px solid #F59E0B', borderRadius: 6, fontSize: 10, fontWeight: 900, color: '#92400E' }}>1099 NOTE</span><b>David Kim is a contractor</b> — no tax withheld. He gets full gross, 1099-NEC in January. Exactus handles it automatically.</div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #FED7AA', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <h3><i className="bi bi-receipt" style={{ color: '#DC2626' }}></i> Payroll History — Receipts</h3>
              <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                {payHistory.map(h => (
                  <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', background: '#FFFBF5', border: '1px dashed #FED7AA', borderRadius: 12, padding: 14, flexWrap: 'wrap' }}>
                    <div><b style={{ fontSize: 14 }}>{h.id} <span style={{ fontWeight: 400, color: '#9A6A6A' }}>• Receipt</span></b><p style={{ fontSize: 12, color: '#9A6A6A' }}>{h.period} • {h.people} people • {h.method}</p></div>
                    <div style={{ textAlign: 'right' }}><b>${h.total.toLocaleString()}</b><p><span style={{ background: h.status === 'Paid' ? '#D1FAE5' : '#FEF3C7', color: h.status === 'Paid' ? '#065F46' : '#92400E', padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{h.status}</span></p></div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1A0F0F', color: '#fff', borderRadius: 12, padding: 14, marginTop: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ width: 36, height: 36, borderRadius: 10, background: '#DC2626', display: 'grid', placeItems: 'center', flexShrink: 0 }}><i className="bi bi-file-earmark-text-fill"></i></span>
                <div><b style={{ fontSize: 13 }}>Upcoming Filing: Form 941 — Q3</b><p style={{ fontSize: 12, color: '#D6A5A5', marginTop: 2 }}>Due Oct 31, 2026 • Auto-prepared from this payroll. <span style={{ color: '#34D399', fontWeight: 700 }}>Ready to e-file.</span></p></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PAYROLL SUCCESS MODAL — CHECK STYLE */}
      {showPayrollModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,15,15,0.6)', display: 'grid', placeItems: 'center', zIndex: 90, padding: 16 }} onClick={() => setShowPayrollModal(false)}>
          <div style={{ background: '#FFFBF5', border: '2px dashed #DC2626', borderRadius: 18, padding: 28, maxWidth: 420, width: '100%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 48, color: '#059669' }}><i className="bi bi-patch-check-fill"></i></div>
            <h3 style={{ margin: '12px 0 6px' }}>Payroll Scheduled! ✓</h3>
            <p style={{ color: '#7C2D12', fontSize: 14, lineHeight: 1.6 }}><b>${totals.net.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b> will be direct-deposited to <b>{selected.length} people</b> for {payPeriod}.<br />Tax filings updated automatically. Check #1043 issued.</p>
            <button onClick={() => setShowPayrollModal(false)} style={{ marginTop: 18, width: '100%', padding: 12, background: '#DC2626', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Back to Vault</button>
          </div>
        </div>
      )}
    </div>
  )
}