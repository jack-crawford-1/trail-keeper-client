export interface Huts {
  type: string
  crs: CRS
  features: Feature[]
}

export interface CRS {
  type: string
  properties: CRSProperties
}

export interface CRSProperties {
  name: string
}

export interface Feature {
  type: string
  id: number
  geometry: Geometry
  properties: FeatureProperties
}

export interface Geometry {
  type: string
  coordinates: number[]
}

export interface FeatureProperties {
  objectid: number
  name: string
  place: string
  region: string
  bookable: string
  facilities: string
  hasAlerts: string
  introductionThumbnail: string
  staticLink: string
  locationString: string
  x: number
  y: number
  assetID: number
  dateLoadedToGIS: string
  globalID: string
}
