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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Route>
    </>
  )
)

export default router
