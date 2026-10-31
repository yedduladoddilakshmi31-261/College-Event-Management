
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaHome,
  FaList,
  FaUser,
  FaClipboardList,
  FaUserShield,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa'

function Navbar() {
  const [user, setUser] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setUser(localStorage.getItem('loggedInUser') || '')
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setUser('')
    closeMenu()
    alert('Logged out successfully!')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">

      <div className="container-fluid">

        <Link
          className="navbar-brand"
          to="/"
          onClick={closeMenu}
        >
          <FaCalendarAlt /> College Events
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>

          <div className="navbar-nav ms-auto align-items-lg-center">

            <Link
              className="nav-link"
              to="/"
              onClick={closeMenu}
            >
              <FaHome /> Home
            </Link>

            <Link
              className="nav-link"
              to="/events"
              onClick={closeMenu}
            >
              <FaList /> Events
            </Link>

            <Link
              className="nav-link"
              to="/register"
              onClick={closeMenu}
            >
              <FaUser /> Register
            </Link>

            <Link
              className="nav-link"
              to="/my-events"
              onClick={closeMenu}
            >
              <FaClipboardList /> My Events
            </Link>

            <Link
              className="nav-link"
              to="/admin"
              onClick={closeMenu}
            >
              <FaUserShield /> Admin
            </Link>

            {user ? (
              <>
                <span className="nav-link">
                  Welcome, {user}
                </span>

                <button
                  className="btn btn-outline-light btn-sm ms-lg-2 my-2 my-lg-0"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <Link
                className="nav-link"
                to="/login"
                onClick={closeMenu}
              >
                <FaUser /> Login
              </Link>
            )}

          </div>

        </div>

      </div>

    </nav>
  )
}

export default Navbar
