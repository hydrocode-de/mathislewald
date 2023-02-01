import {
  IonContent,
  IonHeader,
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
          <IonTitle>Mathislewand</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <InventoryList></InventoryList>
      </IonContent>
    </IonPage>
  );
};

export default InventoryListPage;
