import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiPlay, FiBookOpen, FiCheckCircle, FiClock, FiAlertCircle,
  FiX, FiRefreshCw, FiLock, FiUnlock, FiAward, FiChevronRight
} from 'react-icons/fi'
import { FaUniversity } from 'react-icons/fa'
import { useStudent } from '../../../context/StudentContext'
import { useAdmin } from '../../../context/AdminContext'
import { useAuth } from '../../../context/auth/AuthContext'

const PLATFORM_FEE_PCT = 10 // 10% platform fee deducted

function ProgressRing({ pct, size = 56 }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const color = pct === 100 ? '#26de81' : pct >= 60 ? 'var(--primary)' : '#f7b731'
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0f2f5" strokeWidth={6} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease' }} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', fontSize: size < 50 ? 9 : 11, fontWeight: 800, fill: color }}>
        {pct}%
      </text>
    </svg>
  )
}

function RefundModal({ course, onClose, onSubmit }) {
  const { user } = useAuth()
  const platformFee = Math.round(course.paidAmount * PLATFORM_FEE_PCT / 100)
  const refundAmt   = course.paidAmount - platformFee

  const [form, setForm] = useState({
    reason: '', bankName: '', accountHolder: user?.name || '',
    accountNumber: '', confirmAccount: '', ifsc: '', upiId: '',
  })
  const [step,    setStep]    = useState(1) // 1=reason, 2=bank, 3=confirm
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      onSubmit({ ...form, platformFee, refundAmount: refundAmt })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff0f0', color: '#ff6b6b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}><FiRefreshCw /></div>
            <div>
              <h3 style={{ margin: 0 }}>Raise Refund Request</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)', margin: 0 }}>Step {step} of 3</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 26px', borderBottom: '1px solid #f0f3f7', gap: 0 }}>
          {['Reason', 'Bank Details', 'Confirm'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: step > i + 1 ? '#26de81' : step === i + 1 ? 'var(--primary)' : '#e8edf3', color: step >= i + 1 ? '#fff' : '#aaa', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: step === i + 1 ? 700 : 400, color: step === i + 1 ? 'var(--text-dark)' : '#aaa' }}>{s}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? '#26de81' : '#e8edf3', margin: '0 10px' }} />}
            </div>
          ))}
        </div>

        <div className="modal-body">
          {/* Course summary */}
          <div style={{ display: 'flex', gap: 12, background: '#f7f9fc', borderRadius: 10, padding: '12px 14px', marginBottom: 20, alignItems: 'center' }}>
            <img src={course.image} alt={course.title} style={{ width: 52, height: 38, borderRadius: 7, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Paid: ₹{course.paidAmount?.toLocaleString()} • Completed 100%</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-gray)' }}>Refund Amount</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1a9e5c' }}>₹{refundAmt.toLocaleString()}</div>
            </div>
          </div>

          {step === 1 && (
            <div className="form-grid cols-1">
              <div className="form-field">
                <label>Reason for Refund Request *</label>
                <textarea className="form-textarea" rows={4} placeholder="Please describe why you are requesting a refund…" value={form.reason} onChange={set('reason')} />
              </div>
              <div style={{ background: '#fff8e6', borderRadius: 10, padding: '12px 14px', fontSize: '0.82rem', color: '#b8860b', lineHeight: 1.6 }}>
                <strong>Refund Policy:</strong> A platform fee of {PLATFORM_FEE_PCT}% (₹{platformFee.toLocaleString()}) will be deducted. You will receive ₹{refundAmt.toLocaleString()} within 7–10 business days.
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-grid">
              <div className="form-section-title">Bank Account Details</div>
              <div className="form-field">
                <label>Bank Name *</label>
                <div style={{ position: 'relative' }}>
                  <FaUniversity style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                  <input className="form-input" style={{ paddingLeft: 36 }} placeholder="e.g. HDFC Bank" value={form.bankName} onChange={set('bankName')} />
                </div>
              </div>
              <div className="form-field">
                <label>Account Holder Name *</label>
                <input className="form-input" placeholder="As per bank records" value={form.accountHolder} onChange={set('accountHolder')} />
              </div>
              <div className="form-field">
                <label>Account Number *</label>
                <input className="form-input" type="password" placeholder="Enter account number" value={form.accountNumber} onChange={set('accountNumber')} />
              </div>
              <div className="form-field">
                <label>Confirm Account Number *</label>
                <input className="form-input" placeholder="Re-enter account number" value={form.confirmAccount} onChange={set('confirmAccount')} />
              </div>
              <div className="form-field">
                <label>IFSC Code *</label>
                <input className="form-input" placeholder="e.g. HDFC0001234" value={form.ifsc} onChange={set('ifsc')} style={{ textTransform: 'uppercase' }} />
              </div>
              <div className="form-field">
                <label>UPI ID <span style={{ color: '#aaa', fontWeight: 400 }}>(optional)</span></label>
                <input className="form-input" placeholder="name@upi" value={form.upiId} onChange={set('upiId')} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#f7f9fc', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 12, color: 'var(--text-dark)' }}>Refund Summary</div>
                {[
                  ['Course Paid Amount', `₹${course.paidAmount?.toLocaleString()}`],
                  [`Platform Fee (${PLATFORM_FEE_PCT}%)`, `− ₹${platformFee.toLocaleString()}`],
                  ['Refund Amount', `₹${refundAmt.toLocaleString()}`],
                ].map(([l, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '7px 0', borderBottom: i < 2 ? '1px solid #e8edf3' : 'none', fontWeight: i === 2 ? 800 : 400, color: i === 2 ? '#1a9e5c' : i === 1 ? '#ff6b6b' : 'var(--text-gray)' }}>
                    <span>{l}</span><span>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#f7f9fc', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 10, color: 'var(--text-dark)' }}>Bank Details</div>
                {[['Bank', form.bankName],['Account Holder', form.accountHolder],['Account No.', '****' + form.accountNumber.slice(-4)],['IFSC', form.ifsc]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', padding: '5px 0', color: 'var(--text-gray)' }}>
                    <span>{l}</span><span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#e6faf2', borderRadius: 10, padding: '12px 14px', fontSize: '0.82rem', color: '#1a9e5c', lineHeight: 1.6 }}>
                ✓ By submitting, you confirm the bank details are correct. Refund will be processed within 7–10 business days after admin approval.
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step > 1 && <button className="btn-outline-sm" onClick={() => setStep(s => s - 1)}>Back</button>}
          <button className="btn-outline-sm" onClick={onClose}>Cancel</button>
          {step < 3
            ? <button className="btn-primary-sm" onClick={() => setStep(s => s + 1)} disabled={step === 1 && !form.reason.trim()}>
                Next <FiChevronRight />
              </button>
            : <button className="btn-primary-sm" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting…' : 'Submit Request'}
              </button>
          }
        </div>
      </div>
    </div>
  )
}

function SuccessPopup({ course, refundAmt, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 420, textAlign: 'center' }}>
        <div style={{ padding: '40px 32px 32px' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e6faf2', color: '#1a9e5c', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <FiCheckCircle />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 10 }}>Request Submitted!</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-gray)', lineHeight: 1.7, marginBottom: 6 }}>
            Your refund request for <strong>{course.title.slice(0, 40)}…</strong> has been submitted successfully.
          </p>
          <div style={{ background: '#f7f9fc', borderRadius: 10, padding: '14px', margin: '16px 0', fontSize: '0.85rem' }}>
            <div style={{ color: 'var(--text-gray)' }}>Expected Refund Amount</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a9e5c' }}>₹{refundAmt?.toLocaleString()}</div>
            <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: 4 }}>After 10% platform fee deduction</div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 24 }}>Admin will review and process within 7–10 business days.</p>
          <button className="btn-primary-sm" style={{ width: '100%', justifyContent: 'center', padding: 12 }} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  )
}

