import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Signup from '../components/auth/Signup'
import App from '../App'
import Home from '../pages/Home'
import UserProfile from '../components/auth/UserProfile'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'
import Dashboard from '../pages/Dashboard'
import Event from '../components/event-app/Event'
import Events from '../components/event-app/Events'
import AddEventForm from '../components/event-app/AddEventForm'

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
        <Route path="/addEvent" element={<AddEventForm />} />
      </Route>
    </>
  )
)

export default router
