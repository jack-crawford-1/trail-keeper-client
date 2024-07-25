import '../styles/index.css'

import { useState } from 'react'
import Signup from '../components/auth/Signup'
import Login from '../components/auth/Login'
import { Link } from 'react-router-dom'

const steps = [
  {
    label: 'Welcome to Trail Mate',
    description: `Trail Mate is a comprehensive web app designed to provide detailed information and resources about tracks, events, and education resources for the New Zealand hiking community.`,
  },
  {
    label: 'Sign Up',
    description:
      'Create your account to access the dashboard and join events or skip to login if you already have an account.',
  },
  {
    label: 'Log In',
    description: `Log in to access your dashboard`,
  },
]

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <div key={step.label} className="mb-4">
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= activeStep
                      ? 'bg-[#009277] text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-4">
                  <div className="font-medium">{step.label}</div>
                  {index === 2 && (
                    <div className="text-sm text-gray-500">Last step</div>
                  )}
                </div>
              </div>
              {index === activeStep && (
                <div className="mt-2 p-4 border-l-4 border-[#009277]">
                  <div className="text-gray-700">{step.description}</div>
                  <div className="mt-4">
                    {index === 1 && <Signup />}
                    {index === 2 && <Login />}
                  </div>
                  <div className="mt-4 flex">
                    {index === steps.length - 1 ? (
                      <Link
                        to="/dashboard"
                        className="bg-[#009277] text-white px-4 py-2 rounded mr-2"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="bg-[#009277] text-white px-4 py-2 rounded mr-2"
                      >
                        Continue
                      </button>
                    )}
                    <button
                      onClick={handleBack}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      disabled={index === 0}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
