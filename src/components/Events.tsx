export default function Events() {
  const events = [
    {
      id: 1,
      user_id: 1,
      title: 'Trail Cleanup',
      description: 'Cleaning the main trail',
      date: '2024-08-15',
      location: 'Main Trail',
    },
    {
      id: 2,
      user_id: 2,
      title: 'Volunteer Meetup',
      description: 'Meeting for volunteers',
      date: '2024-09-01',
      location: 'Community Center',
    },
  ]

  return (
    <div className="">
      <div className="mb-4">
        <h2 className="font-bold text-2xl">Upcoming Events</h2>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-2 font-semibold text-lg">
        <div className="col-span-2">Title</div>
        <div className="col-span-4">Description</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2">Location</div>
      </div>
      {events.map((event) => (
        <div key={event.id} className="grid grid-cols-12 gap-4 text-sm mb-5">
          <div className="col-span-2">{event.title}</div>
          <div className="col-span-4">{event.description}</div>
          <div className="col-span-2">
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="col-span-2">{event.location}</div>
        </div>
      ))}
    </div>
  )
}
