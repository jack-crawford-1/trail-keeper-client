import { useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const { setUser } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }, [setUser, navigate])
  return null
}
