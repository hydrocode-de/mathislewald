import { Style } from "mapbox-gl";
import maplibregl, { MapLibreEvent } from "maplibre-gl";
import Map from "react-map-gl";

// load the maplibre CSS styles
import "maplibre-gl/dist/maplibre-gl.css";
import InventorySource from "./map-components/InventorySource";
import BaseLayerSource from "./map-components/BaseLayerSource";
const MainMap: React.FC = () => {
  // onload callback handler
  const onLoad = (e: any) => {
    // resize the map once loaded
    (e as MapLibreEvent).target.resize();
    setTimeout(() => e.target.resize(), 500);
  };

  // some hard-coded styles
  const stamenStyle = {
    version: 8,
    sources: {
      terrainSource: {
        type: "raster",
        tiles: [
          "https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg",
        ],
        tileSize: 256,
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
        // maxzoom: 10,
      },
    },
    layers: [
      {
        id: "terrainSource",
        source: "terrainSource",
        type: "raster",
      },
    ],
  } as Style;

  const osmStyle = {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
      },
    ],
  } as Style;

  return (
    <Map
      mapLib={maplibregl}
      style={{ width: "100%", height: "100%" }}
      onLoad={(m) => onLoad(m)}
      mapStyle={osmStyle}
      initialViewState={{
        longitude: 8.088652,
        latitude: 47.88443,
        zoom: 15,
        // pitch: 52,
        // 47.884438269626294, 8.088652498339387
      }}
    >
      <InventorySource />
      <BaseLayerSource />
    </Map>
  );
};

export default MainMap;
