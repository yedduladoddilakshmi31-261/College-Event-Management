
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

    if (confirmCancel) {
      const updatedRegistrations = registrations.filter(
        (registration) => registration.id !== id
      )

      saveRegistrations(updatedRegistrations)
      setRegistrations(updatedRegistrations)

      alert('Registration cancelled successfully!')
    }
  }

  const filteredRegistrations = registrations.filter((registration) =>
    `${registration.studentName || ''} ${registration.eventTitle || ''} ${registration.email || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <h2 className="section-title">
          My Registered Events
        </h2>

        <div className="card shadow p-4">

          <input
            type="text"
            className="form-control mb-4"
            placeholder="Search by student name, email or event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <h5 className="mb-3">
            Total Registrations: {registrations.length}
          </h5>

          {filteredRegistrations.length > 0 ? (

            <div className="table-responsive">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Event Name</th>
                    <th>Department</th>
                    <th>Registration Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRegistrations.map((registration, index) => (
                    <tr key={registration.id}>
                      <td>{index + 1}</td>

                      <td>
                        {registration.studentName || 'N/A'}
                      </td>

                      <td>
                        {registration.email || 'N/A'}
                      </td>

                      <td>
                        {registration.eventTitle || 'N/A'}
                      </td>

                      <td>
                        {registration.department || 'N/A'}
                      </td>

                      <td>
                        {registration.registeredAt || 'N/A'}
                      </td>

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
              <h4>No registrations found</h4>
              <p className="text-muted">
                Register for a college event to see it here.
              </p>
            </div>
          )}

        </div>

      </div>

      <footer className="footer">
        <p>© 2026 College Event Management System</p>
      </footer>

    </div>
  )
}

export default MyEvents
