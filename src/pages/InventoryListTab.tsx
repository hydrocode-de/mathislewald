import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useData } from "../context/data"

const InventoryListTab: React.FC = () => {
    // subscribe to filtered inventory updates
    const { filteredInventory } = useData()

    return <>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Inventory data list</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Incentory data list</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    { filteredInventory ? filteredInventory.features.map(f => {
                        return (
                            <IonItem key={f.id} routerDirection="forward" routerLink={`/list/${f.id}`}>
                                <IonLabel>Tree ID: {f.properties.treeid}</IonLabel>
                            </IonItem>
                        )
                    }) : null }
                </IonList>

            </IonContent>
        </IonPage>
    </>
}

export default InventoryListTab