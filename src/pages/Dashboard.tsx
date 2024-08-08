import Nav from '../components/nav/Nav';
import GoogleMap from '../components/map/GoogleMaps/GoogleMap';

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div>
          <Nav />
        </div>
        <div className=" flex-grow grid gap-5 grid-cols-6 grid-rows-6">
          <div className="bg-white col-span-6 row-span-6 rounded-xl ">
            <GoogleMap />
          </div>
        </div>
      </div>
    </>
  );
}
