import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '15px',
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
          const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom: 14,
            mapTypeControl: false,
          })

          const tileLayer = new window.google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
              const url = `https://tiles-cdn.koordinates.com/services;key=309f0bd07902459798c646caf1f95048/tiles/v4/layer=50767/EPSG:3857/${zoom}/${coord.x}/${coord.y}.png`
              return url
            },
            tileSize: new window.google.maps.Size(256, 256),
            name: 'NZ Topo50 Maps',
            maxZoom: 15,
            minZoom: 0,
          })

          map.overlayMapTypes.insertAt(0, tileLayer)
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
