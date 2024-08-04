import { convertCoordinates } from './coordinateConverter';

interface Feature {
  type: string;
  properties: any;
  geometry: {
    type: string;
    coordinates: number[][];
  };
}

export const fetchPolylineData = async (): Promise<{
  type: string;
  features: Feature[];
} | null> => {
  try {
    const response = await fetch('http://localhost:3000/v1/all-doc-tracks', {
      headers: {
        'Cache-Control': 'max-age=3600',
      },
    });
    const data = await response.json();

    const features = data.map((track: any) => ({
      type: 'Feature',
      properties: {
        assetId: track.assetId,
      },
      geometry: {
        type: 'LineString',
        coordinates: convertCoordinates(track.line[0]),
      },
    }));

    const geoJsonData = {
      type: 'FeatureCollection',
      features: features,
    };
    return geoJsonData;
  } catch (error) {
    console.error('Error fetching polyline data:', error);
    return null;
  }
};
