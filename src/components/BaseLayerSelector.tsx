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
import { close, layers } from "ionicons/icons";
import { useState } from "react";
import { useLayers } from "../context/layers";
// import "./BaseLayerSelector.css";
import MapSelectionButton from "./MapSelectionButton";

const BaseLayerVisualSelector: React.FC = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <MapSelectionButton
            name=""
            src="assets/openstreetmap.png"
            titel="OSM"
            height={100}
            width={100}
          />
        </IonCol>
        <IonCol>
          <MapSelectionButton
            name="density"
            src="assets/density.png"
            titel="Density"
            height={100}
            width={100}
          />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <MapSelectionButton
            name="dtm"
            src="assets/dtm.png"
            titel="DTM"
            height={100}
            width={100}
          />
        </IonCol>
        <IonCol>
          <MapSelectionButton
            name="ortho"
            src="assets/ortho.png"
            titel="Ortho"
            height={100}
            width={100}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

const BaseLayerSelector: React.FC = () => {
  // subscribe to the available Inventories
  const layers = useLayers();

  return (
    <IonContent color="light">
      <IonListHeader mode="ios">
        <IonLabel>Base Layer</IonLabel>
      </IonListHeader>
      <IonList inset>
        <IonRadioGroup
          allowEmptySelection={true}
          onIonChange={(e) =>
            !!e.detail.value
              ? layers.setBaseLayerTo([e.detail.value])
              : layers.setBaseLayerTo([])
          }
          value={layers.activeBaseLayer.toString()}
        >
          {layers.availableBaseLayer.map((l) => (
            <IonItem lines={l.name === "ortho" ? "none" : "inset"} key={l.name}>
              <IonLabel>{l.title}</IonLabel>
              <IonRadio slot="end" value={l.name}></IonRadio>
            </IonItem>
          ))}
        </IonRadioGroup>
      </IonList>
      <IonListHeader mode="ios">
        <IonLabel>Description</IonLabel>
      </IonListHeader>
      <IonList inset>
        <IonItem lines="none">
          This is the Description of the base layer
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export const BaseLayerSheetModal: React.FC<{
  modal: React.RefObject<HTMLIonModalElement>;
}> = ({ modal }) => {
  return (
    <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.6}>
      <IonToolbar>
        <IonTitle>Map Selection</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => modal.current?.dismiss()}>
            <IonIcon icon={close} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <BaseLayerVisualSelector />
    </IonModal>
  );
};

export const BaseLayerPopover: React.FC = () => {
  return (
    <IonPopover
      trigger="open-modal"
      triggerAction="click"
      reference="trigger"
      side="left"
      arrow={true}
      showBackdrop={false}
      style={{ "--offset-x": "-20px" }}
    >
      <div>
        <BaseLayerVisualSelector />
      </div>
    </IonPopover>
  );
};
