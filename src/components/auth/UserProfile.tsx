import '../../styles/index.css'
import { Link } from 'react-router-dom'
import Nav from '../nav/Nav'
import { useUser } from '../../hooks/useUser'

export default function UserProfile() {
  const { user } = useUser()
  const { name, email } = (user as { name: string; email: string }) || {}

  return (
    <>
      <Nav />
      <div className="flex justify-center min-h-full mt-80 p-2 antialiased">
        <img
          src="https://via.placeholder.com/50"
          alt="User Avatar"
          className="w-32 h-32 rounded-full mr-4"
        />
        <div className="text-center">
          {!name || !name.length ? (
            <>
              <div className="text-xl text-red-500">
                Error: User data is not available.
              </div>
              <div className="pt-3">
                <Link to="/dashboard" className="text-blue-500">
                  Go to Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-xl">
                Welcome{' '}
                <span className="font-bold text-slate-700">{name}!</span>
              </div>

              <div className="text-slate-500">Username: {name}</div>
              <div className="text-slate-500">Email: {email}</div>
              <div className="pt-3">
                <Link to="/dashboard" className="text-blue-500">
                  View Dashboard
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
