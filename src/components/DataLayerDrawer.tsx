import { IonCheckbox, IonItem, IonLabel, IonList, IonListHeader, IonTitle } from "@ionic/react"

const DataLayerDrawer: React.FC = () => {
    return <>
        <IonList>
            <IonListHeader>
                <IonTitle>Data</IonTitle>
            </IonListHeader>
            
            <IonItem>
                <IonCheckbox slot="end" value={true} />
                <IonLabel>Forest Inventury</IonLabel>
            </IonItem>
        </IonList>
    </>
}

export default DataLayerDrawer