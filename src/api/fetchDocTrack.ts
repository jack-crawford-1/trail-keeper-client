import axios from 'axios'

// DOC track by ID

export async function fetchDocTrack(trackId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/v1/doc-track/${trackId}`,
      {
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching DOC track:', error)
    throw error
  }
}

// all DOC tracks

export async function fetchAllDocTracks() {
  try {
    const response = await axios.get(
      `http://localhost:3000/v1/all-doc-tracks`,
      {
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching all DOC tracks:', error)
    throw error
  }
}

// DOC Tracks by region

export async function fetchTracksByRegion(regionId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/v1/tracks-by-region/${regionId}`,
      {
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching tracks by region:', error)
    throw error
  }
}
