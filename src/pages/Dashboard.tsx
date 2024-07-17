import Nav from '../components/nav/Nav'
import TrailReports from '../components/TrailReports'
import Map from '../components/map/Map'
import Messages from '../components/Messages'
import Events from '../components/event-app/Events'
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
        <div className=" flex-grow grid gap-4 bg-[#F5F5F5] grid-cols-6 grid-rows-6 p-5">
          <div className="bg-white text-center  text-2xl col-span-2 row-span-4 rounded-xl ">
            <Events />
          </div>
          <div className="bg-[#F5F5F5] text-center  text-2xl  col-span-3 row-span-2">
            <Map />
          </div>

          <div className="bg-[#F5F5F5 text-center  text-2xl col-span-1 row-span-4 ">
            <SevenDayWeather />
          </div>
          <div className=" text-center  text-2xl col-span-1 row-span-2 ">
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
