import { useEffect, useState } from 'react';
import { fetchAllDocTracks } from '../../../api/fetchDocTrack';
import { TrackTypes } from '../../../interface/mapTypes';
import { convertCoordinates } from '../utils/coordinateConverter';

export default function ShowAllTracks() {
  const [data, setData] = useState<TrackTypes[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAllDocTracks();
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      <h1 className="text-4xl font-bold mb-6 text-center">Show All Tracks</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-10">
          {data.map((track) => {
            const [longitude, latitude] = convertCoordinates([
              [track.x, track.y],
            ])[0];

            return (
              <div
                key={track.assetId}
                className="bg-slate-800 text-slate-100 shadow-md rounded p-10 leading-8"
              >
                <h2 className="text-2xl font-semibold mb-2">{track.name}</h2>
                <p className="font-semibold mb-3">{track.description}</p>
                <p>Region: {track.region}</p>
                <p className="font-semibold">
                  AssetId: <span className="font-normal">{track.assetId}</span>
                </p>
                <h2 className="text-lg font-semibold pt-2">Coordinates</h2>
                <p className="font-semibold">Longitude: {longitude}</p>
                <p className="font-semibold">Latitude: {latitude}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-700">No tracks found.</p>
      )}
    </div>
  );
}

//        Response Structure:
//   data[0]: // out of the array of objects. This will be one track from aroun 1300 tracks.
//   assetId: string // "1234"
//   line: array of arrays // [[23232, 444342] [123213, 344424] [etc]]
//   name: string // "Smith Track"
//   region: string within array // ["Hawke's Bay"]
//   x: number // 1857590.9413
//   y: number // 5555115.2545
