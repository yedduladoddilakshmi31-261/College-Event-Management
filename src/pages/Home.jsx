
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import {
  getEvents,
  saveEvents,
  registerForEvent
} from '../utils/storage'
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
    description: 'Enjoy music, dance, drama and cultural performances.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
  },
  {
    id: 3,
    title: 'Sports Meet',
    date: 'December 5, 2026',
    category: 'Sports',
    venue: 'Sports Stadium',
    description: 'Participate in exciting indoor and outdoor sports.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211'
  }
]

function Home() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const savedEvents = getEvents()

    if (savedEvents.length === 0) {
      saveEvents(sampleEvents)
      setEvents(sampleEvents)
    } else {
      setEvents(savedEvents)
    }
  }, [])

  const handleRegister = (event) => {
    const studentName = window.prompt('Enter your name:')

    if (!studentName || !studentName.trim()) {
      alert('Please enter your name.')
      return
    }

    const registrations = JSON.parse(
      localStorage.getItem('college_registrations') || '[]'
    )

    const alreadyRegistered = registrations.some(
      (item) =>
        item.eventId === event.id &&
        item.studentName.toLowerCase() === studentName.trim().toLowerCase()
    )

    if (alreadyRegistered) {
      alert('You have already registered for this event!')
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

      <section className="hero-section">
        <h1>Welcome to College Events</h1>

        <p>
          Discover events, showcase your talents
          and create unforgettable memories!
        </p>

        <a href="#events" className="btn btn-light mt-3">
          Explore Events
        </a>
      </section>

      <div className="container">

        <h2 className="section-title" id="events">
          Upcoming Events
        </h2>

        <div className="row">

          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
            />
          ))}

        </div>

      </div>

      <footer className="footer">
        <p>
          © 2026 College Event Management System.
          All Rights Reserved.
        </p>
      </footer>

    </div>
  )
}

export default Home
