import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiCreditCard, FiSmartphone, FiGlobe } from 'react-icons/fi'
import { FaShieldAlt } from 'react-icons/fa'
import { useStore } from '../../../context/StoreContext'
import { useStudent } from '../../../context/StudentContext'

const PAYMENT_METHODS = [
  { id: 'upi',     icon: <FiSmartphone />, label: 'UPI',              sub: 'Google Pay, PhonePe, Paytm' },
  { id: 'card',    icon: <FiCreditCard />, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
  { id: 'netbank', icon: <FiGlobe />,      label: 'Net Banking',      sub: 'All major banks supported' },
]

export default function StudentCheckout() {
  const { cart, cartTotal, cartSavings, cartOriginalTotal, removeFromCart } = useStore()
  const { enrollMany } = useStudent()
  const navigate = useNavigate()

  const [billing, setBilling] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' })
  const [payMethod, setPayMethod] = useState('upi')
  const [upi, setUpi] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = k => e => setBilling(b => ({ ...b, [k]: e.target.value }))
  const tax = Math.round(cartTotal * 0.18)
  const grandTotal = cartTotal + tax

  const handleOrder = () => {
    if (!billing.name || !billing.email) return
    setLoading(true)
    setTimeout(() => {
      enrollMany(cart)
      cart.forEach(c => removeFromCart(c.id))
      setDone(true)
      setLoading(false)
    }, 1200)
  }

  if (done) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="admin-card" style={{ maxWidth: 480, width: '100%', padding: '48px 36px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e6faf2', color: '#1a9e5c', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><FiCheckCircle /></div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 10 }}>Enrollment Successful!</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', lineHeight: 1.7, marginBottom: 28 }}>You have been successfully enrolled in your courses. Start learning right away!</p>
        <button className="btn-primary-sm" style={{ width: '100%', justifyContent: 'center', padding: 13 }} onClick={() => navigate('/student/my-courses')}>Go to My Courses</button>
      </div>
    </div>
  )

  if (cart.length === 0) return (
    <div className="admin-card">
      <div className="admin-empty"><h4>Your cart is empty</h4><button className="btn-primary-sm" style={{ marginTop: 14 }} onClick={() => navigate('/student/courses')}>Browse Courses</button></div>
    </div>
  )

  return (
    <>
      <div className="admin-page-header">
        <div><h1>Checkout</h1><p>Complete your enrollment</p></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 22, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Billing */}
          <div className="admin-card">
            <div className="admin-card-header"><div><h3>Billing Information</h3></div></div>
            <div style={{ padding: '20px 22px' }}>
              <div className="form-grid">
                <div className="form-field span-2">
                  <label>Full Name *</label>
                  <input className="form-input" placeholder="Your full name" value={billing.name} onChange={set('name')} />
                </div>
                <div className="form-field">
                  <label>Email Address *</label>
                  <input className="form-input" type="email" placeholder="you@email.com" value={billing.email} onChange={set('email')} />
                </div>
                <div className="form-field">
                  <label>Phone Number</label>
                  <input className="form-input" placeholder="+91 9281441011" value={billing.phone} onChange={set('phone')} />
                </div>
                <div className="form-field span-2">
                  <label>Address</label>
                  <input className="form-input" placeholder="Street address" value={billing.address} onChange={set('address')} />
                </div>
                <div className="form-field">
                  <label>City</label>
                  <input className="form-input" placeholder="City" value={billing.city} onChange={set('city')} />
                </div>
                <div className="form-field">
                  <label>PIN Code</label>
                  <input className="form-input" placeholder="500001" value={billing.pincode} onChange={set('pincode')} />
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="admin-card">
            <div className="admin-card-header"><div><h3>Payment Method</h3></div></div>
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PAYMENT_METHODS.map(m => (
                <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: `1.5px solid ${payMethod === m.id ? 'var(--primary)' : '#e8edf3'}`, borderRadius: 10, cursor: 'pointer', background: payMethod === m.id ? '#f0f4ff' : '#fff', transition: 'all 0.18s' }}>
                  <input type="radio" name="pay" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} style={{ accentColor: 'var(--primary)', width: 16, height: 16 }} />
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: payMethod === m.id ? '#e8f0ff' : '#f0f2f5', color: payMethod === m.id ? 'var(--primary)' : '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{m.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{m.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{m.sub}</div>
                  </div>
                </label>
              ))}
              {payMethod === 'upi' && (
                <input className="form-input" placeholder="Enter UPI ID (e.g. name@upi)" value={upi} onChange={e => setUpi(e.target.value)} style={{ marginTop: 4 }} />
              )}
            </div>
          </div>
        </div>

        {/* Right summary */}
        <div style={{ position: 'sticky', top: 80 }}>
          <div className="admin-card" style={{ padding: '22px 20px' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid #f0f3f7' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {cart.map(c => (
                <div key={c.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <img src={c.image} alt={c.title} style={{ width: 44, height: 32, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{c.instructor}</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)', flexShrink: 0 }}>₹{c.price}</div>
                </div>
              ))}
            </div>
            {[['Subtotal', `₹${cartOriginalTotal.toLocaleString()}`],['Discount', `− ₹${cartSavings.toLocaleString()}`],['GST (18%)', `₹${tax.toLocaleString()}`]].map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: i === 1 ? '#26de81' : 'var(--text-gray)', fontWeight: i === 1 ? 600 : 400, marginBottom: 8 }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', borderTop: '1px solid #f0f3f7', paddingTop: 14, marginTop: 6, marginBottom: 20 }}>
              <span>Total</span><span>₹{grandTotal.toLocaleString()}</span>
            </div>
            <button className="btn-primary-sm" style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: '0.97rem' }} onClick={handleOrder} disabled={loading}>
              {loading ? 'Processing…' : `Pay ₹${grandTotal.toLocaleString()}`}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontSize: '0.75rem', color: '#aaa' }}>
              <FaShieldAlt style={{ color: '#26de81' }} /> Secured by 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
