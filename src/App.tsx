import './index.css'

function App() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-2 antialiased">
        <div className="text-center">
          <h1 className="text-slate-800 text-5xl font-extrabold p-2">
            Trail Keeper
          </h1>
          <p className="md:max-w-2xl p-4 text-slate-700">
            The TrailKeeper App is a comprehensive web application created to
            support the hiking community by offering detailed information and
            resources on trails, events, training modules, and volunteer
            opportunities.
          </p>

          <button
            onClick={() => {}}
            className="bg-slate-700 shadow-lg shadow-blue-300	hover:bg-slate-500 hover:scale-110 transform duration-300 ease-in-out py-2 px-6 rounded-lg text-white m-5 "
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  )
}

export default App
