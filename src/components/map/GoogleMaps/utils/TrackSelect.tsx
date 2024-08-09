import { fetchDocTrack } from '../../../../api/fetchDocTrack';
import { TrackTypes } from '../../../../interface/mapTypes';
import { convertCoordinates } from '../../utils/coordinateConverter';

export async function handleTrackSelect(
  track: TrackTypes,
  setSelectedTrack: React.Dispatch<React.SetStateAction<TrackTypes | null>>,
  setData: React.Dispatch<React.SetStateAction<TrackTypes | null>>,
  setMapCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
) {
  const trackData = await fetchDocTrack(track.assetId);
  const convertedLineData = trackData.line.map((line: [number, number][]) =>
    convertCoordinates(line)
  );
  setData({ ...trackData, line: convertedLineData });
  setSelectedTrack({ ...track, ...trackData });
  if (convertedLineData.length > 0 && convertedLineData[0].length > 0) {
    const [lng, lat] = convertedLineData[0][0];
    setMapCenter({ lat, lng });
  }
}
