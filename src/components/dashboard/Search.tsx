import { useState } from 'react';
import { fetchDocTrack } from '../../api/fetchDocTrack';
import { TrackTypes } from '../../interface/mapTypes';
import { convertCoordinates } from '../map/utils/coordinateConverter';
import TrackSearch from '../map/utils/TrackSearch';

export default function Search() {
  const [selectedTrack, setSelectedTrack] = useState<TrackTypes | null>(null);
  const [data, setData] = useState<TrackTypes | null>(null);

  const handleTrackSelect = async (track: TrackTypes) => {
    const trackData = await fetchDocTrack(track.assetId);
    const convertedLineData = trackData.line.map((line: [number, number][]) =>
      convertCoordinates(line)
    );
    setData({ ...trackData, line: convertedLineData });
    setSelectedTrack({ ...track, ...trackData });
  };

  return (
    <div className="text-left pl-10 p-10 leading-5 bg-[#12a489] rounded">
      {selectedTrack ? (
        <div className="text-lg text-white">
          <h2 className="text-3xl font-bold pb-3">{selectedTrack.name}</h2>
          <p className="text-[slate-200] pb-1 text-lg">
            Region:{' '}
            <span className="text-slate-100 font-bold pl-4">
              {selectedTrack.region.join(', ')}
            </span>
          </p>
          <p className="text-slate-200 pb-1">
            Distance:{' '}
            <span className="text-slate-100 font-bold pl-4">
              {selectedTrack.distance}
            </span>
          </p>
          <p className="text-slate-200 pb-1">
            Duration:{' '}
            <span className="text-slate-100 font-bold pl-4">
              {selectedTrack.walkDuration}
            </span>
          </p>
          <p className="text-slate-200 pb-1">
            Duration Category:{' '}
            <span className="text-slate-100 font-bold pl-4">
              {selectedTrack.walkDurationCategory}
            </span>
          </p>
          <p className="text-slate-200 pb-1">
            Track Category:{' '}
            <span className="text-slate-100 font-bold pl-4">
              {selectedTrack.walkTrackCategory}
            </span>
          </p>

          <div className="pt-5">
            <img
              className="border-2 border-white"
              src={
                data?.introductionThumbnail || 'https://via.placeholder.com/300'
              }
              alt={data?.name}
              style={{
                width: '100%',
                borderRadius: '10px',
                border: '5px solid white',
              }}
            />
          </div>
        </div>
      ) : (
        <div className="pt-10 min-h-[20vh] text-slate-200">
          <p className=" md:w-5/6 leading-6">
            Search for Department of Conservation (DOC) tracks by track name.
          </p>
        </div>
      )}
      <TrackSearch onTrackSelect={handleTrackSelect} />
    </div>
  );
}
