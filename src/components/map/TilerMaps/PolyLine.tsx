import { useEffect } from 'react';
import { Map, GeoJSONSource } from '@maptiler/sdk';
import { fetchPolylineData } from '../../../api/fetchPolyLineData';
import { PolyLineFeature } from '../../../interface/mapTypes';

type TilerMap = Map;

export const Polyline = ({ map }: { map: TilerMap | null }) => {
  useEffect(() => {
    const fetchAndAddPolyline = async () => {
      if (map) {
        const data = await fetchPolylineData();
        if (data) {
          const features = data.features.map(
            (feature: PolyLineFeature, index: number) => ({
              ...feature,
              properties: {
                ...feature.properties,
                id: index,
              },
            })
          );

          if (!map.getSource('line')) {
            map.addSource('line', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: features,
              },
            });

            map.addLayer({
              id: 'line-layer',
              source: 'line',
              type: 'line',
              paint: {
                'line-color': '#FF0000',
                'line-width': 3,
              },
            });
          } else {
            const source = map.getSource('line') as GeoJSONSource;
            if (source && source.type === 'geojson') {
              source.setData({
                type: 'FeatureCollection',
                features: features,
              });
            }
          }
        } else {
          console.error('No polyline data fetched');
        }
      }
    };

    fetchAndAddPolyline();

    const handleStyleData = () => {
      fetchAndAddPolyline();
    };

    map?.on('styledata', handleStyleData);

    return () => {
      map?.off('styledata', handleStyleData);
    };
  }, [map]);

  return null;
};
