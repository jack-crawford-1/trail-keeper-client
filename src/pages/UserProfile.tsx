import '../styles/index.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import { useEffect } from 'react'

export default function UserProfile() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state || !location.state.user) {
      navigate('/')
    }
  }, [location, navigate])

  if (!location.state || !location.state.user) {
    return null
  }

  const { user } = location.state
  const { name, email } = user

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center min-h-screen p-2 antialiased">
        <div className="text-center">
          <div className="text-xl">
            Welcome <span className="font-bold text-slate-700">{name}!</span>
          </div>
          <div className="text-gray-500">Username: {name}</div>
          <div className="text-gray-500">Email: {email}</div>
          <div className="pt-3">
            <Link to="/dashboard" className="text-blue-500">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
