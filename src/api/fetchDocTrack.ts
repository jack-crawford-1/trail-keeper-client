import axios from 'axios';

export async function fetchDocTrack(trackId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/v1/doc-track/${trackId}`,

      {
        headers: {
          'Cache-Control': 'max-age=3600',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching DOC track:', error);
    throw error;
  }
}

export async function fetchAllDocTracks() {
  try {
    const response = await axios.get(
      `http://localhost:3000/v1/all-doc-tracks`,
      {
        headers: {
          'Cache-Control': 'max-age=3600',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching all DOC tracks:', error);
    throw error;
  }
}
export async function fetchTracksByRegion(regionId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/v1/tracks-by-region/${regionId}`,

      {
        headers: {
          'Cache-Control': 'max-age=3600',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching tracks by region:', error);
    throw error;
  }
}
