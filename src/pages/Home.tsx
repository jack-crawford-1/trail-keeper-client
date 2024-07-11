import { Link } from 'react-router-dom'
import '../styles/index.css'

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-2 antialiased">
        <div className="text-center">
          <h1 className="text-slate-800 text-5xl font-extrabold p-2">
            Trail Mate
          </h1>
          <p className="md:max-w-2xl p-4 text-slate-700">
            Trail Mate App is a web application created to support the hiking
            community by offering detailed information and resources on trails,
            events, training resources, and volunteer opportunities.
          </p>

          <Link to="/signup">
            <button className="bg-slate-600 shadow-lg shadow-gray-500 hover:bg-slate-700 hover:scale-110 transform duration-300 ease-in-out py-2 px-6 rounded-lg text-white m-5">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
