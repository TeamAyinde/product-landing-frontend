import React, { useState, useEffect } from 'react'
import Products from './pages/products.jsx'
import HowItWorks from './pages/how-it-works.jsx'
import Contact from './pages/contact.jsx'
import HrWise from './pages/hr-wise.jsx'
import HrWiseLogin from './pages/hr-wise-login.jsx'
import HrWiseDashboard from './pages/dashboards/hr-wise-dashboard.jsx'
import VerusPos from './pages/verus-pos.jsx'
import VerusPosLogin from './pages/verus-pos-login.jsx'
import VerusPosDashboard from './pages/dashboards/verus-pos-dashboard.jsx'
import Exactus from './pages/exactus.jsx'
import ExactusLogin from './pages/exactus-login.jsx'
import ExactusDashboard from './pages/dashboards/exactus-dashboard.jsx'
import Inventro from './pages/inventro.jsx'
import InventroLogin from './pages/inventro-login.jsx'
import InventroDashboard from './pages/dashboards/inventro-dashboard.jsx'

// Logo: frontend/img/logo-3.png -> from src/App.jsx = ../img/logo-3.png
// FIX: Hash routing so browser Back / Forward works inside the app.
// Pages are now URLs: #/home | #/products | #/how-it-works | #/contact
// #/product-mechanic | #/product-hrwise | #/product-verus | #/product-exactus | #/product-inventro
// #/demo-login | #/demo-dashboard | #/hr-wise-login | #/hr-wise-dashboard etc.
// In real routing: pages/mechanic-saas etc = product-mechanic

// ---------- FRONTEND -> BACKEND WIRING ----------
// Dev: leave VITE_API_URL empty, Vite proxy forwards /api -> Flask on 127.0.0.1:5000
// Prod / no-proxy: set VITE_API_URL=http://127.0.0.1:5000 in frontend/.env
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const apiUrl = (path) => `${API_BASE}${path}`

