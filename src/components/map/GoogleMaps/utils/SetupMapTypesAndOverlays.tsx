export function SetupMapTypesAndOverlays(
  mapInstance: google.maps.Map,
  topoMapType: google.maps.ImageMapType,
  satelliteLayer: google.maps.ImageMapType,
  satelliteMapTypeRef: React.MutableRefObject<google.maps.ImageMapType | null>
) {
  mapInstance.mapTypes.set('topo', topoMapType);
  mapInstance.setMapTypeId('topo');

  satelliteMapTypeRef.current = satelliteLayer;
  mapInstance.overlayMapTypes.insertAt(0, satelliteLayer);
}
