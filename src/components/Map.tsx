import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const containerStyle = {
  width: '100%',
  height: '100%',
}

// Tararua Forest Park
const center = {
  lat: -40.867903,
  lng: 175.340083,
}

export default function Map() {
  const mapRef = useRef(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })

    loader
      .importLibrary('maps')
      .then(() => {
        if (mapRef.current && window.google && window.google.maps) {
          new window.google.maps.Map(mapRef.current, {
            center,
            zoom: 10,
          })
        } else {
          console.error('Google Maps API failed to load')
        }
      })
      .catch((e) => {
        console.error('Error loading Google Maps API:', e)
      })
  }, [])

  return <div ref={mapRef} style={containerStyle}></div>
}
