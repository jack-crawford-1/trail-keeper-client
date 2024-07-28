import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

type Data = {
  line: unknown[]
}

export const useGoogleMap = (
  mapCenter: unknown,
  linzApiKey: unknown,
  data: Data
) => {
  const mapRef = useRef<HTMLDivElement | null>(null)

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
              zoom: 2,
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
                  strokeColor: '#cf2960',
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

  return mapRef
}
