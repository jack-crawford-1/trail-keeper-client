import Nav from './Nav'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userName = user.name || ''

  console.log(user)

  return (
    <div>
      <Nav isLoggedIn={!!userName} userName={userName} />
      <h1>Dashboard</h1>
    </div>
  )
}
