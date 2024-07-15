import Nav from '../components/Nav'
import TrailReports from '../components/TrailReports'
import Map from '../components/Map'
import Messages from '../components/Messages'
import Events from '../components/Events'
import Forum from '../components/Forum'
import Volunteer from '../components/Volunteer'
import Trails from '../components/Trails'
import SevenDayWeather from '../components/weather/SevenDayWeather'

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <Nav />
        </div>
        <div className=" flex-grow grid gap-2 bg-slate-700 grid-cols-6 grid-rows-6">
          <div className="bg-white text-center  text-2xl col-span-2 row-span-4 rounded-xl ">
            <Events />
          </div>
          <div className="bg-slate-700 text-center  text-2xl  col-span-3 row-span-2">
            <Map />
          </div>

          <div className="bg-white text-center  text-2xl col-span-1 row-span-4 ">
            <SevenDayWeather />
          </div>
          <div className="bg-white text-center  text-2xl col-span-1 row-span-2 ">
            <Messages />
          </div>
          <div className="bg-white text-center  text-2xl col-span-2 row-span-2 ">
            <TrailReports />
          </div>

          <div className="bg-white text-center  text-2xl col-span-3 row-span-2 ">
            <Forum />
          </div>
          <div className="bg-white text-center  text-2xl col-span-1 row-span-2 ">
            <Trails />
          </div>
          <div className="bg-white text-center  text-2xl col-span-2 row-span-2 ">
            <Volunteer />
          </div>
        </div>
      </div>
    </>
  )
}
