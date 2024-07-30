import { useRef, useEffect } from 'react'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import { Map as TilerMap, MapStyle, config } from '@maptiler/sdk'

config.apiKey = '9qRjCyPPKjZFNcrett2H'

export function Map(): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (mapContainerRef.current) {
      new TilerMap({
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
    }
  }, [])

  return <div ref={mapContainerRef} style={{ height: '70vh', width: '100%' }} />
}

export default Map
