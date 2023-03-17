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
// import { RangeValue } from "@ionic/core";
import React, { useState } from "react";
import { useData } from "../context/data";
import { isEqual } from "lodash";

// interface RangeChangeEventDetail {
//   value: RangeValue;
// }

interface RangeValue {
  lower: number;
  upper: number;
}

const RangeFilter: React.FC = () => {
  const { filterValues, setFilterValues, inventoryStats } = useData();
  const [radius, setRadius] = useState<RangeValue>({ ...filterValues.radius });

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
            <IonLabel class="ion-no-padding">Radius</IonLabel>
          </IonCol>
          <IonCol>
            <IonRange
              dualKnobs={true}
              value={radius}
              pin={true}
              min={(inventoryStats?.data?.radiusMin as number) * 100}
              max={(inventoryStats?.data?.radiusMax as number) * 100}
              pinFormatter={(value: number) => `${value.toFixed(0)}cm`}
              class="ion-no-padding"
              onIonChange={({ detail }) => {
                if (detail.value) {
                  console.log("e.detail.value:", Object(detail.value));
                  setRadius(detail.value as RangeValue);
                }
              }}
            >
              <IonLabel color="medium" slot="start">
                {((inventoryStats?.data?.radiusMin as number) * 100).toFixed(0)}
              </IonLabel>
              <IonLabel color="medium" slot="end">
                {((inventoryStats?.data?.radiusMax as number) * 100).toFixed(0)}
              </IonLabel>
            </IonRange>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center">
          <IonCol size="3">
            <IonLabel class="ion-no-padding">Distance</IonLabel>
          </IonCol>
          <IonCol class="ion-align-items-center">
            <IonRange
              //   dualKnobs={true}
              disabled
              value={10}
              pin={true}
              pinFormatter={(value: number) => `${value.toFixed(0)}m`}
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
          <IonButton
            disabled={isEqual(filterValues.radius, radius)}
            onClick={() => {
              setFilterValues({ radius });
            }}
            class="ion-margin-top"
          >
            Add Filter
          </IonButton>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};

export default RangeFilter;
