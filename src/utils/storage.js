
const EVENTS_KEY = 'college_events'
const REGISTRATIONS_KEY = 'college_registrations'

// Get all events
export const getEvents = () => {
  return JSON.parse(localStorage.getItem(EVENTS_KEY)) || []
}

// Save events
export const saveEvents = (events) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
}

// Get all registrations
export const getRegistrations = () => {
  return JSON.parse(localStorage.getItem(REGISTRATIONS_KEY)) || []
}

// Save registrations
export const saveRegistrations = (registrations) => {
  localStorage.setItem(
    REGISTRATIONS_KEY,
    JSON.stringify(registrations)
  )
}

// Register student for an event
export const registerForEvent = (registration) => {
  const registrations = getRegistrations()

  registrations.push(registration)

  saveRegistrations(registrations)
}
