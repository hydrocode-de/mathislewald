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
    <>
      <IonList class="ion-padding">
        <IonListHeader>
          <IonLabel>Background Layer</IonLabel>
        </IonListHeader>
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
    </>
  );
};

export const BaseLayerSheetModal: React.FC<{
  modal: React.RefObject<HTMLIonModalElement>;
}> = ({ modal }) => {
  return (
    <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.5}>
      <IonContent>
        <BaseLayerSelector />
      </IonContent>
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
      style={{ "--offset-x": "-10px" }}
    >
      <BaseLayerSelector />
    </IonPopover>
  );
};
