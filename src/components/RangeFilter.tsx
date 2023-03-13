import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRange,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const RangeFilter: React.FC = () => {
  return (
    <IonList inset class="ion-padding">
      <IonGrid class="ion-no-padding">
        <IonRow class="ion-align-items-center">
          <IonCol size="3">
            <IonLabel>Height</IonLabel>
          </IonCol>
          <IonCol>
            <IonRange
              dualKnobs={true}
              value={{ lower: 10, upper: 90 }}
              pin={true}
              pinFormatter={(value: number) => `${value}%`}
              class="ion-no-padding"
            >
              <IonLabel color="medium" slot="start">
                10
              </IonLabel>
              <IonLabel color="medium" slot="end">
                10
              </IonLabel>
            </IonRange>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center">
          <IonCol size="3">
            <IonLabel class="ion-no-padding">BHD</IonLabel>
          </IonCol>
          <IonCol>
            <IonRange
              dualKnobs={true}
              value={{ lower: 10, upper: 50 }}
              pin={true}
              pinFormatter={(value: number) => `${value}%`}
              class="ion-no-padding"
            >
              <IonLabel color="medium" slot="start">
                13
              </IonLabel>
              <IonLabel color="medium" slot="end">
                10
              </IonLabel>
            </IonRange>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center">
          <IonCol size="3">
            <IonLabel class="ion-no-padding">ID</IonLabel>
          </IonCol>
          <IonCol class="ion-align-items-center">
            <IonRange
              dualKnobs={true}
              value={{ lower: 10, upper: 50 }}
              pin={true}
              pinFormatter={(value: number) => `${value}%`}
              class="ion-no-padding"
            >
              <IonLabel color="medium" slot="start">
                10
              </IonLabel>
              <IonLabel color="medium" slot="end">
                11
              </IonLabel>
            </IonRange>
          </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-end">
          <IonButton class="ion-margin-top">Add Filter</IonButton>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};

export default RangeFilter;
