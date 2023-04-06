import { Style } from "mapbox-gl";
import maplibregl, { MapLibreEvent } from "maplibre-gl";
import Map from "react-map-gl";

// load the maplibre CSS styles
import "maplibre-gl/dist/maplibre-gl.css";
import InventorySource from "./map-components/InventorySource";
import BaseLayerSource from "./map-components/BaseLayerSource";
import UserLocationSource from "./map-components/UserLocationSource";
import LayerInteraction from "./map-components/LayerInteraction";
const MainMap: React.FC = () => {
  // onload callback handler
  const onLoad = (e: any) => {
    // resize the map once loaded
    (e as MapLibreEvent).target.resize();
    setTimeout(() => e.target.resize(), 500);

    // add terrain control
    (e as MapLibreEvent).target.addControl(
      new maplibregl.TerrainControl({
        source: "terrainSource",
        exaggeration: 1.5,
      }),
      'top-left'
    )
  };

  // some hard-coded styles
  // const stamenStyle = {
  //   version: 8,
  //   sources: {
  //     terrainSource: {
  //       type: "raster",
  //       tiles: [
  //         "https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg",
  //       ],
  //       tileSize: 256,
  //       attribution:
  //         'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
  //       // maxzoom: 10,
  //     },
  //   },
  //   layers: [
  //     {
  //       id: "terrainSource",
  //       source: "terrainSource",
  //       type: "raster",
  //     },
  //   ],
  // } as Style;

  const mapStyle = {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 19,
      },
      // found here: https://betterprogramming.pub/using-3d-terrain-in-your-web-apps-1c0c56ae07e1
      terrainSource: {
        type: "raster-dem",
        tiles: ['https://api.ellipsis-drive.com/v3/path/085f5e10-63b6-4e8f-a4c6-dce9689100d3/raster/timestamp/3179fa80-60ad-41c7-ae67-cdd5eeeca693/tile/{z}/{x}/{y}?style={"method":"terrainRgb", "parameters":{"alpha":1, "bandNumber":1} }'],
        tileSize: 256,
      }
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
      },
      // {
      //   id: "hillshade",
      //   source: "terrainSource",
      //   type: "hillshade",
      // }
    ],
  } as Style;

  return (
    <Map
      mapLib={maplibregl}
      style={{ width: "100%", height: "100%" }}
      onLoad={(m) => onLoad(m)}
      mapStyle={mapStyle}
      initialViewState={{
        longitude: 8.088652,
        latitude: 47.88443,
        zoom: 15,
        pitch: 45,
        // 47.884438269626294, 8.088652498339387
      }}
      terrain={{
        source: "terrainSource",
        exaggeration: 1.5,
      }}
    >
      <InventorySource />
      <BaseLayerSource />
      <UserLocationSource />
      <LayerInteraction />
    </Map>
  );
};

export default MainMap;
