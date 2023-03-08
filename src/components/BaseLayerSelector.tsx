import {
  IonCheckbox,
  IonContent,
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
      <BaseLayerSelector />
      {/* </div> */}
    </IonPopover>
  );
};
