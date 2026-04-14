import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FiChevronDown, FiArrowRight, FiMenu, FiX, FiShoppingCart, FiHeart, FiUser, FiLogOut, FiGrid } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { useAuth } from '../context/auth/AuthContext'
import logoImg from '../assets/logo.png'
import './Header.css'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileEnrollOpen, setMobileEnrollOpen] = useState(false)
  const { cart, wishlist } = useStore()
  const { user, logout } = useAuth()
  const closeMenu = () => setMobileOpen(false)

  return (
    <header className="header">
      <div className="header-inner">

        {/* Logo */}
        <NavLink to="/" className="logo">
          <img src={logoImg} alt="Education Web" className="logo-img" />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>HOME</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>ABOUT</NavLink>
          <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>COURSES</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>CONTACT</NavLink>
        </nav>

        {/* Icons + CTA */}
        <div className="header-actions">
          <NavLink to="/wishlist" className="icon-btn" title="Wishlist">
            <FiHeart />
            {wishlist.length > 0 && <span className="icon-badge">{wishlist.length}</span>}
          </NavLink>
          <NavLink to="/cart" className="icon-btn" title="Cart">
            <FiShoppingCart />
            {cart.length > 0 && <span className="icon-badge">{cart.length}</span>}
          </NavLink>
          {user ? (
            <div className="header-user-menu">
              <button className="header-user-btn">
                <div className="header-avatar">{user.name?.[0]?.toUpperCase()}</div>
                <span className="header-user-name">{user.name?.split(' ')[0]}</span>
              </button>
              <div className="header-user-dropdown">
                <NavLink to={user.role === 'admin' ? '/admin' : '/student'} className="hud-item">
                  <FiGrid /> Dashboard
                </NavLink>
                <NavLink to={user.role === 'admin' ? '/admin/profile' : '/student/profile'} className="hud-item">
                  <FiUser /> Profile
                </NavLink>
                <button className="hud-item hud-logout" onClick={logout}>
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="join-btn">
              Sign In <FiArrowRight />
            </NavLink>
          )}
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <NavLink to="/" className="mobile-item" onClick={closeMenu}>HOME</NavLink>
        <NavLink to="/about" className="mobile-item" onClick={closeMenu}>ABOUT</NavLink>
        <NavLink to="/courses" className="mobile-item" onClick={closeMenu}>COURSES</NavLink>
        <NavLink to="/contact" className="mobile-item contact-link" onClick={closeMenu}>CONTACT</NavLink>
        <div className="mobile-icon-row">
          <NavLink to="/wishlist" className="mobile-icon-btn" onClick={closeMenu}>
            <FiHeart /> Wishlist {wishlist.length > 0 && <span className="icon-badge">{wishlist.length}</span>}
          </NavLink>
          <NavLink to="/cart" className="mobile-icon-btn" onClick={closeMenu}>
            <FiShoppingCart /> Cart {cart.length > 0 && <span className="icon-badge">{cart.length}</span>}
          </NavLink>
        </div>
        <NavLink to="/enroll" className="mobile-join" onClick={closeMenu}>
          Join Now <FiArrowRight />
        </NavLink>
      </div>
    </header>
  )
}
