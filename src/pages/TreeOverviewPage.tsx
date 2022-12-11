import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonNote, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
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

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Overview</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>

                    <IonItem lines="none">
                        <IonLabel slot="start">TreeID</IonLabel>
                        <IonLabel slot="end">{ feature?.properties.treeid }</IonLabel>
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel slot="start">Radius</IonLabel>
                        <IonLabel slot="end">{ feature?.properties.radius.toFixed(2) }m</IonLabel>
                        <IonNote slot="helper">
                            Radius describes half of the trunk diameter to 15 of the tree.
                        </IonNote>
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel slot="start">Height</IonLabel>
                        <IonLabel slot="end">{ feature?.properties.height.toFixed(1) }m</IonLabel>
                        <IonNote slot="helper">
                            Measured individual tree height using a combination of 
                            stereophotogrammetry and LiDAR.
                        </IonNote>
                    </IonItem>


                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>LiDAR</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>

                    <IonItem lines="none">
                        <IonLabel className="ion-text-wrap">
                            <h3>LiDAR scan images</h3>
                            <p>Measured individual tree height using a combination of 
                            stereophotogrammetry and LiDAR.</p>
                        </IonLabel>
                    </IonItem>

                    <img src={`http://geowwd.uni-freiburg.de/img/${feature?.properties.image}`} alt="a lidar image" />
                </IonCardContent>
            </IonCard>

        </IonContent>
    </IonPage>
}

export default TreeOverviewPage