import { NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiBookOpen, FiUsers, FiUser, FiLogOut, FiBarChart2, FiSettings } from 'react-icons/fi'
import { useAuth } from '../context/auth/AuthContext'
import { useAdmin } from '../context/AdminContext'
import logoImg from '../assets/logo.png'
import '../layouts/Dashboard.css'

const NAV = [
  { to: '/admin',          icon: <FiGrid />,      label: 'Dashboard',  end: true },
  { to: '/admin/courses',  icon: <FiBookOpen />,  label: 'Courses',    badge: 'courses' },
  { to: '/admin/students', icon: <FiUsers />,     label: 'Students',   badge: 'students' },
  { to: '/admin/reports',  icon: <FiBarChart2 />, label: 'Reports' },
  { to: '/admin/profile',  icon: <FiUser />,      label: 'Profile' },
  { to: '/admin/settings', icon: <FiSettings />,  label: 'Settings' },
]

export default function AdminSidebar({ collapsed }) {
  const { logout } = useAuth()
  const { courses, students } = useAdmin()
  const navigate = useNavigate()

  const counts = { courses: courses.length, students: students.length }

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <aside className={`admin-sidebar${collapsed ? ' collapsed' : ''}`}>
      <NavLink to="/admin" className="asb-logo">
        <img src={logoImg} alt="Education Web" />
        <span className="asb-logo-badge">Admin</span>
      </NavLink>

      <nav className="asb-nav">
        <div className="asb-section-label">Main Menu</div>
        {NAV.slice(0, 3).map(item => (
          <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `asb-link${isActive ? ' active' : ''}`}>
            {item.icon}
            <span>{item.label}</span>
            {item.badge && counts[item.badge] > 0 && (
              <span className="asb-badge">{counts[item.badge]}</span>
            )}
          </NavLink>
        ))}

        <div className="asb-section-label" style={{ marginTop: 8 }}>Analytics</div>
        {NAV.slice(3, 4).map(item => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `asb-link${isActive ? ' active' : ''}`}>
            {item.icon}<span>{item.label}</span>
          </NavLink>
        ))}

        <div className="asb-section-label" style={{ marginTop: 8 }}>Account</div>
        {NAV.slice(4).map(item => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `asb-link${isActive ? ' active' : ''}`}>
            {item.icon}<span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="asb-bottom">
        <button className="asb-logout" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  )
}
