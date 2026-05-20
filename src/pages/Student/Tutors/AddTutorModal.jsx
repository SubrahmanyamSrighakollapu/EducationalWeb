import { useState } from 'react'
import { FiX, FiChevronRight } from 'react-icons/fi'
import { FaChalkboardTeacher, FaUniversity } from 'react-icons/fa'
import { useTutor } from '../../../context/TutorContext'
import { useAuth } from '../../../context/auth/AuthContext'

const TUTOR_INIT = {
  type: 'tutor', name: '', subject: '', qualification: '', experience: '',
  mode: 'Online', languages: '', location: '', phone: '', email: '',
  availability: '', fee: '', about: '',
}

const INST_INIT = {
  type: 'institute', name: '', category: '', affiliation: '', established: '',
  totalStudents: '', courses: '', mode: 'Offline', location: '', phone: '',
  email: '', website: '', fee: '', about: '',
}

const MODES     = ['Online', 'Offline', 'Online & Offline']
const SUBJECTS  = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Data Science', 'Web Development', 'Design', 'Business', 'Finance', 'Other']
const INST_CATS = ['Technology & IT', 'Engineering', 'Medical & Health', 'Business & Management', 'Arts & Design', 'Language', 'Competitive Exams', 'Other']

export default function AddTutorModal({ onClose }) {
  const { addRequest } = useTutor()
  const { user } = useAuth()
  const [type,    setType]    = useState('tutor')
  const [form,    setForm]    = useState(TUTOR_INIT)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const switchType = (t) => {
    setType(t)
    setForm(t === 'tutor' ? TUTOR_INIT : INST_INIT)
  }

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) return
    setLoading(true)
    setTimeout(() => {
      addRequest(form, user?.name || 'Student', user?.email || '')
      setLoading(false)
      setSuccess(true)
    }, 800)
  }

  if (success) return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 420, textAlign: 'center' }}>
        <div style={{ padding: '40px 32px 32px' }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#e6faf2', color: '#1a9e5c', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>✓</div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 10 }}>Request Submitted!</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-gray)', lineHeight: 1.7, marginBottom: 24 }}>
            Your {type === 'tutor' ? 'tutor' : 'institute'} request has been submitted. Admin will review and approve within 24–48 hours.
          </p>
          <button className="btn-primary-sm" style={{ width: '100%', justifyContent: 'center', padding: 12 }} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 620 }}>
        <div className="modal-header">
          <h3>Add Tutor / Institute</h3>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>

        <div className="modal-body">
          {/* Type selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
            {[['tutor','Tutor','Individual tutor for personalised learning', <FaChalkboardTeacher />],
              ['institute','Institute','Training centre or coaching institute', <FaUniversity />]].map(([k, l, sub, icon]) => (
              <button key={k} onClick={() => switchType(k)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: `2px solid ${type === k ? 'var(--primary)' : '#e8edf3'}`, borderRadius: 12, background: type === k ? '#f0f4ff' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', fontFamily: 'inherit' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: type === k ? '#e8f0ff' : '#f0f2f5', color: type === k ? 'var(--primary)' : '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: type === k ? 'var(--primary)' : 'var(--text-dark)' }}>{l}</div>
                  <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: 2 }}>{sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Dynamic fields */}
          <div className="form-grid">
            {type === 'tutor' ? (
              <>
                <div className="form-section-title">Personal Information</div>
                <div className="form-field span-2">
                  <label>Full Name *</label>
                  <input className="form-input" placeholder="Tutor's full name" value={form.name} onChange={set('name')} />
                </div>
                <div className="form-field">
                  <label>Subject / Specialisation *</label>
                  <select className="form-select" value={form.subject} onChange={set('subject')}>
                    <option value="">Select subject</option>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Qualification</label>
                  <input className="form-input" placeholder="e.g. M.Sc Mathematics, IIT" value={form.qualification} onChange={set('qualification')} />
                </div>
                <div className="form-field">
                  <label>Years of Experience</label>
                  <input className="form-input" placeholder="e.g. 5 years" value={form.experience} onChange={set('experience')} />
                </div>
                <div className="form-field">
                  <label>Teaching Mode</label>
                  <select className="form-select" value={form.mode} onChange={set('mode')}>
                    {MODES.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-section-title">Contact & Availability</div>
                <div className="form-field">
                  <label>Phone Number *</label>
                  <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                </div>
                <div className="form-field">
                  <label>Email Address</label>
                  <input className="form-input" type="email" placeholder="tutor@email.com" value={form.email} onChange={set('email')} />
                </div>
                <div className="form-field">
                  <label>Location / City</label>
                  <input className="form-input" placeholder="e.g. Hyderabad, Telangana" value={form.location} onChange={set('location')} />
                </div>
                <div className="form-field">
                  <label>Languages</label>
                  <input className="form-input" placeholder="e.g. English, Hindi, Telugu" value={form.languages} onChange={set('languages')} />
                </div>
                <div className="form-field">
                  <label>Availability</label>
                  <input className="form-input" placeholder="e.g. Weekdays 6–9 PM" value={form.availability} onChange={set('availability')} />
                </div>
                <div className="form-field">
                  <label>Fee per Hour</label>
                  <input className="form-input" placeholder="e.g. ₹800/hour" value={form.fee} onChange={set('fee')} />
                </div>
                <div className="form-field span-2">
                  <label>About the Tutor</label>
                  <textarea className="form-textarea" rows={3} placeholder="Brief description about teaching style, achievements…" value={form.about} onChange={set('about')} />
                </div>
              </>
            ) : (
              <>
                <div className="form-section-title">Institute Information</div>
                <div className="form-field span-2">
                  <label>Institute Name *</label>
                  <input className="form-input" placeholder="e.g. TechSkills Academy" value={form.name} onChange={set('name')} />
                </div>
                <div className="form-field">
                  <label>Category *</label>
                  <select className="form-select" value={form.category} onChange={set('category')}>
                    <option value="">Select category</option>
                    {INST_CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Affiliation / Certification</label>
                  <input className="form-input" placeholder="e.g. NASSCOM Certified, ISO 9001" value={form.affiliation} onChange={set('affiliation')} />
                </div>
                <div className="form-field">
                  <label>Year Established</label>
                  <input className="form-input" placeholder="e.g. 2010" value={form.established} onChange={set('established')} />
                </div>
                <div className="form-field">
                  <label>Total Students Trained</label>
                  <input className="form-input" placeholder="e.g. 5,000+" value={form.totalStudents} onChange={set('totalStudents')} />
                </div>
                <div className="form-field span-2">
                  <label>Courses Offered</label>
                  <input className="form-input" placeholder="e.g. Python, Java, Web Development, Data Science" value={form.courses} onChange={set('courses')} />
                </div>
                <div className="form-field">
                  <label>Mode of Training</label>
                  <select className="form-select" value={form.mode} onChange={set('mode')}>
                    {MODES.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Fee Range</label>
                  <input className="form-input" placeholder="e.g. ₹20,000–₹80,000 per course" value={form.fee} onChange={set('fee')} />
                </div>
                <div className="form-section-title">Contact Details</div>
                <div className="form-field">
                  <label>Phone Number *</label>
                  <input className="form-input" placeholder="+91 40-2345-6789" value={form.phone} onChange={set('phone')} />
                </div>
                <div className="form-field">
                  <label>Email Address</label>
                  <input className="form-input" type="email" placeholder="admissions@institute.com" value={form.email} onChange={set('email')} />
                </div>
                <div className="form-field">
                  <label>Website</label>
                  <input className="form-input" placeholder="www.institute.com" value={form.website} onChange={set('website')} />
                </div>
                <div className="form-field">
                  <label>Location / Address</label>
                  <input className="form-input" placeholder="Area, City, State" value={form.location} onChange={set('location')} />
                </div>
                <div className="form-field span-2">
                  <label>About the Institute</label>
                  <textarea className="form-textarea" rows={3} placeholder="Brief description, highlights, placement record…" value={form.about} onChange={set('about')} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-outline-sm" onClick={onClose}>Cancel</button>
          <button className="btn-primary-sm" onClick={handleSubmit} disabled={loading || !form.name.trim() || !form.phone.trim()}>
            {loading ? 'Submitting…' : <><FiChevronRight /> Submit Request</>}
          </button>
        </div>
      </div>
    </div>
  )
}
