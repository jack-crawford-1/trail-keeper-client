import { fetchAllDocTracks } from '../../api/fetchDocTrack'

export default function Demo(): JSX.Element {
  const fetchAllTracks = async () => {
    try {
      const response = await fetchAllDocTracks()
      console.log(response)
    } catch (error) {
      console.error('Error fetching all DOC tracks:', error)
    }
  }

  return (
    <div>
      <h1>DocTrack Demo 1213123</h1>
      <button onClick={fetchAllTracks}>Fetch All Tracks - check console</button>
    </div>
  )
}
