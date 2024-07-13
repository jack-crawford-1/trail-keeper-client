export default function Messages() {
  const id = 1
  const user_id = 1
  const message = 'Hello from Alice'
  const created_at = '2024-07-13 05:14:54.858449'

  return (
    <div>
      <h2 className="font-bold m-3">Messages</h2>
      <div className="text-sm">
        <p>Message {id}:</p>
        <p>User ID: {user_id}</p>
        <p>Message: {message}</p>
        <p>Created At: {new Date(created_at).toLocaleString()}</p>
      </div>
    </div>
  )
}
