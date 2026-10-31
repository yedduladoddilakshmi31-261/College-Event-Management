
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import '../App.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      alert('Please enter your email and password.')
      return
    }

    localStorage.setItem('loggedInUser', email.trim())

    alert('Login successful!')

    navigate('/')
  }

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-5">

            <div className="card shadow p-4">

              <div className="text-center mb-4">
                <FaUser size={45} color="#4f46e5" />

                <h2 className="mt-3">
                  Student Login
                </h2>

                <p className="text-muted">
                  Login to access your college event portal.
                </p>
              </div>

              <form onSubmit={handleLogin}>

                <div className="mb-3">

                  <label className="form-label">
                    Email Address
                  </label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Password
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                  </div>

                </div>

                <button
                  type="submit"
                  className="register-btn w-100"
                >
                  Login
                </button>

              </form>

              <p className="text-center mt-4 mb-0">
                Don't have an account?{' '}
                <Link to="/register">
                  Register for an Event
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>

      <footer className="footer">
        <p>© 2026 College Event Management System</p>
      </footer>

    </div>
  )
}

export default Login
