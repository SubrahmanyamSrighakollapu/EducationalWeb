import { useState } from 'react'
import { FiX, FiSmartphone, FiCreditCard, FiGlobe, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { FaShieldAlt } from 'react-icons/fa'
import { useTutor } from '../../../context/TutorContext'

const METHODS = [
  { id: 'upi',     icon: <FiSmartphone />, label: 'UPI',                sub: 'Google Pay, PhonePe, Paytm' },
  { id: 'card',    icon: <FiCreditCard />, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
  { id: 'netbank', icon: <FiGlobe />,      label: 'Net Banking',         sub: 'All major banks supported' },
]

export default function PayModal({ item, onClose }) {
  const { markPaid } = useTutor()
  const [amount,  setAmount]  = useState('')
  const [method,  setMethod]  = useState('upi')
  const [upi,     setUpi]     = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [paidAmt, setPaidAmt] = useState(0)

  const validate = () => {
    const val = parseFloat(amount)
    if (!amount.trim())   return 'Please enter the amount you wish to pay.'
    if (isNaN(val))       return 'Please enter a valid number.'
    if (val <= 0)         return 'Amount must be greater than ₹0.'
    if (val > 10000000)   return 'Amount seems too large. Please check.'
    if (method === 'upi' && !upi.trim()) return 'Please enter your UPI ID.'
    return ''
  }

  const handlePay = () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      markPaid(item.id)
      setPaidAmt(parseFloat(amount))
      setLoading(false)
      setDone(true)
    }, 1200)
  }

  if (done) return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 420, textAlign: 'center' }}>
        <div style={{ padding: '40px 32px 32px' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e6faf2', color: '#1a9e5c', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <FiCheckCircle />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 10 }}>Payment Successful!</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-gray)', lineHeight: 1.7, marginBottom: 8 }}>
            Your payment to <strong>{item.name}</strong> is confirmed.
          </p>
          <div style={{ background: '#f7f9fc', borderRadius: 10, padding: '16px', margin: '16px 0' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)', marginBottom: 4 }}>Amount Paid</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a9e5c' }}>
              ₹{paidAmt.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: 4 }}>via {METHODS.find(m => m.id === method)?.label}</div>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: 24 }}>
            A confirmation receipt has been sent to your registered email.
          </p>
          <button className="btn-primary-sm" style={{ width: '100%', justifyContent: 'center', padding: 12 }} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <h3>Make Payment</h3>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* To whom */}
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{item.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)', marginTop: 3 }}>
                {item.type === 'tutor' ? item.subject : item.category}
                {item.fee && <span style={{ marginLeft: 6, color: '#aaa' }}>• Listed fee: {item.fee}</span>}
              </div>
            </div>
          </div>

          {/* Amount input */}
          <div className="form-field">
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              Enter Amount to Pay (₹) *
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontWeight: 800, fontSize: '1rem', color: '#aaa' }}>₹</span>
              <input
                className="form-input"
                style={{ paddingLeft: 28, fontSize: '1.1rem', fontWeight: 700 }}
                type="number"
                min="1"
                placeholder="0"
                value={amount}
                onChange={e => { setAmount(e.target.value); setError('') }}
              />
            </div>
            {error && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: '#ff6b6b', marginTop: 4 }}>
                <FiAlertCircle /> {error}
              </span>
            )}
            <span style={{ fontSize: '0.75rem', color: '#aaa', marginTop: 2 }}>
              Enter the amount you agree to pay based on the listed fee or your arrangement.
            </span>
          </div>

          {/* Payment method */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>Payment Method</div>
            {METHODS.map(m => (
              <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', border: `1.5px solid ${method === m.id ? 'var(--primary)' : '#e8edf3'}`, borderRadius: 10, cursor: 'pointer', background: method === m.id ? '#f0f4ff' : '#fff', transition: 'all 0.18s' }}>
                <input type="radio" name="pay" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} style={{ accentColor: 'var(--primary)', width: 16, height: 16 }} />
                <div style={{ width: 36, height: 36, borderRadius: 9, background: method === m.id ? '#e8f0ff' : '#f0f2f5', color: method === m.id ? 'var(--primary)' : '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{m.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.87rem', color: 'var(--text-dark)' }}>{m.label}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-gray)' }}>{m.sub}</div>
                </div>
              </label>
            ))}
          </div>

          {method === 'upi' && (
            <div className="form-field">
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>UPI ID *</label>
              <input className="form-input" placeholder="yourname@upi" value={upi} onChange={e => { setUpi(e.target.value); setError('') }} />
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.75rem', color: '#aaa' }}>
            <FaShieldAlt style={{ color: '#26de81' }} /> Secured by 256-bit SSL encryption
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-outline-sm" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary-sm"
            style={{ background: '#1a9e5c', minWidth: 120 }}
            onClick={handlePay}
            disabled={loading}>
            {loading ? 'Processing…' : amount ? `Pay ₹${parseFloat(amount || 0).toLocaleString('en-IN')}` : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
