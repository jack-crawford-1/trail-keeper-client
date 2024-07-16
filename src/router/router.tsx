import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Signup from '../pages/Signup'
import App from '../App'
import Home from '../pages/Home'
import UserProfile from '../pages/UserProfile'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Dashboard from '../pages/Dashboard'
import Event from '../components/eventDir/Event'
import Events from '../components/eventDir/Events'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<Event />} />
      </Route>
    </>
  )
)

export default router
