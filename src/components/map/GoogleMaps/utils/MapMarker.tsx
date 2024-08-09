import { convertCoordinates } from '../../utils/coordinateConverter';
import { MapFeature } from '../../../../interface/mapTypes';

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
      data.features.forEach((feature: MapFeature) => {
        let coordinates = feature.geometry.coordinates;
        if (type === 'track') {
          coordinates = convertCoordinates([coordinates])[0];
        }
        const [longitude, latitude] = coordinates;

        const marker = new window.google.maps.Marker({
          map,
          position: { lat: latitude, lng: longitude },
          icon: {
            url:
              'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconSvg),
            scaledSize: new window.google.maps.Size(34, 34),
          },
        });

        const popup = new window.google.maps.InfoWindow({
          content: `<div style="min-width: 150px; max-width: 150px; max-height: fit-content; margin: 0; border-radius: 8px; background-color: red;);">
          <p style="margin: 0; padding: 10px 15px; color: white; font-size: 14px; background-color: #009277; font-weight: bold; border-radius: 8px;">${feature.properties.name}</p>
          </div>`,
        });

        marker.addListener('click', () => {
          popup.open(map, marker);
          popup.setPosition({ lat: latitude, lng: longitude });
        });
      });
    })
    .catch((error) => {
      console.error(`Error fetching data from ${url}:`, error);
    });
}
