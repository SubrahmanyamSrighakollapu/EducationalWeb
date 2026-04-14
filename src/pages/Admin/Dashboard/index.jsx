import { useNavigate } from 'react-router-dom'
import { FiBookOpen, FiUsers, FiTrendingUp, FiDollarSign, FiArrowUp, FiPlus, FiUserPlus, FiActivity, FiStar } from 'react-icons/fi'
import { useAdmin } from '../../../context/AdminContext'
import { useAuth } from '../../../context/auth/AuthContext'

const ACTIVITY = [
  { icon: <FiUserPlus />, bg: '#e8f0ff', color: 'var(--primary)', text: 'New student enrolled', sub: 'Rahul Sharma joined Full-Stack Web Development', time: '2m ago' },
  { icon: <FiBookOpen />, bg: '#e6faf2', color: '#1a9e5c',        text: 'Course published',      sub: 'Python for Everybody is now live',              time: '1h ago' },
  { icon: <FiStar />,     bg: '#fff8e6', color: '#f7b731',        text: 'New review received',   sub: '5★ review on UI/UX Design Essentials',          time: '3h ago' },
  { icon: <FiActivity />, bg: '#fff0f0', color: '#ff6b6b',        text: 'Course deactivated',    sub: 'Brand Identity course set to inactive',          time: '5h ago' },
  { icon: <FiUserPlus />, bg: '#e8f0ff', color: 'var(--primary)', text: 'New student enrolled',  sub: 'Priya Mehta joined Business Analysis',           time: '8h ago' },
]

export default function AdminDashboard() {
  const { courses, students } = useAdmin()
  const { user } = useAuth()
  const navigate = useNavigate()

  const activeCourses  = courses.filter(c => c.status === 'active').length
  const activeStudents = students.filter(s => s.status === 'active').length
  const totalRevenue   = courses.reduce((s, c) => s + (c.price * (c.enrolledCount || 0)), 0)
  const avgRating      = (courses.reduce((s, c) => s + (c.rating || 0), 0) / (courses.length || 1)).toFixed(1)

  const STATS = [
    { icon: <FiBookOpen />, bg: '#e8f0ff', color: 'var(--primary)', label: 'Total Courses',   value: courses.length,  trend: `${activeCourses} active`,   up: true },
    { icon: <FiUsers />,    bg: '#e6faf2', color: '#1a9e5c',        label: 'Total Students',  value: students.length, trend: `${activeStudents} active`,   up: true },
    { icon: <FiDollarSign />,bg:'#fff8e6', color: '#f7b731',        label: 'Total Revenue',   value: `₹${(totalRevenue/1000).toFixed(0)}K`, trend: '+12% this month', up: true },
    { icon: <FiStar />,     bg: '#f0eeff', color: '#6c63ff',        label: 'Avg. Rating',     value: avgRating,       trend: 'Across all courses',         up: true },
  ]

  const recentCourses  = [...courses].slice(0, 5)
  const recentStudents = [...students].slice(0, 5)

  return (
    <>
      {/* Welcome */}
      <div className="admin-page-header">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋</h1>
          <p>Here's what's happening with your platform today.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline-sm" onClick={() => navigate('/admin/students')}><FiUserPlus /> Add Student</button>
          <button className="btn-primary-sm" onClick={() => navigate('/admin/courses')}><FiPlus /> Add Course</button>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-trend ${s.up ? 'up' : 'down'}`}><FiArrowUp /> {s.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        {/* Recent Courses */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div><h3>Recent Courses</h3><p>Latest added courses</p></div>
            <button className="btn-outline-sm" onClick={() => navigate('/admin/courses')}>View All</button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Course</th><th>Category</th><th>Status</th></tr></thead>
              <tbody>
                {recentCourses.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={c.image} alt={c.title} className="td-img" />
                        <div className="td-title">{c.title.slice(0, 32)}…</div>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '0.78rem', color: 'var(--text-gray)' }}>{c.category}</span></td>
                    <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Students */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div><h3>Recent Students</h3><p>Newly registered students</p></div>
            <button className="btn-outline-sm" onClick={() => navigate('/admin/students')}>View All</button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Student</th><th>Courses</th><th>Status</th></tr></thead>
              <tbody>
                {recentStudents.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="td-avatar">{s.name[0]}</div>
                        <div className="td-title">{s.name}<small>{s.email}</small></div>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '0.78rem', color: 'var(--text-gray)' }}>{s.enrolledCourses.length} enrolled</span></td>
                    <td><span className={`status-badge ${s.status}`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div><h3>Recent Activity</h3><p>Latest platform events</p></div>
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
    </>
  )
}
