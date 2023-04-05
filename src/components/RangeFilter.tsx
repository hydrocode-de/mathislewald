import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRange,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React, { useState } from "react";
import { useData } from "../context/data";
import { isEqual } from "lodash";

interface RangeValue {
  lower: number;
  upper: number;
}

const RangeFilter: React.FC = () => {
  const { filterValues, setFilterValues, inventoryStats } = useData();
  const [radius, setRadius] = useState<RangeValue>({ ...filterValues.radius });
  const [height, setHeight] = useState<RangeValue>({ ...filterValues.height });

  return (
    <IonList inset class="ion-padding">
      <IonTitle class="ion-no-padding ion-padding-bottom">
        <IonLabel>Filter</IonLabel>
      </IonTitle>
      <IonGrid class="ion-no-padding">
        <IonRow class="ion-align-items-center">
          <IonCol size="4">
            <IonLabel>Height</IonLabel>
          </IonCol>
          <IonCol>
            <IonRange
              dualKnobs={true}
              value={height}
              pin={true}
              min={inventoryStats?.data?.heightMin as number}
              max={inventoryStats?.data?.heightMax as number}
              onIonChange={({ detail }) => {
                if (detail.value) {
                  // console.log("e.detail.value:", Object(detail.value));
                  setHeight(detail.value as RangeValue);
                }
              }}
              pinFormatter={(value: number) => `${value.toFixed(0)}m`}
              class="ion-no-padding"
            >
              <IonLabel color="medium" slot="start">
                {inventoryStats?.data?.heightMin.toFixed(0)}
              </IonLabel>
              <IonLabel color="medium" slot="end">
                {inventoryStats?.data?.heightMax.toFixed(0)}
              </IonLabel>
            </IonRange>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center">
          <IonCol size="4">
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
                  // console.log("e.detail.value:", Object(detail.value));
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
          <IonCol size="4">
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
                0
              </IonLabel>
              <IonLabel color="medium" slot="end">
                100
              </IonLabel>
            </IonRange>
          </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-end">
          <IonButton
            disabled={
              isEqual(filterValues.radius, radius) &&
              isEqual(filterValues.height, height)
            }
            onClick={() => {
              setFilterValues({
                radius: { ...radius },
                height: { ...height },
              });
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
