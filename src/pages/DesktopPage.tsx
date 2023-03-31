import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { layers, map, settingsOutline } from "ionicons/icons";
import React from "react";
import InventoryList from "../components/InventoryList";
import MainMap from "../components/MainMapMaplibre";
import { BaseLayerPopover } from "../components/BaseLayerSelector";

// import "./DesktopPage.css";

const DesktopPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="forward">
              <IonIcon icon={settingsOutline} color="primary" />
            </IonButton>
          </IonButtons>
          <IonTitle>Mathislewald</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab slot="fixed" horizontal="end" vertical="top">
          <IonFabButton id="open-modal">
            <IonIcon icon={map} />
          </IonFabButton>
        </IonFab>
        <IonGrid class="ion-no-padding">
          <IonRow>
            <IonCol size="3">
              <div style={{ height: "100vh" }}>
                <IonContent>
                  <InventoryList />
                </IonContent>
              </div>
            </IonCol>
            <IonCol>
              <MainMap />
              <BaseLayerPopover />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DesktopPage;
