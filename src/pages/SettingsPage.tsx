import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { useOffline } from "../context/offline"

const SettingsPage: React.FC = () => {
    const [imgs, setImgs] = useState<string[]>([])

    // load offline context
    const { baselayers, getBaselayer } = useOffline()

    useEffect(() => {
        if (baselayers) {
            Promise.all(baselayers.map(l => {
                return getBaselayer(l.name)
            })).then(sources => setImgs(sources))
        }
    }, [baselayers])

    return (
        <IonPage>
            
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>

                        { imgs.map((img, idx) => (
                            <IonCol key={idx} size="12" sizeMd="4">
                                <img src={`data:image/jpeg;base64,${img}`} alt="preview" />
                            </IonCol>
                        )) }

                    </IonRow>
                </IonGrid>
                <pre>
                    <code>
                        { JSON.stringify(baselayers, null, 4) }
                    </code>
                </pre>
            </IonContent>

        </IonPage>
    )
}

export default SettingsPage