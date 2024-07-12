import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

export default function Nav() {
  const { user } = useUser()
  const userName = user?.name || ''

  return (
    <nav className="p-5 bg-slate-500">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4">
          {userName ? (
            <>
              <li>
                <Link
                  to="/userProfile"
                  className="text-white hover:text-gray-200"
                >
                  Logged in user: {userName}
                </Link>
              </li>
              <li>
                <Link to="/logout" className="text-white hover:text-gray-200">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
