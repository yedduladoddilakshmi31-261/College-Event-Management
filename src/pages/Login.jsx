import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please enter email and password')
      return
    }

    localStorage.setItem('loggedInUser', email)

    alert('Login successful!')
    navigate('/')
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">

            <div className="card shadow p-4">
              <h2 className="text-center mb-4">Student Login</h2>

              <form onSubmit={handleLogin}>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>

              </form>

              <p className="text-center mt-3">
                New student? <Link to="/register">Register here</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
