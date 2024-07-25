export default function TrailReports() {
  const condition1 = 'Dry'
  const date1 = '01 Jan 2024'
  const condition2 = 'Wet'
  const date2 = '02 Jan 2024'

  return (
    <div className="bg-[#FAFAFA] h-full rounded-xl border-2">
      <div className="rounded-xl bg-[#FAFAFA] h-full">
        <h2 className="font-bold pb-3 pt-3">Recent Track reports</h2>
        <div className="text-sm">
          <p>Track condition: {condition1}</p>
          <p>Reported on: {date1}</p>
          <p>Track condition: {condition2}</p>
          <p>Reported on: {date2}</p>
        </div>
      </div>
    </div>
  )
}
