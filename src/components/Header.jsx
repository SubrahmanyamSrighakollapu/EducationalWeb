import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FiChevronDown, FiArrowRight, FiMenu, FiX } from 'react-icons/fi'
import { BsGrid3X3Gap } from 'react-icons/bs'
import './Header.css'

export default function Header() {
  const [enrollOpen, setEnrollOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileEnrollOpen, setMobileEnrollOpen] = useState(false)

  const closeMenu = () => setMobileOpen(false)

  return (
    <header className="header">
      <div className="header-inner">

        {/* Logo */}
        <NavLink to="/" className="logo">
          <BsGrid3X3Gap className="logo-icon" />
          <span>Pay Bharath Skill Education</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>HOME</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>ABOUT</NavLink>
          <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>COURSES</NavLink>

          <div
            className="dropdown"
            onMouseEnter={() => setEnrollOpen(true)}
            onMouseLeave={() => setEnrollOpen(false)}
          >
            <button className={`nav-item dropdown-btn${enrollOpen ? ' active' : ''}`}>
              ENROLL <FiChevronDown className={`chevron${enrollOpen ? ' open' : ''}`} />
            </button>
            {enrollOpen && (
              <div className="dropdown-menu">
                <NavLink to="/enroll/online" className="dropdown-item">Online Courses</NavLink>
                <NavLink to="/enroll/offline" className="dropdown-item">Offline Courses</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>CONTACT</NavLink>
        </nav>

        {/* CTA — desktop */}
        <NavLink to="/enroll" className="join-btn">
          Join Now <FiArrowRight />
        </NavLink>

        {/* Hamburger — mobile/tablet */}
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <NavLink to="/" className="mobile-item" onClick={closeMenu}>HOME</NavLink>
        <NavLink to="/about" className="mobile-item" onClick={closeMenu}>ABOUT</NavLink>
        <NavLink to="/courses" className="mobile-item" onClick={closeMenu}>COURSES</NavLink>

        <div className="mobile-dropdown">
          <button
            className="mobile-item mobile-dropdown-btn"
            onClick={() => setMobileEnrollOpen(!mobileEnrollOpen)}
          >
            ENROLL <FiChevronDown className={`chevron${mobileEnrollOpen ? ' open' : ''}`} />
          </button>
          {mobileEnrollOpen && (
            <div className="mobile-dropdown-menu">
              <NavLink to="/enroll/online" className="mobile-sub-item" onClick={closeMenu}>Online Courses</NavLink>
              <NavLink to="/enroll/offline" className="mobile-sub-item" onClick={closeMenu}>Offline Courses</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/contact" className="mobile-item contact-link" onClick={closeMenu}>CONTACT</NavLink>

        <NavLink to="/enroll" className="mobile-join" onClick={closeMenu}>
          Join Now <FiArrowRight />
        </NavLink>
      </div>
    </header>
  )
}
