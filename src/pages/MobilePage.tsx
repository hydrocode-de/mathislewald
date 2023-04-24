import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { layers, listSharp, settingsOutline } from "ionicons/icons";
import { useRef } from "react";

import MainMap from "../components/map-components/MainMapMaplibre";
import BaseLayerSheetModal from "../components/modal/BaseLayerModal";
import "./MobilePage.css";
import MapButtonGroup from "../components/MapButtonGroup";
import ActiveMapSelectionButton from "../components/ActiveMapSelectionButton";
import RangeFilterSheetModal from "../components/modal/RangeFilterModal";
import VariableSelectionModal from "../components/modal/VariableSelectionModal";

const MapPage: React.FC = () => {
  const baseLayerModal = useRef<HTMLIonModalElement>(null);
  const filterModal = useRef<HTMLIonModalElement>(null);
  const variableSelectionModal = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton>
              <IonIcon icon={layers} color="primary" />
            </IonMenuButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="forward">
              <IonIcon icon={settingsOutline} color="primary" />
            </IonButton>
          </IonButtons>
          <IonTitle>Mathislewald App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            position: "absolute",
            zIndex: 4,
            left: 5,
          }}
        >
          <div
            style={{
              paddingTop: "10px",
              paddingLeft: "5px",
            }}
          >
            <MapButtonGroup padding={0} />
          </div>
        </div>
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton routerLink="/list" routerDirection="none">
            <IonIcon icon={listSharp} />
          </IonFabButton>
        </IonFab>
        <div
          style={{
            position: "absolute",
            zIndex: 99,
            bottom: 20,
            left: 15,
          }}
        >
          <ActiveMapSelectionButton height={80} width={80} />
        </div>

        <MainMap />
        <BaseLayerSheetModal modal={baseLayerModal} />
        <RangeFilterSheetModal modal={filterModal} />
        <VariableSelectionModal modal={variableSelectionModal} />
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
