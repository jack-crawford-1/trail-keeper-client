import { useRef, useEffect, useState } from 'react';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { Map as TilerMap, MapStyle, config, Marker } from '@maptiler/sdk';
import { CircleSvg } from './svg/Circle';
import { MapFeature } from '../../../interface/mapTypes';
import { Polyline } from '../TilerMaps/PolyLine';

const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
config.apiKey = apiKey;

const styles = {
  topo: MapStyle.TOPO,
  satellite: MapStyle.SATELLITE,
  winter: MapStyle.WINTER,
  ocean: MapStyle.OCEAN,
};

export function Map(): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<TilerMap | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      try {
        const newMap = new TilerMap({
          container: mapContainerRef.current,
          style: styles.topo,
          center: [175.433748, -40.844276],
          zoom: 13,
          pitch: 80,
          maxZoom: 18,
          terrain: true,
          terrainControl: true,
          fullscreenControl: true,
        });

        newMap.on('load', () => {
          setMap(newMap);

          const styleSwitcher = document.createElement('div');
          styleSwitcher.className = 'maplibregl-ctrl style-switcher';

          Object.keys(styles).forEach((styleKey) => {
            const button = document.createElement('button');
            button.innerText =
              styleKey.charAt(0).toUpperCase() + styleKey.slice(1);
            button.onclick = () => {
              newMap.setStyle(styleKey);
            };
            button.className = 'style-switcher-button';
            styleSwitcher.appendChild(button);
          });

          newMap.addControl(
            {
              onAdd: () => styleSwitcher,
              onRemove: () =>
                styleSwitcher.parentNode?.removeChild(styleSwitcher),
            },
            'top-left'
          );
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    if (map) {
      const addMarkers = async (url: string, iconSvg: string) => {
        try {
          const response = await fetch(url, {
            headers: {
              'Cache-Control': 'max-age=3600',
            },
          });
          const data = await response.json();

          data.features.forEach((feature: MapFeature) => {
            const [longitude, latitude] = feature.geometry.coordinates;
            const markerElement = document.createElement('div');

            markerElement.innerHTML = iconSvg;
            markerElement.style.width = '24px';
            markerElement.style.height = '24px';

            const marker = new Marker({
              element: markerElement,
            });
            marker.setLngLat([longitude, latitude]);
            marker.addTo(map);

            marker.getElement().addEventListener('click', (e) => {
              showPopup(e, feature.properties.name);
            });
          });
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
        }
      };

      addMarkers('http://localhost:3000/v1/geojson?type=huts', CircleSvg());
    }
  }, [map]);

  const showPopup = (e: MouseEvent, message: string) => {
    const popup = popupRef.current;
    if (popup) {
      popup.innerText = message;
      popup.style.left = `${e.clientX + 10}px`;
      popup.style.top = `${e.clientY + 10}px`;
      popup.classList.add('show');
      setTimeout(() => {
        popup.classList.remove('show');
      }, 3000);
    }
  };

  return (
    <>
      <div
        ref={mapContainerRef}
        style={{ height: '83vh', width: '100%', borderRadius: '5px' }}
      />
      <Polyline map={map} />

      <div ref={popupRef} className="popup"></div>
    </>
  );
}

export default Map;
