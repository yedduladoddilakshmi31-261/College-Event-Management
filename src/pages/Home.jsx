
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { getEvents, saveEvents } from '../utils/storage'
import '../App.css'

const sampleEvents = [
  {
    id: 1,
    title: 'Tech Fest 2026',
    date: 'November 12, 2026',
    category: 'Technical',
    venue: 'College Auditorium',
    description: 'Explore technology, coding competitions and innovation.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
  },
  {
    id: 2,
    title: 'Cultural Fest',
    date: 'November 20, 2026',
    category: 'Cultural',
    venue: 'College Ground',
    description: 'Celebrate music, dance, art and cultural activities.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
  },
  {
    id: 3,
    title: 'Sports Meet',
    date: 'December 5, 2026',
    category: 'Sports',
    venue: 'Sports Stadium',
    description: 'Participate in exciting sports and team competitions.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211'
  }
]

function Home() {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let savedEvents = getEvents()

    if (savedEvents.length === 0) {
      saveEvents(sampleEvents)
      savedEvents = sampleEvents
    }

    setEvents(savedEvents)
  }, [])

  const handleRegister = (event) => {
    navigate('/register', {
      state: { eventId: event.id }
    })
  }

  return (
    <div className="app-container">

      <Navbar />

      <section className="hero-section">
        <div className="container">

          <h1>Welcome to College Events</h1>

          <p>
            Discover, Participate and Celebrate Campus Life!
          </p>

          <div className="mt-4">

            <Link
              to="/events"
              className="btn btn-light btn-lg me-3"
            >
              Explore Events
            </Link>

            <Link
              to="/register"
              className="btn btn-outline-light btn-lg"
            >
              Register Now
            </Link>

          </div>

        </div>
      </section>

      <section className="container py-5 text-center">

        <h2 className="section-title">
          About Our Event Portal
        </h2>

        <p className="text-muted">
          College Event Management System provides a simple platform
          for students to explore upcoming college events, register
          for activities and manage their registrations.
        </p>

      </section>

      <section className="container">

        <h2 className="section-title">
          Featured Events
        </h2>

        <div className="row">

          {events.length > 0 ? (
            events.slice(0, 3).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
              />
            ))
          ) : (
            <p className="text-center">
              No events available currently.
            </p>
          )}

        </div>

        <div className="text-center mt-4">
          <Link to="/events" className="btn btn-primary btn-lg">
            View All Events
          </Link>
        </div>

      </section>

      <section className="container py-5">

        <h2 className="section-title">
          Why Use Our Portal?
        </h2>

        <div className="row text-center">

          <div className="col-md-4 mb-3">
            <div className="card shadow p-4 h-100">
              <h4>Explore Events</h4>
              <p>
                Discover technical, cultural and sports events.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow p-4 h-100">
              <h4>Easy Registration</h4>
              <p>
                Register for your favourite college events easily.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow p-4 h-100">
              <h4>Manage Events</h4>
              <p>
                View your registrations and manage event details.
              </p>
            </div>
          </div>

        </div>

      </section>

      <footer className="footer">
        <p>© 2026 College Event Management System</p>
        <p>Designed using React JS</p>
      </footer>

    </div>
  )
}

export default Home
