import { convertCoordinates } from '../components/map/utils/coordinateConverter';
import { PolyLineFeature, TrackData } from '../interface/mapTypes';

export async function fetchPolylineData(): Promise<{
  type: 'FeatureCollection';
  features: PolyLineFeature[];
} | null> {
  try {
    const response = await fetch('http://localhost:3000/v1/all-doc-tracks', {
      headers: {
        'Cache-Control': 'max-age=3600',
      },
    });
    const tracks: TrackData[] = await response.json();

    const trackFeatures: PolyLineFeature[] = tracks.map((track) => ({
      type: 'Feature',
      properties: {
        id: track.assetId,
        assetId: track.assetId,
      },
      geometry: {
        type: 'LineString',
        coordinates: convertCoordinates(track.line[0]),
      },
    }));

    return {
      type: 'FeatureCollection',
      features: trackFeatures,
    };
  } catch (error) {
    console.error('Error fetching polyline data:', error);
    return null;
  }
}
