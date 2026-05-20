import { useState } from 'react'
import { FiPlus, FiUsers, FiSearch, FiMapPin, FiPhone, FiMail, FiClock, FiAward, FiCheckCircle, FiXCircle, FiDollarSign } from 'react-icons/fi'
import { FaChalkboardTeacher, FaUniversity } from 'react-icons/fa'
import { useTutor } from '../../../context/TutorContext'
import { useAuth } from '../../../context/auth/AuthContext'
import AddTutorModal from './AddTutorModal'
import PayModal from './PayModal'

const STATUS_STYLE = {
  pending:  { bg: '#fff8e6', color: '#b8860b', label: 'Pending Review', icon: <FiClock /> },
  approved: { bg: '#e6faf2', color: '#1a9e5c', label: 'Approved',       icon: <FiCheckCircle /> },
  rejected: { bg: '#fff0f0', color: '#cc3333', label: 'Rejected',       icon: <FiXCircle /> },
}

export default function StudentTutors() {
  const { getStudentRequests } = useTutor()
  const { user } = useAuth()
  const [tab,      setTab]      = useState('all')
  const [search,   setSearch]   = useState('')
  const [showAdd,  setShowAdd]  = useState(false)
  const [payItem,  setPayItem]  = useState(null)

  const all     = getStudentRequests(user?.email || '')
  const tutors  = all.filter(r => r.type === 'tutor')
  const insts   = all.filter(r => r.type === 'institute')
  const display = (tab === 'all' ? all : tab === 'tutor' ? tutors : insts)
    .filter(r => r.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Tutors & Institutes</h1>
          <p>Add and manage your preferred tutors and institutes</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 9, padding: '9px 18px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', lineHeight: 1 }}>
          <FiPlus style={{ fontSize: '0.95rem', flexShrink: 0 }} />
          <span>Add Tutor / Institute</span>
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { icon: <FaChalkboardTeacher />, bg: '#e8f0ff', color: 'var(--primary)', label: 'Tutors Added',     value: tutors.length },
          { icon: <FaUniversity />,        bg: '#f0eeff', color: '#6c63ff',        label: 'Institutes Added', value: insts.length },
          { icon: <FiCheckCircle />,       bg: '#e6faf2', color: '#1a9e5c',        label: 'Approved',         value: all.filter(r => r.status === 'approved').length },
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

      {/* Filter + search */}
      <div className="admin-card" style={{ overflow: 'visible' }}>
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderBottom: '1px solid #f0f3f7' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, background: '#f0f2f5', borderRadius: 9, padding: 3 }}>
            {[['all','All'],['tutor','Tutors'],['institute','Institutes']].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                style={{ padding: '7px 16px', borderRadius: 7, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', fontFamily: 'inherit', background: tab === k ? '#fff' : 'transparent', color: tab === k ? 'var(--primary)' : '#888', boxShadow: tab === k ? '0 2px 6px rgba(0,0,0,0.07)' : 'none', transition: 'all 0.18s' }}>
                {l}
              </button>
            ))}
          </div>
          <div className="admin-search-box" style={{ flex: 1, minWidth: 200 }}>
            <FiSearch />
            <input placeholder="Search by name…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-gray)' }}>{display.length} record{display.length !== 1 ? 's' : ''}</span>
        </div>

        {display.length === 0 ? (
          <div className="admin-empty">
            <FiUsers />
            <h4>No records found</h4>
            <p>{all.length === 0 ? 'Add your first tutor or institute to get started.' : 'No records match your current filter.'}</p>
            {all.length === 0 && (
              <button
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 9, padding: '9px 18px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 14, lineHeight: 1 }}
                onClick={() => setShowAdd(true)}>
                <FiPlus style={{ fontSize: '0.95rem', flexShrink: 0 }} />
                <span>Add Now</span>
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {display.map(r => {
              const s = STATUS_STYLE[r.status]
              const isTutor = r.type === 'tutor'
              return (
                <div key={r.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 22px', borderBottom: '1px solid #f0f3f7' }}>
                  {/* Icon */}
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: isTutor ? '#e8f0ff' : '#f0eeff', color: isTutor ? 'var(--primary)' : '#6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    {isTutor ? <FaChalkboardTeacher /> : <FaUniversity />}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-dark)' }}>{r.name}</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, background: isTutor ? '#e8f0ff' : '#f0eeff', color: isTutor ? 'var(--primary)' : '#6c63ff', padding: '2px 9px', borderRadius: 20, textTransform: 'uppercase' }}>
                        {isTutor ? 'Tutor' : 'Institute'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-gray)', marginBottom: 8 }}>
                      {isTutor ? r.subject : r.category}
                      {isTutor && r.experience && ` • ${r.experience} experience`}
                      {!isTutor && r.affiliation && ` • ${r.affiliation}`}
                    </div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      {r.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#aaa' }}><FiMapPin />{r.location}</span>}
                      {r.phone    && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#aaa' }}><FiPhone />{r.phone}</span>}
                      {r.fee      && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#aaa' }}><FiAward />{r.fee}</span>}
                    </div>
                    {r.status === 'rejected' && r.rejectedReason && (
                      <div style={{ marginTop: 8, fontSize: '0.78rem', color: '#cc3333', background: '#fff0f0', borderRadius: 7, padding: '6px 10px' }}>
                        Reason: {r.rejectedReason}
                      </div>
                    )}
                  </div>

                  {/* Right: status + actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', fontWeight: 700, background: s.bg, color: s.color, padding: '4px 12px', borderRadius: 20 }}>
                      {s.icon} {s.label}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#aaa' }}>Added {r.submittedAt}</span>
                    {r.status === 'approved' && !r.paid && (
                      <button className="btn-primary-sm" style={{ padding: '7px 16px', fontSize: '0.8rem', background: '#1a9e5c' }} onClick={() => setPayItem(r)}>
                        <FiDollarSign /> Pay Now
                      </button>
                    )}
                    {r.status === 'approved' && r.paid && (
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#e6faf2', color: '#1a9e5c', padding: '4px 12px', borderRadius: 20 }}>✓ Paid</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showAdd && <AddTutorModal onClose={() => setShowAdd(false)} />}
      {payItem  && <PayModal item={payItem} onClose={() => setPayItem(null)} />}
    </>
  )
}
