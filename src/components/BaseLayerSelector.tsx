import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonPopover,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, closeCircle, layers } from "ionicons/icons";
import { useState } from "react";
import { useLayers } from "../context/layers";
// import "./BaseLayerSelector.css";
import MapSelectionButton from "./MapSelectionButton";

interface BaseLayerPopoverProps {
  height: number;
  width: number;
}

const BaseLayerVisualSelector: React.FC<BaseLayerPopoverProps> = ({
  height,
  width,
}) => {
  return (
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
        titel="OSM"
        height={height}
        width={width}
      />
      <MapSelectionButton
        name="density"
        src="assets/density.png"
        titel="Density"
        height={height}
        width={width}
      />
      <MapSelectionButton
        name="dtm"
        src="assets/dtm.png"
        titel="DTM"
        height={height}
        width={width}
      />
      <MapSelectionButton
        name="ortho"
        src="assets/ortho.png"
        titel="Ortho"
        height={height}
        width={width}
      />
    </div>
  );
};

// const BaseLayerSelector: React.FC = () => {
//   // subscribe to the available Inventories
//   const layers = useLayers();

//   return (
//     <IonContent color="light">
//       <IonListHeader mode="ios">
//         <IonLabel>Base Layer</IonLabel>
//       </IonListHeader>
//       <IonList inset>
//         <IonRadioGroup
//           allowEmptySelection={true}
//           onIonChange={(e) =>
//             !!e.detail.value
//               ? layers.setBaseLayerTo([e.detail.value])
//               : layers.setBaseLayerTo([])
//           }
//           value={layers.activeBaseLayer.toString()}
//         >
//           {layers.availableBaseLayer.map((l) => (
//             <IonItem lines={l.name === "ortho" ? "none" : "inset"} key={l.name}>
//               <IonLabel>{l.title}</IonLabel>
//               <IonRadio slot="end" value={l.name}></IonRadio>
//             </IonItem>
//           ))}
//         </IonRadioGroup>
//       </IonList>
//       <IonListHeader mode="ios">
//         <IonLabel>Description</IonLabel>
//       </IonListHeader>
//       <IonList inset>
//         <IonItem lines="none">
//           This is the Description of the base layer
//         </IonItem>
//       </IonList>
//     </IonContent>
//   );
// };

export const BaseLayerSheetModal: React.FC<{
  modal: React.RefObject<HTMLIonModalElement>;
}> = ({ modal }) => {
  return (
    <IonModal
      ref={modal}
      trigger="open-map-selection-popover"
      initialBreakpoint={0.55}
    >
      <IonToolbar>
        <IonTitle>Map Type Selection</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => modal.current?.dismiss()}>
            <IonIcon icon={closeCircle} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          // justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "stretch",
            paddingTop: 20,
            // height: "50%",
            paddingBottom: 20,
          }}
        >
          <MapSelectionButton
            name=""
            src="assets/openstreetmap.png"
            titel="OSM"
            height={120}
            width={150}
          />
          <MapSelectionButton
            name="density"
            src="assets/density.png"
            titel="Density"
            height={120}
            width={150}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <MapSelectionButton
            name="dtm"
            src="assets/dtm.png"
            titel="DTM"
            height={120}
            width={150}
          />
          <MapSelectionButton
            name="ortho"
            src="assets/ortho.png"
            titel="Ortho"
            height={120}
            width={150}
          />
        </div>
      </div>
      {/* </div> */}
    </IonModal>
  );
};

export const BaseLayerPopover: React.FC = () => {
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
          titel="OSM"
          height={80}
          width={80}
        />
        <MapSelectionButton
          name="density"
          src="assets/density.png"
          titel="Density"
          height={80}
          width={80}
        />
        <MapSelectionButton
          name="dtm"
          src="assets/dtm.png"
          titel="DTM"
          height={80}
          width={80}
        />
        <MapSelectionButton
          name="ortho"
          src="assets/ortho.png"
          titel="Ortho"
          height={80}
          width={80}
        />
      </div>
    </IonPopover>
  );
};
