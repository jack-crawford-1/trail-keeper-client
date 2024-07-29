import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import Feature from '../../interface/mapTypes'
import { convertCoordinates } from './utils/coordinateConverter'

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '15px',
}

const center = {
  lat: -40.867903,
  lng: 175.340083,
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const linzApiKey = import.meta.env.VITE_LINZ_API_KEY

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })

    loader
      .load()
      .then(() => {
        if (mapRef.current && window.google && window.google.maps) {
          const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom: 10,
            mapTypeControl: false,
          })

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

          fetch('http://localhost:3000/v1/geojson', {
            headers: {
              'Cache-Control': 'max-age=3600',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              data.features.forEach((feature: Feature) => {
                if (feature.geometry.type === 'Point') {
                  const coordinates = convertCoordinates([
                    feature.geometry.coordinates,
                  ])
                  const [longitude, latitude] = coordinates[0]

                  const marker = new window.google.maps.Marker({
                    map,
                    position: { lat: latitude, lng: longitude },
                    icon: {
                      url:
                        'data:image/svg+xml;charset=UTF-8,' +
                        encodeURIComponent(
                          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <circle cx="12" cy="12" r="10" fill="#009277" stroke="white" stroke-width="2"/>
                            <rect x="11" y="7" width="2" height="2" fill="white"/>
                            <rect x="11" y="11" width="2" height="7" fill="white"/>
                          </svg>`
                        ),
                      scaledSize: new window.google.maps.Size(34, 34),
                    },
                  })

                  marker.addListener('click', () => {
                    alert(feature.properties.name)
                  })
                }
              })
            })

            .catch((error) => {
              console.error('Error loading GeoJSON data:', error)
            })
        } else {
          console.error('Google Maps API failed to load')
        }
      })
      .catch((e) => {
        console.error('Error loading Google Maps API:', e)
      })
  }, [linzApiKey])

  return <div ref={mapRef} style={containerStyle}></div>
}
