import { useEffect, useState, useRef } from 'react'
import DocRoutesTypes from '../../interface/docRouteTypes'
import { convertCoordinates } from './coordinateConverter'
import { Loader } from '@googlemaps/js-api-loader'
import { fetchDocTrack } from '../../api/fetchDocTrack'

export default function DocTrack(): JSX.Element {
  const [data, setData] = useState<DocRoutesTypes | null>(null)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const linzApiKey = import.meta.env.VITE_LINZ_API_KEY
  const [trackId, setTrackId] = useState('114ff80d-12f4-4f0b-8384-103f0c8e6efc')

  const [mapCenter, setMapCenter] = useState({
    lat: -40.867903,
    lng: 135.340083,
  })

  const fetchTrackData = async (id: string) => {
    try {
      const response = await fetchDocTrack(id)
      const convertedLineData = response.line.map((line: [number, number][]) =>
        convertCoordinates(line)
      )
      setData({ ...response, line: convertedLineData })
      if (convertedLineData.length > 0 && convertedLineData[0].length > 0) {
        const [lng, lat] = convertedLineData[0][0]
        setMapCenter({ lat, lng })
      }
    } catch (error) {
      console.error('Error fetching DOC track:', error)
    }
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    fetchTrackData(trackId)
  }

  useEffect(() => {
    fetchTrackData(trackId)
  }, [trackId])

  useEffect(() => {
    if (data && mapRef.current) {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      })

      loader.load().then(() => {
        if (window.google && window.google.maps) {
          const map = new window.google.maps.Map(
            mapRef.current as HTMLElement,
            {
              center: mapCenter,
              zoom: 13,
              minZoom: 8,
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
            maxZoom: 20,
            minZoom: 8,
          })
          map.mapTypes.set('topo', topoMapType)
          map.setMapTypeId('topo')

          data.line.forEach((line) => {
            if (Array.isArray(line)) {
              const linePath = new window.google.maps.Polyline({
                path: line.map(([lng, lat]) => ({ lat, lng })),
                geodesic: true,
                strokeColor: '#FF6600',
                strokeOpacity: 0.75,
                strokeWeight: 4,
              })

              linePath.setMap(map)
            }
          })
        }
      })
    }
  }, [data, linzApiKey, mapCenter])

  return (
    <div className="p-5 md:p-10 min-h-screen bg-slate-800 text-white">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(e) => setTrackId(e.target.value)}
          placeholder="Enter Track ID"
          className="p-2 px-8 mb-4 text-red-500 rounded"
        />
        <button
          type="submit"
          className="p-2 px-5 bg-[#009277] text-white rounded"
        >
          Search
        </button>
      </form>

      {data ? (
        <>
          <div>
            <h2 className="text-3xl font-bold pb-3">{data.name}</h2>
          </div>
          {/* <img
            className="pb-3"
            src={data?.introductionThumbnail}
            alt={data?.name}
            style={{ maxWidth: '100%', borderRadius: '15px' }}
          /> */}
          <div>
            <p className="text-slate-200 pb-1">{data.locationString}</p>
            <p className="flex flex-row">
              <span className="pr-5 text-[#12a489]">{data.distance}</span>
              <span className="pr-5 text-[#12a489]">{data.walkDuration}</span>
              <span className="pr-5 text-[#12a489]">
                {data.walkDurationCategory}
              </span>
              <span className="pr-5 text-[#12a489]">
                {data.walkTrackCategory}
              </span>
            </p>
          </div>
          <div
            ref={mapRef}
            style={{
              width: '100%',
              height: '550px',
              borderRadius: '15px',
              marginTop: '20px',
              border: '10px solid white',
            }}
          ></div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
