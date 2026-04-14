import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AdminProvider } from '../context/AdminContext'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import './Dashboard.css'

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/courses': 'Course Management',
  '/admin/students': 'Student Management',
  '/admin/reports': 'Reports',
  '/admin/profile': 'Profile',
  '/admin/settings': 'Settings',
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const page = PAGE_TITLES[location.pathname] || 'Dashboard'

  return (
    <AdminProvider>
      <div className="admin-shell">
        <AdminSidebar collapsed={collapsed} />
        <div className={`admin-main${collapsed ? ' full' : ''}`}>
          <AdminHeader onToggle={() => setCollapsed(v => !v)} page={page} />
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminProvider>
  )
}
