export default function Trails() {
  const Trail = ['Trail 1']
  const Difficulty = ['Easy']
  const location = ['North']

  return (
    <div>
      <h2 className="font-bold m-2">Trails</h2>
      <div className="text-sm">
        <p>Trail name: {Trail}</p>
        <p>Difficulty: {Difficulty}</p>
        <p>Location: {location}</p>
      </div>
    </div>
  )
}
