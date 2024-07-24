import axios from 'axios'
import { useEffect, useState } from 'react'
import DocRoutesTypes from '../../interface/docRouteTypes'

export default function DocRoutes(): JSX.Element {
  const [data, setData] = useState<DocRoutesTypes | null>(null)

  useEffect(() => {
    axios
      .get('http://localhost:3000/v1/docroutes', {
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      })
      .then((response) => {
        console.log('Response Data:', response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <div>
      <h1>DOC Routes</h1>
      {data ? (
        <div>
          <h2>{data.name}</h2>
          <p>{data.introduction}</p>
          <img src={data.introductionThumbnail} alt={data.name} />
          <ul>
            {data.permittedActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
          <p>Distance: {data.distance}</p>
          <p>Location: {data.locationString}</p>
          <p>Walk Duration: {data.walkDuration}</p>
          <p>walk Catrgory {data.walkDurationCategory}</p>
          <p>Category {data.walkTrackCategory}</p>
          <h3>Line Data:</h3>
          <ul>
            {data.line.map((lineItem, index) => (
              <li key={index}>{JSON.stringify(lineItem)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
