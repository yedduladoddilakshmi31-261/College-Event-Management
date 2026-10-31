
import React from 'react'

function EventCard({ event, onRegister }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card event-card h-100">

        <img
          src={event.image}
          className="card-img-top"
          alt={event.title}
        />

        <div className="card-body">

          <span className="event-date">
            {event.date}
          </span>

          <h5 className="card-title mt-2">
            {event.title}
          </h5>

          <p className="card-text">
            {event.description}
          </p>

          <p>
            <strong>Category:</strong> {event.category}
          </p>

          <p>
            <strong>Venue:</strong> {event.venue}
          </p>

          <button
            className="register-btn"
            onClick={() => onRegister(event)}
          >
            Register Now
          </button>

        </div>
      </div>
    </div>
  )
}

export default EventCard
