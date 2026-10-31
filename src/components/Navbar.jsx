import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaHome,
  FaList,
  FaUser,
  FaClipboardList,
  FaUserShield,
  FaSignOutAlt
} from 'react-icons/fa'

function Navbar() {
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setUser(localStorage.getItem('loggedInUser') || '')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setUser('')
    alert('Logged out successfully!')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          <FaCalendarAlt /> College Events
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            <FaHome /> Home
          </Link>

          <Link className="nav-link" to="/events">
            <FaList /> Events
          </Link>

          <Link className="nav-link" to="/register">
            <FaUser /> Register
          </Link>

          <Link className="nav-link" to="/my-events">
            <FaClipboardList /> My Events
          </Link>

          <Link className="nav-link" to="/admin">
            <FaUserShield /> Admin
          </Link>

          {user ? (
            <>
              <span className="nav-link">
                Welcome, {user}
              </span>

              <button
                className="btn btn-outline-light btn-sm ms-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link className="nav-link" to="/login">
              <FaUser /> Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  )
}

export default Navbar
