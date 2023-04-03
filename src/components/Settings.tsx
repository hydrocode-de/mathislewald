import { useState } from "react"

import { IonAccordion, IonAccordionGroup, IonButton,  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid,  IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSpinner,  IonToggle } from "@ionic/react"
import { checkmark, close } from "ionicons/icons"

import { useOffline } from "../context/offline"
import pack from '../../package.json';
import { useSettings } from "../context/settings";

const Settings: React.FC = () => {
    // load offline context
    const { baselayers, localChecksums, remoteChecksums, status } = useOffline()
    const settings = useSettings()
    const [newUrl, setNewUrl] = useState<string>(settings.serverUrl)

    return (
        <IonAccordionGroup>
            
            <IonAccordion value="info">
                <IonItem slot="header" color="light"><IonLabel>Application settings</IonLabel></IonItem>
                <IonList slot="content">
                    <IonItem lines="none">
                        <IonLabel slot="start">Application version</IonLabel>
                        <IonLabel><code>v{ pack.version }</code></IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel slot="start">Backend status</IonLabel>
                        <IonLabel><code>{ status }</code></IonLabel>
                        { status === 'downloading' ? <IonSpinner name="dots" slot="end" /> : <IonIcon icon={status === 'online' ? checkmark : close} slot="end" /> }
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

            <IonAccordion value="local">
                <IonItem slot="header" color="light"><IonLabel>Local baselayers cache</IonLabel></IonItem>
                <div slot="content">
                    <IonGrid>
                        <IonRow>
                            { baselayers?.map(layer => (
                                <IonCol size="12" sizeMd="6" sizeLg="4" key={layer.name}>
                                    <IonCard color="light">
                                        <img src={`data:image/${layer.opt.type};base64,${layer.data}`} alt="thumbnail" />
                                        <IonCardHeader>
                                            <IonCardTitle>{layer.title}</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            { layer.abstract }
                                            <IonList>
                                                { Object.entries(layer.opt).map(([key, value]) => (
                                                    <IonItem lines="none" key={key}>
                                                        <IonLabel slot="start">{ key }</IonLabel>
                                                        <IonLabel><code>{ value }</code></IonLabel>
                                                    </IonItem>
                                                )) }
                                            </IonList>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            )) }
                        </IonRow>
                    </IonGrid>
                    <IonButton color="danger" fill="solid" expand="full" disabled>CLEAR baselayer cache</IonButton>
                </div>
            </IonAccordion>

            <IonAccordion value="position">
                <IonItem slot="header" color="light">Device position</IonItem>
                <IonList slot="content">
                    <IonItem lines="none" onClick={() => settings.positionEnabled ? settings.deactivatePosition() : settings.activatePosition() } style={{curser: 'pointer'}}>
                        <IonLabel slot="start">enable GPS positioning</IonLabel>
                        <IonToggle checked={settings.positionEnabled} color={settings.positionEnabled ? 'success' : 'danger'} enableOnOffLabels slot="end" mode="ios" />
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel slot="start">Last position</IonLabel>
                        { settings.position ? (
                            <IonLabel>Lon: {settings.position.coords.longitude}  Lat: {settings.position.coords.latitude}</IonLabel>
                        ) : (<IonLabel><i>no GPS, or not activated</i></IonLabel>)}
                    </IonItem>
                </IonList>
            </IonAccordion>

        </IonAccordionGroup>
    )
}

export default Settings