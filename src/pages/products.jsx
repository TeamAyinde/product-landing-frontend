import React, { useState, useMemo } from 'react'

// src/pages/products.jsx
// Page: pages/products — All Products + Live Search (NO hero section) - MOBILE RESPONSIVE

const ALL_PRODUCTS = [
  {
    id: 'mechanic', slug: 'mechanic-saas', page: 'product-mechanic',
    name: 'Mechanic SaaS', tagline: 'Find trusted mechanics near you',
    desc: 'Application developed to help vehicle owners easily locate trusted mechanics within their locations.',
    longDesc: 'Vehicle owners search by location, compare verified mechanics, see real ratings, book instantly and track repair status.',
    tags: ['Map Search', 'Booking', 'Ratings'],
    keywords: 'mechanic car repair auto garage vehicle owner find mechanic near me booking tow roadside maintenance oil change brake engine',
    category: 'Marketplace',
    color: '#2F80ED', icon: 'bi-wrench-adjustable-circle',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=900&q=80',
    stats: '4.9 ★ • 2,400+ Mechanics • 12 Cities',
    price: 'From $2,500 build'
  },
  {
    id: 'hrwise', slug: 'hr-wise', page: 'product-hrwise',
    name: 'HR-Wise', tagline: 'HR for modern US businesses',
    desc: 'Manage applicant tracking, automated onboarding, compliance documentation, and employee performance seamlessly in one secure portal.',
    longDesc: 'Built for US businesses — ATS, onboarding, I-9 & compliance docs, and performance reviews in one secure portal.',
    tags: ['ATS', 'Onboarding', 'Compliance'],
    keywords: 'hr human resources hiring recruitment applicant tracking ats onboarding employee compliance i-9 performance payroll staff team management hire staff',
    category: 'HR & Business',
    color: '#7C3AED', icon: 'bi-people-fill',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80',
    stats: '500+ Companies • SOC 2 Secure • US Compliant',
    price: 'From $3,000 build'
  },
  {
    id: 'verus', slug: 'verus-pos', page: 'product-verus',
    name: 'Verus POS', tagline: 'Blazing-fast POS for retail & hospitality',
    desc: 'Sync inventory across multiple store locations in real-time, process payments securely, and generate actionable sales reports.',
    longDesc: 'Checkout in 0.4s, sync inventory across all stores, accept cards & tap-to-pay, and see live sales reports.',
    tags: ['POS', 'Inventory Sync', 'Reports'],
    keywords: 'pos point of sale checkout retail shop store restaurant cafe hospitality cashier payment card inventory sales report barcode scanner',
    category: 'Retail & Sales',
    color: '#059669', icon: 'bi-cart-check-fill',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    stats: '0.4s Checkout • Multi-Store Sync • Live Reports',
    price: 'From $2,800 build'
  },
  {
    id: 'exactus', slug: 'exactus', page: 'product-exactus',
    name: 'Exactus', tagline: '【entity-IRS¦canonical_name=IRS】-compliant payroll & accounting',
    desc: 'Automates state and federal tax calculations, manages direct deposits, and tracks overtime flawlessly.',
    longDesc: 'Payday without headache. Auto-calculates federal + state tax, handles direct deposits, tracks overtime, keeps you 【entity-IRS¦canonical_name=IRS】-compliant.',
    tags: ['Payroll', 'Tax', 'Direct Deposit'],
    keywords: 'payroll accounting tax 【entity-irs¦canonical_name=IRS】 salary wages overtime direct deposit payslip federal state tax calculation finance bookkeeping employee pay',
    category: 'Finance',
    color: '#DC2626', icon: 'bi-calculator-fill',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80',
    stats: '【entity-IRS¦canonical_name=IRS】 Compliant • Auto Tax • Direct Deposit',
    price: 'From $3,200 build'
  },
  {
    id: 'inventro', slug: 'inventro', page: 'product-inventro',
    name: 'Inventro', tagline: 'Control your supply chain',
    desc: 'Scan barcodes, set automated low-stock alerts, and predict purchasing needs via machine learning for US distributors and retailers.',
    longDesc: 'For distributors & retailers. Scan barcodes, get low-stock alerts, let ML predict what to order next.',
    tags: ['Barcode', 'Low-Stock Alerts', 'ML Forecast'],
    keywords: 'inventory stock warehouse supply chain barcode scanner low stock distributor retailer ordering purchasing forecast machine learning store stock management',
    category: 'Inventory & Supply',
    color: '#F97316', icon: 'bi-box-seam-fill',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
    stats: 'Barcode Scan • ML Forecast • Low-Stock Alerts',
    price: 'From $3,000 build'
  },
]

