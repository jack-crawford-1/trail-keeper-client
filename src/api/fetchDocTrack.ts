import axios from 'axios'

export async function fetchDocTrack() {
  try {
    const response = await axios.get('http://localhost:3000/v1/doc-track', {
      headers: {
        'Cache-Control': 'max-age=3600',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching DOC track:', error)
    throw error
  }
}
