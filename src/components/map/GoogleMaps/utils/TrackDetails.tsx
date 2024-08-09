import { TrackTypes } from '../../../../interface/mapTypes';

export function TrackDetails({
  selectedTrack,
  data,
}: {
  selectedTrack: TrackTypes;
  data: TrackTypes | null;
}) {
  return (
    <div>
      <h2 className="text-3xl font-bold pb-3">{selectedTrack.name}</h2>
      <p className="text-[slate-200] pb-1">
        Region:{' '}
        <span className="text-white font-medium pl-4">
          {selectedTrack.region.join(', ')}
        </span>
      </p>
      <p className="text-slate-200 pb-1">
        Distance:{' '}
        <span className="text-white font-medium pl-4">
          {selectedTrack.distance}
        </span>
      </p>
      <p className="text-slate-200 pb-1">
        Duration:{' '}
        <span className="text-white font-medium pl-4">
          {selectedTrack.walkDuration}
        </span>
      </p>
      <p className="text-slate-200 pb-1">
        Duration Category:{' '}
        <span className="text-white font-medium pl-4">
          {selectedTrack.walkDurationCategory}
        </span>
      </p>
      <p className="text-slate-200 pb-1">
        Track Category:{' '}
        <span className="text-white font-medium pl-4">
          {selectedTrack.walkTrackCategory}
        </span>
      </p>
      <div className="pt-5">
        <img
          className="border-2 border-white"
          src={data?.introductionThumbnail || 'https://via.placeholder.com/300'}
          alt={data?.name}
          style={{ width: '100%', borderRadius: '15px' }}
        />
      </div>
    </div>
  );
}
