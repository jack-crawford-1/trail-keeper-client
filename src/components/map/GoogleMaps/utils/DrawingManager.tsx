export default function createDrawingManager(
  mapInstance: google.maps.Map
): google.maps.drawing.DrawingManager {
  const drawingManager = new window.google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google.maps.ControlPosition.BOTTOM_LEFT,
      drawingModes: [
        window.google.maps.drawing.OverlayType.MARKER,
        window.google.maps.drawing.OverlayType.CIRCLE,
        window.google.maps.drawing.OverlayType.POLYGON,
        window.google.maps.drawing.OverlayType.POLYLINE,
        window.google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
    polylineOptions: {
      strokeColor: '#FF6600',
      strokeOpacity: 0.75,
      strokeWeight: 5,
    },
    circleOptions: {
      fillColor: '#FF6600',
      fillOpacity: 0.1,
      strokeWeight: 2,
      strokeColor: '#FF6600',
      clickable: true,
      editable: true,
    },
    polygonOptions: {
      fillColor: '#FF6600',
      fillOpacity: 0.1,
      strokeWeight: 2,
      strokeColor: '#FF6600',
      clickable: true,
      editable: true,
    },
    rectangleOptions: {
      fillColor: '#FF6600',
      fillOpacity: 0.1,
      strokeWeight: 2,
      strokeColor: '#FF6600',
      clickable: true,
      editable: true,
    },
  });

  drawingManager.setMap(mapInstance);

  return drawingManager;
}
