import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Event } from '../../interface/eventTypes'

export default function Event(): JSX.Element {
  const [event, setEvent] = useState<Event | null>(null)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/v1/event/${id}`)
        .then((res) => {
          console.log(res.data)
          setEvent(res.data.events[0])
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    }
  }, [id])

  if (!event) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Single Event</h1>
      <div>{event.title}</div>
      <div>{event.description}</div>
      <div>{new Date(event.date).toLocaleDateString()}</div>
      <div>{event.location}</div>
    </div>
  )
}
