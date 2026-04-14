import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight,
  FiUser, FiPhone, FiAlertCircle, FiCheckCircle
} from 'react-icons/fi'
import { FaGraduationCap, FaBookOpen, FaCertificate, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/auth/AuthContext'
import logoImg from '../../assets/logo.png'
import './StudentAuth.css'

function getStrength(pwd) {
  if (!pwd) return 0
  let s = 0
  if (pwd.length >= 8)          s++
  if (/[A-Z]/.test(pwd))        s++
  if (/[0-9]/.test(pwd))        s++
  if (/[^A-Za-z0-9]/.test(pwd)) s++
  return s
}
const STRENGTH_LABELS  = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_CLASSES = ['', 'weak', 'fair', 'good', 'strong']

/* ─── Login Form ─── */
function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)

  const validate = () => {
    const e = {}
    if (!email.trim())                    e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = 'Enter a valid email'
    if (!password)                        e.password = 'Password is required'
    else if (password.length < 6)        e.password = 'Minimum 6 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      login({ name: 'Alex Rivera', email, role: 'student' })
      navigate('/student')
    }, 900)
  }

  return (
    <form className="sa-form" onSubmit={handleSubmit} noValidate>
      <div className="sa-field">
        <label>Email Address</label>
        <div className="sa-input-wrap">
          <FiMail className="sa-input-icon" />
          <input
            className={`sa-input${errors.email ? ' error' : ''}`}
            type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        {errors.email && <span className="sa-error"><FiAlertCircle />{errors.email}</span>}
      </div>

      <div className="sa-field">
        <label>Password</label>
        <div className="sa-input-wrap">
          <FiLock className="sa-input-icon" />
          <input
            className={`sa-input${errors.password ? ' error' : ''}`}
            type={showPwd ? 'text' : 'password'} placeholder="Enter your password"
            value={password} onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="button" className="sa-toggle" onClick={() => setShowPwd(v => !v)}>
            {showPwd ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors.password && <span className="sa-error"><FiAlertCircle />{errors.password}</span>}
      </div>

      <div className="sa-forgot"><a href="#">Forgot password?</a></div>

      <button className="sa-submit" type="submit" disabled={loading}>
        {loading ? <span className="sa-spinner" /> : <><span>Sign In</span><FiArrowRight /></>}
      </button>

      <div className="sa-demo-hint">
        <FiCheckCircle />
        <span>Demo: <strong>student@educationweb.in</strong> / <strong>Student@123</strong></span>
      </div>
    </form>
  )
}

