
import React from 'react'
import { FaCalendarAlt, FaHome, FaList, FaUser } from 'react-icons/fa'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">

        <a className="navbar-brand" href="/">
          <FaCalendarAlt /> College Events
        </a>

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
              <a className="nav-link" href="/">
                <FaHome /> Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#events">
                <FaList /> Events
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#register">
                <FaUser /> Register
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
