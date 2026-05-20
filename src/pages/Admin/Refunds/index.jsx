import { useState } from 'react'
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiEye, FiX, FiSearch, FiAlertCircle, FiUser, FiBook, FiDollarSign } from 'react-icons/fi'
import { FaUniversity } from 'react-icons/fa'
import { useAdmin } from '../../../context/AdminContext'

const STATUS_STYLES = {
  pending:  { bg: '#fff8e6', color: '#b8860b', label: 'Pending Review' },
  approved: { bg: '#e6faf2', color: '#1a9e5c', label: 'Approved' },
  rejected: { bg: '#fff0f0', color: '#cc3333', label: 'Rejected' },
}

function ViewModal({ req, onClose, onApprove, onReject }) {
  const [rejectReason, setRejectReason] = useState('')
  const [showReject,   setShowReject]   = useState(false)
  const [loading,      setLoading]      = useState(false)

  const handleApprove = () => {
    setLoading(true)
    setTimeout(() => { onApprove(req.id); setLoading(false); onClose() }, 800)
  }
  const handleReject = () => {
    if (!rejectReason.trim()) return
    setLoading(true)
    setTimeout(() => { onReject(req.id, rejectReason); setLoading(false); onClose() }, 800)
  }

  const s = STATUS_STYLES[req.status]

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 620 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#e8f0ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiRefreshCw /></div>
            <div>
              <h3 style={{ margin: 0 }}>Refund Request #{req.id}</h3>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, background: s.bg, color: s.color, padding: '2px 9px', borderRadius: 20 }}>{s.label}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Course */}
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Course Details</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src={req.courseImage} alt={req.courseTitle} style={{ width: 60, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: 4 }}>{req.courseTitle}</div>
                <div style={{ display: 'flex', gap: 12, fontSize: '0.78rem', color: 'var(--text-gray)' }}>
                  <span>Completion: <strong style={{ color: '#1a9e5c' }}>{req.completionPercent}%</strong></span>
                  <span>Modules: <strong>{req.completedModules}/{req.totalModules}</strong></span>
                  <span>Paid: <strong>₹{req.paidAmount?.toLocaleString()}</strong></span>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ marginTop: 10 }}>
              <div style={{ background: '#e8edf3', borderRadius: 20, height: 7, overflow: 'hidden' }}>
                <div style={{ width: `${req.completionPercent}%`, height: '100%', background: '#26de81', borderRadius: 20 }} />
              </div>
            </div>
          </div>

          {/* Student */}
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Student Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.83rem' }}>
              {[['Name', req.studentName],['Email', req.studentEmail],['Phone', req.studentPhone || '—'],['Submitted', req.submittedAt]].map(([l, v]) => (
                <div key={l}><span style={{ color: 'var(--text-gray)' }}>{l}: </span><strong>{v}</strong></div>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Reason for Refund</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.7, margin: 0 }}>{req.reason}</p>
          </div>

          {/* Bank */}
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Bank Account Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.83rem' }}>
              {[['Bank', req.bankName],['Account Holder', req.accountHolder],['Account No.', req.accountNumber],['IFSC', req.ifsc]].map(([l, v]) => (
                <div key={l}><span style={{ color: 'var(--text-gray)' }}>{l}: </span><strong>{v}</strong></div>
              ))}
            </div>
          </div>

          {/* Refund breakdown */}
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Refund Breakdown</div>
            {[
              ['Course Paid Amount', `₹${req.paidAmount?.toLocaleString()}`, 'var(--text-dark)'],
              ['Platform Fee (10%)', `− ₹${req.platformFee?.toLocaleString()}`, '#ff6b6b'],
              ['Refund to Student',  `₹${req.refundAmount?.toLocaleString()}`, '#1a9e5c'],
            ].map(([l, v, c]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '6px 0', borderBottom: l !== 'Refund to Student' ? '1px solid #e8edf3' : 'none' }}>
                <span style={{ color: 'var(--text-gray)' }}>{l}</span>
                <strong style={{ color: c }}>{v}</strong>
              </div>
            ))}
          </div>

          {/* Reject reason input */}
          {showReject && (
            <div className="form-field">
              <label>Rejection Reason *</label>
              <textarea className="form-textarea" rows={3} placeholder="Explain why this refund is being rejected…" value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
            </div>
          )}

          {req.status === 'approved' && (
            <div style={{ background: '#e6faf2', borderRadius: 10, padding: '12px 14px', fontSize: '0.83rem', color: '#1a9e5c', fontWeight: 600 }}>
              ✓ Refund approved on {req.approvedAt}. ₹{req.refundAmount?.toLocaleString()} will be credited to student's account.
            </div>
          )}
          {req.status === 'rejected' && (
            <div style={{ background: '#fff0f0', borderRadius: 10, padding: '12px 14px', fontSize: '0.83rem', color: '#cc3333' }}>
              ✗ Refund rejected on {req.rejectedAt}. Reason: {req.rejectedReason}
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
                  <FiCheckCircle /> {loading ? 'Processing…' : `Approve ₹${req.refundAmount?.toLocaleString()}`}
                </button>
              </>
            ) : (
              <>
                <button className="btn-outline-sm" onClick={() => setShowReject(false)}>Cancel</button>
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

export default function AdminRefunds() {
  const { refundRequests, approveRefund, rejectRefund } = useAdmin()
  const [search,   setSearch]   = useState('')
  const [statusF,  setStatusF]  = useState('All')
  const [viewReq,  setViewReq]  = useState(null)

  const filtered = refundRequests.filter(r => {
    const q = search.toLowerCase()
    return (
      (r.studentName?.toLowerCase().includes(q) || r.courseTitle?.toLowerCase().includes(q)) &&
      (statusF === 'All' || r.status === statusF)
    )
  })

  const pending  = refundRequests.filter(r => r.status === 'pending').length
  const approved = refundRequests.filter(r => r.status === 'approved').length
  const rejected = refundRequests.filter(r => r.status === 'rejected').length
  const totalAmt = refundRequests.filter(r => r.status === 'approved').reduce((s, r) => s + (r.refundAmount || 0), 0)

  return (
    <>
      <div className="admin-page-header">
        <div><h1>Refund Requests</h1><p>Review and process student refund requests</p></div>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {[
          { icon: <FiRefreshCw />, bg: '#fff8e6', color: '#b8860b', label: 'Pending',  value: pending },
          { icon: <FiCheckCircle />, bg: '#e6faf2', color: '#1a9e5c', label: 'Approved', value: approved },
          { icon: <FiXCircle />,    bg: '#fff0f0', color: '#cc3333',  label: 'Rejected', value: rejected },
          { icon: <FiDollarSign />, bg: '#e8f0ff', color: 'var(--primary)', label: 'Total Refunded', value: `₹${(totalAmt/1000).toFixed(0)}K` },
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
          <div><h3>All Refund Requests</h3><p>{filtered.length} requests found</p></div>
          <div className="admin-toolbar">
            <div className="admin-search-box"><FiSearch /><input placeholder="Search by student or course…" value={search} onChange={e => setSearch(e.target.value)} /></div>
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
            <FiRefreshCw />
            <h4>No refund requests</h4>
            <p>Refund requests from students will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {filtered.map(req => {
              const s = STATUS_STYLES[req.status]
              return (
                <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px', borderBottom: '1px solid #f0f3f7', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}>

                  {/* Course image */}
                  <img src={req.courseImage} alt={req.courseTitle} style={{ width: 52, height: 38, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />

                  {/* Course + student */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.courseTitle}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 3 }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-gray)', display: 'flex', alignItems: 'center', gap: 4 }}><FiUser style={{ fontSize: '0.7rem' }} />{req.studentName}</span>
                      <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{req.submittedAt}</span>
                    </div>
                  </div>

                  {/* Completion */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1a9e5c' }}>{req.completionPercent}%</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-gray)' }}>Completed</div>
                  </div>

                  {/* Amounts */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-dark)' }}>₹{req.refundAmount?.toLocaleString()}</div>
                    <div style={{ fontSize: '0.72rem', color: '#aaa' }}>of ₹{req.paidAmount?.toLocaleString()}</div>
                  </div>

                  {/* Status */}
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, background: s.bg, color: s.color, padding: '4px 12px', borderRadius: 20, flexShrink: 0 }}>{s.label}</span>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button className="act-btn" title="View Details" onClick={() => setViewReq(req)}><FiEye /></button>
                    {req.status === 'pending' && (
                      <>
                        <button className="act-btn toggle" title="Approve" onClick={() => { approveRefund(req.id) }}><FiCheckCircle /></button>
                        <button className="act-btn delete" title="Reject" onClick={() => { rejectRefund(req.id, 'Rejected by admin') }}><FiXCircle /></button>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {viewReq && (
        <ViewModal
          req={viewReq}
          onClose={() => setViewReq(null)}
          onApprove={approveRefund}
          onReject={rejectRefund}
        />
      )}
    </>
  )
}
