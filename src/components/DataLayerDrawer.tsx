import { IonItem, IonLabel, IonList, IonListHeader, IonNote, IonSelect, IonSelectOption, IonTitle } from "@ionic/react"
import { useLayers } from "../context/layers"

const DataLayerDrawer: React.FC = () => {
    // subscribe to the available Inventories
    const { availableInventory, availableBaselayer } = useLayers()

    return <>
        <IonList>
            <IonListHeader>
                <IonTitle>Data</IonTitle>
            </IonListHeader>
            
            <IonItem>
                <IonLabel>Forest Inventury</IonLabel>
                <IonSelect>
                    { availableInventory.map(l => <IonSelectOption key={l.name} value={l.name}>{l.title}</IonSelectOption>) }
                </IonSelect>
            </IonItem>
        </IonList>

        <IonList>
            <IonListHeader>
                <IonTitle>Filter</IonTitle>
            </IonListHeader>

            <IonItem>
                <IonNote>Filters are not yet implemented</IonNote>
            </IonItem>
        </IonList>
    </>
}

export default DataLayerDrawer