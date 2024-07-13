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
    <div>
      <h2 className="font-bold m-3">Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={`${message.id}-${index}`} className="text-sm">
            <strong>Message:</strong> {message.message} <br />
            <strong>Created At:</strong>{' '}
            {new Date(message.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Messages