/* ─── Signup Form ─── */
function SignupForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm]         = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' })
  const [showPwd, setShowPwd]   = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [agreed, setAgreed]     = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.firstName.trim())                    e.firstName = 'Required'
    if (!form.lastName.trim())                     e.lastName  = 'Required'
    if (!form.email.trim())                        e.email     = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))     e.email     = 'Enter a valid email'
    if (!form.password)                            e.password  = 'Password is required'
    else if (form.password.length < 8)            e.password  = 'Minimum 8 characters'
    if (!form.confirm)                             e.confirm   = 'Please confirm password'
    else if (form.confirm !== form.password)       e.confirm   = 'Passwords do not match'
    if (!agreed)                                   e.agreed    = 'Please accept the terms'
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
    <form className="sa-form" onSubmit={handleSubmit} noValidate>
      <div className="sa-field-row">
        <div className="sa-field">
          <label>First Name</label>
          <div className="sa-input-wrap">
            <FiUser className="sa-input-icon" />
            <input className={`sa-input${errors.firstName ? ' error' : ''}`} type="text" placeholder="John"
              value={form.firstName} onChange={set('firstName')} />
          </div>
          {errors.firstName && <span className="sa-error"><FiAlertCircle />{errors.firstName}</span>}
        </div>
        <div className="sa-field">
          <label>Last Name</label>
          <div className="sa-input-wrap">
            <FiUser className="sa-input-icon" />
            <input className={`sa-input${errors.lastName ? ' error' : ''}`} type="text" placeholder="Doe"
              value={form.lastName} onChange={set('lastName')} />
          </div>
          {errors.lastName && <span className="sa-error"><FiAlertCircle />{errors.lastName}</span>}
        </div>
      </div>

      <div className="sa-field">
        <label>Email Address</label>
        <div className="sa-input-wrap">
          <FiMail className="sa-input-icon" />
          <input className={`sa-input${errors.email ? ' error' : ''}`} type="email" placeholder="you@example.com"
            value={form.email} onChange={set('email')} autoComplete="email" />
        </div>
        {errors.email && <span className="sa-error"><FiAlertCircle />{errors.email}</span>}
      </div>

      <div className="sa-field">
        <label>Phone <span className="sa-optional">(optional)</span></label>
        <div className="sa-input-wrap">
          <FiPhone className="sa-input-icon" />
          <input className="sa-input" type="tel" placeholder="+91 98765 43210"
            value={form.phone} onChange={set('phone')} />
        </div>
      </div>

      <div className="sa-field">
        <label>Password</label>
        <div className="sa-input-wrap">
          <FiLock className="sa-input-icon" />
          <input className={`sa-input${errors.password ? ' error' : ''}`}
            type={showPwd ? 'text' : 'password'} placeholder="Min. 8 characters"
            value={form.password} onChange={set('password')} autoComplete="new-password" />
          <button type="button" className="sa-toggle" onClick={() => setShowPwd(v => !v)}>
            {showPwd ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors.password && <span className="sa-error"><FiAlertCircle />{errors.password}</span>}
        {form.password && (
          <div className="sa-strength">
            <div className="sa-strength-bars">
              {[1,2,3,4].map(i => (
                <div key={i} className={`sa-strength-bar${strength >= i ? ` ${STRENGTH_CLASSES[strength]}` : ''}`} />
              ))}
            </div>
            <span>Password strength: <strong>{STRENGTH_LABELS[strength]}</strong></span>
          </div>
        )}
      </div>

      <div className="sa-field">
        <label>Confirm Password</label>
        <div className="sa-input-wrap">
          <FiLock className="sa-input-icon" />
          <input className={`sa-input${errors.confirm ? ' error' : ''}`}
            type={showConf ? 'text' : 'password'} placeholder="Re-enter password"
            value={form.confirm} onChange={set('confirm')} autoComplete="new-password" />
          <button type="button" className="sa-toggle" onClick={() => setShowConf(v => !v)}>
            {showConf ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors.confirm && <span className="sa-error"><FiAlertCircle />{errors.confirm}</span>}
      </div>

      <label className="sa-checkbox-label">
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        <span>
          I agree to the{' '}
          <Link to="/terms-of-service">Terms of Service</Link> and{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>
        </span>
      </label>
      {errors.agreed && <span className="sa-error"><FiAlertCircle />{errors.agreed}</span>}

      <button className="sa-submit" type="submit" disabled={loading}>
        {loading ? <span className="sa-spinner" /> : <><span>Create Account</span><FiArrowRight /></>}
      </button>
    </form>
  )
}

/* ─── Main Page ─── */
export default function StudentLogin() {
  const location = useLocation()
  const [tab, setTab] = useState(location.pathname === '/signup' ? 'signup' : 'login')

  return (
    <div className="sa-page">
      {/* Left panel */}
      <div className="sa-left">
        <Link to="/" className="sa-logo">
          <img src={logoImg} alt="Education Web" />
        </Link>

        <div className="sa-left-body">
          <div className="sa-badge"><FaGraduationCap /> Student Portal</div>
          <h1>
            {tab === 'login' ? <>Welcome Back,<br /><span>Keep Learning!</span></> : <>Join Us &<br /><span>Start Growing</span></>}
          </h1>
          <p>
            {tab === 'login'
              ? 'Sign in to access your courses, track your progress, and continue your learning journey.'
              : 'Create your free account and get instant access to 100+ industry-led courses.'}
          </p>

          <div className="sa-features">
            {[
              [FaBookOpen,    'Lifetime access to enrolled courses'],
              [FaCertificate, 'Internationally recognised certificates'],
              [FaUsers,       'Join 10,000+ active learners'],
            ].map(([Icon, text], i) => (
              <div key={i} className="sa-feature">
                <div className="sa-feature-icon"><Icon /></div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sa-stats">
          {[['10K+','Students'],['100+','Courses'],['50+','Instructors']].map(([n, l]) => (
            <div key={l} className="sa-stat">
              <div className="sa-stat-num">{n}</div>
              <div className="sa-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="sa-right">
        <div className="sa-card">
          {/* Tabs */}
          <div className="sa-tabs">
            <button className={`sa-tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>
              Sign In
            </button>
            <button className={`sa-tab${tab === 'signup' ? ' active' : ''}`} onClick={() => setTab('signup')}>
              Create Account
            </button>
            <div className={`sa-tab-indicator${tab === 'signup' ? ' right' : ''}`} />
          </div>

          <div className="sa-card-body">
            <div className="sa-card-header">
              <h2>{tab === 'login' ? 'Sign In' : 'Create Account'}</h2>
              <p>{tab === 'login' ? 'Enter your credentials to access your dashboard' : 'Fill in your details to get started for free'}</p>
            </div>

            {tab === 'login' ? <LoginForm /> : <SignupForm />}
          </div>

          <div className="sa-admin-link">
            Are you an admin? <Link to="/admin-login">Admin Login →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
