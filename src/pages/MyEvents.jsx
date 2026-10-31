
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getRegistrations } from '../utils/storage'
import '../App.css'

function MyEvents() {
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    setRegistrations(getRegistrations())
  }, [])

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <h2 className="section-title">
          My Registered Events
        </h2>

        {registrations.length === 0 ? (
          <div className="text-center py-5">
            <h4>No registrations found!</h4>
            <p>You have not registered for any events yet.</p>
          </div>
        ) : (

          <div className="table-responsive">

            <table className="table table-bordered table-hover">

              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Event Name</th>
                  <th>Department</th>
                  <th>Registered Date</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.studentName}</td>
                    <td>{item.email || 'N/A'}</td>
                    <td>{item.eventTitle}</td>
                    <td>{item.department || 'N/A'}</td>
                    <td>{item.registeredAt}</td>
                  </tr>
                ))}
              </tbody>

            </table>

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
