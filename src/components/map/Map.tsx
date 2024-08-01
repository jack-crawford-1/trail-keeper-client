import { useRef, useEffect, useState } from 'react'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import { Map as TilerMap, MapStyle, config, Marker } from '@maptiler/sdk'
import { SquareSvg } from '../map/utils/SquareSvg'
import { CircleSvg } from '../map/utils/Circle'
import { convertCoordinates } from './utils/coordinateConverter'
import Feature from '../../interface/mapTypes'

const apiKey = import.meta.env.VITE_MAPTILER_API_KEY
config.apiKey = apiKey

export function Map(): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<TilerMap | null>(null)

  useEffect(() => {
    if (mapContainerRef.current) {
      const newMap = new TilerMap({
        container: mapContainerRef.current,
        style: MapStyle.OUTDOOR,
        center: [175.423748, -40.884276],
        zoom: 14,
        pitch: 80,
        maxZoom: 18,
        terrain: true,
        terrainControl: true,
        fadeDuration: 2000,
      })

      setMap(newMap)
    }
  }, [])

  useEffect(() => {
    if (map) {
      const addMarkers = async (url: string, iconSvg: string, type: string) => {
        try {
          const response = await fetch(url, {
            headers: {
              'Cache-Control': 'max-age=3600',
            },
          })
          const data = await response.json()

          data.features.forEach((feature: Feature) => {
            let coordinates = feature.geometry.coordinates
            if (type === 'track') {
              coordinates = convertCoordinates([coordinates])[0]
            }
            const [longitude, latitude] = coordinates

            const markerElement = document.createElement('div')
            markerElement.innerHTML = iconSvg
            markerElement.style.width = '34px'
            markerElement.style.height = '34px'

            const marker = new Marker({
              element: markerElement,
            })
            marker.setLngLat([longitude, latitude])
            marker.addTo(map)

            marker.getElement().addEventListener('click', () => {
              alert(feature.properties.name)
            })
          })
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error)
        }
      }

      addMarkers(
        'http://localhost:3000/v1/geojson?type=tracks',
        SquareSvg(),
        'track'
      )
      addMarkers(
        'http://localhost:3000/v1/geojson?type=huts',
        CircleSvg(),
        'hut'
      )
    }
  }, [map])

  return <div ref={mapContainerRef} style={{ height: '70vh', width: '100%' }} />
}

export default Map
