import {
  IonButton,
  IonButtons,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import MapSelectionButton from "../MapSelectionButton";
import { closeCircle } from "ionicons/icons";

const BaseLayerSheetModal: React.FC<{
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

export default BaseLayerSheetModal;
