
import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaHome,
  FaList,
  FaUser,
  FaClipboardList
} from 'react-icons/fa'

function Navbar() {
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

        </div>
      </div>
    </nav>
  )
}

export default Navbar
