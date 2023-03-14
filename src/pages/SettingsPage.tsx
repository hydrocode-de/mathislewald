import { IonAccordion, IonAccordionGroup, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { checkmark, close } from "ionicons/icons"

import { useEffect, useState } from "react"

import { useOffline } from "../context/offline"
import pack from '../../package.json';
import { useSettings } from "../context/settings";

const SettingsPage: React.FC = () => {
    const [imgs, setImgs] = useState<string[]>([])
    

    // load offline context
    const { baselayers, getBaselayer, localChecksums, remoteChecksums, status } = useOffline()
    const settings = useSettings()
    const [newUrl, setNewUrl] = useState<string>(settings.serverUrl)

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
                <IonAccordionGroup>
                    
                    <IonAccordion value="info">
                        <IonItem slot="header" color="light"><IonLabel>Application infos</IonLabel></IonItem>
                        <IonList slot="content">
                            <IonItem lines="none">
                                <IonLabel slot="start">Application version</IonLabel>
                                <IonLabel><code>v{ pack.version }</code></IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel slot="start">Backend status</IonLabel>
                                <IonLabel><code>{ status }</code></IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel slot="start">Backend URL</IonLabel>
                                <IonInput value={newUrl} onIonChange={e => setNewUrl(e.target.value as string)} />
                                <IonButton slot="end" color="success" disabled={newUrl === settings.serverUrl} onClick={() => settings.changeBaseUrl(newUrl)}>SAVE</IonButton>
                            </IonItem>
                        </IonList>
                    </IonAccordion>

                    <IonAccordion value="local-checksums">
                        <IonItem slot="header" color="light"><IonLabel>Checksums</IonLabel></IonItem>
                        <IonList slot="content">
                        <IonItem lines="none">
                                <IonLabel slot="start">Checksum Inventory data</IonLabel>
                                <IonLabel><code>{ localChecksums?.inventory }</code></IonLabel>
                                <IonIcon icon={localChecksums?.inventory === remoteChecksums?.inventory ? checkmark : close} color={localChecksums?.inventory === remoteChecksums?.inventory ? 'success' : 'danger'} slot="end" />
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel slot="start">Checksum Image data</IonLabel>
                                <IonLabel><code>{ localChecksums?.images }</code></IonLabel>
                                <IonIcon icon={localChecksums?.images=== remoteChecksums?.images ? checkmark : close} color={localChecksums?.images === remoteChecksums?.images ? 'success' : 'danger'} slot="end" />
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel slot="start">Checksum Baselayer data</IonLabel>
                                <IonLabel><code>{ localChecksums?.baselayer }</code></IonLabel>
                                <IonIcon icon={localChecksums?.baselayer === remoteChecksums?.baselayer ? checkmark : close} color={localChecksums?.baselayer === remoteChecksums?.baselayer ? 'success' : 'danger'} slot="end" />
                            </IonItem>
                        </IonList>
                    </IonAccordion>

                    <IonAccordion value="local" disabled>
                        <IonItem slot="header"><IonLabel>Local data cache</IonLabel></IonItem>
                    </IonAccordion>

                </IonAccordionGroup>



                {/* <IonGrid>
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
                </pre> */}
            </IonContent>

        </IonPage>
    )
}

export default SettingsPage