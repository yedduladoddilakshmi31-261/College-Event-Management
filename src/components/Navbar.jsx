
import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaHome,
  FaList,
  FaUser
} from 'react-icons/fa'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          <FaCalendarAlt /> College Events
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome /> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/events">
                <FaList /> Events
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <FaUser /> Register
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
