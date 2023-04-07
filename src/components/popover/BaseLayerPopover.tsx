import { IonPopover } from "@ionic/react";
import MapSelectionButton from "../MapSelectionButton";

const BaseLayerPopover: React.FC = () => {
  return (
    <IonPopover
      trigger="open-map-selection-popover"
      triggerAction="click"
      reference="trigger"
      side="right"
      arrow={true}
      showBackdrop={false}
      style={{
        "--offset-x": "10px",
        // "--offset-y": "-20px",
        "--min-width": "350px",
      }}
    >
      <div
        style={{
          padding: 7,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <MapSelectionButton
          name=""
          src="assets/openstreetmap.png"
          title="OSM"
          height={80}
          width={80}
        />
        <MapSelectionButton
          name="density"
          src="assets/density.png"
          title="Density"
          height={80}
          width={80}
        />
        <MapSelectionButton
          name="dtm"
          src="assets/dtm.png"
          title="DTM"
          height={80}
          width={80}
        />
        <MapSelectionButton
          name="ortho"
          src="assets/ortho.png"
          title="Ortho"
          height={80}
          width={80}
        />
      </div>
    </IonPopover>
  );
};

export default BaseLayerPopover;
