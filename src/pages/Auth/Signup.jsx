import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff,
  FiArrowRight, FiShield, FiPhone, FiAlertCircle
} from 'react-icons/fi'
import { FaGoogle, FaGithub, FaGraduationCap, FaBookOpen, FaCertificate, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/auth/AuthContext'
import logoImg from '../../assets/logo.png'
import './Auth.css'

function getStrength(pwd) {
  if (!pwd) return 0
  let s = 0
  if (pwd.length >= 8)          s++
  if (/[A-Z]/.test(pwd))        s++
  if (/[0-9]/.test(pwd))        s++
  if (/[^A-Za-z0-9]/.test(pwd)) s++
  return s
}
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_CLASSES = ['', 'weak', 'fair', 'good', 'strong']

export default function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' })
  const [showPwd, setShowPwd]     = useState(false)
  const [showConf, setShowConf]   = useState(false)
  const [errors, setErrors]       = useState({})
  const [loading, setLoading]     = useState(false)
  const [agreed, setAgreed]       = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.firstName.trim())                       e.firstName = 'First name is required'
    if (!form.lastName.trim())                        e.lastName  = 'Last name is required'
    if (!form.email.trim())                           e.email     = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))        e.email     = 'Enter a valid email'
    if (!form.password)                               e.password  = 'Password is required'
    else if (form.password.length < 8)               e.password  = 'Minimum 8 characters'
    if (!form.confirm)                                e.confirm   = 'Please confirm your password'
    else if (form.confirm !== form.password)          e.confirm   = 'Passwords do not match'
    if (!agreed)                                      e.agreed    = 'Please accept the terms'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      login({ name: `${form.firstName} ${form.lastName}`, email: form.email, role: 'student' })
      navigate('/student')
    }, 900)
  }

  const strength = getStrength(form.password)

  return (
    <div className="auth-page">
      {/* ── Left branding ── */}
      <div className="auth-left">
        <Link to="/" className="auth-left-logo">
          <img src={logoImg} alt="Education Web" />
        </Link>

        <div className="auth-left-body">
          <div className="auth-left-tag"><FaGraduationCap /> Start Learning Today</div>
          <h1 className="auth-left-title">
            Join <span>Education Web</span><br />& Grow Your Career
          </h1>
          <p className="auth-left-desc">
            Create your free account and get instant access to 100+ industry-led courses designed to accelerate your career growth.
          </p>
          <div className="auth-features">
            {[
              [FaBookOpen,    'Lifetime access to enrolled courses'],
              [FaCertificate, 'Internationally recognised certificates'],
              [FaUsers,       'Join 10,000+ active learners'],
            ].map(([Icon, text], i) => (
              <div key={i} className="auth-feature-item">
                <div className="auth-feature-icon"><Icon /></div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-stats">
          {[['Free','Sign Up'],['7-Day','Refund'],['24/7','Support']].map(([n,l]) => (
            <div key={l} className="auth-stat">
              <div className="auth-stat-num">{n}</div>
              <div className="auth-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form ── */}
      <div className="auth-right">
        <div className="auth-form-box">
          <div className="auth-form-header">
            <h2>Create Account</h2>
            <p>Fill in your details to get started for free</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Name row */}
            <div className="auth-field-row">
              <div className="auth-field">
                <label>First Name</label>
                <div className="auth-input-wrap">
                  <FiUser className="auth-input-icon" />
                  <input className={`auth-input${errors.firstName ? ' error' : ''}`} type="text" placeholder="John" value={form.firstName} onChange={set('firstName')} />
                </div>
                {errors.firstName && <span className="auth-field-error"><FiAlertCircle />{errors.firstName}</span>}
              </div>
              <div className="auth-field">
                <label>Last Name</label>
                <div className="auth-input-wrap">
                  <FiUser className="auth-input-icon" />
                  <input className={`auth-input${errors.lastName ? ' error' : ''}`} type="text" placeholder="Doe" value={form.lastName} onChange={set('lastName')} />
                </div>
                {errors.lastName && <span className="auth-field-error"><FiAlertCircle />{errors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <FiMail className="auth-input-icon" />
                <input className={`auth-input${errors.email ? ' error' : ''}`} type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} autoComplete="email" />
              </div>
              {errors.email && <span className="auth-field-error"><FiAlertCircle />{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="auth-field">
              <label>Phone Number <span style={{ color: '#aab4c4', fontWeight: 400 }}>(optional)</span></label>
              <div className="auth-input-wrap">
                <FiPhone className="auth-input-icon" />
                <input className="auth-input" type="tel" placeholder="+91 9281441011" value={form.phone} onChange={set('phone')} />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrap">
                <FiLock className="auth-input-icon" />
                <input className={`auth-input${errors.password ? ' error' : ''}`} type={showPwd ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={set('password')} autoComplete="new-password" />
                <button type="button" className="auth-input-toggle" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="auth-field-error"><FiAlertCircle />{errors.password}</span>}
              {form.password && (
                <div className="auth-strength">
                  <div className="auth-strength-bars">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`auth-strength-bar${strength >= i ? ` ${STRENGTH_CLASSES[strength]}` : ''}`} />
                    ))}
                  </div>
                  <span className="auth-strength-label">Password strength: {STRENGTH_LABELS[strength]}</span>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="auth-field">
              <label>Confirm Password</label>
              <div className="auth-input-wrap">
                <FiLock className="auth-input-icon" />
                <input className={`auth-input${errors.confirm ? ' error' : ''}`} type={showConf ? 'text' : 'password'} placeholder="Re-enter password" value={form.confirm} onChange={set('confirm')} autoComplete="new-password" />
                <button type="button" className="auth-input-toggle" onClick={() => setShowConf(v => !v)}>
                  {showConf ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirm && <span className="auth-field-error"><FiAlertCircle />{errors.confirm}</span>}
            </div>

            {/* Terms */}
            <div className="auth-field">
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontWeight: 400 }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 2, accentColor: 'var(--primary)', width: 15, height: 15, flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.5 }}>
                  I agree to the <Link to="/terms-of-service" style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</Link> and <Link to="/privacy-policy" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</Link>
                </span>
              </label>
              {errors.agreed && <span className="auth-field-error"><FiAlertCircle />{errors.agreed}</span>}
            </div>

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading ? 'Creating account…' : <><span>Create Account</span><FiArrowRight /></>}
            </button>
          </form>

          {/* <div className="auth-divider" style={{ margin: '20px 0' }}>or sign up with</div>

          <div className="auth-social-row">
            <button className="auth-social-btn"><FaGoogle style={{ color: '#ea4335' }} /> Google</button>
            <button className="auth-social-btn"><FaGithub /> GitHub</button>
          </div> */}

          <p className="auth-switch" style={{ marginTop: 24 }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
