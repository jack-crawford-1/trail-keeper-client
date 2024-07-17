import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import proj4 from 'proj4'

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '15px',
}

//TODO fix type errors

// Tararua Forest Park
const center = {
  lat: -40.867903,
  lng: 175.340083,
}

// using proj4 to swap the coords format to something google can use to show the markers
const sourceProj = 'EPSG:2193'
const destProj = 'EPSG:4326'

if (!proj4.defs[sourceProj]) {
  proj4.defs(
    sourceProj,
    '+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +datum=WGS84 +units=m +no_defs'
  )
}

export default function Map() {
  const mapRef = useRef(null)

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
            zoom: 12,
            mapTypeControl: true,
          })

          // Adding the Topo50 overlay
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

          fetch('http://localhost:3000/v1/geojson', {
            headers: {
              'Cache-Control': 'no-cache',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              data.features.forEach((feature) => {
                if (feature.geometry.type === 'Point') {
                  const [lat, lng] = feature.geometry.coordinates
                  const [longitude, latitude] = proj4(sourceProj, destProj, [
                    lat,
                    lng,
                  ])

                  const marker = new window.google.maps.Marker({
                    map,
                    position: {
                      lat: latitude,
                      lng: longitude,
                    },
                    title: feature.properties.name,
                    zIndex: 1000,
                  })

                  marker.addListener('click', () => {
                    alert(feature.properties.name)
                  })
                }
              })

              map.data.addGeoJson(data)
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
  }, [])

  return <div ref={mapRef} style={containerStyle}></div>
}
