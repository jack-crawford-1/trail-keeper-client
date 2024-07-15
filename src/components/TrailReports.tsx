export default function TrailReports() {
  const condition1 = ['good']
  const condition2 = ['needs maintenance']
  const reportedDate1 = '2021-07-01'
  const reportedDate2 = '2021-08-04'

  return (
    <div className="bg-slate-700 h-full">
      <div className="rounded-xl bg-gray-100 h-full">
        <h2 className="font-bold pb-3 pt-3">Recent Trail reports</h2>
        <div className="text-sm">
          <p>Trail condition: {condition1}</p>
          <p>Reported on: {reportedDate1}</p>
          <p>Trail condition: {condition2}</p>
          <p>Reported on: {reportedDate2}</p>
        </div>
      </div>
    </div>
  )
}
