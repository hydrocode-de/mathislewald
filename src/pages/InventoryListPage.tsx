import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { layers } from "ionicons/icons";
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
      </IonContent>
    </IonPage>
  );
};

export default InventoryListPage;
