import { FiMenu, FiBell, FiSearch, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../context/auth/AuthContext'

export default function AdminHeader({ onToggle, page }) {
  const { user } = useAuth()
  return (
    <header className="admin-header">
      <button className="ah-toggle" onClick={onToggle}><FiMenu /></button>
      <div className="ah-breadcrumb">
        <span>Admin</span><FiChevronRight /><span>{page}</span>
      </div>
      <div className="ah-spacer" />
      <div className="ah-search">
        <FiSearch />
        <input placeholder="Search anything…" />
      </div>
      <button className="ah-icon-btn">
        <FiBell />
        <span className="ah-notif-dot" />
      </button>
      <button className="ah-avatar-btn">
        <div className="ah-avatar">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
        <div>
          <div className="ah-name">{user?.name || 'Admin'}</div>
          <div className="ah-role">Administrator</div>
        </div>
      </button>
    </header>
  )
}
