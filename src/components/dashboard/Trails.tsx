export default function Trails() {
  const Track = ['Track 1']
  const Difficulty = ['Easy']
  const location = ['North']

  return (
    <div>
      <h2 className="font-bold m-2">Tracks</h2>
      <div className="text-sm">
        <p>Track name: {Track}</p>
        <p>Difficulty: {Difficulty}</p>
        <p>Location: {location}</p>
      </div>
    </div>
  )
}
