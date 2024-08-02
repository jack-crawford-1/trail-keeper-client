import { convertCoordinates } from './coordinateConverter'
import Feature from '../../../interface/mapTypes'

export default function MapMarker(
  map: google.maps.Map,
  url: string,
  iconSvg: string,
  type: string
): void {
  fetch(url, {
    headers: {
      'Cache-Control': 'max-age=3600',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.features.forEach((feature: Feature) => {
        let coordinates = feature.geometry.coordinates
        if (type === 'track') {
          coordinates = convertCoordinates([coordinates])[0]
        }
        const [longitude, latitude] = coordinates

        const marker = new window.google.maps.Marker({
          map,
          position: { lat: latitude, lng: longitude },
          icon: {
            url:
              'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconSvg),
            scaledSize: new window.google.maps.Size(34, 34),
          },
        })

        marker.addListener('click', () => {
          alert(feature.properties.name)
        })
      })
    })
    .catch((error) => {
      console.error(`Error fetching data from ${url}:`, error)
    })
}
