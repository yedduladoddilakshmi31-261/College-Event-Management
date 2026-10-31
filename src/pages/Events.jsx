
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { getEvents, saveEvents, registerForEvent } from '../utils/storage'
import '../App.css'

function Events() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const savedEvents = getEvents()
    setEvents(savedEvents)
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || event.category === category

    return matchesSearch && matchesCategory
  })

  const handleRegister = (event) => {
    const studentName = window.prompt('Enter your name:')

    if (!studentName || !studentName.trim()) return

    const registrations = JSON.parse(
      localStorage.getItem('college_registrations') || '[]'
    )

    const exists = registrations.some(
      (item) =>
        item.eventId === event.id &&
        item.studentName.toLowerCase() === studentName.trim().toLowerCase()
    )

    if (exists) {
      alert('Already registered for this event!')
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
  }

  return (
    <div className="app-container">

      <Navbar />

      <div className="container py-5">

        <h2 className="section-title">Explore College Events</h2>

        <div className="row mb-4">

          <div className="col-md-7 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-5 mb-3">
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
            <div className="text-center py-5">
              <h4>No events found!</h4>
              <p>Try another search or category.</p>
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
