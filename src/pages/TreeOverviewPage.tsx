import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonPage, IonSegment, IonSegmentButton, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { RouteComponentProps } from "react-router"

import TreeDetails from "../components/TreeDetails"


const TreeOverviewPage: React.FC<RouteComponentProps<{id: string}>> = ({ match }) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle>{ match.params.id ? `Tree ID:${match.params.id}` : 'Loading...' }</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                { match.params.id ? 
                    <TreeDetails treeID={Number(match.params.id)} /> 
                :   <IonSpinner name="circular" /> 
                }
                
            </IonContent>
        </IonPage>
    )
}

export default TreeOverviewPage