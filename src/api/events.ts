export async function addEventCall(event: {
  user_id: number
  title: FormDataEntryValue | null
  description: FormDataEntryValue | null
  date: FormDataEntryValue | null
  location: FormDataEntryValue | null
}) {
  try {
    const response = await fetch('http://localhost:3000/v1/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    throw new Error('Failed to add event: ' + (error as Error).message)
  }
}
