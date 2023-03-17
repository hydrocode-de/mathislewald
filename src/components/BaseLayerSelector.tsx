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

const BaseLayerVisualSelector: React.FC = () => {
  const [isHoverOSM, setIsHoverOSM] = useState(false);
  const [isHoverDTM, setIsHoverDTM] = useState(false);
  const [isHoverDens, setIsHoverDesn] = useState(false);
  const [isHoverOrtho, setIsHoverOrtho] = useState(false);
  const layers = useLayers();

  const isActiveBaseLayer = (name: string) => {
    return layers.activeBaseLayer.toString() === name;
  };
  // console.log("BaseLayerVisualSelector: ", layers.activateBaseLayer);

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IonButton
              class="ion-no-padding"
              onMouseOver={() => setIsHoverOSM(true)}
              onMouseLeave={() => setIsHoverOSM(false)}
              onClick={() => {
                layers.setBaseLayerTo([""]);
              }}
              style={{
                height: 100,
                width: 100,
                padding: isHoverOSM ? 2 : 0,
                borderColor: "lightgreen",
                borderWidth: 4,
                borderStyle: isActiveBaseLayer("") ? "solid" : "none",
                borderRadius: isActiveBaseLayer("") ? 8 : 0,
              }}
            >
              <IonImg
                style={{ height: 100, opacity: 0.6 }}
                src="assets/openstreetmap.png"
              ></IonImg>
            </IonButton>
            <IonLabel>OSM</IonLabel>
          </div>
        </IonCol>
        <IonCol>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IonButton
              class="ion-no-padding"
              onMouseOver={() => setIsHoverDesn(true)}
              onMouseLeave={() => setIsHoverDesn(false)}
              onClick={() => {
                layers.setBaseLayerTo(["density"]);
              }}
              style={{ height: 100, width: 100 }}
            >
              <IonImg
                src="assets/density.png"
                style={{
                  height: 100,
                  width: 100,
                  padding: isHoverDens ? 2 : 0,
                  borderColor: "lightgreen",
                  borderWidth: 4,
                  borderStyle: isActiveBaseLayer("density") ? "solid" : "none",
                  borderRadius: isActiveBaseLayer("density") ? 8 : 0,
                }}
              ></IonImg>
            </IonButton>
            <IonLabel>Density</IonLabel>
          </div>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IonButton
              class="ion-no-padding"
              onMouseOver={() => setIsHoverDTM(true)}
              onMouseLeave={() => setIsHoverDTM(false)}
              onClick={() => {
                layers.setBaseLayerTo(["dtm"]);
              }}
              style={{ height: 100, width: 100 }}
            >
              <IonImg
                style={{
                  height: 100,
                  width: 100,
                  padding: isHoverDTM ? 2 : 0,
                  borderColor: "lightgreen",
                  borderWidth: 4,
                  borderStyle: isActiveBaseLayer("dtm") ? "solid" : "none",
                  borderRadius: isActiveBaseLayer("dtm") ? 8 : 0,
                }}
                src="assets/dem.png"
              ></IonImg>
            </IonButton>
            <IonLabel>DTM</IonLabel>
          </div>
        </IonCol>
        <IonCol>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IonButton
              class="ion-no-padding"
              onMouseOver={() => setIsHoverOrtho(true)}
              onMouseLeave={() => setIsHoverOrtho(false)}
              onClick={() => {
                layers.setBaseLayerTo(["ortho"]);
              }}
              style={{ height: 100, width: 100 }}
            >
              <IonImg
                src="assets/ortho.png"
                style={{
                  height: 100,
                  width: 100,
                  padding: isHoverOrtho ? 2 : 0,
                  borderColor: "lightgreen",
                  borderWidth: 4,
                  borderStyle: isActiveBaseLayer("ortho") ? "solid" : "none",
                  borderRadius: isActiveBaseLayer("ortho") ? 8 : 0,
                }}
              ></IonImg>
            </IonButton>
            <IonLabel>Ortho</IonLabel>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
    // </div>
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
    <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.4}>
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
