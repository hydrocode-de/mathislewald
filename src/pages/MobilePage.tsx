import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const MobilePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mobile Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">UI goes here...</IonContent>
    </IonPage>
  );
};

export default MobilePage;
