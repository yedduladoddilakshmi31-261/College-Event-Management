
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  getEvents,
  getRegistrations,
  registerForEvent
} from '../utils/storage'
import '../App.css'

function Registration() {
  const [events, setEvents] = useState([])

  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    department: '',
    eventId: location.state?.eventId
      ? String(location.state.eventId)
      : ''
  })

  useEffect(() => {
    setEvents(getEvents())
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectedEvent = events.find(
      (event) => String(event.id) === formData.eventId
    )

    if (!selectedEvent) {
      alert('Please select a valid event!')
      return
    }

    const registrations = getRegistrations()

    const alreadyRegistered = registrations.some(
      (registration) =>
        registration.eventId === selectedEvent.id &&
        registration.email?.toLowerCase() ===
          formData.email.trim().toLowerCase()
    )

    if (alreadyRegistered) {
      alert('You have already registered for this event!')
      return
    }

    registerForEvent({
      id: Date.now(),
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      studentName: formData.studentName.trim(),
      email: formData.email.trim(),
      department: formData.department,
      registeredAt: new Date().toLocaleDateString()
    })

    alert('Registration successful!')

    setFormData({
      studentName: '',
      email: '',
      department: '',
      eventId: ''
    })

    navigate('/my-events')
  }

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <h2 className="section-title">
          Student Event Registration
        </h2>

        <div className="row justify-content-center">

          <div className="col-md-7">

            <div className="card shadow p-4">

              <h4 className="text-center mb-4">
                Register for an Event
              </h4>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Student Name
                  </label>

                  <input
                    type="text"
                    name="studentName"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Department
                  </label>

                  <select
                    name="department"
                    className="form-select"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science</option>
                    <option value="CSE AI">CSE Artificial Intelligence</option>
                    <option value="ECE">Electronics and Communication</option>
                    <option value="EEE">Electrical and Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Select Event
                  </label>

                  <select
                    name="eventId"
                    className="form-select"
                    value={formData.eventId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose an Event</option>

                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="register-btn w-100"
                  disabled={events.length === 0}
                >
                  Submit Registration
                </button>

              </form>

              {events.length === 0 && (
                <p className="text-danger text-center mt-3">
                  No events available. Please check again later.
                </p>
              )}

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

export default Registration