function getPageFromHash() {
  if (typeof window === 'undefined') return 'home'
  const h = window.location.hash.replace(/^#\/?/, '').split('?')[0].split('/')[0]
  return h || 'home'
}

function getProductSlug(product) {
  if (!product) return 'general'
  if (product.slug) return product.slug
  if (product.name) {
    const s = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return s || 'general'
  }
  return 'general'
}

const PRODUCTS = [
  {
    id: 'mechanic', slug: 'mechanic-saas', page: 'product-mechanic',
    name: 'Mechanic SaaS', tagline: 'Find trusted mechanics near you',
    desc: 'Application developed to help vehicle owners easily locate trusted mechanics within their locations.',
    longDesc: 'Vehicle owners search by location, compare verified mechanics, see real ratings, book instantly and track repair status. Mechanics get jobs, payments and reviews in one place.',
    tags: ['Map Search', 'Booking', 'Ratings'], color: '#2F80ED', icon: 'bi-wrench-adjustable-circle',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=900&q=80',
    stats: '4.9 - 2,400+ Mechanics - 12 Cities',
    features: ['Live map of trusted mechanics', 'Instant booking & quotes', 'Verified ratings & reviews', 'Repair tracking & history']
  },
  {
    id: 'hrwise', slug: 'hr-wise', page: 'product-hrwise',
    name: 'HR-Wise', tagline: 'HR for modern US businesses',
    desc: 'Manage applicant tracking, automated onboarding, compliance documentation, and employee performance seamlessly in one secure portal.',
    longDesc: 'Built for US businesses - ATS, onboarding, I-9 & compliance docs, and performance reviews in one secure portal. HR teams save 12+ hours per week.',
    tags: ['ATS', 'Onboarding', 'Compliance'], color: '#7C3AED', icon: 'bi-people-fill',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80',
    stats: '500+ Companies - SOC 2 Secure - US Compliant',
    features: ['Applicant Tracking System', 'Automated onboarding flows', 'I-9 & compliance docs', 'Performance & reviews']
  },
  {
    id: 'verus', slug: 'verus-pos', page: 'product-verus',
    name: 'Verus POS', tagline: 'Blazing-fast POS for retail & hospitality',
    desc: 'Sync inventory across multiple store locations in real-time, process payments securely, and generate actionable sales reports.',
    longDesc: 'Checkout in 0.4s, sync inventory across all stores in real-time, accept cards, cash & tap-to-pay, and see live sales reports by store, staff and product.',
    tags: ['POS', 'Inventory Sync', 'Reports'], color: '#059669', icon: 'bi-cart-check-fill',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    stats: '0.4s Checkout - Multi-Store Sync - Live Reports',
    features: ['0.4s blazing-fast checkout', 'Real-time multi-store inventory', 'Secure payments', 'Sales reports & analytics']
  },
  {
    id: 'exactus', slug: 'exactus', page: 'product-exactus',
    name: 'Exactus', tagline: 'IRS-compliant payroll & accounting',
    desc: 'Automates state and federal tax calculations, manages direct deposits, and tracks overtime flawlessly.',
    longDesc: 'Payday without headache. Exactus auto-calculates federal + state tax, handles direct deposits, tracks overtime, and keeps you IRS-compliant every pay run.',
    tags: ['Payroll', 'Tax', 'Direct Deposit'], color: '#DC2626', icon: 'bi-calculator-fill',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80',
    stats: 'IRS Compliant - Auto Tax - Direct Deposit',
    features: ['Federal + state tax automation', 'Direct deposit management', 'Overtime tracking', 'Compliant filings']
  },
  {
    id: 'inventro', slug: 'inventro', page: 'product-inventro',
    name: 'Inventro', tagline: 'Control your supply chain',
    desc: 'Scan barcodes, set automated low-stock alerts, and predict purchasing needs via machine learning for US distributors and retailers.',
    longDesc: 'For distributors & retailers. Scan barcodes, get low-stock alerts before you run out, and let ML predict what to order next - no more stockouts or overstock.',
    tags: ['Barcode', 'Low-Stock Alerts', 'ML Forecast'], color: '#F97316', icon: 'bi-box-seam-fill',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
    stats: 'Barcode Scan - ML Forecast - Low-Stock Alerts',
    features: ['Barcode scanning', 'Automated low-stock alerts', 'ML purchasing forecast', 'Supplier & warehouse view']
  },
]

const HOW_STEPS_3 = [
  ['bi-search', '1. Explore Template', 'Browse our 5 ready-made product templates with real images and UI.'],
  ['bi-mouse2-fill', '2. Interact with Demo', 'Login with demo@ayinde.tech and navigate the dashboard like a real user.'],
  ['bi-rocket-takeoff-fill', '3. Request Your Build', 'Love it? We wire the backend and customize it for you.'],
]

// ---------- 3 CARDS - HOW IT WORKS PREVIEW (KEPT) ----------
function HowItWorksCards({ go }) {
  return (
    <section id="how" className="how-grid">
      {HOW_STEPS_3.map(([icon, t, d]) => (
        <div key={t} onClick={() => go('how-it-works')} style={{ background: '#f8fafc', padding: 24, borderRadius: 18, border: '1px solid #eef2f7', cursor: 'pointer' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fff', display: 'grid', placeItems: 'center', fontSize: 22, color: '#2F80ED' }}><i className={`bi ${icon}`}></i></div>
          <h3 style={{ margin: '14px 0 8px' }}>{t}</h3>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{d}</p>
          <p style={{ color: '#2F80ED', fontSize: 13, fontWeight: 700, marginTop: 12 }}>See full timeline <i className="bi bi-arrow-right"></i></p>
        </div>
      ))}
    </section>
  )
}

// ---------- REQUEST PRODUCT MODAL - WIRED TO FLASK /api/product-requests ----------
function RequestModal({ product, onClose }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
  const submit = async (e) => {
    e.preventDefault()
    if (!form.fullName.trim() || !form.email.trim()) {
      setError('Please fill Full Name and Email')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(apiUrl('/api/product-requests'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_slug: getProductSlug(product),
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          message: form.message.trim() || null,
          request_type: 'product_request',
          source_page: window.location.hash || window.location.pathname,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to send request. Please try again.')
      setSent(true)
    } catch (err) {
      if (err.message && err.message.includes('Failed to fetch')) {
        setError('Cannot reach backend. Is Flask running? Run: py app.py in backend folder (http://127.0.0.1:5000)')
      } else {
        setError(err.message || 'Failed to send request. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }
  const title = product ? product.name : 'This Solution'
  const color = product?.color || '#2F80ED'
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{ height: 140, position: 'relative', background: color }}>
          {product && <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          {!product && <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 28, fontWeight: 800 }}>Ayinde Technologies</div>}
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#fff' }}><i className="bi bi-x-lg"></i></button>
          <div style={{ position: 'absolute', bottom: 12, left: 16, background: color, color: '#fff', padding: '6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
            <i className="bi bi-send-fill"></i> Request {title}
          </div>
        </div>
        <div style={{ padding: 24 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, color: '#059669' }}><i className="bi bi-check-circle-fill"></i></div>
              <h3 style={{ margin: '12px 0 8px' }}>Request Received!</h3>
              <p style={{ color: '#64748b' }}>Thanks {form.fullName}. Ayinde Technologies will contact you at {form.email} about {title}.</p>
              <button onClick={onClose} style={{ marginTop: 20, padding: '12px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700 }}>Close</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 style={{ marginBottom: 4 }}>Request {title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 18 }}>Fill this form - we will reach out to build yours.</p>
              {error && <p style={{ background: '#FEF2F2', color: '#DC2626', padding: '10px 12px', borderRadius: 8, fontSize: 13, marginBottom: 14 }}>{error}</p>}
              <label className="field-label">Full Name *</label>
              <input className="field" placeholder="e.g. John Doe" value={form.fullName} onChange={e => update('fullName', e.target.value)} required />
              <label className="field-label">Email Address *</label>
              <input className="field" type="email" placeholder="you@company.com" value={form.email} onChange={e => update('email', e.target.value)} required />
              <label className="field-label">Phone Number <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label>
              <input className="field" placeholder="+1 555 000 1234" value={form.phone} onChange={e => update('phone', e.target.value)} />
              <label className="field-label">Specific Message <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label>
              <textarea className="field" rows={4} placeholder="Tell us what you need - e.g. I need Verus POS for 3 stores..." value={form.message} onChange={e => update('message', e.target.value)} />
              <button type="submit" disabled={submitting} style={{ width: '100%', padding: 14, background: color, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>{submitting ? 'Sending...' : 'Submit Request'} <i className="bi bi-arrow-right"></i></button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------- DEMO LOGIN - GENERIC (MECHANIC ONLY NOW) ----------
function DemoLogin({ product, onLogin, onClose }) {
  const [email, setEmail] = useState('demo@ayinde.tech')
  const [password, setPassword] = useState('demo123')
  return (
    <div style={{ maxWidth: 460, width: 'calc(100% - 32px)', margin: '40px auto', background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
      <div style={{ height: 180, position: 'relative' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#fff' }}><i className="bi bi-x-lg"></i></button>
        <div style={{ position: 'absolute', bottom: 12, left: 16, background: product.color, color: '#fff', padding: '6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}><i className={`bi ${product.icon}`}></i> {product.name}</div>
      </div>
      <div style={{ padding: 28 }}>
        <h2 style={{ marginBottom: 6 }}>Login to Demo</h2>
        <p style={{ color: '#64748b', marginBottom: 20, fontSize: 14 }}>Interactive demo - no real backend. Use any password.</p>
        <label className="field-label">Email</label>
        <input className="field" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="field-label">Password</label>
        <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => onLogin(email)} style={{ width: '100%', padding: 14, background: product.color, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700 }}>Login to Dashboard <i className="bi bi-arrow-right"></i></button>
        <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 12 }}>Demo: demo@ayinde.tech / any password</p>
      </div>
    </div>
  )
}

// ---------- DASHBOARD - GENERIC (MECHANIC ONLY NOW) ----------
function Dashboard({ product, user, onLogout }) {
  const [tab, setTab] = useState('Overview')
  const tabs = {
    mechanic: ['Overview', 'Find Mechanics', 'Bookings'],
    hrwise: ['Overview', 'Applicants', 'Onboarding', 'Compliance'],
    verus: ['Overview', 'POS Terminal', 'Inventory', 'Reports'],
    exactus: ['Overview', 'Payroll', 'Tax', 'Employees'],
    inventro: ['Overview', 'Inventory', 'Scan Barcode', 'Forecast'],
  }[product.id] || ['Overview']
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      <div style={{ background: '#fff', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 5, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={product.image} alt={product.name} style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
          <b>{product.name} <span style={{ color: '#94a3b8', fontWeight: 400 }}>- Demo</span></b>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14 }}><i className="bi bi-person-circle"></i> {user}</span>
          <button onClick={onLogout} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}><i className="bi bi-box-arrow-right"></i> Logout</button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, padding: 20, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '10px 18px', borderRadius: 999, border: 'none', background: tab === t ? product.color : '#fff', color: tab === t ? '#fff' : '#334155', fontWeight: 600 }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: '0 20px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, width: '100%' }}>
        <div style={{ background: '#fff', padding: 22, borderRadius: 16, border: '1px solid #eef2f7' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: product.color + '1A', color: product.color, display: 'grid', placeItems: 'center', fontSize: 20 }}><i className={`bi ${product.icon}`}></i></div>
          <h3 style={{ margin: '14px 0 6px' }}>{tab} - {product.name}</h3>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>Dummy mockup for {product.name}. In the real build, this tab connects to your backend.</p>
          <button style={{ marginTop: 16, background: product.color, color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 8, fontWeight: 600 }}>Try Action <i className="bi bi-arrow-right"></i></button>
        </div>
        <div style={{ background: '#fff', padding: 22, borderRadius: 16, border: '1px solid #eef2f7' }}>
          <h4><i className="bi bi-bar-chart-line"></i> Sample Data</h4>
          <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#f8fafc', borderRadius: 10 }}><span>Item 1 - Active</span><b>$1,240</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#f8fafc', borderRadius: 10 }}><span>Item 2 - Pending</span><b>$860</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#f8fafc', borderRadius: 10 }}><span>Item 3 - Completed</span><b>$2,100</b></div>
          </div>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', minHeight: 200 }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.1), rgba(15,23,42,0.9))', color: '#fff', padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h4>Want this for your business?</h4>
            <p style={{ color: '#cbd5e1', fontSize: 14, margin: '6px 0 12px' }}>Request a full build from Ayinde Technologies.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- PRODUCT LANDING PAGE: pages/mechanic-saas etc — MECHANIC ONLY NOW ----------
function ProductLanding({ product, go, onRequest, onEnterDemo }) {
  return (
    <div style={{ width: '100%' }}>
      <section className="hero" style={{ padding: '48px 20px' }}>
        <div className="hero-grid">
          <div>
            <button onClick={() => go('products')} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: 999, fontWeight: 600 }}><i className="bi bi-arrow-left"></i> All Products</button>
            <p style={{ color: product.color, fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 20 }}>pages/{product.slug} - Ayinde Technologies</p>
            <h1 style={{ fontSize: 44 }}>{product.name}</h1>
            <p style={{ fontSize: 18 }}>{product.longDesc}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={onEnterDemo} style={{ background: product.color, color: '#fff', padding: '14px 22px', borderRadius: 999, border: 'none', fontWeight: 700 }}>Enter Demo Dashboard <i className="bi bi-box-arrow-in-right"></i></button>
              <button onClick={onRequest} style={{ background: '#0f172a', color: '#fff', padding: '14px 22px', borderRadius: 999, border: 'none', fontWeight: 700 }}><i className="bi bi-send-fill"></i> Request This Product</button>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 16 }}><i className="bi bi-patch-check-fill" style={{ color: product.color }}></i> {product.stats} - Demo login: demo@ayinde.tech</p>
          </div>
          <div className="hero-image"><img src={product.image} alt={product.name} /></div>
        </div>
      </section>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 60px' }}>
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>What you get</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {product.features.map(f => (
            <div key={f} style={{ background: '#f8fafc', padding: 22, borderRadius: 16, border: '1px solid #eef2f7' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: product.color + '1A', color: product.color, display: 'grid', placeItems: 'center', fontSize: 20 }}><i className={`bi ${product.icon}`}></i></div>
              <h4 style={{ marginTop: 12 }}>{f}</h4>
              <p style={{ color: '#64748b', fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>Included in the {product.name} template. Customizable when you request a build.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// ---------- LANDING PAGE PRODUCTS - HOME ONLY ----------
function LandingProducts({ go, onRequest }) {
  return (
    <section id="products" className="products-wrap">
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <h2 style={{ fontSize: 34 }}>Our Products</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>Explore live templates - click to see the interactive demo.</p>
      </div>
      {PRODUCTS.map((p, idx) => (
        <article key={p.id} className="product-card" style={idx % 2 === 1 ? { direction: 'rtl' } : {}}>
          <div className="product-image">
            <img src={p.image} alt={p.name} />
            <div style={{ position: 'absolute', top: 16, left: 16, background: '#fff', padding: '8px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, direction: 'ltr' }}>
              <i className={`bi ${p.icon}`} style={{ color: p.color }}></i> {p.name}
            </div>
          </div>
          <div className="product-content" style={{ direction: 'ltr' }}>
            <p style={{ color: p.color, fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.tagline}</p>
            <h3 style={{ fontSize: 28, margin: '8px 0' }}>{p.name}</h3>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '16px 0 22px' }}>
              {p.tags.map(t => <span key={t} style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}><i className="bi bi-check-circle-fill" style={{ color: p.color }}></i> {t}</span>)}
            </div>
            <div className="product-btns">
              <button onClick={() => go(p.page)} style={{ padding: '13px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700 }}>View Interactive Demo <i className="bi bi-arrow-right"></i></button>
              <button onClick={() => onRequest(p)} style={{ padding: '13px 20px', background: '#fff', border: `1px solid ${p.color}`, color: p.color, borderRadius: 10, fontWeight: 700 }}><i className="bi bi-send-fill"></i> Request Product</button>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}><i className="bi bi-patch-check-fill" style={{ color: p.color }}></i> {p.stats}</p>
          </div>
        </article>
      ))}
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => go('products')} style={{ padding: '14px 28px', background: '#2F80ED', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 700 }}>View More Products <i className="bi bi-arrow-right"></i></button>
      </div>
    </section>
  )
}

// ---------- MAIN APP ----------
export default function App() {
  const [page, setPage] = useState(getPageFromHash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [requestProduct, setRequestProduct] = useState(undefined)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [hrUser, setHrUser] = useState(null)
  const [verusUser, setVerusUser] = useState(null)
  const [exactusUser, setExactusUser] = useState(null)
  const [inventroUser, setInventroUser] = useState(null)

  // Listen to browser Back / Forward + hash changes
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/home')
      setPage('home')
    }
    const onHash = () => {
      setPage(getPageFromHash())
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (p) => {
    setMenuOpen(false)
    if (getPageFromHash() === p) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // Changing hash creates a real browser history entry -> Back works
    window.location.hash = '/' + p
  }

  const currentProduct = PRODUCTS.find(p => p.page === page)
  const mechanicProduct = PRODUCTS.find(p => p.id === 'mechanic')

  const handleLogin = (email) => {
    setLoggedInUser(email)
    go('demo-dashboard')
  }
  const openRequest = (product) => setRequestProduct(product)

  // ---------- GENERIC DEMO - MECHANIC ONLY - NOW HASH ROUTED ----------
  if (page === 'demo-login') {
    return (
      <div style={{ width: '100%', minHeight: '100vh', background: '#f8fafc', paddingTop: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <button onClick={() => go('product-mechanic')} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}><i className="bi bi-arrow-left"></i> Back to Mechanic SaaS</button>
        </div>
        <DemoLogin product={mechanicProduct} onLogin={handleLogin} onClose={() => go('product-mechanic')} />
      </div>
    )
  }
  if (page === 'demo-dashboard') {
    return (
      <div style={{ width: '100%' }}>
        <Dashboard product={mechanicProduct} user={loggedInUser || 'demo@ayinde.tech'} onLogout={() => { setLoggedInUser(null); go('demo-login') }} />
        <button onClick={() => go('product-mechanic')} style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 50, background: '#0f172a', color: '#fff', border: 'none', padding: '12px 18px', borderRadius: 999, fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-x-lg"></i> Close Demo</button>
      </div>
    )
  }

  // ---------- HR-WISE FULL-SCREEN - LOGIN + DASHBOARD ----------
  if (page === 'hr-wise-login') {
    return (
      <div style={{ width: '100%' }}>
        <HrWiseLogin go={go} onLoginSuccess={(u) => { setHrUser(u); go('hr-wise-dashboard') }} />
      </div>
    )
  }
  if (page === 'hr-wise-dashboard') {
    return (
      <div style={{ width: '100%' }}>
        <HrWiseDashboard go={go} user={hrUser || 'HR Manager'} onLogout={() => { setHrUser(null); go('product-hrwise') }} />
      </div>
    )
  }

  // ---------- VERUS POS FULL-SCREEN - LOGIN + DASHBOARD ----------
  if (page === 'verus-pos-login') {
    return (
      <div style={{ width: '100%' }}>
        <VerusPosLogin go={go} onLoginSuccess={(u) => { setVerusUser(u); go('verus-pos-dashboard') }} />
      </div>
    )
  }
  if (page === 'verus-pos-dashboard') {
    return (
      <div style={{ width: '100%' }}>
        <VerusPosDashboard go={go} user={verusUser || 'Store Manager'} onLogout={() => { setVerusUser(null); go('product-verus') }} />
      </div>
    )
  }

  // ---------- EXACTUS FULL-SCREEN - LOGIN + DASHBOARD ----------
  if (page === 'exactus-login') {
    return (
      <div style={{ width: '100%' }}>
        <ExactusLogin go={go} onLoginSuccess={(u) => { setExactusUser(u); go('exactus-dashboard') }} />
      </div>
    )
  }
  if (page === 'exactus-dashboard') {
    return (
      <div style={{ width: '100%' }}>
        <ExactusDashboard go={go} user={exactusUser || 'Payroll Admin'} onLogout={() => { setExactusUser(null); go('product-exactus') }} />
      </div>
    )
  }

  // ---------- INVENTRO FULL-SCREEN - LOGIN + DASHBOARD ----------
  if (page === 'inventro-login') {
    return (
      <div style={{ width: '100%' }}>
        <InventroLogin go={go} onLoginSuccess={(u) => { setInventroUser(u); go('inventro-dashboard') }} />
      </div>
    )
  }
  if (page === 'inventro-dashboard') {
    return (
      <div style={{ width: '100%' }}>
        <InventroDashboard go={go} user={inventroUser || 'Warehouse Manager'} onLogout={() => { setInventroUser(null); go('product-inventro') }} />
      </div>
    )
  }

  return (
    <div className="page-wrap" style={{ width: '100%', maxWidth: '100%', fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a', background: '#fff' }}>
      <header className="header">
        <button onClick={() => go('home')} className="header-logo" style={{ background: 'none', border: 'none' }}><img src="../img/logo-3.png" alt="Ayinde Technologies Corporation" /></button>
        <nav className="header-nav">
          <button onClick={() => go('home')}><i className="bi bi-house-door-fill"></i> Home</button>
          <button onClick={() => go('products')}><i className="bi bi-grid-3x3-gap-fill"></i> Products</button>
          <button onClick={() => go('how-it-works')}><i className="bi bi-gear-fill"></i> How it Works</button>
          <button onClick={() => go('contact')}><i className="bi bi-envelope-fill"></i> Contact</button>
        </nav>
        <button onClick={() => go('products')} className="header-cta"><i className="bi bi-play-circle-fill"></i> Explore Demos</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><i className={menuOpen ? 'bi bi-x-lg' : 'bi bi-list'}></i></button>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => go('home')}><i className="bi bi-house-door-fill"></i> Home</button>
          <button onClick={() => go('products')}><i className="bi bi-grid-3x3-gap-fill"></i> Products</button>
          <button onClick={() => go('how-it-works')}><i className="bi bi-gear-fill"></i> How it Works</button>
          <button onClick={() => go('contact')}><i className="bi bi-envelope-fill"></i> Contact</button>
          <button onClick={() => go('products')} style={{ background: '#2F80ED', color: '#fff', padding: '12px', borderRadius: 999, justifyContent: 'center' }}><i className="bi bi-play-circle-fill"></i> Explore Demos</button>
        </div>
      )}

      {/* GENERIC LANDING - MECHANIC ONLY. HR-Wise / Verus / Exactus / Inventro have their own pages below */}
      {currentProduct && page !== 'product-hrwise' && page !== 'product-verus' && page !== 'product-exactus' && page !== 'product-inventro' && (
        <ProductLanding
          product={currentProduct}
          go={go}
          onRequest={() => openRequest(currentProduct)}
          onEnterDemo={() => go('demo-login')}
        />
      )}

      {page === 'product-hrwise' && (
        <HrWise go={go} onRequest={() => openRequest(PRODUCTS.find(p => p.id === 'hrwise'))} />
      )}

      {page === 'product-verus' && (
        <VerusPos go={go} onRequest={() => openRequest(PRODUCTS.find(p => p.id === 'verus'))} />
      )}

      {page === 'product-exactus' && (
        <Exactus go={go} onRequest={() => openRequest(PRODUCTS.find(p => p.id === 'exactus'))} />
      )}

      {page === 'product-inventro' && (
        <Inventro go={go} onRequest={() => openRequest(PRODUCTS.find(p => p.id === 'inventro'))} />
      )}

      {page === 'home' && (
        <>
          <section className="hero">
            <div className="hero-grid">
              <div>
                <span style={{ background: '#fff', padding: '7px 14px', borderRadius: 999, border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 600 }}><i className="bi bi-stars"></i> Interactive Product Showcase - No Backend Needed</span>
                <h1>We Build Software That Runs Your Business.</h1>
                <p>Explore live templates of our work. Click any product, login to its demo dashboard, navigate the UI - then request your own build.</p>
                <div className="hero-btns">
                  <button onClick={() => go('products')} style={{ background: '#0f172a', color: '#fff', padding: '14px 24px', borderRadius: 999, fontWeight: 700, border: 'none' }}>Explore Demos <i className="bi bi-arrow-down"></i></button>
                  <button onClick={() => go('contact')} style={{ background: '#fff', padding: '14px 24px', borderRadius: 999, border: '1px solid #e2e8f0', fontWeight: 700 }}>Request a Build</button>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 32, fontSize: 14, color: '#475569', flexWrap: 'wrap' }}>
                  <span><b>5</b> Products</span><span><b>100%</b> Interactive</span><span><b>0</b> Backend Needed</span>
                </div>
              </div>
              <div className="hero-image"><img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&q=80" alt="Ayinde Technologies team" /></div>
            </div>
          </section>

          {/* 3 CARDS - KEPT ON HOME */}
          <HowItWorksCards go={go} />

          <LandingProducts go={go} onRequest={openRequest} />
        </>
      )}

      {page === 'products' && <Products go={go} onRequest={openRequest} />}

      {/* HOW IT WORKS PAGE - FULL TIMELINE FILE, NOT DUPLICATED CARDS */}
      {page === 'how-it-works' && <HowItWorks go={go} onRequest={openRequest} />}

      {page === 'contact' && <Contact go={go} onRequest={openRequest} />}

      {requestProduct !== undefined && <RequestModal product={requestProduct} onClose={() => setRequestProduct(undefined)} />}

      {/* FOOTER - NO CONTACT FORM - CONTACT INFO ONLY */}
      <footer id="contact" className="footer" style={{ background: '#0f172a', color: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '52px 32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 36 }}>

            {/* 1 - BRAND */}
            <div>
              <img src="../img/logo-3.png" alt="Ayinde Technologies" style={{ height: 56, background: '#fff', padding: '8px 14px', borderRadius: 12, marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, lineHeight: 1.4 }}>Ayinde Technologies Corporation</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>Guide, Build &amp; Implement AI Technologies</p>
              <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, marginTop: 12 }}>We build, you grow. Explore live templates, try the demo dashboards, then request your own build.</p>
              <button onClick={() => openRequest({ slug: 'general', name: 'General Build', color: '#F97316', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80' })} style={{ marginTop: 20, background: '#F97316', color: '#fff', padding: '12px 22px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request a Build</button>
              <button onClick={() => go('contact')} style={{ marginTop: 10, marginLeft: 8, background: '#fff', color: '#0f172a', padding: '12px 22px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-envelope-fill"></i> Contact Page</button>
            </div>

            {/* 2 - OFFICES */}
            <div>
              <h4 style={{ fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 16 }}><i className="bi bi-geo-alt-fill"></i> Our Offices</h4>
              <div style={{ display: 'grid', gap: 20 }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 14 }}><span style={{ background: '#2F80ED', padding: '3px 8px', borderRadius: 999, fontSize: 11, marginRight: 6 }}>EAST COAST HQ</span> Newark, DE</p>
                  <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>254 Chapman Rd, Ste. 208,<br />Newark, DE 19702</p>
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 14 }}><span style={{ background: '#F97316', padding: '3px 8px', borderRadius: 999, fontSize: 11, marginRight: 6 }}>WEST COAST</span> Inglewood, CA</p>
                  <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>112 S Market St, Ste. 1008,<br />Inglewood, CA 90301</p>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 13 }}><i className="bi bi-clock-fill"></i> Mon - Fri, 9am - 6pm</p>
              </div>
            </div>

            {/* 3 - TALK TO US */}
            <div>
              <h4 style={{ fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 16 }}><i className="bi bi-telephone-fill"></i> Talk to us</h4>
              <div style={{ display: 'grid', gap: 18 }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 14 }}>Sales - Sophia</p>
                  <a href="tel:+13025150227" style={{ display: 'block', color: '#fff', fontWeight: 700, fontSize: 14, marginTop: 4 }}>+1-302-515-0227</a>
                  <a href="mailto:sales@ayindetechnologies.com" style={{ display: 'block', color: '#cbd5e1', fontSize: 13, marginTop: 2, wordBreak: 'break-all' }}>sales@ayindetechnologies.com</a>
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 14 }}>Support - Peter</p>
                  <a href="tel:+12015342657" style={{ display: 'block', color: '#fff', fontWeight: 700, fontSize: 14, marginTop: 4 }}>+1-201-534-2657</a>
                  <a href="mailto:support@ayindetechnologies.com" style={{ display: 'block', color: '#cbd5e1', fontSize: 13, marginTop: 2, wordBreak: 'break-all' }}>support@ayindetechnologies.com</a>
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 14 }}>General enquiries</p>
                  <a href="mailto:info@ayindetechnologies.com" style={{ display: 'block', color: '#cbd5e1', fontSize: 13, marginTop: 4, wordBreak: 'break-all' }}>info@ayindetechnologies.com</a>
                  <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>We reply within 24 hours.</p>
                </div>
              </div>
            </div>

            {/* 4 - EXPLORE */}
            <div>
              <h4 style={{ fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 16 }}><i className="bi bi-grid-3x3-gap-fill"></i> Explore</h4>
              <div style={{ display: 'grid', gap: 10, fontSize: 14 }}>
                <button onClick={() => go('home')} style={{ background: 'none', border: 'none', color: '#cbd5e1', textAlign: 'left', cursor: 'pointer', padding: 0 }}><i className="bi bi-house-door-fill"></i> Home</button>
                <button onClick={() => go('products')} style={{ background: 'none', border: 'none', color: '#cbd5e1', textAlign: 'left', cursor: 'pointer', padding: 0 }}><i className="bi bi-grid-3x3-gap-fill"></i> All Products</button>
                <button onClick={() => go('how-it-works')} style={{ background: 'none', border: 'none', color: '#cbd5e1', textAlign: 'left', cursor: 'pointer', padding: 0 }}><i className="bi bi-gear-fill"></i> How It Works</button>
                <button onClick={() => go('contact')} style={{ background: 'none', border: 'none', color: '#cbd5e1', textAlign: 'left', cursor: 'pointer', padding: 0 }}><i className="bi bi-envelope-fill"></i> Contact Us</button>
              </div>
              <div style={{ borderTop: '1px solid #1e293b', marginTop: 18, paddingTop: 16 }}>
                <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>Products</p>
                <div style={{ display: 'grid', gap: 8, fontSize: 13 }}>
                  {PRODUCTS.map(p => (
                    <button key={p.id} onClick={() => go(p.page)} style={{ background: 'none', border: 'none', color: '#cbd5e1', textAlign: 'left', cursor: 'pointer', padding: 0 }}><i className={`bi ${p.icon}`} style={{ color: p.color }}></i> {p.name}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', marginTop: 36, paddingTop: 20, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', color: '#64748b', fontSize: 13 }}>
            <span>© 2026 Ayinde Technologies Corporation. Demo templates - no backend wiring until requested.</span>
            <span>Guide, Build &amp; Implement AI Technologies</span>
          </div>
        </div>
      </footer>
    </div>
  )
}