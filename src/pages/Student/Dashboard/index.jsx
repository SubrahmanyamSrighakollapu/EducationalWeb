import { useNavigate, Link } from 'react-router-dom'
import { FiBookOpen, FiCheckCircle, FiClock, FiHeart, FiArrowRight, FiStar, FiPlay } from 'react-icons/fi'
import { useAuth } from '../../../context/auth/AuthContext'
import { useStudent } from '../../../context/StudentContext'
import { useStore } from '../../../context/StoreContext'
import { COURSES } from '../../../data/courses'

const ACTIVITY = [
  { icon: <FiPlay />,         bg: '#e8f0ff', color: 'var(--primary)', text: 'Started learning',    sub: 'Full-Stack Web Development Bootcamp',       time: '2h ago' },
  { icon: <FiCheckCircle />,  bg: '#e6faf2', color: '#1a9e5c',        text: 'Completed module',    sub: 'UI/UX Design — Module 3: Prototyping',       time: '1d ago' },
  { icon: <FiStar />,         bg: '#fff8e6', color: '#f7b731',        text: 'Left a review',       sub: 'Rated Python for Everybody ★★★★★',           time: '2d ago' },
  { icon: <FiBookOpen />,     bg: '#f0eeff', color: '#6c63ff',        text: 'New course enrolled', sub: 'AWS Cloud Practitioner Certification',        time: '3d ago' },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const { enrolledCourses, inProgress, completed } = useStudent()
  const { wishlist } = useStore()
  const navigate = useNavigate()

  const recommended = COURSES.filter(c => !enrolledCourses.find(e => e.id === c.id)).slice(0, 3)

  const STATS = [
    { icon: <FiBookOpen />,    bg: '#e8f0ff', color: 'var(--primary)', label: 'Enrolled Courses',  value: enrolledCourses.length },
    { icon: <FiClock />,       bg: '#fff8e6', color: '#f7b731',        label: 'In Progress',        value: inProgress.length },
    { icon: <FiCheckCircle />, bg: '#e6faf2', color: '#1a9e5c',        label: 'Completed',          value: completed.length },
    { icon: <FiHeart />,       bg: '#fff0f0', color: '#ff6b6b',        label: 'Wishlist',           value: wishlist.length },
  ]

  return (
    <>
      {/* Welcome */}
      <div className="admin-page-header">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0] || 'Student'} 👋</h1>
          <p>Continue your learning journey. You're doing great!</p>
        </div>
        <button className="btn-primary-sm" onClick={() => navigate('/student/courses')}>
          <FiBookOpen /> Browse Courses
        </button>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 22 }}>
        {/* My Courses */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div><h3>My Courses</h3><p>Continue where you left off</p></div>
            <button className="btn-outline-sm" onClick={() => navigate('/student/my-courses')}>View All</button>
          </div>
          {enrolledCourses.length === 0 ? (
            <div className="admin-empty">
              <FiBookOpen />
              <h4>No courses yet</h4>
              <p>Browse and enroll in courses to start learning.</p>
              <button className="btn-primary-sm" style={{ marginTop: 14 }} onClick={() => navigate('/student/courses')}>
                Browse Courses
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {enrolledCourses.slice(0, 4).map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderBottom: '1px solid #f0f3f7' }}>
                  {c.image && <img src={c.image} alt={c.title} style={{ width: 52, height: 38, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</div>
                    <div style={{ background: '#f0f2f5', borderRadius: 20, height: 6, overflow: 'hidden' }}>
                      <div style={{ width: `${c.progress}%`, height: '100%', background: 'var(--primary)', borderRadius: 20, transition: 'width 0.4s' }} />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-gray)', marginTop: 4 }}>{c.progress}% complete</div>
                  </div>
                  <Link to={`/student/courses/${c.slug}`} className="btn-primary-sm" style={{ padding: '7px 14px', fontSize: '0.78rem' }}>
                    <FiPlay /> Continue
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div><h3>Recent Activity</h3></div>
          </div>
          <div className="activity-list">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot" style={{ background: a.bg, color: a.color }}>{a.icon}</div>
                <div className="activity-text">
                  <strong>{a.text}</strong>
                  <p>{a.sub}</p>
                </div>
                <span className="activity-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended */}
      {recommended.length > 0 && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div><h3>Recommended For You</h3><p>Courses you might enjoy</p></div>
            <button className="btn-outline-sm" onClick={() => navigate('/student/courses')}>View All <FiArrowRight /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
            {recommended.map((c, i) => (
              <Link key={c.id} to={`/student/courses/${c.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: 12, padding: '16px 22px', borderRight: i < 2 ? '1px solid #f0f3f7' : 'none' }}>
                <img src={c.image} alt={c.title} style={{ width: 60, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)', marginBottom: 4, lineHeight: 1.4 }}>{c.title.slice(0, 40)}{c.title.length > 40 ? '…' : ''}</div>
                  <div style={{ fontSize: '0.75rem', color: '#f7b731', fontWeight: 700 }}>★ {c.rating}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', marginTop: 2 }}>₹{c.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
