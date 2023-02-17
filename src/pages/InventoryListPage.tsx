import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import InventoryList from "../components/InventoryList";

const InventoryListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Math islewald</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <InventoryList></InventoryList>
      </IonContent>
    </IonPage>
  );
};

export default InventoryListPage;
