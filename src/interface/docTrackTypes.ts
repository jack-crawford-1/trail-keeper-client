export interface DocTrackTypes {
  name: string
  introduction: string
  introductionThumbnail: string
  permittedActivities: string[]
  distance: number
  locationString: string
  line: Array<string>
  walkDuration: number
  walkDurationCategory: string
  walkTrackCategory: string
}

export interface TrackTypes {
  assetId: string
  name: string
  region: string[]
  distance: string
  walkDuration: string
  walkDurationCategory: string
  walkTrackCategory: string
}
