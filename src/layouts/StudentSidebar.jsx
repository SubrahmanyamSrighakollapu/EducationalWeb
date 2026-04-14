import { NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiBookOpen, FiList, FiShoppingCart, FiHeart, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/auth/AuthContext'
import { useStore } from '../context/StoreContext'
import { useStudent } from '../context/StudentContext'
import logoImg from '../assets/logo.png'
import './Dashboard.css'

export default function StudentSidebar({ collapsed }) {
  const { logout } = useAuth()
  const { cart, wishlist } = useStore()
  const { enrolledCourses } = useStudent()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const NAV = [
    { to: '/student',            icon: <FiGrid />,        label: 'Dashboard',       end: true },
    { to: '/student/courses',    icon: <FiBookOpen />,    label: 'Browse Courses' },
    { to: '/student/my-courses', icon: <FiList />,        label: 'My Courses',      count: enrolledCourses.length },
    { to: '/student/cart',       icon: <FiShoppingCart />,label: 'Cart',            count: cart.length },
    { to: '/student/wishlist',   icon: <FiHeart />,       label: 'Wishlist',        count: wishlist.length },
    { to: '/student/profile',    icon: <FiUser />,        label: 'Profile' },
  ]

  return (
    <aside className={`admin-sidebar${collapsed ? ' collapsed' : ''}`}>
      <NavLink to="/student" className="asb-logo">
        <img src={logoImg} alt="Education Web" />
        <span className="asb-logo-badge">Student</span>
      </NavLink>

      <nav className="asb-nav">
        <div className="asb-section-label">Navigation</div>
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end}
            className={({ isActive }) => `asb-link${isActive ? ' active' : ''}`}>
            {item.icon}
            <span>{item.label}</span>
            {item.count > 0 && <span className="asb-badge">{item.count}</span>}
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
