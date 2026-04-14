import { Link, useNavigate } from 'react-router-dom'
import { FiPlay, FiBookOpen, FiCheckCircle, FiClock } from 'react-icons/fi'
import { useStudent } from '../../../context/StudentContext'

export default function StudentMyCourses() {
  const { enrolledCourses } = useStudent()
  const navigate = useNavigate()

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

  const inProgress = enrolledCourses.filter(c => c.progress < 100)
  const completed  = enrolledCourses.filter(c => c.progress === 100)

  const CourseCard = ({ c }) => (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf3', overflow: 'hidden', transition: 'box-shadow 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(36,89,159,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
      <div style={{ position: 'relative' }}>
        <img src={c.image} alt={c.title} style={{ width: '100%', height: 150, objectFit: 'cover', display: 'block' }} />
        {c.progress === 100 && (
          <div style={{ position: 'absolute', top: 10, right: 10, background: '#26de81', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>Completed</div>
        )}
      </div>
      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>{c.category}</div>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.title}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)', marginBottom: 12 }}>by {c.instructor}</div>
        {/* Progress bar */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)', marginBottom: 5 }}>
            <span>Progress</span><span style={{ fontWeight: 700, color: c.progress === 100 ? '#1a9e5c' : 'var(--primary)' }}>{c.progress}%</span>
          </div>
          <div style={{ background: '#f0f2f5', borderRadius: 20, height: 7, overflow: 'hidden' }}>
            <div style={{ width: `${c.progress}%`, height: '100%', background: c.progress === 100 ? '#26de81' : 'var(--primary)', borderRadius: 20 }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: 'var(--text-gray)' }}>
            <FiClock /> Enrolled {c.enrolledAt}
          </div>
          <Link to={`/student/courses/${c.slug}`} className="btn-primary-sm" style={{ padding: '7px 14px', fontSize: '0.78rem' }}>
            <FiPlay /> {c.progress === 100 ? 'Review' : 'Continue'}
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="admin-page-header">
        <div><h1>My Courses</h1><p>{enrolledCourses.length} enrolled course{enrolledCourses.length > 1 ? 's' : ''}</p></div>
        <button className="btn-outline-sm" onClick={() => navigate('/student/courses')}><FiBookOpen /> Browse More</button>
      </div>

      {inProgress.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <FiClock style={{ color: '#f7b731' }} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-dark)' }}>In Progress ({inProgress.length})</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {inProgress.map(c => <CourseCard key={c.id} c={c} />)}
          </div>
        </>
      )}

      {completed.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: 4 }}>
            <FiCheckCircle style={{ color: '#26de81' }} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-dark)' }}>Completed ({completed.length})</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {completed.map(c => <CourseCard key={c.id} c={c} />)}
          </div>
        </>
      )}
    </>
  )
}
