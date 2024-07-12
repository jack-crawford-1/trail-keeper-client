import '../styles/index.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!email || !password) {
      setError('All fields are required')
      return
    }
    setError('')

    try {
      const response = await fetch('http://localhost:3000/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error:', errorData.error)
        setError(errorData.error)
        return
      }

      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data.user))
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
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            placeholder="jsmith@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            placeholder="********"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 px-6 rounded-lg hover:bg-slate-700 duration-300"
        >
          Sign in
        </button>
      </form>
      <p className="mt-4">
        Dont have an account?{' '}
        <Link to="/signup" className="text-blue-500">
          Sign up here
        </Link>
      </p>
      <p className="mt-4">
        <Link to="/dashboard" className="text-blue-500">
          View Dashboard
        </Link>
      </p>
    </div>
  )
}