const CATEGORIES = ['All', 'Marketplace', 'HR & Business', 'Retail & Sales', 'Finance', 'Inventory & Supply']
const SUGGESTIONS = ['payroll', 'mechanic', 'pos', 'hiring', 'inventory', 'tax', 'booking', 'barcode']

export default function Products({ go, onRequest }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = ALL_PRODUCTS.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category
      if (!matchesCategory) return false
      if (!q) return true
      const haystack = `${p.name} ${p.tagline} ${p.desc} ${p.longDesc} ${p.tags.join(' ')} ${p.keywords} ${p.category}`.toLowerCase()
      return q.split(' ').every((word) => haystack.includes(word))
    })
    if (sortBy === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'za') list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [query, category, sortBy])

  const clearAll = () => { setQuery(''); setCategory('All'); setSortBy('featured') }

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        * { box-sizing: border-box; }
        .products-wrap { max-width: 1280px; margin: 0 auto; padding-left: 32px; padding-right: 32px; }
        .products-title-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-top: 16px; }
        .products-search-bar { position: sticky; top: 72px; z-index: 50; background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 32px; }
        .products-search-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .products-search-input-wrap { flex: 1; min-width: 260px; position: relative; }
        .products-search-row select { padding: 14px 12px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; }
        .products-card { display: grid; grid-template-columns: 1fr 1.2fr; border: 1px solid #e2e8f0; border-radius: 24px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
        .products-card-media { position: relative; min-height: 280px; overflow: hidden; }
        .products-card-body { padding: 32px; display: flex; flex-direction: column; justify-content: center; min-width: 0; }
        .products-card-title { font-size: clamp(22px, 5vw, 28px); margin: 8px 0; }
        .products-card-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .products-suggest-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; align-items: center; }

        @media (max-width: 900px) {
          .products-wrap { padding-left: 16px; padding-right: 16px; }
          .products-search-bar { padding: 14px 16px; top: 64px; }
          .products-card { grid-template-columns: 1fr; }
          .products-card-media { min-height: 220px; height: 220px; }
          .products-card-body { padding: 22px 20px; }
        }
        @media (max-width: 600px) {
          .products-title-row { flex-direction: column; align-items: flex-start; }
          .products-search-row { flex-direction: column; }
          .products-search-input-wrap { min-width: 0; width: 100%; }
          .products-search-row select { width: 100%; }
          .products-card-media { min-height: 200px; height: 200px; }
          .products-card-actions { flex-direction: column; }
          .products-card-actions button { width: 100%; text-align: center; }
          .products-suggest-row { gap: 6px; }
        }
      `}</style>

      {/* SMALL TITLE - NOT A HERO */}
      <div className="products-wrap" style={{ paddingTop: 28, paddingBottom: 8 }}>
        <button onClick={() => go('home')} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}><i className="bi bi-arrow-left"></i> Back Home</button>
        <div className="products-title-row">
          <div>
            <h1 style={{ fontSize: 'clamp(26px, 6vw, 32px)', margin: 0 }}>All Products</h1>
            <p style={{ color: '#64748b', fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>Search by name, function, or need — results update as you type.</p>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, background: '#f1f5f9', padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>
            {filtered.length} of {ALL_PRODUCTS.length} products {query && <>for “{query}”</>}
          </span>
        </div>
      </div>

      {/* SEARCH BAR - STICKY UNDER HEADER */}
      <div className="products-search-bar">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="products-search-row">
            <div className="products-search-input-wrap">
              <i className="bi bi-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Live search — try: payroll, mechanic, pos, hiring, inventory, tax..."
                style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 15, outline: 'none' }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', border: 'none', background: '#f1f5f9', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer' }}><i className="bi bi-x-lg"></i></button>
              )}
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Sort: Featured</option>
              <option value="az">Sort: A - Z</option>
              <option value="za">Sort: Z - A</option>
            </select>
          </div>

          <div className="products-suggest-row">
            <span style={{ fontSize: 13, color: '#64748b' }}>Try:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => setQuery(s)} style={{ padding: '6px 12px', borderRadius: 999, border: query === s ? '1px solid #2F80ED' : '1px solid #e2e8f0', background: query === s ? '#eff6ff' : '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{s}</button>
            ))}
            {(query || category !== 'All') && (
              <button onClick={clearAll} style={{ padding: '6px 12px', borderRadius: 999, border: 'none', background: '#fee2e2', color: '#dc2626', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginLeft: 'auto' }}><i className="bi bi-x-circle"></i> Clear</button>
            )}
          </div>
        </div>
      </div>

      {/* RESULTS - ALL PRODUCTS */}
      <section className="products-wrap" style={{ paddingTop: 28, paddingBottom: 60, display: 'grid', gap: 24 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: 20, border: '1px solid #eef2f7' }}>
            <div style={{ fontSize: 48, color: '#cbd5e1' }}><i className="bi bi-search"></i></div>
            <h3 style={{ margin: '16px 0 8px' }}>No products found for “{query}”</h3>
            <p style={{ color: '#64748b' }}>Try “payroll”, “mechanic”, “pos”, “inventory”, or “hiring”.</p>
            <button onClick={clearAll} style={{ marginTop: 20, padding: '12px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Show All Products</button>
          </div>
        ) : (
          filtered.map((p) => (
            <article key={p.id} className="products-card">
              <div className="products-card-media">
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                <div style={{ position: 'absolute', top: 16, left: 16, background: '#fff', padding: '8px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className={`bi ${p.icon}`} style={{ color: p.color }}></i> {p.name}
                </div>
                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, background: 'rgba(255,255,255,0.95)', padding: '10px 14px', borderRadius: 12, fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
                  <i className="bi bi-patch-check-fill" style={{ color: p.color }}></i> {p.stats}
                </div>
              </div>
              <div className="products-card-body">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ background: p.color + '1A', color: p.color, padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{p.category}</span>
                  <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{p.price}</span>
                </div>
                <p style={{ color: p.color, fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 12 }}>{p.tagline}</p>
                <h3 className="products-card-title">{p.name}</h3>
                <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>{p.desc}</p>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{p.longDesc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '16px 0 22px' }}>
                  {p.tags.map((t) => <span key={t} style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}><i className="bi bi-check-circle-fill" style={{ color: p.color }}></i> {t}</span>)}
                </div>
                <div className="products-card-actions">
                  <button onClick={() => go(p.page)} style={{ padding: '13px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>View Interactive Demo <i className="bi bi-arrow-right"></i></button>
                  <button onClick={() => onRequest(p)} style={{ padding: '13px 20px', background: '#fff', border: `1px solid ${p.color}`, color: p.color, borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-send-fill"></i> Request Product</button>
                </div>
                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>Goes to: pages/{p.slug}</p>
              </div>
            </article>
          ))
        )}
      </section>

      {/* BOTTOM CTA - NOT A HERO */}
      <section className="products-wrap" style={{ paddingBottom: 60, textAlign: 'center' }}>
        <div style={{ background: '#0f172a', color: '#fff', padding: '28px 20px', borderRadius: 20 }}>
          <h3 style={{ fontSize: 'clamp(18px, 4vw, 22px)' }}>Can't find what you need?</h3>
          <p style={{ color: '#cbd5e1', margin: '10px 0 20px', lineHeight: 1.6 }}>Tell us your need — we build custom software too.</p>
          <button onClick={() => go('contact')} style={{ background: '#F97316', color: '#fff', padding: '13px 22px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer', width: 'auto' }}>Contact Us <i className="bi bi-arrow-right"></i></button>
        </div>
      </section>
    </div>
  )
}