import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Event as EventType } from '../../interface/eventTypes'
import Nav from '../nav/Nav'
import Comments from './Comments'

export default function Event(): React.JSX.Element {
  const [event, setEvent] = useState<EventType | null>(null)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/v1/event/${id}`)
        .then((res) => {
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
    <div className="bg-gray-100 w-full">
      <Nav />
      <div className="max-w-4xl mx-auto bg-white">
        <div className="p-10 pt-20">
          <h1 className="text-3xl font-bold mb-4">
            {event.title} - {event.location}
          </h1>
        </div>
        <img
          src="https://wilderness-production.imgix.net/2021/04/Signpost-Mt-Holdsworth-summit.jpg?auto=compress%2Cformat&fit=scale&h=1365&ixlib=php-3.3.1&w=2048&wpsize=2048x2048/1200x400"
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-20">
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/50"
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">Hosted By</h2>
              <p className="text-slate-600">User ID: {event.user_id}</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-slate-700 pb-5">{event.short_description}</p>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p className="text-slate-700">{event.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Date</h2>
            <p className="text-slate-700">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <p className="text-slate-700">{event.location}</p>
          </div>
          <div className="flex justify-between">
            <button className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-700">
              Join Waitlist
            </button>
          </div>
          {id && <Comments eventId={parseInt(id, 10)} />}
          <Link to={'/addEvent'}>
            <div className=" m-10 bg-[#009277] text-white px-4 py-4  w-fit rounded-xl hover:bg-slate-700">
              Add New Event
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
