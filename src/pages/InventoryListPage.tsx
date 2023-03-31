import {
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
import { layers, listSharp, map } from "ionicons/icons";
import React from "react";
import InventoryList from "../components/InventoryList";

const InventoryListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton>
              <IonIcon icon={layers} />
            </IonMenuButton>
          </IonButtons>
          <IonTitle>Mathislewald</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <InventoryList></InventoryList>
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton routerLink="/map" routerDirection="none">
            <IonIcon icon={map} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default InventoryListPage;
