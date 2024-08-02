import { useRef, useEffect, useState } from 'react'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import { Map as TilerMap, MapStyle, config, Marker } from '@maptiler/sdk'
import { CircleSvg } from './utils/svg/Circle'
import Feature from '../../interface/mapTypes'

const apiKey = import.meta.env.VITE_MAPTILER_API_KEY
config.apiKey = apiKey

const styles: { [key: string]: MapStyle } = {
  topo: MapStyle.TOPO,
  satellite: MapStyle.SATELLITE,
  street: MapStyle.STREETS,
  dark: MapStyle.STREETS.DARK,
  winter: MapStyle.WINTER,
  ocean: MapStyle.OCEAN,
}

export function Map(): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<TilerMap | null>(null)

  useEffect(() => {
    if (mapContainerRef.current) {
      const newMap = new TilerMap({
        container: mapContainerRef.current,
        style: styles.topo,
        center: [175.423748, -40.884276],
        zoom: 14,
        pitch: 40,
        maxZoom: 18,
        terrain: true,
        terrainControl: true,
      })

      setMap(newMap)
    }
  }, [])

  useEffect(() => {
    if (map) {
      const addMarkers = async (url: string, iconSvg: string) => {
        try {
          const response = await fetch(url, {
            headers: {
              'Cache-Control': 'max-age=3600',
            },
          })
          const data = await response.json()

          data.features.forEach((feature: Feature) => {
            const coordinates = feature.geometry.coordinates
            const [longitude, latitude] = coordinates

            const markerElement = document.createElement('div')
            markerElement.innerHTML = iconSvg
            markerElement.style.width = '34px'
            markerElement.style.height = '34px'

            const marker = new Marker({
              element: markerElement,
            })
            marker.setLngLat([longitude, latitude])
            marker.addTo(map)

            marker.getElement().addEventListener('click', (e) => {
              showPopup(e, feature.properties.name)
            })
          })
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error)
        }
      }

      addMarkers('http://localhost:3000/v1/geojson?type=huts', CircleSvg())

      const styleSwitcher = document.createElement('div')
      styleSwitcher.className = 'maplibregl-ctrl style-switcher'

      Object.keys(styles).forEach((styleKey) => {
        const button = document.createElement('button')
        button.innerText = styleKey.charAt(0).toUpperCase() + styleKey.slice(1)
        button.onclick = () => map.setStyle(styles[styleKey])
        button.className = 'style-switcher-button'
        styleSwitcher.appendChild(button)
      })

      map.addControl(
        {
          onAdd: () => {
            return styleSwitcher
          },
          onRemove: () => {
            styleSwitcher.parentNode?.removeChild(styleSwitcher)
          },
        },
        'top-left'
      )
    }
  }, [map])

  const showPopup = (e: MouseEvent, message: string) => {
    const popup = popupRef.current
    if (popup) {
      popup.innerText = message
      popup.style.left = `${e.clientX + 10}px`
      popup.style.top = `${e.clientY + 10}px`
      popup.classList.add('show')
      setTimeout(() => {
        popup.classList.remove('show')
      }, 3000)
    }
  }

  return (
    <>
      <div ref={mapContainerRef} style={{ height: '70vh', width: '100%' }} />
      <div ref={popupRef} className="popup"></div>
      <style>{`
        .popup {
          position: absolute;
          display: none;
          background-color: white;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          color: #009277;
          font-weight: bold;
          font-size: 16px;
        }
        .popup.show {
          display: block;
        }
        .style-switcher {
          background: none;
          border-radius: 4px;
          color: #009277;
          font-size: 14px;
          font-weight: bold;
        }
        .style-switcher-button {
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 3px;
          cursor: pointer;
          margin: 5px 0;
          padding: 5px 10px;
          text-align: center;
          width: fit-content;
          min-width: 100px;
        }

        .style-switcher-button:focus {
          outline: none;
          background: #009277;
          color: #fff;
        }
      `}</style>
    </>
  )
}

export default Map
