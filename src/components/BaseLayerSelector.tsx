import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPopover,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { useLayers } from "../context/layers";

const BaseLayerVisualSelector: React.FC = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonButton
          class="ion-no-padding"
          style={{
            height: 100,
            width: 100,
            borderColor: "lightblue",
            borderWidth: 4,
            borderStyle: "solid",
            borderRadius: 8,
          }}
        >
          <IonImg
            style={{ height: 100, opacity: 0.6 }}
            src="assets/img.png"
          ></IonImg>
        </IonButton>
        <IonLabel>Satellite</IonLabel>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonButton class="ion-no-padding" style={{ height: 100, width: 100 }}>
          <IonImg
            style={{ height: 100, opacity: 0.6 }}
            src="assets/img.png"
          ></IonImg>
        </IonButton>
        <IonLabel>Satellite</IonLabel>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonButton class="ion-no-padding" style={{ height: 100, width: 100 }}>
          <IonImg
            style={{ height: 100, opacity: 0.6 }}
            src="assets/img.png"
          ></IonImg>
        </IonButton>
        <IonLabel>Satellite</IonLabel>
      </div>
    </div>
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
    <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.7}>
      <BaseLayerSelector />
    </IonModal>
  );
};

export const BaseLayerPopover: React.FC = () => {
  return (
    <IonPopover
      trigger="open-modal"
      triggerAction="click"
      reference="trigger"
      side="bottom"
      arrow={true}
      showBackdrop={false}
      style={{ "--offset-y": "10px" }}
    >
      {/* <div style={{ height: "100vh" }}> */}
      {/* <BaseLayerSelector /> */}
      <BaseLayerVisualSelector />
      {/* </div> */}
    </IonPopover>
  );
};
