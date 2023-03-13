import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import { useLayers } from "../context/layers";
import FilterBar from "./FilterBar";

const DataLayerDrawer: React.FC = () => {
  // subscribe to the available Inventories
  const layers = useLayers();

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
          <IonBadge style={{ marginLeft: "10px" }}>67</IonBadge>
        </IonLabel>
      </IonListHeader>
      <IonList inset>
        {layers.availableInventoryLayer.map((l) => (
          <IonItem lines="none" key={l.name}>
            <IonLabel>{l.title}</IonLabel>
            <IonCheckbox
              key={l.name}
              // slot="end"
              checked={layers.activeInventoryLayer.includes(l.name)}
              onClick={() => toggleInventoryLayer(l.name)}
            />
          </IonItem>
        ))}
      </IonList>
      <IonListHeader mode="ios">
        <IonLabel>
          Filter
          <IonBadge style={{ marginLeft: "10px" }}>25</IonBadge>
        </IonLabel>
      </IonListHeader>
      <FilterBar />

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
