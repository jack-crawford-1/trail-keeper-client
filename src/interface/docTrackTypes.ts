export interface DocTrackTypes {
  assetId: string
  name: string
  region: string[]
  introduction: string
  introductionThumbnail: string
  permittedActivities: string[]
  distance: string
  locationString: string
  line: Array<string>
  walkDuration: string
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
