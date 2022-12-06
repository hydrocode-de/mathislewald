import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router"
import { useData } from "../context/data"
import { InventoryProperties } from "../context/data.model"

const TreeOverviewPage: React.FC<RouteComponentProps<{id: string}>> = ({ match }) => {
    // compnent state to store this feature
    const [feature, setFeature] = useState<GeoJSON.Feature<GeoJSON.Point, InventoryProperties>>()

    // load all inventory data
    const { inventory } = useData()

    // load the correct feature, whenever the URL param or inventory updates
    useEffect(() => {
        if (inventory?.features) {
            const f = inventory.features.find(f => f.id === match.params.id)
            setFeature(f)
        }
    }, [inventory, match])

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton />
                    <IonTitle>{ feature ? `Tree ID:${feature.id}` : 'Loading...' }</IonTitle>
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
            
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle>Feature view</IonTitle>
                </IonToolbar>
            </IonHeader>

            { feature ? (
                <pre><code>{ JSON.stringify(feature, null, 4) }</code></pre>
            ) : <IonSpinner name="crescent" style={{width: '100%', height: '30vh', marginTop: '25vh'}} /> }

        </IonContent>
    </IonPage>
}

export default TreeOverviewPage