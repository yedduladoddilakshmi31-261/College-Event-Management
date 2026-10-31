
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { getEvents } from '../utils/storage'
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
    navigate('/register', {
      state: { eventId: event.id }
    })
  }

  const filteredEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      (event.title || '').toLowerCase().includes(search) ||
      (event.description || '').toLowerCase().includes(search) ||
      (event.venue || '').toLowerCase().includes(search)

    const matchesCategory =
      category === 'All' || event.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <h2 className="section-title">
          Explore College Events
        </h2>

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

              <h4>No Events Found</h4>

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
