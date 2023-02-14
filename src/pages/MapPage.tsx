import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonModal,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { layers } from "ionicons/icons";
import { useRef } from "react";

import MainMap from "../components/MainMapMaplibre";
import {
  BaseLayerPopover,
  BaseLayerSheetModal,
} from "../components/BaseLayerSelector";
import "./MapPage.css";

const MapButton: React.FC = () => {
  return (
    <IonButton id="open-modal" className="mapButton" size="small">
      <IonIcon icon={layers} />
    </IonButton>
  );
};

const MapPage: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mathislewald</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <MapButton />
        <MainMap />
        {window.innerWidth > 768 ? (
          <BaseLayerPopover />
        ) : (
          <BaseLayerSheetModal modal={modal}></BaseLayerSheetModal>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
