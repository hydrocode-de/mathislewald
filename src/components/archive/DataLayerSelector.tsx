import {
  IonBadge,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonToggle,
} from "@ionic/react";
import { scanOutline } from "ionicons/icons";

import { useData } from "../../context/data";
import { useLayers } from "../../context/layers";
import RangeFilter from "../RangeFilter";

const DataLayerDrawer: React.FC = () => {
  // subscribe to the available Inventories
  const layers = useLayers();

  // get the current filter state for badges
  const { inventoryCount } = useData();

  const toggleInventoryLayer = (name: string) => {
    if (layers.activeInventoryLayer.includes(name)) {
      layers.deactivateInventoryLayer(name);
    } else {
      layers.activateInventoryLayer(name);
    }
  };

  return (
    <IonContent color="light">
      <IonListHeader mode="ios">
        <IonLabel>
          Data
          <IonBadge style={{ marginLeft: "10px" }}>
            {inventoryCount.total}
          </IonBadge>
        </IonLabel>
      </IonListHeader>
      <IonList inset>
        {layers.availableInventoryLayer.map((l) => (
          <IonItem lines="none" key={l.name}>
            <IonLabel>{l.title}</IonLabel>
            <IonButton
              slot="start"
              fill="clear"
              disabled={!layers.activeInventoryLayer.includes(l.name)}
              onClick={() => layers.flyToFeature("inventory")}
            >
              <IonIcon icon={scanOutline} slot="icon-only" />
            </IonButton>
            <IonToggle
              key={l.name}
              slot="end"
              checked={layers.activeInventoryLayer.includes(l.name)}
              onClick={() => toggleInventoryLayer(l.name)}
            />
          </IonItem>
        ))}
      </IonList>
      <IonListHeader mode="ios">
        <IonLabel>
          Filter
          <IonBadge style={{ marginLeft: "10px" }}>
            {inventoryCount.filtered}
          </IonBadge>
        </IonLabel>
      </IonListHeader>
      <RangeFilter />

      <IonListHeader mode="ios">
        <IonLabel>Description</IonLabel>
      </IonListHeader>
      <IonList inset>
        <IonItem lines="none" mode="ios">
          <IonText class="ion-padding-vertical">
            This is a description of the active data layer. But I need a little
            bit more text
          </IonText>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default DataLayerDrawer;
