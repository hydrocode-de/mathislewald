import {
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
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
      <IonList inset>
        <IonListHeader>
          <IonLabel>Forest Inventory</IonLabel>
        </IonListHeader>
        {layers.availableInventoryLayer.map((l) => (
          <IonItem key={l.name} onClick={() => toggleInventoryLayer(l.name)}>
            <IonLabel>{l.title}</IonLabel>
            <IonCheckbox
              // slot="end"
              checked={layers.activeInventoryLayer.includes(l.name)}
            />
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default DataLayerDrawer;
