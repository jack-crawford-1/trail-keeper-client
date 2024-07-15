import EventsForm from './eventDir/EventsForm'

export default function TrailReports() {
  return (
    <div className="bg-slate-700 h-full">
      {/* <div className="rounded-xl bg-gray-100 h-full">
        <h2 className="font-bold pb-3 pt-3">Recent Trail reports</h2>
        <div className="text-sm">
          <p>Trail condition: {condition1}</p>
          <p>Reported on: {reportedDate1}</p>
          <p>Trail condition: {condition2}</p>
          <p>Reported on: {reportedDate2}</p>
        </div>
      </div> */}
      <EventsForm />
    </div>
  )
}
