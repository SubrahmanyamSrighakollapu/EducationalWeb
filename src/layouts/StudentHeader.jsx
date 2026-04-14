import { useNavigate } from 'react-router-dom'
import { FiMenu, FiBell, FiSearch, FiShoppingCart, FiHeart, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../context/auth/AuthContext'
import { useStore } from '../context/StoreContext'

export default function StudentHeader({ onToggle, page }) {
  const { user } = useAuth()
  const { cart, wishlist } = useStore()
  const navigate = useNavigate()

  return (
    <header className="admin-header">
      <button className="ah-toggle" onClick={onToggle}><FiMenu /></button>
      <div className="ah-breadcrumb">
        <span>Student</span><FiChevronRight /><span>{page}</span>
      </div>
      <div className="ah-spacer" />
      <div className="ah-search">
        <FiSearch />
        <input placeholder="Search courses…" onKeyDown={e => e.key === 'Enter' && navigate('/student/courses')} />
      </div>
      <button className="ah-icon-btn" onClick={() => navigate('/student/wishlist')} style={{ position: 'relative' }}>
        <FiHeart />
        {wishlist.length > 0 && <span className="ah-notif-dot" style={{ background: '#ff6b6b' }} />}
      </button>
      <button className="ah-icon-btn" onClick={() => navigate('/student/cart')} style={{ position: 'relative' }}>
        <FiShoppingCart />
        {cart.length > 0 && <span className="ah-notif-dot" />}
      </button>
      <button className="ah-icon-btn">
        <FiBell />
      </button>
      <button className="ah-avatar-btn">
        <div className="ah-avatar">{user?.name?.[0]?.toUpperCase() || 'S'}</div>
        <div>
          <div className="ah-name">{user?.name?.split(' ')[0] || 'Student'}</div>
          <div className="ah-role">Student</div>
        </div>
      </button>
    </header>
  )
}
