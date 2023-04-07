import { IonButton, IonImg, IonNote } from "@ionic/react";
import React from "react";
import { useLayers } from "../context/layers";

interface MapSelectionButtonProps {
  name: string;
  titel: string;
  src: string;
  height: number;
  width: number;
}

const MapSelectionButton: React.FC<MapSelectionButtonProps> = ({
  name,
  src,
  titel,
  height,
  width,
}) => {
  const layers = useLayers();
  const isActiveBaseLayer = (name: string) => {
    return layers.activeBaseLayer.toString() === name;
  };

  return (
    <IonButton
      class="ion-no-padding"
      onClick={() => {
        layers.setBaseLayerTo([name]);
      }}
      style={{ height: height, width: width }}
    >
      <div
        style={{
          height: height,
          width: width,
          // padding: isHoverDTM ? 2 : 0,
          borderColor: "#0fac0c",
          borderWidth: 4,
          borderStyle: isActiveBaseLayer(name) ? "solid" : "none",
          borderRadius: isActiveBaseLayer(name) ? 8 : 0,
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", zIndex: -1 }}>
          <IonImg src={src}></IonImg>
        </div>
        <div
          style={{
            backgroundColor: "#0fac0c",
            height: height / 4,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonNote style={{ color: "white" }}>{titel}</IonNote>
        </div>
      </div>
    </IonButton>
  );
};

export default MapSelectionButton;
