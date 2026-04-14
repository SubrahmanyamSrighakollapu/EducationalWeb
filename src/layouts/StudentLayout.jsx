import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import StudentHeader from './StudentHeader'
import './Dashboard.css'

const PAGE_TITLES = {
  '/student':             'Dashboard',
  '/student/courses':     'Browse Courses',
  '/student/my-courses':  'My Courses',
  '/student/cart':        'My Cart',
  '/student/wishlist':    'My Wishlist',
  '/student/checkout':    'Checkout',
  '/student/profile':     'My Profile',
}

export default function StudentLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const page = PAGE_TITLES[location.pathname] || 'Dashboard'

  return (
    <div className="admin-shell">
      <StudentSidebar collapsed={collapsed} />
      <div className={`admin-main${collapsed ? ' full' : ''}`}>
        <StudentHeader onToggle={() => setCollapsed(v => !v)} page={page} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
