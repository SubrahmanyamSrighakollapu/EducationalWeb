import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight,
  FiShield, FiUser, FiAlertCircle
} from 'react-icons/fi'
import { FaGoogle, FaGithub, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa'
import { useAuth } from '../../context/auth/AuthContext'
import logoImg from '../../assets/logo.png'
import './Auth.css'

const DEMO = {
  admin:   { email: 'admin@educationweb.in',   password: 'Admin@123',   name: 'Admin User' },
  student: { email: 'student@educationweb.in', password: 'Student@123', name: 'Alex Rivera' },
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [role, setRole]         = useState('student')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)

  const validate = () => {
    const e = {}
    if (!email.trim())                          e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email))       e.email    = 'Enter a valid email'
    if (!password)                              e.password = 'Password is required'
    else if (password.length < 6)              e.password = 'Minimum 6 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      login({ name: DEMO[role].name, email, role })
      navigate(role === 'admin' ? '/admin' : '/student')
    }, 900)
  }

  const fillDemo = () => {
    setEmail(DEMO[role].email)
    setPassword(DEMO[role].password)
    setErrors({})
  }

  return (
    <div className="auth-page">
      {/* ── Left branding ── */}
      <div className="auth-left">
        <Link to="/" className="auth-left-logo">
          <img src={logoImg} alt="Education Web" />
        </Link>

        <div className="auth-left-body">
          <div className="auth-left-tag"><FiShield /> Trusted Learning Platform</div>
          <h1 className="auth-left-title">
            Welcome Back to<br /><span>Education Web</span>
          </h1>
          <p className="auth-left-desc">
            Sign in to continue your learning journey. Access your courses, track progress, and achieve your career goals.
          </p>
          <div className="auth-features">
            {[
              [FaGraduationCap,     '100+ Industry-Ready Courses'],
              [FaChalkboardTeacher, 'Expert Certified Instructors'],
              [FiShield,            'Internationally Recognised Certificates'],
            ].map(([Icon, text], i) => (
              <div key={i} className="auth-feature-item">
                <div className="auth-feature-icon"><Icon /></div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-stats">
          {[['10K+','Students'],['100+','Courses'],['50+','Instructors']].map(([n,l]) => (
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
            <h2>Sign In</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          {/* Role toggle */}
          <div className="auth-role-toggle">
            <button className={`auth-role-btn${role === 'student' ? ' active' : ''}`} onClick={() => setRole('student')}>
              <FaGraduationCap /> Student
            </button>
            <button className={`auth-role-btn${role === 'admin' ? ' active' : ''}`} onClick={() => setRole('admin')}>
              <FiShield /> Admin
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <FiMail className="auth-input-icon" />
                <input
                  className={`auth-input${errors.email ? ' error' : ''}`}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="auth-field-error"><FiAlertCircle />{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrap">
                <FiLock className="auth-input-icon" />
                <input
                  className={`auth-input${errors.password ? ' error' : ''}`}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="auth-input-toggle" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="auth-field-error"><FiAlertCircle />{errors.password}</span>}
            </div>

            <div className="auth-forgot"><a href="#">Forgot password?</a></div>

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : <><span>Sign In</span><FiArrowRight /></>}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div style={{ marginTop: 16, background: '#f0f4ff', borderRadius: 10, padding: '12px 16px', fontSize: '0.8rem', color: 'var(--text-gray)' }}>
            <strong style={{ color: 'var(--primary)' }}>Demo credentials:</strong>{' '}
            <button onClick={fillDemo} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}>
              Click to fill {role} credentials
            </button>
          </div>

          {/* <div className="auth-divider" style={{ margin: '20px 0' }}>or continue with</div>

          <div className="auth-social-row">
            <button className="auth-social-btn"><FaGoogle style={{ color: '#ea4335' }} /> Google</button>
            <button className="auth-social-btn"><FaGithub /> GitHub</button>
          </div> */}

          <p className="auth-switch" style={{ marginTop: 24 }}>
            Don't have an account? <Link to="/signup">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
