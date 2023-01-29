import { IonButtons, IonContent, IonHeader,  IonMenuButton,  IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useRef } from "react"

import MainMap from "../components/MainMapMaplibre"

const MainPage: React.FC = () => {
    const listRef = useRef<HTMLIonModalElement>(null)
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Mathislewand</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
            
            <MainMap />

        </IonContent>
    </IonPage>
    )
}

export default MainPage