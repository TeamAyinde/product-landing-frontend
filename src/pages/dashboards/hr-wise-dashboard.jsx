import React, { useState } from 'react'

// src/pages/dashboards/hr-wise-dashboard.jsx
// Dashboard: dashboards/hr-wise-dashboard
// Full HR-Wise Dashboard with Analytics - UI only
// Sidebar is scrollable, Logout is stuck to bottom - MOBILE RESPONSIVE (drawer)

export default function HrWiseDashboard({ go, user, onLogout }) {
  const [menu, setMenu] = useState('Overview')
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeOff, setTimeOff] = useState([
    { id: 1, name: 'Sarah Johnson', role: 'Support Lead', days: 'Jun 20 - Jun 24 (5 days)', type: 'Vacation', status: 'Pending' },
    { id: 2, name: 'Marcus Lee', role: 'Sales Associate', days: 'Jun 18 - Jun 19 (2 days)', type: 'Sick Leave', status: 'Pending' },
    { id: 3, name: 'Priya Patel', role: 'HR Assistant', days: 'Jul 02 - Jul 05 (4 days)', type: 'Vacation', status: 'Approved' },
  ])

  const MENU_GROUPS = [
    {
      label: 'MAIN',
      items: [
        ['Overview', 'bi-grid-1x2-fill', null],
        ['Analytics', 'bi-bar-chart-line-fill', null],
        ['Reports', 'bi-file-earmark-bar-graph-fill', 'New'],
      ]
    },
    {
      label: 'PEOPLE',
      items: [
        ['Employees', 'bi-people-fill', null],
        ['Recruitment', 'bi-funnel-fill', '12'],
        ['Onboarding', 'bi-rocket-takeoff-fill', '4'],
        ['Performance', 'bi-graph-up-arrow', null],
        ['Time Off', 'bi-calendar-check-fill', '2'],
      ]
    },
    {
      label: 'COMPLIANCE & PAY',
      items: [
        ['Compliance', 'bi-shield-check-fill', '3'],
        ['Payroll', 'bi-cash-stack', null],
        ['Benefits', 'bi-heart-pulse-fill', null],
        ['Documents', 'bi-folder-fill', null],
        ['Training', 'bi-mortarboard-fill', null],
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        ['Settings', 'bi-gear-fill', null],
        ['Integrations', 'bi-plug-fill', null],
        ['Help & Support', 'bi-question-circle-fill', null],
      ]
    },
  ]

  const EMPLOYEES = [
    { name: 'Sarah Johnson', role: 'Support Lead', dept: 'Support', status: 'Active', onboarding: 100, avatar: 'SJ', color: '#7C3AED' },
    { name: 'Marcus Lee', role: 'Sales Associate', dept: 'Sales', status: 'Active', onboarding: 100, avatar: 'ML', color: '#059669' },
    { name: 'Priya Patel', role: 'HR Assistant', dept: 'HR', status: 'Onboarding', onboarding: 72, avatar: 'PP', color: '#F97316' },
    { name: 'James Carter', role: 'Operations Manager', dept: 'Operations', status: 'Active', onboarding: 100, avatar: 'JC', color: '#2F80ED' },
    { name: 'Elena Gomez', role: 'Accountant', dept: 'Finance', status: 'Active', onboarding: 100, avatar: 'EG', color: '#DC2626' },
    { name: 'David Kim', role: 'Designer', dept: 'Product', status: 'Onboarding', onboarding: 45, avatar: 'DK', color: '#0f172a' },
  ]

  const filteredEmployees = EMPLOYEES.filter(e => (e.name + e.role + e.dept).toLowerCase().includes(search.toLowerCase()))
  const updateTimeOff = (id, status) => setTimeOff(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  const pickMenu = (label) => { setMenu(label); setSidebarOpen(false) }

  const KPIS = [
    { label: 'Total Employees', value: '248', change: '+12 this month', icon: 'bi-people-fill', color: '#7C3AED', bg: '#ede9fe' },
    { label: 'New Hires (June)', value: '18', change: '+4 vs May', icon: 'bi-person-plus-fill', color: '#059669', bg: '#dcfce7' },
    { label: 'Time to Hire', value: '9 days', change: 'Was 28 days', icon: 'bi-clock-fill', color: '#F97316', bg: '#ffedd5' },
    { label: 'Turnover Rate', value: '4.2%', change: '-1.8% this quarter', icon: 'bi-arrow-down-circle-fill', color: '#2F80ED', bg: '#dbeafe' },
    { label: 'Compliance Score', value: '98%', change: 'Audit Ready', icon: 'bi-shield-check-fill', color: '#059669', bg: '#dcfce7' },
    { label: 'Pending Approvals', value: '7', change: '2 Time Off, 5 Docs', icon: 'bi-bell-fill', color: '#DC2626', bg: '#fee2e2' },
  ]

  return (
    <div className="hr-dash-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .hr-dash-sidebar { width: 272px; background: #0f172a; color: #fff; display: flex; flex-direction: column; height: 100vh; position: sticky; top: 0; flex-shrink: 0; overflow: hidden; }
        .hr-dash-mobile-topbar { display: none; }
        .hr-dash-overlay { display: none; }
        .hr-dash-2col { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 16px; }
        .hr-dash-kpis { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 16px; }
        .hr-dash-main-pad { padding: 28px; display: grid; gap: 20px; }
        .hr-dash-topbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 28px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap; position: sticky; top: 0; z-index: 5; }
        .hr-dash-search-wrap { position: relative; }
        .hr-dash-search-wrap input { padding: 10px 14px 10px 36px; border-radius: 999px; border: 1px solid #e2e8f0; width: 240px; }

        @media (max-width: 900px) {
          .hr-dash-layout { flex-direction: column; }
          .hr-dash-mobile-topbar { display: flex; align-items: center; gap: 12px; background: #0f172a; color: #fff; padding: 14px 16px; position: sticky; top: 0; z-index: 60; width: 100%; }
          .hr-dash-sidebar { position: fixed; left: 0; top: 0; bottom: 0; z-index: 80; transform: translateX(-110%); transition: transform 0.25s ease; box-shadow: 20px 0 60px rgba(0,0,0,0.35); max-width: 86vw; }
          .hr-dash-sidebar.open { transform: translateX(0); }
          .hr-dash-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 70; }
          .hr-dash-2col { grid-template-columns: 1fr; }
          .hr-dash-main-pad { padding: 16px; gap: 16px; }
          .hr-dash-topbar { padding: 14px 16px; top: 52px; }
          .hr-dash-search-wrap { flex: 1 1 100%; }
          .hr-dash-search-wrap input { width: 100%; }
        }
        @media (max-width: 600px) {
          .hr-dash-kpis { grid-template-columns: 1fr 1fr; gap: 12px; }
          .hr-dash-topbar { top: 52px; }
        }
        @media (max-width: 400px) {
          .hr-dash-kpis { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* MOBILE TOPBAR — HAMBURGER */}
      <div className="hr-dash-mobile-topbar">
        <button onClick={() => setSidebarOpen(true)} style={{ background: '#7C3AED', border: 'none', color: '#fff', width: 38, height: 38, borderRadius: 10, fontSize: 18, cursor: 'pointer' }}><i className="bi bi-list"></i></button>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 32, height: 32, borderRadius: 9, background: '#7C3AED', display: 'grid', placeItems: 'center' }}><i className="bi bi-people-fill"></i></span><b>HR-Wise</b></span>
        <span style={{ marginLeft: 'auto', background: '#1e293b', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#34d399' }}>LIVE DEMO</span>
      </div>

      {/* BACKDROP FOR DRAWER */}
      {sidebarOpen && <div className="hr-dash-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* ============ SIDEBAR - SCROLLABLE + LOGOUT STUCK ============ */}
      <aside className={`hr-dash-sidebar ${sidebarOpen ? 'open' : ''}`}>

        {/* TOP - FIXED, DOES NOT SCROLL */}
        <div style={{ padding: '20px 20px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: '#7C3AED', display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0 }}><i className="bi bi-people-fill"></i></span>
            <div><b style={{ fontSize: 18 }}>HR-Wise</b><p style={{ color: '#94a3b8', fontSize: 12 }}>By Ayinde Technologies</p></div>
            <span style={{ marginLeft: 'auto', background: '#1e293b', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#34d399' }}>LIVE DEMO</span>
            <button onClick={() => setSidebarOpen(false)} className="hr-dash-close-btn" style={{ display: 'none', background: '#1e293b', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: 8, cursor: 'pointer' }}><i className="bi bi-x-lg"></i></button>
          </div>

          <div style={{ background: '#1e293b', borderRadius: 14, padding: 14, marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#7C3AED', display: 'grid', placeItems: 'center', fontWeight: 800, flexShrink: 0 }}>{(user || 'HR').slice(0, 2).toUpperCase()}</span>
            <div style={{ minWidth: 0 }}><b style={{ fontSize: 14, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user || 'HR Manager'}</b><p style={{ color: '#94a3b8', fontSize: 12 }}>HR Admin - Full Access</p></div>
            <i className="bi bi-chevron-down" style={{ marginLeft: 'auto', color: '#94a3b8' }}></i>
          </div>

          {/* QUICK SEARCH IN SIDEBAR */}
          <div style={{ position: 'relative', marginTop: 14 }}>
            <i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 13 }}></i>
            <input placeholder="Search menu..." onChange={e => setSearch(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px 10px 34px', borderRadius: 10, border: '1px solid #1e293b', background: '#1e293b', color: '#fff', fontSize: 13, outline: 'none' }} />
          </div>
        </div>

        {/* MIDDLE - SCROLLABLE NAV - THIS SCROLLS */}
        <nav style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '4px 12px 12px 20px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#334155 transparent',
        }}>
          {MENU_GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, letterSpacing: '0.1em', fontWeight: 800, color: '#64748b', padding: '8px 8px 6px' }}>{group.label}</p>
              <div style={{ display: 'grid', gap: 2 }}>
                {group.items.map(([label, icon, badge]) => (
                  <button key={label} onClick={() => pickMenu(label)} style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    padding: '11px 12px', borderRadius: 10, border: 'none',
                    background: menu === label ? '#7C3AED' : 'transparent',
                    color: menu === label ? '#fff' : '#cbd5e1',
                    fontWeight: menu === label ? 700 : 500,
                    textAlign: 'left', cursor: 'pointer', fontSize: 14, width: '100%'
                  }}>
                    <i className={`bi ${icon}`} style={{ fontSize: 16, flexShrink: 0 }}></i>
                    <span style={{ flex: 1 }}>{label}</span>
                    {badge && <span style={{ background: menu === label ? '#fff' : '#DC2626', color: menu === label ? '#7C3AED' : '#fff', padding: '2px 7px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{badge}</span>}
                    {menu === label && <i className="bi bi-chevron-right" style={{ fontSize: 12 }}></i>}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* EXTRA CONTENT TO SHOW SCROLL */}
          <div style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)', borderRadius: 14, padding: 16, marginTop: 4 }}>
            <b style={{ fontSize: 13 }}><i className="bi bi-lightning-charge-fill"></i> Hiring Goal - June</b>
            <p style={{ fontSize: 12, color: '#ddd6fe', margin: '6px 0 10px', lineHeight: 1.5 }}>18 of 25 roles filled. 7 left to hit target.</p>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 999, overflow: 'hidden' }}><div style={{ width: '72%', height: '100%', background: '#fff', borderRadius: 999 }}></div></div>
            <p style={{ fontSize: 12, fontWeight: 700, marginTop: 8 }}>72% complete</p>
          </div>
          <p style={{ fontSize: 11, color: '#475569', textAlign: 'center', padding: '14px 0 4px' }}>HR-Wise v2.4 - Demo Build</p>
        </nav>

        {/* BOTTOM - STUCK, NEVER SCROLLS AWAY */}
        <div style={{
          flexShrink: 0,
          padding: 16,
          background: '#0f172a',
          borderTop: '1px solid #1e293b',
          boxShadow: '0 -8px 20px rgba(0,0,0,0.25)',
          zIndex: 2,
        }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button onClick={() => go('product-hrwise')} style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-arrow-left"></i> Back to Site</button>
            <button onClick={() => go('contact')} style={{ flex: 1, background: '#fff', border: 'none', color: '#0f172a', padding: '10px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}><i className="bi bi-send-fill"></i> Request Build</button>
          </div>
          {/* LOGOUT - STUCK TO SIDEBAR */}
          <button onClick={onLogout} style={{ width: '100%', background: '#DC2626', border: 'none', color: '#fff', padding: '13px', borderRadius: 12, fontWeight: 800, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <i className="bi bi-box-arrow-right"></i> Logout - {user || 'HR Manager'}
          </button>
          <p style={{ fontSize: 11, color: '#64748b', textAlign: 'center', marginTop: 8 }}>Logged in as HR - Demo Mode</p>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
        {/* TOPBAR */}
        <div className="hr-dash-topbar">
          <div style={{ minWidth: 0 }}><h1 style={{ fontSize: 'clamp(18px, 5vw, 22px)' }}>{menu} Dashboard</h1><p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>Welcome back, {user || 'HR Manager'} - Here is what needs your attention today.</p></div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap', width: 'auto' }}>
            <div className="hr-dash-search-wrap"><i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i><input placeholder="Search employees, jobs..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <button style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: 999, fontWeight: 600 }}><i className="bi bi-bell-fill"></i> 7</button>
            <button style={{ background: '#7C3AED', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 700, whiteSpace: 'nowrap' }}>+ New Hire</button>
          </div>
        </div>

        <div className="hr-dash-main-pad">
          {/* KPI ROW */}
          <div className="hr-dash-kpis">
            {KPIS.map(k => (
              <div key={k.label} style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 18, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ width: 40, height: 40, borderRadius: 12, background: k.bg, color: k.color, display: 'grid', placeItems: 'center', fontSize: 18 }}><i className={`bi ${k.icon}`}></i></span><span style={{ fontSize: 18, color: '#94a3b8' }}><i className="bi bi-three-dots-vertical"></i></span></div>
                <h3 style={{ fontSize: 26, margin: '12px 0 2px' }}>{k.value}</h3>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{k.label}</p>
                <p style={{ fontSize: 12, color: '#059669', marginTop: 4 }}>{k.change}</p>
              </div>
            ))}
          </div>

          {/* ANALYTICS ROW */}
          <div className="hr-dash-2col">
            <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><h3><i className="bi bi-bar-chart-line-fill" style={{ color: '#7C3AED' }}></i> Hiring Funnel - Last 90 Days</h3><span style={{ background: '#dcfce7', color: '#059669', padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>+32% hires</span></div>
              <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
                {[['Applied', 342, 100, '#7C3AED'], ['Screened', 218, 64, '#2F80ED'], ['Interview', 124, 36, '#F97316'], ['Offer', 48, 14, '#059669'], ['Hired', 38, 11, '#0f172a']].map(([label, val, pct, col]) => (
                  <div key={label}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 6 }}><span>{label}</span><span>{val} candidates</span></div><div style={{ height: 10, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: col, borderRadius: 999 }}></div></div></div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}><span style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Avg. Time to Hire: 9 days</span><span style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Offer Accept Rate: 79%</span></div>
            </div>

            <div style={{ background: '#0f172a', color: '#fff', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <h3>Headcount by Department</h3>
              <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
                {[['Sales', 68, 92], ['Support', 54, 74], ['Operations', 42, 58], ['Product', 38, 52], ['HR + Finance', 26, 36]].map(([label, val, pct]) => (
                  <div key={label}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>{label}</span><b>{val}</b></div><div style={{ height: 8, background: '#1e293b', borderRadius: 999, marginTop: 6, overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: '#7C3AED' }}></div></div></div>
                ))}
              </div>
              <div style={{ background: '#1e293b', borderRadius: 12, padding: 14, marginTop: 18, display: 'flex', gap: 10 }}><i className="bi bi-lightbulb-fill" style={{ color: '#FACC15', fontSize: 20 }}></i><p style={{ fontSize: 13, lineHeight: 1.6, color: '#cbd5e1' }}><b style={{ color: '#fff' }}>Insight:</b> Sales grew 18% this quarter. Consider 2 more Support hires to keep response time under 2 hrs.</p></div>
            </div>
          </div>

          {/* EMPLOYEES + COMPLIANCE + TIME OFF */}
          <div className="hr-dash-2col">
            <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><h3><i className="bi bi-people-fill" style={{ color: '#7C3AED' }}></i> Employees - {filteredEmployees.length} shown</h3><span style={{ fontSize: 13, color: '#7C3AED', fontWeight: 700 }}>View All</span></div>
              <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                {filteredEmployees.map(e => (
                  <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: '#f8fafc', borderRadius: 12, flexWrap: 'wrap' }}>
                    <span style={{ width: 40, height: 40, borderRadius: '50%', background: e.color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{e.avatar}</span>
                    <div style={{ flex: 1, minWidth: 160 }}><b style={{ fontSize: 14 }}>{e.name}</b><p style={{ color: '#64748b', fontSize: 13 }}>{e.role} - {e.dept}</p></div>
                    <div style={{ width: 120, flexShrink: 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700 }}><span>Onboarding</span><span>{e.onboarding}%</span></div><div style={{ height: 6, background: '#e2e8f0', borderRadius: 999, marginTop: 4, overflow: 'hidden' }}><div style={{ width: e.onboarding + '%', height: '100%', background: e.onboarding === 100 ? '#059669' : '#F97316' }}></div></div></div>
                    <span style={{ background: e.status === 'Active' ? '#dcfce7' : '#ffedd5', color: e.status === 'Active' ? '#059669' : '#EA580C', padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{e.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gap: 16, alignContent: 'start', minWidth: 0 }}>
              <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20 }}>
                <h3><i className="bi bi-shield-check-fill" style={{ color: '#DC2626' }}></i> Compliance Alerts</h3>
                <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 12, fontSize: 13 }}><b>Work Permit Expiring</b><p style={{ color: '#475569', marginTop: 2 }}>Elena Gomez - expires in 12 days</p></div>
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 12, fontSize: 13 }}><b>I-9 Missing</b><p style={{ color: '#475569', marginTop: 2 }}>David Kim - 45% onboarding, I-9 pending</p></div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 12, fontSize: 13 }}><b>All Good</b><p style={{ color: '#475569', marginTop: 2 }}>242 of 248 employees fully compliant</p></div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20 }}>
                <h3><i className="bi bi-calendar-check-fill" style={{ color: '#7C3AED' }}></i> Time Off Requests - Try Approve</h3>
                <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                  {timeOff.map(t => (
                    <div key={t.id} style={{ background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><b style={{ fontSize: 13 }}>{t.name}</b><span style={{ background: t.status === 'Approved' ? '#dcfce7' : t.status === 'Declined' ? '#fee2e2' : '#fef9c3', color: t.status === 'Approved' ? '#059669' : t.status === 'Declined' ? '#DC2626' : '#854d0e', padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{t.status}</span></div>
                      <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{t.role} - {t.days} - {t.type}</p>
                      {t.status === 'Pending' && <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><button onClick={() => updateTimeOff(t.id, 'Approved')} style={{ flex: 1, padding: '8px', background: '#059669', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Approve</button><button onClick={() => updateTimeOff(t.id, 'Declined')} style={{ flex: 1, padding: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Decline</button></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PERFORMANCE */}
          <div style={{ background: '#fff', border: '1px solid #eef2f7', borderRadius: 18, padding: 20, minWidth: 0 }}>
            <h3><i className="bi bi-graph-up-arrow" style={{ color: '#F97316' }}></i> Performance Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginTop: 16 }}>
              {[['Exceeds Expectations', 42, '#059669'], ['Meets Expectations', 168, '#2F80ED'], ['Needs Support', 28, '#F97316'], ['On Improvement Plan', 10, '#DC2626']].map(([label, val, col]) => (
                <div key={label} style={{ background: '#f8fafc', borderRadius: 14, padding: 16, textAlign: 'center' }}><h2 style={{ color: col }}>{val}</h2><p style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{label}</p><div style={{ height: 6, background: '#e2e8f0', borderRadius: 999, marginTop: 10, overflow: 'hidden' }}><div style={{ width: (val / 248 * 100) + '%', height: '100%', background: col }}></div></div></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}