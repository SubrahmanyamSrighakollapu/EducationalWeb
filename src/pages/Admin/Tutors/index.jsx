import { useState } from 'react'
import { FiSearch, FiEye, FiCheckCircle, FiXCircle, FiX, FiMapPin, FiPhone, FiMail, FiGlobe, FiClock, FiAward } from 'react-icons/fi'
import { FaChalkboardTeacher, FaUniversity } from 'react-icons/fa'
import { useTutor } from '../../../context/TutorContext'

const STATUS_STYLE = {
  pending:  { bg: '#fff8e6', color: '#b8860b', label: 'Pending' },
  approved: { bg: '#e6faf2', color: '#1a9e5c', label: 'Approved' },
  rejected: { bg: '#fff0f0', color: '#cc3333', label: 'Rejected' },
}

function DetailModal({ req, onClose, onApprove, onReject }) {
  const [showReject,    setShowReject]    = useState(false)
  const [rejectReason,  setRejectReason]  = useState('')
  const [loading,       setLoading]       = useState(false)
  const isTutor = req.type === 'tutor'
  const s = STATUS_STYLE[req.status]

  const handleApprove = () => {
    setLoading(true)
    setTimeout(() => { onApprove(req.id); setLoading(false); onClose() }, 700)
  }
  const handleReject = () => {
    if (!rejectReason.trim()) return
    setLoading(true)
    setTimeout(() => { onReject(req.id, rejectReason); setLoading(false); onClose() }, 700)
  }

  const Row = ({ label, value }) => value ? (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f0f3f7', fontSize: '0.84rem' }}>
      <span style={{ color: 'var(--text-gray)' }}>{label}</span>
      <span style={{ fontWeight: 600, color: 'var(--text-dark)', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  ) : null

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: isTutor ? '#e8f0ff' : '#f0eeff', color: isTutor ? 'var(--primary)' : '#6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
              {isTutor ? <FaChalkboardTeacher /> : <FaUniversity />}
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{req.name}</h3>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, background: s.bg, color: s.color, padding: '2px 9px', borderRadius: 20 }}>{s.label}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Student info */}
          <div style={{ background: '#f7f9fc', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Requested By</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>{req.studentName}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)' }}>{req.studentEmail} • Submitted {req.submittedAt}</div>
          </div>

          {/* Details */}
          <div style={{ background: '#f7f9fc', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              {isTutor ? 'Tutor Details' : 'Institute Details'}
            </div>
            {isTutor ? (
              <>
                <Row label="Subject"        value={req.subject} />
                <Row label="Qualification"  value={req.qualification} />
                <Row label="Experience"     value={req.experience} />
                <Row label="Teaching Mode"  value={req.mode} />
                <Row label="Languages"      value={req.languages} />
                <Row label="Availability"   value={req.availability} />
                <Row label="Fee"            value={req.fee} />
              </>
            ) : (
              <>
                <Row label="Category"       value={req.category} />
                <Row label="Affiliation"    value={req.affiliation} />
                <Row label="Established"    value={req.established} />
                <Row label="Total Students" value={req.totalStudents} />
                <Row label="Courses"        value={req.courses} />
                <Row label="Mode"           value={req.mode} />
                <Row label="Fee Range"      value={req.fee} />
                <Row label="Website"        value={req.website} />
              </>
            )}
          </div>

          {/* Contact */}
          <div style={{ background: '#f7f9fc', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Contact</div>
            <Row label="Phone"    value={req.phone} />
            <Row label="Email"    value={req.email} />
            <Row label="Location" value={req.location} />
          </div>

          {/* About */}
          {req.about && (
            <div style={{ background: '#f7f9fc', borderRadius: 10, padding: '12px 16px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>About</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.7, margin: 0 }}>{req.about}</p>
            </div>
          )}

          {/* Rejection reason input */}
          {showReject && (
            <div className="form-field">
              <label>Rejection Reason *</label>
              <textarea className="form-textarea" rows={3} placeholder="Explain why this request is being rejected…" value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
            </div>
          )}

          {req.status === 'approved' && (
            <div style={{ background: '#e6faf2', borderRadius: 10, padding: '12px 14px', fontSize: '0.83rem', color: '#1a9e5c', fontWeight: 600 }}>
              ✓ Approved on {req.approvedAt}
            </div>
          )}
          {req.status === 'rejected' && (
            <div style={{ background: '#fff0f0', borderRadius: 10, padding: '12px 14px', fontSize: '0.83rem', color: '#cc3333' }}>
              ✗ Rejected on {req.rejectedAt} — {req.rejectedReason}
            </div>
          )}
        </div>

        {req.status === 'pending' && (
          <div className="modal-footer">
            {!showReject ? (
              <>
                <button className="btn-outline-sm" style={{ borderColor: '#ff6b6b', color: '#ff6b6b' }} onClick={() => setShowReject(true)}>
                  <FiXCircle /> Reject
                </button>
                <button className="btn-primary-sm" style={{ background: '#1a9e5c' }} onClick={handleApprove} disabled={loading}>
                  <FiCheckCircle /> {loading ? 'Approving…' : 'Approve'}
                </button>
              </>
            ) : (
              <>
                <button className="btn-outline-sm" onClick={() => setShowReject(false)}>Back</button>
                <button className="btn-primary-sm" style={{ background: '#ff6b6b' }} onClick={handleReject} disabled={loading || !rejectReason.trim()}>
                  {loading ? 'Rejecting…' : 'Confirm Rejection'}
                </button>
              </>
            )}
          </div>
        )}
        {req.status !== 'pending' && (
          <div className="modal-footer">
            <button className="btn-outline-sm" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminTutors() {
  const { requests, approveRequest, rejectRequest } = useTutor()
  const [search,  setSearch]  = useState('')
  const [typeF,   setTypeF]   = useState('All')
  const [statusF, setStatusF] = useState('All')
  const [viewReq, setViewReq] = useState(null)

  const filtered = requests.filter(r => {
    const q = search.toLowerCase()
    return (
      (r.name?.toLowerCase().includes(q) || r.studentName?.toLowerCase().includes(q)) &&
      (typeF   === 'All' || r.type   === typeF.toLowerCase()) &&
      (statusF === 'All' || r.status === statusF.toLowerCase())
    )
  })

  const pending  = requests.filter(r => r.status === 'pending').length
  const approved = requests.filter(r => r.status === 'approved').length
  const rejected = requests.filter(r => r.status === 'rejected').length
  const tutors   = requests.filter(r => r.type === 'tutor').length
  const insts    = requests.filter(r => r.type === 'institute').length

  return (
    <>
      <div className="admin-page-header">
        <div><h1>Tutors & Institutes</h1><p>Review and approve student tutor/institute requests</p></div>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
        {[
          { icon: <FaChalkboardTeacher />, bg: '#e8f0ff', color: 'var(--primary)', label: 'Tutors',   value: tutors },
          { icon: <FaUniversity />,        bg: '#f0eeff', color: '#6c63ff',        label: 'Institutes', value: insts },
          { icon: <FiClock />,             bg: '#fff8e6', color: '#b8860b',        label: 'Pending',  value: pending },
          { icon: <FiCheckCircle />,       bg: '#e6faf2', color: '#1a9e5c',        label: 'Approved', value: approved },
          { icon: <FiXCircle />,           bg: '#fff0f0', color: '#cc3333',        label: 'Rejected', value: rejected },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div><h3>All Requests</h3><p>{filtered.length} records found</p></div>
          <div className="admin-toolbar">
            <div className="admin-search-box"><FiSearch /><input placeholder="Search by name or student…" value={search} onChange={e => setSearch(e.target.value)} /></div>
            <select className="admin-filter-select" value={typeF} onChange={e => setTypeF(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Tutor">Tutors</option>
              <option value="Institute">Institutes</option>
            </select>
            <select className="admin-filter-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <FaChalkboardTeacher />
            <h4>No requests found</h4>
            <p>Student tutor/institute requests will appear here.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Type</th><th>Subject / Category</th><th>Student</th><th>Location</th><th>Submitted</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(r => {
                  const s = STATUS_STYLE[r.status]
                  const isTutor = r.type === 'tutor'
                  return (
                    <tr key={r.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 9, background: isTutor ? '#e8f0ff' : '#f0eeff', color: isTutor ? 'var(--primary)' : '#6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>
                            {isTutor ? <FaChalkboardTeacher /> : <FaUniversity />}
                          </div>
                          <div className="td-title">{r.name}</div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, background: isTutor ? '#e8f0ff' : '#f0eeff', color: isTutor ? 'var(--primary)' : '#6c63ff', padding: '3px 9px', borderRadius: 20, textTransform: 'capitalize' }}>{r.type}</span>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-gray)' }}>{isTutor ? r.subject : r.category}</td>
                      <td>
                        <div className="td-title">{r.studentName}<small>{r.studentEmail}</small></div>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{r.location || '—'}</td>
                      <td style={{ fontSize: '0.78rem', color: '#aaa' }}>{r.submittedAt}</td>
                      <td><span style={{ fontSize: '0.72rem', fontWeight: 700, background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 20 }}>{s.label}</span></td>
                      <td>
                        <div className="action-btns">
                          <button className="act-btn" title="View Details" onClick={() => setViewReq(r)}><FiEye /></button>
                          {r.status === 'pending' && (
                            <>
                              <button className="act-btn toggle" title="Approve" onClick={() => approveRequest(r.id)}><FiCheckCircle /></button>
                              <button className="act-btn delete" title="Reject"  onClick={() => rejectRequest(r.id, 'Rejected by admin')}><FiXCircle /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewReq && (
        <DetailModal
          req={viewReq}
          onClose={() => setViewReq(null)}
          onApprove={approveRequest}
          onReject={rejectRequest}
        />
      )}
    </>
  )
}
