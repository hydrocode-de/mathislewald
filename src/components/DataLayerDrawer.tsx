import { IonCheckbox, IonItem, IonLabel, IonList, IonListHeader, IonTitle } from "@ionic/react"
import { useLayers } from "../context/layers"

const DataLayerDrawer: React.FC = () => {
    // subscribe to the available Inventories
    const layers = useLayers()

    const toggleInventoryLayer = (name: string) => {
        if (layers.activeInventoryLayer.includes(name)) {
            layers.deactivateInventoryLayer(name)
        } else {
            layers.activateInventoryLayer(name)
        }
    }

    const toggleBaseLayer = (name: string) => {
        if (layers.activeBaseLayer.includes(name)) {
            layers.deactivateBaseLayer(name)
        } else {
            layers.activateBaseLayer(name)
        }
    }

    console.log(layers.activeBaseLayer)
    console.log(layers.activeInventoryLayer)
    
    return <>
            <IonListHeader>
                <IonTitle>Forest Inventory</IonTitle>
            </IonListHeader>

            <IonList inset>
                { layers.availableInventoryLayer.map(l => (
                    <IonItem key={l.name} onClick={() => toggleInventoryLayer(l.name)}>
                        <IonLabel>{l.title}</IonLabel>
                        <IonCheckbox slot="end" checked={layers.activeInventoryLayer.includes(l.name)} />
                    </IonItem>
                )) }
            </IonList>

            <IonListHeader>
                <IonTitle>Map Layer</IonTitle>
            </IonListHeader>

            <IonList inset>
                { layers.availableBaseLayer.map(l => (
                    <IonItem key={l.name} onClick={() => toggleBaseLayer(l.name)}>
                        <IonLabel>{l.title}</IonLabel>
                        <IonCheckbox slot="end" checked={layers.activeBaseLayer.includes(l.name)} />
                    </IonItem>
                )) }
            </IonList>
    </>
}

export default DataLayerDrawer