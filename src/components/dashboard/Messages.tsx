import { useState, useEffect } from 'react'
import axios from 'axios'

interface Message {
  id: number
  user_id: number
  message: string
  created_at: string
}

function Messages() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/v1/messages')
      .then((response) => {
        if (Array.isArray(response.data.messages)) {
          setMessages(response.data.messages)
        } else {
          console.error('Unexpected:', response.data)
        }
      })
      .catch((error) => console.error('Error fetching:', error))
  }, [])

  return (
    <div className="bg-[#FAFAFA] h-full rounded-xl border-2">
      <div className="bg-[#F5F5F5] h-[400px] overflow-y-scroll rounded-xl p-4">
        <h2 className="font-bold text-slate-700 pb-2">Messages</h2>
        <ul className="space-y-4">
          {messages.map((message, index) => (
            <li
              key={`${message.id}-${index}`}
              className="bg-white p-3 rounded-lg shadow-md"
            >
              <div className="text-gray-800 text-sm">
                <strong className="block text-blue-600">
                  User {message.user_id}:
                </strong>
                <span className="block">{message.message}</span>
                <span className="block text-gray-500 text-xs mt-2">
                  {new Date(message.created_at).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Messages
