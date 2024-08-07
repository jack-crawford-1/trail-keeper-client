export interface TrackTypes {
  assetId: string;
  name: string;
  region: string[];
  distance: string;
  walkDuration: string;
  walkDurationCategory: string;
  walkTrackCategory: string;
  description: string;
  introductionThumbnail: string;
  x: number;
  y: number;
  line: number[][][];
}

export interface Track {
  assetId: string;
  line: [number, number][][];
  geometry: {
    type: string;
    coordinates: number[][];
  };
}

export interface TrackSearchProps {
  onTrackSelect: (track: TrackTypes) => void;
}

export interface MapFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    name: string;
  };
}

export interface PolyLineFeature {
  type: 'Feature';
  properties: {
    id: string;
    assetId: string;
    [key: string]: unknown;
  };
  geometry: {
    type: 'LineString';
    coordinates: number[][];
  };
}

export interface TrackData {
  assetId: string;
  line: [number, number][][];
}
