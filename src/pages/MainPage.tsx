import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react"
import MainMap from "../components/MainMapGoogle"

const MainPage: React.FC = () => {
    return (
        
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">

                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <MainMap />

            </IonContent>
        </IonPage>
    )
}

export default MainPage