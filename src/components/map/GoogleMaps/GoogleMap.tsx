import { useState, useEffect, useRef } from 'react';
import { fetchDocTrack } from '../../../api/fetchDocTrack';
import { TrackTypes } from '../../../interface/mapTypes';
import { Loader } from '@googlemaps/js-api-loader';
import { convertCoordinates } from '../utils/coordinateConverter';
import { TrackSvg } from './svg/TrackSvg';
import { HutSvg } from './svg/HutSvg';
import TrackSearch from '../utils/TrackSearch';
import LinzTopo from './LinzTopo';
import addMarkers from './MapMarker';

// TODO add ability to download gpx coordinates from the line drawn on the map
// TODO add ability to save the line drawn on the map to a database and be viewed by other users / only the user who created the line
// TODO add abitility to save abd reload an instance of a map

export default function GoogleMap(): JSX.Element {
  const [selectedTrack, setSelectedTrack] = useState<TrackTypes | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<TrackTypes | null>(null);
  const linzApiKey = import.meta.env.VITE_LINZ_API_KEY;
  const altMapCenter = { lat: -41.10297521883507, lng: 175.2632801648312 };
  const [mapCenter, setMapCenter] = useState(altMapCenter);
  const [sliderValue, setSliderValue] = useState(0.2);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const satelliteMapTypeRef = useRef<google.maps.ImageMapType | null>(null);

  const handleTrackSelect = async (track: TrackTypes) => {
    const trackData = await fetchDocTrack(track.assetId);
    const convertedLineData = trackData.line.map((line: [number, number][]) =>
      convertCoordinates(line)
    );
    setData({ ...trackData, line: convertedLineData });
    setSelectedTrack({ ...track, ...trackData });
    if (convertedLineData.length > 0 && convertedLineData[0].length > 0) {
      const [lng, lat] = convertedLineData[0][0];
      setMapCenter({ lat, lng });
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['drawing'],
      });

      loader.load().then(() => {
        if (window.google && window.google.maps) {
          const mapInstance = new window.google.maps.Map(
            mapRef.current as HTMLElement,
            {
              center: mapCenter,
              zoom: 13,
              minZoom: 0,
              maxZoom: 20,
              disableDefaultUI: true,
              mapTypeControl: false,
              fullscreenControl: true,
              keyboardShortcuts: true,
              zoomControl: false,
            }
          );

          const topoMapType = LinzTopo();
          mapInstance.mapTypes.set('topo', topoMapType);
          mapInstance.setMapTypeId('topo');

          const satelliteLayer = new window.google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
              return `http://mt1.google.com/vt/lyrs=s&x=${coord.x}&y=${coord.y}&z=${zoom}`;
            },
            tileSize: new window.google.maps.Size(256, 256),
            opacity: sliderValue,
          });

          satelliteMapTypeRef.current = satelliteLayer;
          mapInstance.overlayMapTypes.insertAt(0, satelliteLayer);

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

          window.google.maps.event.addListener(
            drawingManager,
            'overlaycomplete',
            (event: {
              type: google.maps.drawing.OverlayType;
              overlay: google.maps.Polyline;
            }) => {
              if (
                event.type === window.google.maps.drawing.OverlayType.POLYLINE
              ) {
                const polyline = event.overlay as google.maps.Polyline;
                const lengthInMeters =
                  google.maps.geometry.spherical.computeLength(
                    polyline.getPath()
                  );

                console.log(
                  `Length of the line: ${lengthInMeters.toFixed(2)} meters`
                );
              }
              event.overlay.addListener('click', () => {
                event.overlay.setMap(null);
              });
            }
          );

          setMap(mapInstance);

          if (data) {
            data.line.forEach((line) => {
              if (Array.isArray(line)) {
                const linePath = new window.google.maps.Polyline({
                  path: line.map(([lng, lat]) => ({ lat, lng })),
                  geodesic: true,
                  strokeColor: '#FF6600',
                  strokeOpacity: 0.75,
                  strokeWeight: 5,
                });

                linePath.setMap(mapInstance);
              }
            });
          }

          addMarkers(
            mapInstance,
            'http://localhost:3000/v1/geojson?type=tracks',
            TrackSvg(),
            'track'
          );
          addMarkers(
            mapInstance,
            'http://localhost:3000/v1/geojson?type=huts',
            HutSvg(),
            'hut'
          );
        }
      });
    }
  }, [data, linzApiKey, mapCenter]);

  useEffect(() => {
    if (satelliteMapTypeRef.current) {
      satelliteMapTypeRef.current.setOpacity(sliderValue);
    }
  }, [sliderValue]);

  return (
    <div className="grid grid-cols-3 gap-4 pl-10  min-h-[735px] bg-slate-700 text-white">
      <div className="lg:col-span-1 space-y-4 md:pr-10 leading-5 pt-10">
        {selectedTrack ? (
          <div className="">
            <h2 className="text-3xl font-bold pb-3">{selectedTrack.name}</h2>
            <p className="text-[slate-200] pb-1">
              Region:{' '}
              <span className="text-white font-medium pl-4">
                {selectedTrack.region.join(', ')}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Distance:{' '}
              <span className="text-white font-medium pl-4">
                {selectedTrack.distance}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Duration:{' '}
              <span className="text-white font-medium pl-4">
                {selectedTrack.walkDuration}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Duration Category:{' '}
              <span className="text-white font-medium pl-4">
                {selectedTrack.walkDurationCategory}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Track Category:{' '}
              <span className="text-white font-medium pl-4">
                {selectedTrack.walkTrackCategory}
              </span>
            </p>

            <div className="pt-5">
              <img
                className="border-2 border-white"
                src={
                  data?.introductionThumbnail ||
                  'https://via.placeholder.com/300'
                }
                alt={data?.name}
                style={{ width: '100%', borderRadius: '15px' }}
              />
            </div>
          </div>
        ) : (
          <div className="pt-40">
            <h2 className="text-5xl font-bold pb-5">Trail Mate</h2>
            <p className="text-slate-200 md:w-5/6 leading-6">
              Search for Department of Conservation (DOC) tracks by track name.
              --- Click hut and track markers. --- Add markers, draw shapes and
              lines on the map.
            </p>
          </div>
        )}
        <TrackSearch onTrackSelect={handleTrackSelect} />
        <div className="pt-5">
          <label htmlFor="opacity-slider" className="block text-slate-200 pb-3">
            Satellite / NZ Topo50 Overlay
          </label>
          <input
            id="opacity-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sliderValue}
            onChange={(e) => setSliderValue(parseFloat(e.target.value))}
            className="w-1/2 appearance-none bg-white rounded-lg overflow-hidden"
          />
        </div>
      </div>
      <div className="lg:col-span-2">
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
            border: '15px solid white',
            borderTop: '0px',
            borderBottom: '0px',
            borderRight: '0px',
            // border: '5px 5px 5px 5px solid white',
          }}
        ></div>
      </div>
    </div>
  );
}
