import axios from 'axios'
import { useEffect, useState } from 'react'
import { Event } from '../../interface/eventTypes'

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
    <div className="bg-gray-100 h-full p-4 rounded-xl">
      <h2 className="font-bold text-2xl pt-3 mb-4">Upcoming Events</h2>
      <div className="flex flex-col space-y-4">
        {events.map((event: Event) => (
          <div
            key={event.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
          >
            <div>
              <div className="font-semibold text-lg">{event.title}</div>
              <div className="text-sm">{event.description}</div>
            </div>
            <div className="text-sm">
              <div>{new Date(event.date).toLocaleDateString()}</div>
              <div>{event.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
