
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {
  getRegistrations,
  saveRegistrations
} from '../utils/storage'
import '../App.css'

function MyEvents() {
  const [registrations, setRegistrations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setRegistrations(getRegistrations())
  }, [])

  const handleCancel = (id) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this registration?'
    )

    if (!confirmCancel) return

    const updatedRegistrations = registrations.filter(
      (registration) => registration.id !== id
    )

    saveRegistrations(updatedRegistrations)
    setRegistrations(updatedRegistrations)

    alert('Registration cancelled successfully!')
  }

  const filteredRegistrations = registrations.filter((registration) => {
    const search = searchTerm.toLowerCase()

    return (
      (registration.studentName || '').toLowerCase().includes(search) ||
      (registration.email || '').toLowerCase().includes(search) ||
      (registration.eventTitle || '').toLowerCase().includes(search)
    )
  })

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <h2 className="section-title">
          My Event Registrations
        </h2>

        <div className="card shadow-sm p-4 mb-4 text-center">
          <h5>Total Registrations</h5>
          <h2 className="text-primary">
            {registrations.length}
          </h2>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by student name, email or event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredRegistrations.length > 0 ? (

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Event</th>
                  <th>Registered Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRegistrations.map((registration) => (

                  <tr key={registration.id}>

                    <td>{registration.studentName}</td>

                    <td>{registration.email || 'Not provided'}</td>

                    <td>{registration.department || 'Not provided'}</td>

                    <td>{registration.eventTitle}</td>

                    <td>{registration.registeredAt}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(registration.id)}
                      >
                        Cancel
                      </button>
                    </td>

                  </tr>

                ))}
              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-center py-5">

            <h4>No Registrations Found</h4>

            <p className="text-muted">
              You haven't registered for any events yet.
            </p>

          </div>

        )}

      </div>

      <footer className="footer">
        <p>© 2026 College Event Management System</p>
      </footer>

    </div>
  )
}

export default MyEvents
