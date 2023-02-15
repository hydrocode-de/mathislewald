import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonModal,
  IonPage,
  IonPopover,
  IonSearchbar,
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
        <IonFab slot="fixed" vertical="top" horizontal="end">
          <IonFabButton
            size="small"
            style={{ borderRadius: "15px" }}
            id="open-modal"
          >
            <IonIcon icon={layers} />
          </IonFabButton>
        </IonFab>
        {/* <IonSearchbar
          style={{
            position: "absolute",
            zIndex: 4,
            width: "80%",
            top: "51px",
          }}
          mode="ios"
          animated={true}
          placeholder="Filter the data"
          showCancelButton="focus"
          cancelButtonText="Add Filter"
          // onClick={() => console.log("test")}
        ></IonSearchbar> */}
        {/* <MapButton /> */}
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
