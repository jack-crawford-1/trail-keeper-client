import { useState, useEffect } from 'react'
import { fetchAllDocTracks, fetchDocTrack } from '../../api/fetchDocTrack'

interface Track {
  assetId: string
  name: string
  region: string[]
  distance: string
  walkDuration: string
  walkDurationCategory: string
  walkTrackCategory: string
}

export default function Demo(): JSX.Element {
  const [tracks, setTracks] = useState<Track[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([])
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetchAllDocTracks()
        setTracks(response)
      } catch (error) {
        console.error('Error fetching all DOC tracks:', error)
      }
    }
    fetchTracks()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    filterTracks(value)
  }

  const filterTracks = (value: string) => {
    const filtered = tracks.filter((track) =>
      track.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredTracks(filtered)
  }

  const handleTrackSelect = async (track: Track) => {
    setSelectedTrack(track)
    const trackData = await fetchDocTrack(track.assetId)
    setSelectedTrack(trackData)
  }

  return (
    <div className="p-5 md:p-10 min-h-screen bg-slate-800 text-white">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by track name"
          className="p-2 px-8 mb-4 text-red-500 rounded"
        />
        {filteredTracks.length > 0 && (
          <ul className="bg-white text-black rounded p-2 max-h-40 overflow-y-scroll">
            {filteredTracks.map((track) => (
              <li
                key={track.assetId}
                onClick={() => handleTrackSelect(track)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {track.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedTrack ? (
        <>
          <div>
            <h2 className="text-3xl font-bold pb-3">{selectedTrack.name}</h2>
            <p className="text-slate-200 pb-1">
              {selectedTrack.region.join(', ')}
            </p>
            <p className="text-slate-200 pb-1">
              Distance: {selectedTrack.distance}
            </p>
            <p className="text-slate-200 pb-1">
              Duration: {selectedTrack.walkDuration}
            </p>
            <p className="text-slate-200 pb-1">
              Duration Category: {selectedTrack.walkDurationCategory}
            </p>
            <p className="text-slate-200 pb-1">
              Track Category: {selectedTrack.walkTrackCategory}
            </p>
          </div>
        </>
      ) : (
        <p>...</p>
      )}
    </div>
  )
}
