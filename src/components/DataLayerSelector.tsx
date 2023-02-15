import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
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
    <IonContent color="light">
      <IonListHeader mode="ios">
        <IonLabel>Data</IonLabel>
      </IonListHeader>
      <IonList inset>
        {layers.availableInventoryLayer.map((l) => (
          <IonItem lines="none">
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
        <IonLabel>Filter</IonLabel>
        <IonButton>Add Filter</IonButton>
      </IonListHeader>
      <IonSearchbar
        mode="ios"
        animated={true}
        placeholder="Filter the data"
        showCancelButton="focus"
        cancelButtonText="Add Filter"
        // onClick={() => console.log("test")}
      ></IonSearchbar>
      <IonList inset>
        <IonItem lines="none">
          <IonChip>
            <IonLabel>Radius {">".toString()} 6</IonLabel>
          </IonChip>
          <IonChip>
            <IonLabel>Radius {">".toString()} 6</IonLabel>
          </IonChip>
        </IonItem>
      </IonList>

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
