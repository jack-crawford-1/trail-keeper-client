{
  /* {<ShowTracksByRegion />} */
}

import Nav from '../components/nav/Nav'
import TrailReports from '../components/dashboard/TrailReports'

import Messages from '../components/dashboard/Messages'
import Events from '../components/event-app/Events'
import Forum from '../components/dashboard/Forum'
import Volunteer from '../components/dashboard/Volunteer'
import Trails from '../components/dashboard/Trails'
import SevenDayWeather from '../components/weather/SevenDayWeather'
import MaptilerMap from '../components/map/MaptilerMap'

export default function Dashboard2() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <Nav />
        </div>

        <div className=" flex-grow grid gap-5 bg-[#F5F5F5] grid-cols-6 grid-rows-1 p-5">
          <div className="bg-white col-span-4 row-span-4 rounded-xl ">
            <MaptilerMap />
          </div>

          <div className="bg-white text-center  text-2xl col-span-2 row-span-4 rounded-xl ">
            <Events />
          </div>

          <div className="bg-[#F5F5F5 text-center  text-2xl col-span-2 row-span-4 ">
            <SevenDayWeather />
          </div>

          <div className="bg-white text-center  text-2xl col-span-2 row-span-4 ">
            <TrailReports />
          </div>
          <div className=" text-center  text-2xl col-span-2 row-span-4 ">
            <Messages />
          </div>

          <div className="bg-white text-center  text-2xl col-span-2 row-span-4 ">
            <Forum />
          </div>

          <div className="bg-white text-center  text-2xl col-span-2 row-span-4 ">
            <Trails />
          </div>

          <div className="bg-white text-center  text-2xl col-span-2 row-span-4 ">
            <Volunteer />
          </div>
        </div>
      </div>
    </>
  )
}
