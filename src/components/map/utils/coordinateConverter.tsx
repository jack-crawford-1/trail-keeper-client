import proj4 from 'proj4';

const sourceProj = 'EPSG:2193';
const destProj = 'EPSG:4326';

if (!proj4.defs(sourceProj)) {
  proj4.defs(
    sourceProj,
    '+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +datum=WGS84 +units=m +no_defs'
  );
}

export function convertCoordinates(
  coordinates: [number, number][]
): [number, number][] {
  return coordinates.map(([lng, lat]) => {
    const [longitude, latitude] = proj4(sourceProj, destProj, [lng, lat]);
    return [longitude, latitude];
  });
}
