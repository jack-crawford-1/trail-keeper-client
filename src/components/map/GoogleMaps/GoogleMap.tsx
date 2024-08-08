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

export default function GoogleMap(): JSX.Element {
  const [selectedTrack, setSelectedTrack] = useState<TrackTypes | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<TrackTypes | null>(null);
  const linzApiKey = import.meta.env.VITE_LINZ_API_KEY;
  // const defaultMapCenter = { lat: -40.867903, lng: 175.340083 };

  const altMapCenter = { lat: -41.10297521883507, lng: 175.2632801648312 };

  const [mapCenter, setMapCenter] = useState(altMapCenter);

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
      });

      loader.load().then(() => {
        if (window.google && window.google.maps) {
          const map = new window.google.maps.Map(
            mapRef.current as HTMLElement,
            {
              center: mapCenter,
              zoom: 11,
              minZoom: 0,
              maxZoom: 20,
              disableDefaultUI: true,
              mapTypeControl: false,
              mapTypeControlOptions: {
                style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: window.google.maps.ControlPosition.TOP_LEFT,
                mapTypeIds: ['satellite', 'topo'],
              },
            }
          );

          const topoMapType = LinzTopo();
          map.mapTypes.set('topo', topoMapType);
          map.setMapTypeId('topo');
          map.overlayMapTypes.insertAt(0, topoMapType);

          const satelliteLayer = new window.google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
              return `http://mt1.google.com/vt/lyrs=s&x=${coord.x}&y=${coord.y}&z=${zoom}`;
            },
            tileSize: new window.google.maps.Size(256, 256),
            opacity: 0.5,
          });
          map.overlayMapTypes.insertAt(1, satelliteLayer);

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

                linePath.setMap(map);
              }
            });
          }

          addMarkers(
            map,
            'http://localhost:3000/v1/geojson?type=tracks',
            TrackSvg(),
            'track'
          );
          addMarkers(
            map,
            'http://localhost:3000/v1/geojson?type=huts',
            HutSvg(),
            'hut'
          );
        }
      });
    }
  }, [data, linzApiKey, mapCenter]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-10 min-h-[600px] bg-slate-800 text-white">
      <div className="lg:col-span-1 space-y-4 md:pr-10 leading-5">
        {selectedTrack ? (
          <div className="">
            <h2 className="text-3xl font-bold pb-3">{selectedTrack.name}</h2>
            <p className="text-[slate-200] pb-1">
              Region:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.region.join(', ')}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Distance:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.distance}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Duration:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.walkDuration}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Duration Category:{' '}
              <span className="text-[#12a489] font-bold pl-4">
                {selectedTrack.walkDurationCategory}
              </span>
            </p>
            <p className="text-slate-200 pb-1">
              Track Category:{' '}
              <span className="text-[#12a489] font-bold pl-4">
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
              Or click blue hut markers and green track markers.
            </p>
          </div>
        )}
        <TrackSearch onTrackSelect={handleTrackSelect} />
      </div>
      <div className="lg:col-span-2">
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            border: '5px solid white',
          }}
        ></div>
      </div>
    </div>
  );
}
