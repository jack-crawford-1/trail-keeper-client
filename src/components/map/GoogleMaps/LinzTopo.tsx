const linzApiKey = import.meta.env.VITE_LINZ_API_KEY;

export default function LinzTopo(): google.maps.ImageMapType {
  const topoMapType = new window.google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      const url = `https://data.linz.govt.nz/services;key=${linzApiKey}/tiles/v4/layer=50767/EPSG:3857/${zoom}/${coord.x}/${coord.y}.png`;
      return url;
    },
    tileSize: new window.google.maps.Size(256, 256),
    name: 'NZ Topo50',
    maxZoom: 20,
    minZoom: 8,
  });
  return topoMapType;
}
