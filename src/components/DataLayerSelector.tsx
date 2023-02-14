import {
  IonButton,
  IonCheckbox,
  IonChip,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { useLayers } from "../context/layers";

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
    <>
      <IonTitle class="ion-padding-top">Data</IonTitle>
      <IonList inset>
        {/* <IonListHeader> */}
        {/* <IonLabel>Forest Inventory</IonLabel> */}
        {/* </IonListHeader> */}
        {layers.availableInventoryLayer.map((l) => (
          <IonItem
            lines="none"
            key={l.name}
            onClick={() => toggleInventoryLayer(l.name)}
          >
            <IonLabel>{l.title}</IonLabel>
            <IonCheckbox
              // slot="end"
              checked={layers.activeInventoryLayer.includes(l.name)}
            />
          </IonItem>
        ))}
      </IonList>
      <IonGrid>
        <IonRow class="ion-align-items-end">
          <IonCol>
            <IonTitle class="ion-padding-top">Filter</IonTitle>
          </IonCol>
          <IonCol style={{ padding: 0 }}>
            <IonButton size="small">Add Filter</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonItem lines="none" class="ion-padding">
        <IonChip>
          <IonLabel>Radius {">".toString()} 6</IonLabel>
        </IonChip>
      </IonItem>
      <IonTitle class="ion-padding-top">Description</IonTitle>
      <IonItem class="ion-padding" lines="none">
        This is the description of the data set
      </IonItem>
    </>
  );
};

export default DataLayerDrawer;
