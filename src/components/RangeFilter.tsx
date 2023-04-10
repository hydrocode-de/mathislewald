import {
  IonButton,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRange,
  IonRow,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import { useData } from "../context/data";
import { isEqual } from "lodash";

interface RangeValue {
  lower: number;
  upper: number;
}

const RangeFilter: React.FC = () => {
  // get the data context
  const { filterValues, setFilterValues, inventoryStats } = useData();

  // define the local radius and height state
  const [radius, setRadius] = useState<RangeValue | undefined>(undefined);
  const [height, setHeight] = useState<RangeValue | undefined>(undefined);

  // use effect to set the filter to current filter
  useEffect(() => {
    // set default radius if still undefined
    if (!radius && !!filterValues) {
      setRadius({ ...filterValues.radius });
    }

    // set default height if still undefined
    if (!height && !!filterValues) {
      setHeight({ ...filterValues.height });
    }
  }, [inventoryStats, radius, height]);

  // console.log("filterValues:", filterValues);
  // console.log("radius", radius);
  // console.log("height", height);

  return (
    <IonList>
      <IonItem lines="inset">
        <IonLabel position="stacked">Height</IonLabel>
        <IonRange
          dualKnobs={true}
          value={height}
          pin={true}
          min={inventoryStats?.data?.heightMin as number}
          max={inventoryStats?.data?.heightMax as number}
          onIonKnobMoveEnd={(e) =>
            e.detail.value ? setHeight(e.detail.value as RangeValue) : null
          }
          // onIonChange={({ detail }) => {
          //   if (detail.value) {
          //     // console.log("e.detail.value:", Object(detail.value));
          //     setHeight(detail.value as RangeValue);
          //   }
          // }}
          pinFormatter={(value: number) => `${value.toFixed(0)}m`}
          class="ion-no-padding"
          disabled={!height}
        >
          <IonLabel color="medium" slot="start">
            {inventoryStats?.data?.heightMin.toFixed(0)}
          </IonLabel>
          <IonLabel color="medium" slot="end">
            {inventoryStats?.data?.heightMax.toFixed(0)}
          </IonLabel>
        </IonRange>
      </IonItem>
      <IonItem lines="inset">
        <IonLabel position="stacked">Radius</IonLabel>
        <IonRange
          dualKnobs={true}
          value={{
            lower: radius?.lower! * 100,
            upper: radius?.upper! * 100,
          }}
          pin={true}
          min={(inventoryStats?.data?.radiusMin as number) * 100}
          max={(inventoryStats?.data?.radiusMax as number) * 100}
          pinFormatter={(value: number) => `${value.toFixed(0)}cm`}
          class="ion-no-padding"
          onIonKnobMoveEnd={(e) =>
            e.detail.value
              ? setRadius({
                  lower: (e.detail.value as RangeValue).lower / 100,
                  upper: (e.detail.value as RangeValue).upper / 100,
                })
              : null
          }
          disabled={!radius}
        >
          <IonLabel color="medium" slot="start">
            {((inventoryStats?.data?.radiusMin as number) * 100).toFixed(0)}
          </IonLabel>
          <IonLabel color="medium" slot="end">
            {((inventoryStats?.data?.radiusMax as number) * 100).toFixed(0)}
          </IonLabel>
        </IonRange>
      </IonItem>
      <IonItem lines="inset">
        <IonLabel position="stacked" class="ion-no-padding">
          Distance
        </IonLabel>
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
      </IonItem>
      <IonButton
        disabled={
          (filterValues &&
            isEqual(filterValues.radius, radius) &&
            isEqual(filterValues.height, height)) ||
          !filterValues
        }
        onClick={() => {
          if (!radius || !height) return;
          setFilterValues({
            radius: { ...radius },
            height: { ...height },
          });
        }}
        class="ion-margin"
      >
        Add Filter
      </IonButton>
    </IonList>
  );
};

export default RangeFilter;
