import { IonButton, IonImg, IonNote } from "@ionic/react";
import { useEffect, useState } from "react";
import { useLayers } from "../context/layers";

interface ActiveMapSelectionButtonProps {
  height: number;
  width: number;
}

const ActiveMapSelectionButton: React.FC<ActiveMapSelectionButtonProps> = ({
  height,
  width,
}) => {
  const layers = useLayers();

  const [src, setSrc] = useState("assets/openstreetmap.png");
  const [titel, setTitel] = useState("OSM");

  useEffect(() => {
    // set the src and titel of the active map
    if (layers.activeBaseLayer.toString() === "density") {
      setSrc("assets/density.png");
      setTitel("Density");
    } else if (layers.activeBaseLayer.toString() === "dtm") {
      setSrc("assets/dtm.png");
      setTitel("DTM");
    } else if (layers.activeBaseLayer.toString() === "ortho") {
      setSrc("assets/ortho.png");
      setTitel("Ortho");
    } else {
      setSrc("assets/openstreetmap.png");
      setTitel("OSM");
    }
  }, [layers.activeBaseLayer]);

  return (
    <IonButton
      id="open-map-selection-popover"
      class="ion-no-padding"
      style={{
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          height: height,
          width: width,
          // padding: isHoverDTM ? 2 : 0,
          borderColor: "#0fac0c",
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: 2,
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

export default ActiveMapSelectionButton;
