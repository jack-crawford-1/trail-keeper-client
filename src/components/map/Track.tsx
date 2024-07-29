import { useState, useEffect, useRef } from 'react'
import { fetchAllDocTracks, fetchDocTrack } from '../../api/fetchDocTrack'
import { DocTrackTypes } from '../../interface/docTrackTypes'
import { TrackTypes } from '../../interface/docTrackTypes'
import { Loader } from '@googlemaps/js-api-loader'
import { convertCoordinates } from './utils/coordinateConverter'

export default function Track(): JSX.Element {
  const [tracks, setTracks] = useState<DocTrackTypes[] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTracks, setFilteredTracks] = useState<TrackTypes[]>([])
  const [selectedTrack, setSelectedTrack] = useState<TrackTypes | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [data, setData] = useState<DocTrackTypes | null>(null)
  const linzApiKey = import.meta.env.VITE_LINZ_API_KEY
  const defaultMapCenter = { lat: -40.867903, lng: 175.340083 }
  const [mapCenter, setMapCenter] = useState(defaultMapCenter)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetchAllDocTracks()
        setTracks(response)
      } catch (error) {
        console.error('Error fetching all DOC tracks:', error)
      }
    }
    fetchTracks()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    filterTracks(value)
    setFocusedIndex(-1)
  }

  const filterTracks = (value: string) => {
    const filtered =
      tracks?.filter((track) =>
        track.name.toLowerCase().includes(value.toLowerCase())
      ) || []
    setFilteredTracks(filtered)
  }

  const handleTrackSelect = async (track: TrackTypes) => {
    const trackData = await fetchDocTrack(track.assetId)
    const convertedLineData = trackData.line.map((line: [number, number][]) =>
      convertCoordinates(line)
    )
    setData({ ...trackData, line: convertedLineData })
    setSelectedTrack({ ...track, ...trackData })
    setFilteredTracks([])
    if (convertedLineData.length > 0 && convertedLineData[0].length > 0) {
      const [lng, lat] = convertedLineData[0][0]
      setMapCenter({ lat, lng })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => (prevIndex + 1) % filteredTracks.length)
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredTracks.length) % filteredTracks.length
      )
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      handleTrackSelect(filteredTracks[focusedIndex])
    }
  }

  useEffect(() => {
    if (mapRef.current) {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      })

      loader.load().then(() => {
        if (window.google && window.google.maps) {
          const map = new window.google.maps.Map(
            mapRef.current as HTMLElement,
            {
              center: mapCenter,
              zoom: 15,
              minZoom: 2,
              maxZoom: 20,
              mapTypeControl: true,
              mapTypeControlOptions: {
                style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: window.google.maps.ControlPosition.TOP_LEFT,
                mapTypeIds: ['roadmap', 'satellite', 'terrain', 'topo'],
              },
            }
          )
          map.setTilt(0)

          const topoMapType = new window.google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
              const url = `https://data.linz.govt.nz/services;key=${linzApiKey}/tiles/v4/layer=50767/EPSG:3857/${zoom}/${coord.x}/${coord.y}.png`
              return url
            },
            tileSize: new window.google.maps.Size(256, 256),
            name: 'NZ Topo50',
            maxZoom: 16,
            minZoom: 10,
          })
          map.mapTypes.set('topo', topoMapType)
          map.setMapTypeId('topo')

          if (data) {
            data.line.forEach((line) => {
              if (Array.isArray(line)) {
                const linePath = new window.google.maps.Polyline({
                  path: line.map(([lng, lat]) => ({ lat, lng })),
                  geodesic: true,
                  strokeColor: '#FF6600',
                  strokeOpacity: 0.75,
                  strokeWeight: 5,
                })

                linePath.setMap(map)
              }
            })
          }
        }
      })
    }
  }, [data, linzApiKey, mapCenter])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-10 min-h-screen bg-slate-800 text-white">
      <div className="lg:col-span-1 space-y-4 md:pr-10 leading-5">
        {selectedTrack ? (
          <div className="">
            <h2 className="text-3xl font-bold pb-3">{selectedTrack.name}</h2>
            <p className="text-[slate-200] pb-1">
              Region:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.region.join(', ')}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Distance:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.distance}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Duration:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.walkDuration}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Duration Category:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.walkDurationCategory}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Track Category:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.walkTrackCategory}
              </span>
            </p>

            <div className="pt-5">
              <img
                className="border-2 border-white"
                src={
                  data?.introductionThumbnail ||
                  'https://via.placeholder.com/300'
                }
                alt={data?.name}
                style={{ width: '100%', borderRadius: '15px' }}
              />
            </div>
          </div>
        ) : (
          <div className="pt-40">
            <h2 className="text-5xl font-bold pb-5">Trail Mate</h2>
            <p className="text-slate-200 md:w-5/6 leading-6">
              Search for Department of Conservation (DOC) tracks by track name.
            </p>
          </div>
        )}
        <div className="relative pt-10">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search by track name"
            className="p-2 px-8 mb-4 text-slate-800 rounded w-full"
          />
          {filteredTracks.length > 0 && (
            <ul className="absolute bg-white text-black rounded p-2 max-h-40 overflow-y-scroll z-10 w-fit">
              {filteredTracks.map((track, index) => (
                <li
                  key={track.assetId}
                  onClick={() => handleTrackSelect(track)}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${
                    focusedIndex === index ? 'bg-gray-300' : ''
                  }`}
                >
                  {track.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="lg:col-span-2">
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            border: '5px solid white',
          }}
        ></div>
      </div>
    </div>
  )
}
