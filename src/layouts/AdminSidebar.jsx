import { NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiBookOpen, FiUsers, FiUser, FiLogOut, FiBarChart2, FiSettings, FiRefreshCw, FiAward } from 'react-icons/fi'
import { useAuth } from '../context/auth/AuthContext'
import { useAdmin } from '../context/AdminContext'
import { useTutor } from '../context/TutorContext'
import logoImg from '../assets/logo.png'
import '../layouts/Dashboard.css'

export default function AdminSidebar({ collapsed }) {
  const { logout } = useAuth()
  const { courses, students, refundRequests } = useAdmin()
  const { requests: tutorRequests } = useTutor()
  const navigate = useNavigate()

  const pendingRefunds = refundRequests?.filter(r => r.status === 'pending').length || 0
  const pendingTutors  = tutorRequests?.filter(r => r.status === 'pending').length || 0
  const counts = { courses: courses.length, students: students.length, refunds: pendingRefunds, tutors: pendingTutors }

  const handleLogout = () => { logout(); navigate('/login') }

  const MAIN_NAV = [
    { to: '/admin',          icon: <FiGrid />,      label: 'Dashboard',           end: true },
    { to: '/admin/courses',  icon: <FiBookOpen />,  label: 'Courses',             badge: 'courses' },
    { to: '/admin/students', icon: <FiUsers />,     label: 'Students',            badge: 'students' },
    { to: '/admin/refunds',  icon: <FiRefreshCw />, label: 'Refunds',             badge: 'refunds' },
    { to: '/admin/tutors',   icon: <FiAward />,     label: 'Tutors / Institutes', badge: 'tutors' },
  ]
  const ANALYTICS_NAV = [
    { to: '/admin/reports',  icon: <FiBarChart2 />, label: 'Reports' },
  ]
  const ACCOUNT_NAV = [
    { to: '/admin/profile',  icon: <FiUser />,      label: 'Profile' },
    { to: '/admin/settings', icon: <FiSettings />,  label: 'Settings' },
  ]

  const renderLink = (item) => (
    <NavLink key={item.to} to={item.to} end={item.end}
      className={({ isActive }) => `asb-link${isActive ? ' active' : ''}`}>
      {item.icon}
      <span>{item.label}</span>
      {item.badge && counts[item.badge] > 0 && (
        <span className="asb-badge"
          style={item.badge === 'refunds' || item.badge === 'tutors'
            ? { background: 'rgba(255,107,107,0.3)', color: '#ff9999' }
            : {}}>
          {counts[item.badge]}
        </span>
      )}
    </NavLink>
  )

  return (
    <aside className={`admin-sidebar${collapsed ? ' collapsed' : ''}`}>
      <NavLink to="/admin" className="asb-logo">
        <img src={logoImg} alt="Education Web" />
        <span className="asb-logo-badge">Admin</span>
      </NavLink>

      <nav className="asb-nav">
        <div className="asb-section-label">Main Menu</div>
        {MAIN_NAV.map(renderLink)}

        <div className="asb-section-label" style={{ marginTop: 8 }}>Analytics</div>
        {ANALYTICS_NAV.map(renderLink)}

        <div className="asb-section-label" style={{ marginTop: 8 }}>Account</div>
        {ACCOUNT_NAV.map(renderLink)}
      </nav>

      <div className="asb-bottom">
        <button className="asb-logout" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  )
}
