import React, { useState } from 'react'

// src/pages/contact.jsx
// Page: pages/contact — Real Contact Info
// Ayinde Technologies Corporation — Guide, Build & Implement AI Technologies

// ---------- FRONTEND -> BACKEND WIRING ----------
// Dev: leave VITE_API_URL empty, Vite proxy forwards /api -> Flask on 127.0.0.1:5000
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const apiUrl = (path) => `${API_BASE}${path}`

export default function Contact({ go, onRequest }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', subject: 'I want to request a product', department: 'Sales - Sophia', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill Full Name, Email and Message')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          subject: form.subject,
          message: form.message.trim(),
          department: form.department,
          source_page: window.location.hash || window.location.pathname,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to send message. Please try again.')
      setSent(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      if (err.message && err.message.includes('Failed to fetch')) {
        setError('Cannot reach backend. Is Flask running? Run: py app.py in backend folder (http://127.0.0.1:5000)')
      } else {
        setError(err.message || 'Failed to send message. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const copyText = (text, label) => {
    navigator.clipboard?.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const getDepartmentEmail = () => {
    if (form.department.includes('Sales')) return 'sales@ayindetechnologies.com'
    if (form.department.includes('Support')) return 'support@ayindetechnologies.com'
    return 'info@ayindetechnologies.com'
  }

  return (
    <div style={{ width: '100%', background: '#fff' }}>
      {/* SMALL TITLE - NOT A HERO */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 32px 8px' }}>
        <button onClick={() => go('home')} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}><i className="bi bi-arrow-left"></i> Back Home</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
          <div>
            <p style={{ color: '#2F80ED', fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Contact - pages/contact</p>
            <h1 style={{ fontSize: 36, margin: '8px 0 0', lineHeight: 1.15 }}>Talk to a Real Person.<br />We Reply in 24 Hours.</h1>
            <p style={{ color: '#64748b', fontSize: 15, marginTop: 10, maxWidth: 640, lineHeight: 1.6 }}>Ayinde Technologies Corporation — Guide, Build & Implement AI Technologies. Choose Sales, Support, or General — your message goes to the right person.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => go('products')} style={{ background: '#0f172a', color: '#fff', padding: '13px 22px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Explore Demos <i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </div>

      {/* TALK TO US - 3 PEOPLE / DEPARTMENTS */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 8px' }}>
        <h2 style={{ fontSize: 22, marginBottom: 14 }}><i className="bi bi-telephone-fill" style={{ color: '#2F80ED' }}></i> Talk to us</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {/* SALES - SOPHIA */}
          <div style={{ background: '#eff6ff', border: '2px solid #2F80ED', borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 16, right: 16, background: '#2F80ED', color: '#fff', padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>SALES</span>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#2F80ED', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 800 }}>S</div>
            <h3 style={{ margin: '14px 0 2px', fontSize: 20 }}>Sales - Sophia</h3>
            <p style={{ color: '#475569', fontSize: 13 }}>New projects, pricing, demos</p>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              <a href="tel:+13025150227" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: '11px 14px', borderRadius: 12, fontWeight: 700, fontSize: 14 }}><i className="bi bi-telephone-fill" style={{ color: '#2F80ED' }}></i> +1-302-515-0227</a>
              <button onClick={() => copyText('sales@ayindetechnologies.com', 'sales')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: 'none', padding: '11px 14px', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer', textAlign: 'left', width: '100%' }}><i className="bi bi-envelope-fill" style={{ color: '#2F80ED' }}></i> sales@ayindetechnologies.com <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: 11 }}>{copied === 'sales' ? 'Copied!' : 'Copy'}</span></button>
            </div>
            <button onClick={() => { setForm(prev => ({ ...prev, department: 'Sales - Sophia' })); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ width: '100%', marginTop: 14, padding: '12px', background: '#2F80ED', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Message Sophia <i className="bi bi-arrow-right"></i></button>
          </div>

          {/* SUPPORT - PETER */}
          <div style={{ background: '#f0fdf4', border: '2px solid #059669', borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 16, right: 16, background: '#059669', color: '#fff', padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>SUPPORT</span>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#059669', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 800 }}>P</div>
            <h3 style={{ margin: '14px 0 2px', fontSize: 20 }}>Support - Peter</h3>
            <p style={{ color: '#475569', fontSize: 13 }}>Help, bugs, existing projects</p>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              <a href="tel:+12015342657" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: '11px 14px', borderRadius: 12, fontWeight: 700, fontSize: 14 }}><i className="bi bi-telephone-fill" style={{ color: '#059669' }}></i> +1-201-534-2657</a>
              <button onClick={() => copyText('support@ayindetechnologies.com', 'support')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: 'none', padding: '11px 14px', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer', textAlign: 'left', width: '100%' }}><i className="bi bi-envelope-fill" style={{ color: '#059669' }}></i> support@ayindetechnologies.com <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: 11 }}>{copied === 'support' ? 'Copied!' : 'Copy'}</span></button>
            </div>
            <button onClick={() => { setForm(prev => ({ ...prev, department: 'Support - Peter' })); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ width: '100%', marginTop: 14, padding: '12px', background: '#059669', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Message Peter <i className="bi bi-arrow-right"></i></button>
          </div>

          {/* GENERAL */}
          <div style={{ background: '#fff7ed', border: '2px solid #F97316', borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 16, right: 16, background: '#F97316', color: '#fff', padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>GENERAL</span>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F97316', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 800 }}><i className="bi bi-info-circle-fill"></i></div>
            <h3 style={{ margin: '14px 0 2px', fontSize: 20 }}>General Enquiries</h3>
            <p style={{ color: '#475569', fontSize: 13 }}>Partnerships, press, anything else</p>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: '11px 14px', borderRadius: 12, fontWeight: 700, fontSize: 14 }}><i className="bi bi-clock-fill" style={{ color: '#F97316' }}></i> Mon - Fri, 9am - 6pm</div>
              <button onClick={() => copyText('info@ayindetechnologies.com', 'info')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: 'none', padding: '11px 14px', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer', textAlign: 'left', width: '100%' }}><i className="bi bi-envelope-fill" style={{ color: '#F97316' }}></i> info@ayindetechnologies.com <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: 11 }}>{copied === 'info' ? 'Copied!' : 'Copy'}</span></button>
            </div>
            <button onClick={() => { setForm(prev => ({ ...prev, department: 'General Enquiries' })); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ width: '100%', marginTop: 14, padding: '12px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Send General Message <i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </div>

      {/* OFFICES */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 8px' }}>
        <h2 style={{ fontSize: 22, marginBottom: 14 }}><i className="bi bi-geo-alt-fill" style={{ color: '#DC2626' }}></i> Our Offices</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-2col">
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', display: 'flex', gap: 0 }}>
            <div style={{ background: '#0f172a', color: '#fff', padding: 22, minWidth: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ background: '#2F80ED', padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, width: 'fit-content' }}>EAST COAST HQ</span>
              <h3 style={{ marginTop: 12, fontSize: 20, lineHeight: 1.2 }}>Newark, DE</h3>
              <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>Headquarters</p>
            </div>
            <div style={{ padding: 22 }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, fontWeight: 600 }}>254 Chapman Rd, Ste. 208,<br />Newark, DE 19702</p>
              <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Sales: +1-302-515-0227 (Sophia)</p>
              <button onClick={() => copyText('254 Chapman Rd, Ste. 208, Newark, DE 19702', 'east')} style={{ marginTop: 10, background: '#f1f5f9', border: 'none', padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-clipboard"></i> {copied === 'east' ? 'Copied Address!' : 'Copy Address'}</button>
            </div>
          </div>

          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', display: 'flex', gap: 0 }}>
            <div style={{ background: '#F97316', color: '#fff', padding: 22, minWidth: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ background: '#fff', color: '#F97316', padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, width: 'fit-content' }}>WEST COAST</span>
              <h3 style={{ marginTop: 12, fontSize: 20, lineHeight: 1.2 }}>Inglewood, CA</h3>
              <p style={{ color: '#ffedd5', fontSize: 12, marginTop: 6 }}>West Coast Office</p>
            </div>
            <div style={{ padding: 22 }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, fontWeight: 600 }}>112 S Market St, Ste. 1008,<br />Inglewood, CA 90301</p>
              <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Support: +1-201-534-2657 (Peter)</p>
              <button onClick={() => copyText('112 S Market St, Ste. 1008, Inglewood, CA 90301', 'west')} style={{ marginTop: 10, background: '#f1f5f9', border: 'none', padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><i className="bi bi-clipboard"></i> {copied === 'west' ? 'Copied Address!' : 'Copy Address'}</button>
            </div>
          </div>
        </div>
      </div>

      {/* FORM + SIDE PANEL */}
      <div id="contact-form" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 40px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24, alignItems: 'start' }} className="contact-grid">
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, padding: 28, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', color: '#059669', display: 'grid', placeItems: 'center', fontSize: 36, margin: '0 auto' }}><i className="bi bi-check-lg"></i></div>
              <h2 style={{ margin: '18px 0 8px' }}>Message Sent to {form.department}!</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7, maxWidth: 460, margin: '0 auto' }}>Thanks {form.fullName}, we will contact you at <b>{form.email}</b> about <b>{form.subject}</b>. Your message is routed to <b>{getDepartmentEmail()}</b>.</p>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, margin: '20px auto 0', maxWidth: 460, textAlign: 'left', fontSize: 13, lineHeight: 1.6 }}>
                <b>Need it faster?</b><br />
                Sales - Sophia: <a href="tel:+13025150227" style={{ color: '#2F80ED', fontWeight: 700 }}>+1-302-515-0227</a><br />
                Support - Peter: <a href="tel:+12015342657" style={{ color: '#059669', fontWeight: 700 }}>+1-201-534-2657</a>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
                <button onClick={() => { setSent(false); setForm({ fullName: '', email: '', phone: '', subject: 'I want to request a product', department: 'Sales - Sophia', message: '' }) }} style={{ padding: '12px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Send Another Message</button>
                <button onClick={() => go('products')} style={{ padding: '12px 20px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Explore Demos <i className="bi bi-arrow-right"></i></button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2 style={{ fontSize: 24, marginBottom: 4 }}><i className="bi bi-chat-dots-fill" style={{ color: '#2F80ED' }}></i> Send Us a Message</h2>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 6 }}>Choose who should receive it — Sales, Support, or General.</p>
              <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#1e40af', marginBottom: 20 }}>
                Sending to: <b>{form.department}</b> - <b>{getDepartmentEmail()}</b>
              </div>
              {error && <p style={{ background: '#FEF2F2', color: '#DC2626', padding: '10px 12px', borderRadius: 8, fontSize: 13, marginBottom: 14 }}>{error}</p>}

              <label className="field-label">Who should receive this? *</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0 16px' }}>
                {['Sales - Sophia', 'Support - Peter', 'General Enquiries'].map((d) => (
                  <button key={d} type="button" onClick={() => update('department', d)} style={{ padding: '10px 16px', borderRadius: 999, border: form.department === d ? '2px solid #2F80ED' : '1px solid #e2e8f0', background: form.department === d ? '#eff6ff' : '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{d}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-2col">
                <div>
                  <label className="field-label">Full Name *</label>
                  <input className="field" placeholder="Your full name" value={form.fullName} onChange={e => update('fullName', e.target.value)} required />
                </div>
                <div>
                  <label className="field-label">Email *</label>
                  <input className="field" type="email" placeholder="you@company.com" value={form.email} onChange={e => update('email', e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-2col">
                <div>
                  <label className="field-label">Phone <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label>
                  <input className="field" placeholder="+1 555 000 1234" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Subject *</label>
                  <select className="field" value={form.subject} onChange={e => update('subject', e.target.value)}>
                    <option>I want to request a product</option>
                    <option>I want a custom build</option>
                    <option>I want to try a demo</option>
                    <option>Pricing question</option>
                    <option>Support / Bug</option>
                    <option>Partnership</option>
                    <option>Something else</option>
                  </select>
                </div>
              </div>

              <label className="field-label">Brief Description *</label>
              <textarea className="field" rows={5} placeholder="Describe what you need... e.g. I need Verus POS for 3 stores, with inventory sync..." value={form.message} onChange={e => update('message', e.target.value)} required />

              <button type="submit" disabled={submitting} style={{ width: '100%', padding: 15, background: '#0f172a', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>{submitting ? 'Sending...' : `Send to ${form.department}`} <i className="bi bi-send-fill"></i></button>
              <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 10 }}>By sending, you agree to be contacted about your request.</p>
            </form>
          )}
        </div>

        {/* SIDE PANEL */}
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', height: 240 }}>
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80" alt="Contact Ayinde Technologies" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.1), rgba(15,23,42,0.9))', color: '#fff', padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <h3 style={{ fontSize: 22 }}>Ayinde Technologies Corporation</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>Guide, Build & Implement AI Technologies.</p>
            </div>
          </div>

          <div style={{ background: '#0f172a', color: '#fff', borderRadius: 24, padding: 24 }}>
            <h3 style={{ fontSize: 18 }}>What happens next?</h3>
            <div style={{ display: 'grid', gap: 14, marginTop: 16 }}>
              {[
                ['1', 'You send the form', 'Routed to Sales, Support, or General.'],
                ['2', 'We reply in 24h', 'With next steps + clear quote.'],
                ['3', 'We build yours', 'Backend wired + customized for you.'],
                ['4', 'You launch', 'We deploy, train, and support you.'],
              ].map(([n, t, d]) => (
                <div key={t} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#2F80ED', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{n}</span>
                  <div><b style={{ fontSize: 14 }}>{t}</b><p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2, lineHeight: 1.5 }}>{d}</p></div>
                </div>
              ))}
            </div>
            <button onClick={() => go('how-it-works')} style={{ width: '100%', marginTop: 20, padding: '12px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>See How It Works <i className="bi bi-arrow-right"></i></button>
          </div>

          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 20, padding: 20 }}>
            <h4><i className="bi bi-lightning-charge-fill" style={{ color: '#F97316' }}></i> Need it fast?</h4>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, marginTop: 6 }}>Call Sophia directly on <a href="tel:+13025150227" style={{ color: '#2F80ED', fontWeight: 700 }}>+1-302-515-0227</a> for sales, or Peter on <a href="tel:+12015342657" style={{ color: '#059669', fontWeight: 700 }}>+1-201-534-2657</a> for support.</p>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 60px', textAlign: 'center' }}>
        <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 20, padding: 28 }}>
          <h3>Not ready to message yet?</h3>
          <p style={{ color: '#475569', margin: '8px 0 18px' }}>Explore the demos first — then come back when you are ready.</p>
          <button onClick={() => go('products')} style={{ background: '#2F80ED', color: '#fff', padding: '13px 24px', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Explore Demos <i className="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </div>
  )
}