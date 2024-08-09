export function SetupDrawingManager(
  mapInstance: google.maps.Map,
  drawingManager: google.maps.drawing.DrawingManager
) {
  drawingManager.setMap(mapInstance);

  window.google.maps.event.addListener(
    drawingManager,
    'overlaycomplete',
    (event: {
      type: google.maps.drawing.OverlayType;
      overlay: google.maps.Polyline;
    }) => {
      if (event.type === window.google.maps.drawing.OverlayType.POLYLINE) {
        const polyline = event.overlay as google.maps.Polyline;
        const lengthInMeters = google.maps.geometry.spherical.computeLength(
          polyline.getPath()
        );

        console.log(`Length of the line: ${lengthInMeters.toFixed(2)} meters`);
      }
      event.overlay.addListener('click', () => {
        event.overlay.setMap(null);
      });
    }
  );
}
