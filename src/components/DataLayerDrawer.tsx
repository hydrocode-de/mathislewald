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
              <IonCheckbox slot="end" checked={layers.activeInventoryLayer.includes(l.name)} />
            </IonItem>
          ))}
      </IonList>

      <IonList inset>
        <IonListHeader>
          <IonLabel>Map Layer</IonLabel>
        </IonListHeader>
        <IonRadioGroup 
          allowEmptySelection={true}  
          onIonChange={e => !!e.detail.value ? layers.setBaseLayerTo([e.detail.value]) : layers.setBaseLayerTo([])}
        >
          {layers.availableBaseLayer.map((l) => (
            <IonItem key={l.name}>
              <IonLabel>{l.title}</IonLabel>
              <IonRadio slot="end" value={l.name}></IonRadio>
            </IonItem>
          ))}
        </IonRadioGroup>
      </IonList>

    </>
  );
};

export default DataLayerDrawer;