export default function StudentMyCourses() {
  const { enrolledCourses, submitRefundRequest, hasRefundRequest, getRefundStatus } = useStudent()
  const { addRefundRequest } = useAdmin()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [refundCourse, setRefundCourse] = useState(null)
  const [successData,  setSuccessData]  = useState(null)
  const [activeTab,    setActiveTab]    = useState('all')

  const inProgress = enrolledCourses.filter(c => c.progress < 100)
  const completed  = enrolledCourses.filter(c => c.progress === 100)
  const displayed  = activeTab === 'all' ? enrolledCourses : activeTab === 'progress' ? inProgress : completed

  const handleRefundSubmit = (formData) => {
    const req = submitRefundRequest({
      courseId:          refundCourse.id,
      courseTitle:       refundCourse.title,
      courseImage:       refundCourse.image,
      paidAmount:        refundCourse.paidAmount,
      completionPercent: refundCourse.progress,
      completedModules:  refundCourse.completedModules,
      totalModules:      refundCourse.totalModules,
      studentName:       user?.name || 'Student',
      studentEmail:      user?.email || '',
      studentPhone:      formData.bankName,
      reason:            formData.reason,
      bankName:          formData.bankName,
      accountHolder:     formData.accountHolder,
      accountNumber:     formData.accountNumber,
      ifsc:              formData.ifsc,
      upiId:             formData.upiId,
      platformFee:       formData.platformFee,
      refundAmount:      formData.refundAmount,
    })
    // Also push to admin
    addRefundRequest({ ...req, id: req.id })
    setSuccessData({ course: refundCourse, refundAmt: formData.refundAmount })
    setRefundCourse(null)
  }

  const getStatusColor = (pct) => pct === 100 ? '#26de81' : pct >= 60 ? 'var(--primary)' : '#f7b731'
  const getStatusLabel = (pct) => pct === 100 ? 'Completed' : pct >= 60 ? 'In Progress' : pct > 0 ? 'Started' : 'Not Started'
  const getStatusBg    = (pct) => pct === 100 ? '#e6faf2' : pct >= 60 ? '#e8f0ff' : '#fff8e6'

  if (enrolledCourses.length === 0) return (
    <>
      <div className="admin-page-header"><div><h1>My Courses</h1><p>Your enrolled courses</p></div></div>
      <div className="admin-card">
        <div className="admin-empty">
          <FiBookOpen />
          <h4>No enrolled courses yet</h4>
          <p>Browse our course catalog and enroll to start learning.</p>
          <button className="btn-primary-sm" style={{ marginTop: 14 }} onClick={() => navigate('/student/courses')}>Browse Courses</button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className="admin-page-header">
        <div><h1>My Courses</h1><p>{enrolledCourses.length} enrolled course{enrolledCourses.length > 1 ? 's' : ''}</p></div>
        <button className="btn-outline-sm" onClick={() => navigate('/student/courses')}><FiBookOpen /> Browse More</button>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { label: 'Total Enrolled', value: enrolledCourses.length, icon: <FiBookOpen />, bg: '#e8f0ff', color: 'var(--primary)' },
          { label: 'In Progress',    value: inProgress.length,      icon: <FiClock />,    bg: '#fff8e6', color: '#f7b731' },
          { label: 'Completed',      value: completed.length,        icon: <FiAward />,    bg: '#e6faf2', color: '#1a9e5c' },
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

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#f0f2f5', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {[['all','All Courses'],['progress','In Progress'],['completed','Completed']].map(([k, l]) => (
          <button key={k} onClick={() => setActiveTab(k)}
            style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.83rem', fontFamily: 'inherit', background: activeTab === k ? '#fff' : 'transparent', color: activeTab === k ? 'var(--primary)' : '#888', boxShadow: activeTab === k ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.18s' }}>
            {l}
          </button>
        ))}
      </div>

      {/* Course cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {displayed.map(c => {
          const refundStatus = getRefundStatus(c.id)
          const hasRefund    = hasRefundRequest(c.id)
          const canRefund    = c.progress === 100 && !hasRefund

          return (
            <div key={c.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8edf3', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(36,89,159,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}>

              {/* Image */}
              <div style={{ position: 'relative' }}>
                <img src={c.image} alt={c.title} style={{ width: '100%', height: 148, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, background: getStatusBg(c.progress), color: getStatusColor(c.progress), padding: '3px 10px', borderRadius: 20 }}>
                    {getStatusLabel(c.progress)}
                  </span>
                </div>
                {c.progress === 100 && (
                  <div style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderRadius: '50%', background: '#26de81', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                    <FiAward />
                  </div>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{c.category}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', marginTop: 3 }}>by {c.instructor}</div>
                </div>

                {/* Progress section */}
                <div style={{ background: '#f7f9fc', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <ProgressRing pct={c.progress} size={52} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)', marginBottom: 5 }}>
                        <span>Modules</span>
                        <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{c.completedModules}/{c.totalModules || 8}</span>
                      </div>
                      <div style={{ background: '#e8edf3', borderRadius: 20, height: 6, overflow: 'hidden' }}>
                        <div style={{ width: `${c.progress}%`, height: '100%', background: getStatusColor(c.progress), borderRadius: 20, transition: 'width 0.6s ease' }} />
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-gray)', marginTop: 4 }}>
                        {c.progress === 100 ? '🎉 Course completed!' : `${c.totalModules - c.completedModules} modules remaining`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#aaa' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock /> Enrolled {c.enrolledAt}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>₹{c.paidAmount?.toLocaleString()}</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <Link to={`/student/courses/${c.slug}`} className="btn-primary-sm" style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: '0.8rem' }}>
                    <FiPlay /> {c.progress === 100 ? 'Review' : 'Continue'}
                  </Link>

                  {c.progress === 100 && (
                    hasRefund ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 9, fontSize: '0.75rem', fontWeight: 700,
                        background: refundStatus === 'approved' ? '#e6faf2' : refundStatus === 'rejected' ? '#fff0f0' : '#fff8e6',
                        color: refundStatus === 'approved' ? '#1a9e5c' : refundStatus === 'rejected' ? '#cc3333' : '#b8860b',
                        border: '1.5px solid', borderColor: refundStatus === 'approved' ? '#26de81' : refundStatus === 'rejected' ? '#ff6b6b' : '#f7b731',
                        whiteSpace: 'nowrap' }}>
                        {refundStatus === 'approved' ? <><FiUnlock /> Approved</> : refundStatus === 'rejected' ? <><FiAlertCircle /> Rejected</> : <><FiClock /> Pending</>}
                      </div>
                    ) : (
                      <button onClick={() => setRefundCourse(c)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 9, fontSize: '0.78rem', fontWeight: 700, background: 'none', border: '1.5px solid #ff6b6b', color: '#ff6b6b', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.18s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#fff0f0' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none' }}>
                        <FiRefreshCw /> Refund
                      </button>
                    )
                  )}

                  {c.progress < 100 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 10px', borderRadius: 9, fontSize: '0.72rem', color: '#aaa', border: '1.5px solid #e8edf3', whiteSpace: 'nowrap' }}>
                      <FiLock /> Complete to refund
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Refund modal */}
      {refundCourse && (
        <RefundModal
          course={refundCourse}
          onClose={() => setRefundCourse(null)}
          onSubmit={handleRefundSubmit}
        />
      )}

      {/* Success popup */}
      {successData && (
        <SuccessPopup
          course={successData.course}
          refundAmt={successData.refundAmt}
          onClose={() => setSuccessData(null)}
        />
      )}
    </>
  )
}
