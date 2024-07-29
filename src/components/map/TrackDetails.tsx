// not usung yet

import { TrackTypes } from '../../interface/docTrackTypes'

interface TrackDetailsProps {
  track: TrackTypes
}

const TrackDetails: React.FC<TrackDetailsProps> = ({ track }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold pb-3">{track.name}</h2>
      <p className="text-slate-200 pb-1">{track.region.join(', ')}</p>
      <p className="text-slate-200 pb-1">Distance: {track.distance}</p>
      <p className="text-slate-200 pb-1">Duration: {track.walkDuration}</p>
      <p className="text-slate-200 pb-1">
        Duration Category: {track.walkDurationCategory}
      </p>
      <p className="text-slate-200 pb-1">
        Track Category: {track.walkTrackCategory}
      </p>
      <p>{track.assetId}</p>
    </div>
  )
}

export default TrackDetails
