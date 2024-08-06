import { useEffect, useState } from 'react';
import { fetchTracksByRegion } from '../../../api/fetchDocTrack';
import { getRegionName } from '../utils/DocRegionValues';
import { TrackTypes } from '../../../interface/mapTypes';

export default function ShowTracksByRegion() {
  const [data, setData] = useState<TrackTypes[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const regionId = 'NZ-WGN';
  const regionName = getRegionName(regionId);

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const fetchedData = await fetchTracksByRegion(regionId);
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchRegionData();
  }, [regionId]);

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error fetching data: {error.message}
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Show Tracks By Region
      </h1>
      <h2 className="font-bold pb-5">
        {regionId} <span>({regionName})</span>
      </h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-10">
          {data.map((track) => (
            <div
              key={track.assetId}
              className="bg-slate-800 text-slate-100 shadow-md rounded p-10  leading-8"
            >
              <h2 className="text-2xl font-semibold mb-2">{track.name}</h2>
              <p className="font-semibold mb-3">{track.description}</p>
              <p>Region: {track.region}</p>
              <p className="font-semibold">
                AssetId: <span className="font-normal">{track.assetId}</span>
              </p>
              <h2 className="text-lg font-semibold pt-2">Coordinates</h2>
              <p className="font-semibold">X: {track.x}</p>
              <p className="font-semibold">Y: {track.y}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">
          No tracks found for this region.
        </p>
      )}
    </div>
  );
}
