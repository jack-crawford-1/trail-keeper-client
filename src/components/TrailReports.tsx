export default function TrailReports() {
  const condition1 = 'Dry'
  const date1 = '01 Jan 2024'
  const condition2 = 'Wet'
  const date2 = '02 Jan 2024'

  return (
    <div className="bg-slate-700 h-full">
      <div className="rounded-xl bg-gray-100 h-full">
        <h2 className="font-bold pb-3 pt-3">Recent Trail reports</h2>
        <div className="text-sm">
          <p>Trail condition: {condition1}</p>
          <p>Reported on: {date1}</p>
          <p>Trail condition: {condition2}</p>
          <p>Reported on: {date2}</p>
        </div>
      </div>
    </div>
  )
}
