import { addEventCall } from '../../api/fetchAddEvents'
import Nav from '../nav/Nav'

//TODO update user_id to be dynamic
//TODO add state to auto update events list on submit

export default function AddEventForm() {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const event = {
      user_id: 1,
      title: formData.get('title'),
      short_description: formData.get('short_description'),
      description: formData.get('description'),
      date: formData.get('date'),
      location: formData.get('location'),
    }
    console.log(event)
    addEventCall(event)
  }
  return (
    <>
      <Nav />
      <div className="bg-gray-100 p-10 rounded-lg md:w-1/2 h-full mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Add Event
          </h2>
          <div>
            <label
              htmlFor="title"
              className="block text-sm  text-gray-700 mb-1 text-left"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm p-2"
              placeholder="Enter event title"
            />
          </div>
          <div>
            <label
              htmlFor="short_description"
              className="block text-left text-sm text-slate-700 mb-1"
            >
              Short Description
            </label>
            <input
              type="text"
              name="short_description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm p-2"
              placeholder="Enter short description"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-left text-sm text-slate-700 mb-1"
            >
              Description
            </label>

            <textarea
              name="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm p-2 h-[100px]"
              placeholder="Enter event description"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm  text-slate-700 mb-1 text-left"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              className="mt-1 block w-full rounded-md border-gray-300 sm:text-sm p-2 text-slate-700"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm  text-gray-700 mb-1 text-left"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm p-2 "
              placeholder="Enter event location"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-lg rounded-md text-white bg-[#009277] hover:bg-slate-700   "
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
