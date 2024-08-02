import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Event } from '../../interface/eventTypes'

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/v1/events')
      .then((response) => {
        if (Array.isArray(response.data.events)) {
          setEvents(response.data.events)
        } else {
          console.error('Unexpected:', response.data)
        }
      })
      .catch((error) => console.error('Error fetching:', error))
  }, [])

  return (
    <div className="bg-[#FAFAFA] h-[580px] p-4 rounded-xl border-2 overflow-y-scroll">
      <h2 className="font-bold text-2xl pt-3 mb-4">Upcoming Events</h2>
      <div className="flex flex-col space-y-4">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/event/${event.id}`}
            className="flex justify-between items-center bg-white hover:bg-[#009277] hover:text-white p-4 rounded-lg shadow-md transition-colors duration-100 ease-in-out"
          >
            <div>
              <div className="font-semibold text-lg text-left">
                {event.title}
              </div>
              <div className="text-sm text-left">{event.short_description}</div>
            </div>
            <div className="text-sm">
              <div>{new Date(event.date).toLocaleDateString()}</div>
              <div>{event.location}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
