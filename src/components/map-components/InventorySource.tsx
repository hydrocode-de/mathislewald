import { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { CirclePaint, CircleLayout, MapLayerMouseEvent } from "mapbox-gl";
import { Source, Layer, useMap } from "react-map-gl";

import { useData } from "../../context/data";
import { InventoryData, InventoryFeature } from "../../context/data.model";
import { useLayers } from "../../context/layers";
import { useHistory } from "react-router";
import { useOffline } from "../../context/offline";

const InventoryLayer: React.FC = () => {
  const {
    activeVariable,
    setSelectedInventoryTreeIDHandler,
    selectedInventoryTreeID,
  } = useData();
  // component state
  const [src, setSrc] = useState<InventoryData>();

  // store selected and hovered features for effects
  const [hovered, setHovered] = useState<InventoryFeature>();
  const [currentImg, setCurrentImg] = useState<string | null>(null);

  // make the paint a state property
  const [paint, setPaint] = useState<CirclePaint>({});

  // load needed contexts
  const { filteredInventory } = useData();
  const { getImageData } = useOffline();

  const layers = useLayers();
  const map = useMap();
  const history = useHistory();

  // load source into component
  useEffect(() => {
    if (filteredInventory) {
      console.log(filteredInventory);
      setSrc(
        cloneDeep({
          ...filteredInventory,
          features: [
            ...filteredInventory.features.map((f, i) => {
              // set radius to 1 decimal point and height to
              if (f.properties.radius) {
                f.properties.radius = Number(f.properties.radius.toFixed(1));
              }
              if (f.properties.height) {
                f.properties.height = Math.round(f.properties.height);
              }
              return { ...f, id: i };
            }),
          ],
        })
      );
    }
  }, [filteredInventory]);

  useEffect(() => {
    console.log("active tree", selectedInventoryTreeID);
    // const tree = src?.features.find((f) => f.id === selectedInventoryTreeID);
    if (selectedInventoryTreeID != null) {
      const tree = src?.features.filter(
        (f) => f.properties.treeid?.toString() === selectedInventoryTreeID
      );
      console.log("tree", tree);
      setHovered(tree?.[0]);
      const coords = tree?.[0].geometry.coordinates as [number, number];
      map.current?.flyTo({
        center: coords,
        speed: 0.5,
      });
    }
  }, [selectedInventoryTreeID]);

  // zoom to layer
  useEffect(() => {
    if (!map.current || !src || src.features.length === 0) {
      console.log("[zoom] uninitialized");
      return;
    } else {
      console.log("[zoom] ran");
    }
    // zoom to layer
    //console.log(src.bbox)
    map.current?.fitBounds(src.bbox as [number, number, number, number], {
      padding: 50,
      duration: 3000,
    });
    //map.current.fitBounds([8.0878, 47.8843, 8.0891, 47.8852], {padding: 50})

    src.features.forEach((f) => {
      map.current?.setFeatureState(
        { source: "inventory", id: f.id },
        { color: "red" }
      );
    });
  }, [map, src]);

  // add event listener to map
  useEffect(() => {
    if (!map.current || !src || src.features.length === 0) {
      return;
    }
    // mouse Enter
    map.current.on("mouseenter", "inventory", (e: MapLayerMouseEvent) => {
      // set all other hover to false
      src?.features.forEach((f) => {
        map.current?.setFeatureState(
          { source: "inventory", id: f.id },
          { hover: false }
        );
      });

      // active hover only for the first one (this way only one feature is hovered at a time)
      if (e.features && e.features.length > 0) {
        // TODO: implement this as component state and use useEffect to trigger maplibre state
        setHovered((e.features as any)[0]);

        // set the preview Image
        getImageData(
          JSON.parse((e.features as any)[0].properties.images)[0]
        ).then((val) => setCurrentImg(`data:image/png;base64,${val}`));

        map.current?.setFeatureState(
          { source: "inventory", id: e.features[0].id },
          { hover: true }
        );
      }

      // change the mouse pointer
      map.current?.getCanvas().style.setProperty("cursor", "pointer");
    });

    // mouseLeave
    map.current.on("mouseleave", "inventory", (e: MapLayerMouseEvent) => {
      setHovered(undefined);
      setCurrentImg(null);
      // disable hover state for all features, not matter what
      src?.features.forEach((f) => {
        map.current?.setFeatureState(
          { source: "inventory", id: f.id },
          { hover: false }
        );
      });

      // reset mouse style
      map.current?.getCanvas().style.setProperty("cursor", "default");
    });

    // Click handler
    map.current.on("click", "inventory", (e: MapLayerMouseEvent) => {
      if (e.features && e.features.length > 0) {
        // console.log(e.features[0]);
        // get the first feature
        const f = e.features[0] as GeoJSON.Feature<GeoJSON.Point>;
        history.push(`/list/${(f as InventoryFeature).properties.treeid}`);
        setSelectedInventoryTreeIDHandler(f.properties?.treeid.toString());
      }
    });
  }, [map, src, history]);

  // build paint and layout
  useEffect(() => {
    console.log(activeVariable);
    const defaultPaint = {
      "circle-color": [
        "case",
        // ["boolean", ["feature-state", "hover"], false],
        ["==", ["get", "treeid"], selectedInventoryTreeID],
        "grey",
        "white",
        // ["to-color", ["feature-state", "color"], "gray"],
      ],
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.7,
      ],
      "circle-radius": [
        "case",
        ["==", ["get", "treeid"], selectedInventoryTreeID],
        // increase the radius when the feature's id matches selectedInventoryTreeID
        activeVariable === "height"
          ? ["/", ["get", activeVariable], 1.9]
          : ["*", ["get", activeVariable], 55],
        // original radius calculation
        activeVariable === "height"
          ? ["/", ["get", activeVariable], 2]
          : ["*", ["get", activeVariable], 50],
      ],
      "circle-stroke-width": 1,
      "circle-stroke-color": "black",
    } as CirclePaint;

    setPaint(defaultPaint);
  }, [activeVariable, selectedInventoryTreeID]);

  const layout = {
    // TODO: NEED TO CHANGE THE FORMAT OF INVENTORY LAYER
    visibility: layers.activeInventoryLayer.length > 0 ? "visible" : "none",
  } as CircleLayout;

  return (
    <>
      {src ? (
        <>
          <Source id="inventory" type="geojson" data={src}>
            <Layer
              id="inventory"
              source="inventory"
              type="circle"
              paint={paint}
              layout={layout}
            />
          </Source>
          <Source id="inventory" type="geojson" data={src}>
            <Layer
              id="inventory-label"
              source="inventory"
              type="symbol"
              layout={{
                "text-field": ["get", activeVariable],
                "text-anchor": "top",
                "text-size": 25,
                "text-offset": [0, -2.25],
                "text-ignore-placement": true,
              }}
              paint={{
                "text-color": "#fff",
                "text-halo-width": 1.5,
                "text-halo-color": "#000",
                "text-opacity": [
                  "case",
                  ["boolean", ["feature-state", "hover"], false],
                  1,
                  0,
                ],
              }}
            />
          </Source>
        </>
      ) : null}
      {/* {hovered ? (
        <IonCard
          style={{
            position: "relative",
            zIndex: 99,
            backgroundTransparency: 0.6,
            top: "64px",
            left: 0,
            maxWidth: "250px",
          }}
        >
          <img
            alt="img"
            //src={`http://geowwd.uni-freiburg.de/img/${hovered.properties.images[0]}`}
            src={currentImg ? currentImg : ""}
            width="250"
          />
          <IonCardHeader>
            <IonCardTitle>TreeID: {hovered.properties.treeid}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel slot="start">Height: </IonLabel>
              <IonLabel>{hovered.properties.height.toFixed(1)} m</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel slot="start">Radius: </IonLabel>
              <IonLabel>
                {(hovered.properties.radius * 100).toFixed(0)} cm
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      ) : null} */}
    </>
  );
};

export default InventoryLayer;
