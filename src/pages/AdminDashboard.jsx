
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {
  getEvents,
  saveEvents,
  getRegistrations
} from '../utils/storage'
import '../App.css'

function AdminDashboard() {
  const [events, setEvents] = useState([])
  const [totalRegistrations, setTotalRegistrations] = useState(0)

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: 'Technical',
    venue: '',
    description: '',
    image: ''
  })

  const [editId, setEditId] = useState(null)

  useEffect(() => {
    setEvents(getEvents())
    setTotalRegistrations(getRegistrations().length)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      category: 'Technical',
      venue: '',
      description: '',
      image: ''
    })
    setEditId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let updatedEvents

    if (editId !== null) {
      updatedEvents = events.map((event) =>
        event.id === editId
          ? { ...formData, id: editId }
          : event
      )
    } else {
      const newEvent = {
        ...formData,
        id: Date.now()
      }

      updatedEvents = [...events, newEvent]
    }

    saveEvents(updatedEvents)
    setEvents(updatedEvents)
    resetForm()

    alert('Event saved successfully!')
  }

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      date: event.date,
      category: event.category,
      venue: event.venue,
      description: event.description,
      image: event.image || ''
    })

    setEditId(event.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this event?'
    )

    if (confirmDelete) {
      const updatedEvents = events.filter(
        (event) => event.id !== id
      )

      saveEvents(updatedEvents)
      setEvents(updatedEvents)

      alert('Event deleted successfully!')
    }
  }

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <h2 className="section-title">
          Admin Dashboard
        </h2>

        {/* Dashboard Statistics */}
        <div className="row mb-4">

          <div className="col-md-4 mb-3">
            <div className="card shadow p-4 text-center">
              <h5>Total Events</h5>
              <h2 className="text-primary">{events.length}</h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow p-4 text-center">
              <h5>Total Registrations</h5>
              <h2 className="text-success">
                {totalRegistrations}
              </h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow p-4 text-center">
              <h5>Event Management</h5>
              <p className="mb-0">
                Manage college events
              </p>
            </div>
          </div>

        </div>

        {/* Add or Edit Event Form */}
        <div className="card shadow p-4 mb-5">

          <h4 className="mb-4">
            {editId !== null ? 'Edit Event' : 'Add New Event'}
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Event Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Venue</label>
                <input
                  type="text"
                  name="venue"
                  className="form-control"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="image"
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button type="submit" className="register-btn">
              {editId !== null ? 'Update Event' : 'Add Event'}
            </button>

            {editId !== null && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </form>
        </div>

        {/* Manage Events Table */}
        <h4 className="mb-3">Manage Events</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>{event.category}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(event.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No events available
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

      <footer className="footer">
        <p>© 2026 College Event Management System</p>
      </footer>

    </div>
  )
}

export default AdminDashboard

