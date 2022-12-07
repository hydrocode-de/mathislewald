import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonModal, IonPage, IonToolbar } from "@ionic/react"
import { listSharp } from 'ionicons/icons'
import { useRef } from "react"
import InventoryList from "../components/InventoryList"

import MainMap from "../components/MainMapGoogle"

const MainPage: React.FC = () => {
    const listRef = useRef<HTMLIonModalElement>(null)
    return (
        
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">

                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <MainMap />

                <IonFab slot="fixed" horizontal="start" vertical="bottom">
                    <IonFabButton id="list-button">
                        <IonIcon icon={listSharp} />
                    </IonFabButton>
                </IonFab>

                <IonModal ref={listRef} trigger="list-button" initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.85, 1.]}>
                    <InventoryList modalRef={listRef} />
                </IonModal>

            </IonContent>
        </IonPage>
    )
}

export default MainPage