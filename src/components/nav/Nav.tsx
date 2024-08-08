import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function Nav() {
  const { user } = useUser();
  const userName = user?.name || '';

  return (
    <nav className="p-5 bg-slate-100">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'text-slate-800 font-bold'
                  : 'text-slate-800 hover:font-bold'
              }
            >
              GoogleMaps
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard2"
              className={({ isActive }) =>
                isActive
                  ? 'text-slate-800 font-bold'
                  : 'text-slate-800 hover:font-bold'
              }
            >
              TilerMaps
            </NavLink>
          </li>
        </ul>
        <ul className="flex space-x-4">
          {userName ? (
            <>
              <li>
                <Link
                  to="/userProfile"
                  className="text-slate-800 hover:font-bold"
                >
                  Logged in as: {userName}
                </Link>
              </li>
              <li>
                <Link to="/logout" className="text-slate-800 hover:font-bold">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/" className="text-white hover:text-gray-200">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
