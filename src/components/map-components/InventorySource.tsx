import { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { CirclePaint, CircleLayout, MapLayerMouseEvent } from "mapbox-gl";
import { Source, Layer, useMap } from "react-map-gl";

import { useData } from "../../context/data";
import { InventoryData, InventoryFeature } from "../../context/data.model";
import { useLayers } from "../../context/layers";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonPopover,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useOffline } from "../../context/offline";

const InventoryLayer: React.FC = () => {
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
      setSrc(
        cloneDeep({
          ...filteredInventory,
          features: [
            ...filteredInventory.features.map((f, i) => {
              return { ...f, id: i };
            }),
          ],
        })
      );
    }
  }, [filteredInventory]);

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
        // get the first feature
        const f = e.features[0] as GeoJSON.Feature<GeoJSON.Point>;
        history.push(`/list/${(f as InventoryFeature).properties.treeid}`);
      }
    });
  }, [map, src, history]);

  // build paint and layout
  useEffect(() => {
    const defaultPaint = {
      "circle-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "purple",
        ["to-color", ["feature-state", "color"], "gray"],
      ],
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.9,
        0.4,
      ],
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        8.5,
        6,
      ],
      "circle-stroke-width": 0.8,
      "circle-stroke-color": "white",
    } as CirclePaint;

    setPaint(defaultPaint);
  }, []);

  const layout = {
    // TODO: NEED TO CHANGE THE FORMAT OF INVENTORY LAYER
    visibility: layers.activeInventoryLayer.length > 0 ? "visible" : "none",
  } as CircleLayout;

  return (
    <>
      {src ? (
        <Source id="inventory" type="geojson" data={src}>
          <Layer
            id="inventory"
            source="inventory"
            type="circle"
            paint={paint}
            layout={layout}
          />
        </Source>
      ) : null}
      {
        hovered ? (
          <IonCard
            style={{
              // position: "fixed",
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
        ) : // <IonPopover>test</IonPopover>
        null
        // null
      }
    </>
  );
};

export default InventoryLayer;
