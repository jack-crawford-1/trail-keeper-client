import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import '../styles/index.css'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }
    if (!validateEmail(email)) {
      setError('Invalid email format')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setError('')

    try {
      const response = await fetch('http://localhost:3000/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error:', errorData.error)
        setError(errorData.error)
        return
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      navigate('/userProfile', { state: { user: data.user } })
    } catch (error) {
      console.error('Error:', error)
      setError('An error occurred')
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Trail Mate Sign Up
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 px-6 rounded-lg hover:bg-slate-700 duration-300"
        >
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500">
          Login here
        </Link>
      </p>
    </div>
  )
}
