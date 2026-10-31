
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { getEvents, getRegistrations, registerForEvent } from '../utils/storage'
import '../App.css'

function Events() {
  const [events, setEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')

  const navigate = useNavigate()

  useEffect(() => {
    setEvents(getEvents())
  }, [])

  const handleRegister = (event) => {
    const studentName = window.prompt('Enter your name to register:')

    if (!studentName || !studentName.trim()) {
      return
    }

    const registrations = getRegistrations()

    const alreadyRegistered = registrations.some(
      (registration) =>
        registration.eventId === event.id &&
        registration.studentName?.toLowerCase() === studentName.trim().toLowerCase()
    )

    if (alreadyRegistered) {
      alert('You are already registered for this event!')
      return
    }

    registerForEvent({
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      studentName: studentName.trim(),
      registeredAt: new Date().toLocaleDateString()
    })

    alert('Registration successful!')
    navigate('/my-events')
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      category === 'All' || event.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <h2 className="section-title">Explore College Events</h2>

        {/* Search and Filter */}
        <div className="row mb-4">

          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search events by name, description or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

        </div>

        <p className="text-muted mb-4">
          Showing {filteredEvents.length} event(s)
        </p>

        {/* Event Cards */}
        <div className="row">

          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4>No events found</h4>
              <p className="text-muted">
                Try another search term or category.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('')
                  setCategory('All')
                }}
              >
                Clear Filters
              </button>
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

export default Events
