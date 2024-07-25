import { useEffect, useState, useRef } from 'react'
import DocRoutesTypes from '../../interface/docRouteTypes'
import { convertCoordinates } from './coordinateConverter'
import { Loader } from '@googlemaps/js-api-loader'
import { fetchDocTrack } from '../../api/fetchDocTrack'

export default function DocTrack(): JSX.Element {
  const [data, setData] = useState<DocRoutesTypes | null>(null)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const linzApiKey = import.meta.env.VITE_LINZ_API_KEY

  const [mapCenter, setMapCenter] = useState({
    lat: -40.867903,
    lng: 135.340083,
  })

  useEffect(() => {
    fetchDocTrack()
      .then((response) => {
        const convertedLineData = response.line.map(
          (line: [number, number][]) => convertCoordinates(line)
        )
        setData({ ...response, line: convertedLineData })
        if (convertedLineData.length > 0 && convertedLineData[0].length > 0) {
          const [lng, lat] = convertedLineData[0][0]
          setMapCenter({ lat, lng })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

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
              zoom: 12,
              mapTypeControl: false,
            }
          )

          const tileLayer = new window.google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
              const url = `https://data.linz.govt.nz/services;key=${linzApiKey}/tiles/v4/layer=50767/EPSG:3857/${zoom}/${coord.x}/${coord.y}.png`
              return url
            },
            tileSize: new window.google.maps.Size(256, 256),
            name: 'NZ Topo50 Maps',
            maxZoom: 15,
            minZoom: 0,
          })

          map.overlayMapTypes.insertAt(0, tileLayer)

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
    <div className="p-20 bg-slate-800 text-white">
      <h1 className="pb-5 text-3xl">DOC Track</h1>
      {data ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, paddingRight: '20px' }}>
            <h2 className="text-3xl font-bold pb-4">{data.name}</h2>
            <p className="pb-3">{data.introduction}</p>
            <img
              src={data.introductionThumbnail}
              alt={data.name}
              style={{ maxWidth: '100%', borderRadius: '15px' }}
            />
            <ul className="pt-10">
              {data.permittedActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
            <p>Distance: {data.distance}</p>
            <p>Location: {data.locationString}</p>
            <p>Walk Duration: {data.walkDuration}</p>
            <p>Walk Category: {data.walkDurationCategory}</p>
            <p>Category: {data.walkTrackCategory}</p>
          </div>
          <div
            ref={mapRef}
            style={{
              flex: 1,
              width: '30%',
              height: '500px',
              borderRadius: '15px',
            }}
          ></div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
