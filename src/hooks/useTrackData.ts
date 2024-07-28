import { useState, useEffect } from 'react'
import { fetchAllDocTracks, fetchDocTrack } from '../api/fetchDocTrack'
import { DocTrackTypes, TrackTypes } from '../interface/docTrackTypes'
import { convertCoordinates } from '../components/map/coordinateConverter'

export const useTrackData = () => {
  const [tracks, setTracks] = useState<TrackTypes[] | null>(null)
  const [filteredTracks, setFilteredTracks] = useState<TrackTypes[]>([])
  const [selectedTrack, setSelectedTrack] = useState<TrackTypes | null>(null)
  const [data, setData] = useState<DocTrackTypes | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    filterTracks(value)
  }

  const filterTracks = (value: string) => {
    const filtered =
      tracks?.filter((track) =>
        track.name.toLowerCase().includes(value.toLowerCase())
      ) || []
    setFilteredTracks(filtered)
  }

  const handleTrackSelect = async (track: TrackTypes) => {
    const trackData = await fetchDocTrack(track.assetId)
    const convertedLineData = trackData.line.map((line: [number, number][]) =>
      convertCoordinates(line)
    )
    setData({ ...trackData, line: convertedLineData })
    setSelectedTrack({ ...track, ...trackData })
    setFilteredTracks([])
  }

  return {
    tracks,
    filteredTracks,
    selectedTrack,
    data,
    searchTerm,
    handleSearchChange,
    handleTrackSelect,
  }
}
