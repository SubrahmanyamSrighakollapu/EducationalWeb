import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight,
  FiShield, FiAlertCircle, FiCheckCircle, FiActivity,
  FiUsers, FiBookOpen, FiSettings
} from 'react-icons/fi'
import { useAuth } from '../../context/auth/AuthContext'
import logoImg from '../../assets/logo.png'
import './AdminAuth.css'

export default function AdminLogin() {
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
      login({ name: 'Admin User', email, role: 'admin' })
      navigate('/admin')
    }, 900)
  }

  return (
    <div className="aa-page">
      {/* Left — dark branding panel */}
      <div className="aa-left">
        <div className="aa-left-glow aa-glow-1" />
        <div className="aa-left-glow aa-glow-2" />

        <Link to="/" className="aa-logo">
          <img src={logoImg} alt="Education Web" />
        </Link>

        <div className="aa-left-body">
          <div className="aa-badge">
            <FiShield /> Admin Control Panel
          </div>
          <h1>
            Manage Your<br /><span>Learning Platform</span>
          </h1>
          <p>
            Secure access to the administration dashboard. Monitor courses, students, reports, and platform settings from one place.
          </p>

          <div className="aa-capabilities">
            {[
              [FiUsers,    'Manage Students & Instructors'],
              [FiBookOpen, 'Create & Publish Courses'],
              [FiActivity, 'View Analytics & Reports'],
              [FiSettings, 'Configure Platform Settings'],
            ].map(([Icon, text], i) => (
              <div key={i} className="aa-capability">
                <div className="aa-cap-icon"><Icon /></div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="aa-security-note">
          <FiShield />
          <span>This is a restricted area. Unauthorised access is prohibited and monitored.</span>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="aa-right">
        <div className="aa-card">
          <div className="aa-card-icon">
            <FiShield />
          </div>

          <div className="aa-card-header">
            <h2>Admin Sign In</h2>
            <p>Enter your administrator credentials to access the control panel</p>
          </div>

          <form className="aa-form" onSubmit={handleSubmit} noValidate>
            <div className="aa-field">
              <label>Admin Email</label>
              <div className="aa-input-wrap">
                <FiMail className="aa-input-icon" />
                <input
                  className={`aa-input${errors.email ? ' error' : ''}`}
                  type="email" placeholder="admin@educationweb.in"
                  value={email} onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="aa-error"><FiAlertCircle />{errors.email}</span>}
            </div>

            <div className="aa-field">
              <label>Password</label>
              <div className="aa-input-wrap">
                <FiLock className="aa-input-icon" />
                <input
                  className={`aa-input${errors.password ? ' error' : ''}`}
                  type={showPwd ? 'text' : 'password'} placeholder="Enter admin password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="aa-toggle" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="aa-error"><FiAlertCircle />{errors.password}</span>}
            </div>

            <div className="aa-forgot"><a href="#">Forgot password?</a></div>

            <button className="aa-submit" type="submit" disabled={loading}>
              {loading
                ? <span className="aa-spinner" />
                : <><FiShield /><span>Access Dashboard</span><FiArrowRight /></>
              }
            </button>
          </form>

          <div className="aa-demo-hint">
            <FiCheckCircle />
            <span>Demo: <strong>admin@educationweb.in</strong> / <strong>Admin@123</strong></span>
          </div>

          <div className="aa-student-link">
            Not an admin? <Link to="/login">Student Login →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
