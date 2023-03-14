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
import { RangeValue } from "@ionic/core";
import React, { useState } from "react";
import { useData } from "../context/data";

// interface RangeChangeEventDetail {
//   value: RangeValue;
// }

const RangeFilter: React.FC = () => {
  const [radius, setRadius] = useState<RangeValue>({ lower: 0, upper: 100 });
  const { filterValues, setFilterValues, inventoryStats } = useData();

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
              value={{
                lower: Object(radius).lower,
                upper: Object(radius).upper,
              }}
              pin={true}
              min={0}
              max={100}
              pinFormatter={(value: number) => `${value.toFixed(2)}%`}
              class="ion-no-padding"
              onIonChange={({ detail }) => {
                if (detail.value) {
                  console.log("e.detail.value:", Object(detail.value));
                  setRadius(detail.value);
                }
              }}
            >
              <IonLabel color="medium" slot="start">
                {inventoryStats &&
                  ((inventoryStats?.data?.radiusMin as number) * 100).toFixed(
                    0
                  )}
              </IonLabel>
              <IonLabel color="medium" slot="end">
                {inventoryStats &&
                  ((inventoryStats?.data?.radiusMax as number) * 100).toFixed(
                    0
                  )}
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
              pinFormatter={(value: number) => `${value.toFixed(2)}%`}
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
            disabled={
              JSON.stringify(filterValues) ===
              JSON.stringify({
                radius: {
                  lower: Object(radius).lower,
                  upper: Object(radius).upper,
                },
              })
            }
            onClick={() => {
              setFilterValues({
                radius: {
                  lower: Object(radius).lower,
                  upper: Object(radius).upper,
                },
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
