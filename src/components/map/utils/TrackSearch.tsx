import { useEffect, useState } from 'react';
import { fetchAllDocTracks } from '../../../api/fetchDocTrack';
import { TrackTypes, TrackSearchProps } from '../../../interface/mapTypes';

export default function TrackSearch({
  onTrackSelect,
}: TrackSearchProps): JSX.Element {
  const [tracks, setTracks] = useState<TrackTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<TrackTypes[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetchAllDocTracks();
        setTracks(response);
      } catch (error) {
        console.error('Error fetching all DOC tracks:', error);
      }
    };
    fetchTracks();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterTracks(value);
    setFocusedIndex(-1);
  };

  const filterTracks = (value: string) => {
    const filtered = tracks.filter((track) =>
      track.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTracks(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => (prevIndex + 1) % filteredTracks.length);
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredTracks.length) % filteredTracks.length
      );
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      selectTrack(filteredTracks[focusedIndex]);
    }
  };

  const selectTrack = (track: TrackTypes) => {
    onTrackSelect(track);
    setSearchTerm('');
    setFilteredTracks([]);
  };

  return (
    <div className="relative pt-10">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search by track name"
        className="p-2 px-8 mb-4 text-slate-800 rounded w-full"
      />
      {filteredTracks.length > 0 && (
        <ul className="absolute bg-white text-black rounded p-2 max-h-40 overflow-y-scroll z-10 w-fit">
          {filteredTracks.map((track, index) => (
            <li
              key={track.assetId}
              onClick={() => onTrackSelect(track)}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                focusedIndex === index ? 'bg-gray-300' : ''
              }`}
            >
              {track.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
