export default function Volunteer() {
  const Volunteer1 = ['First aiders']
  const Volunteer2 = ['Track guides']
  const eventDate1 = '2021-07-01'
  const eventDate2 = '2021-08-04'

  return (
    <div>
      <h2 className="font-bold m-2">Volunteering Roles </h2>
      <div className="text-sm">
        <p>Volunteer role: {Volunteer1}</p>
        <p>Start date: {Volunteer2}</p>
        <p>Volunteer role: {eventDate1}</p>
        <p>Start date: {eventDate2}</p>
      </div>
    </div>
  )
}
