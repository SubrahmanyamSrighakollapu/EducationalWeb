import { useState } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiLock, FiSave, FiBookOpen, FiCheckCircle, FiClock } from 'react-icons/fi'
import { useAuth } from '../../../context/auth/AuthContext'
import { useStudent } from '../../../context/StudentContext'

export default function StudentProfile() {
  const { user } = useAuth()
  const { enrolledCourses, inProgress, completed } = useStudent()
  const [form, setForm] = useState({ name: user?.name || 'Student', email: user?.email || 'student@educationweb.in', phone: '+91 98765 43210', location: 'Hyderabad, Telangana', bio: 'Passionate learner exploring technology and business courses to advance my career.' })
  const [pwd,  setPwd]  = useState({ current: '', newPwd: '', confirm: '' })
  const [saved, setSaved] = useState(false)

  const set  = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const setP = k => e => setPwd(p => ({ ...p, [k]: e.target.value }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  const STATS = [
    { icon: <FiBookOpen />,    bg: '#e8f0ff', color: 'var(--primary)', label: 'Enrolled',   value: enrolledCourses.length },
    { icon: <FiClock />,       bg: '#fff8e6', color: '#f7b731',        label: 'In Progress', value: inProgress.length },
    { icon: <FiCheckCircle />, bg: '#e6faf2', color: '#1a9e5c',        label: 'Completed',   value: completed.length },
  ]

  return (
    <>
      <div className="admin-page-header">
        <div><h1>My Profile</h1><p>Manage your account and learning preferences</p></div>
      </div>

      <div className="profile-grid">
        {/* Left card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="profile-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-big">{form.name[0]}</div>
              <div className="profile-avatar-edit"><FiEdit2 /></div>
            </div>
            <div className="profile-name">{form.name}</div>
            <div className="profile-role-badge">Student</div>
            <div className="profile-meta">
              <div className="profile-meta-item"><FiMail /> {form.email}</div>
              <div className="profile-meta-item"><FiPhone /> {form.phone}</div>
              <div className="profile-meta-item"><FiMapPin /> {form.location}</div>
            </div>
          </div>

          {/* Learning stats */}
          <div className="admin-card" style={{ padding: '20px 18px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: 14, color: 'var(--text-dark)' }}>Learning Stats</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-dark)', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="admin-card">
            <div className="admin-card-header"><div><h3>Personal Information</h3><p>Update your profile details</p></div></div>
            <div style={{ padding: '20px 22px' }}>
              <div className="form-grid">
                <div className="form-field span-2">
                  <label>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <FiUser style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input className="form-input" style={{ paddingLeft: 36 }} value={form.name} onChange={set('name')} />
                  </div>
                </div>
                <div className="form-field">
                  <label>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <FiMail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input className="form-input" style={{ paddingLeft: 36 }} type="email" value={form.email} onChange={set('email')} />
                  </div>
                </div>
                <div className="form-field">
                  <label>Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <FiPhone style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input className="form-input" style={{ paddingLeft: 36 }} value={form.phone} onChange={set('phone')} />
                  </div>
                </div>
                <div className="form-field">
                  <label>Location</label>
                  <div style={{ position: 'relative' }}>
                    <FiMapPin style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input className="form-input" style={{ paddingLeft: 36 }} value={form.location} onChange={set('location')} />
                  </div>
                </div>
                <div className="form-field span-2">
                  <label>Bio</label>
                  <textarea className="form-textarea" value={form.bio} onChange={set('bio')} rows={3} />
                </div>
              </div>
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end', gap: 10, alignItems: 'center' }}>
                {saved && <span style={{ fontSize: '0.83rem', color: '#1a9e5c', fontWeight: 600 }}>✓ Saved!</span>}
                <button className="btn-primary-sm" onClick={handleSave}><FiSave /> Save Changes</button>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header"><div><h3>Change Password</h3></div></div>
            <div style={{ padding: '20px 22px' }}>
              <div className="form-grid">
                <div className="form-field span-2">
                  <label>Current Password</label>
                  <div style={{ position: 'relative' }}>
                    <FiLock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input className="form-input" style={{ paddingLeft: 36 }} type="password" placeholder="Current password" value={pwd.current} onChange={setP('current')} />
                  </div>
                </div>
                <div className="form-field">
                  <label>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <FiLock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input className="form-input" style={{ paddingLeft: 36 }} type="password" placeholder="Min. 8 characters" value={pwd.newPwd} onChange={setP('newPwd')} />
                  </div>
                </div>
                <div className="form-field">
                  <label>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <FiLock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input className="form-input" style={{ paddingLeft: 36 }} type="password" placeholder="Re-enter password" value={pwd.confirm} onChange={setP('confirm')} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-primary-sm"><FiLock /> Update Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
