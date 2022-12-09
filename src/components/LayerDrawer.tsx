import { IonCheckbox, IonContent, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonRadio, IonRadioGroup, IonTitle } from "@ionic/react"
import { layersOutline } from 'ionicons/icons'
import { useGoogleMap } from "@react-google-maps/api"
import { useEffect, useRef, useState } from "react"
import { useData } from "../context/data"

const LayerDrawer: React.FC = () => {
    // get the map reference
    const map = useGoogleMap()

    // get a reference to the available baseLayers and inventories
    const { availableBaselayer, availableInventory } = useData()


    // ref for the drawer
    const modalRef = useRef<HTMLIonModalElement>(null)

    // component state
    const [mapId, setMapId] = useState<google.maps.MapTypeId>(google.maps.MapTypeId.ROADMAP)

    // update the map
    useEffect(() => {
        if (map && modalRef.current) {
        map.setMapTypeId(mapId)
        modalRef.current.setCurrentBreakpoint(0.25)
        }
    }, [mapId, map])

    // switch the base Layers

    
    return <>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton id="layer-modal">
                <IonIcon icon={layersOutline} />
            </IonFabButton>
        </IonFab>

        <IonModal  ref={modalRef} trigger="layer-modal" breakpoints={[0, 0.25, 0.5, 0.85, 1.0]} initialBreakpoint={0.5}>
            <IonContent className="ion-padding">
            <IonList>
                <IonItem>
                    <IonLabel>Map Layer Options</IonLabel>
                </IonItem>
                <IonListHeader>
                    <IonTitle>Background Map</IonTitle>
                </IonListHeader>
                
                {/* Google maps base layers */}
                <IonRadioGroup value={mapId} onIonChange={e => setMapId(e.target.value)}>
                    <IonItem>
                        <IonLabel>Google Sattelite</IonLabel>
                        <IonRadio slot="start" value={google.maps.MapTypeId.SATELLITE} />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Google Roadmap</IonLabel>
                        <IonRadio slot="start" value={google.maps.MapTypeId.ROADMAP} />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Google Terrain</IonLabel>
                        <IonRadio slot="start" value={google.maps.MapTypeId.TERRAIN} />
                    </IonItem>
                </IonRadioGroup>

                {/* Geoserver base layers */}
                { availableBaselayer.map(bl => {
                    return (
                        <IonItem key={bl.name}>
                            <IonCheckbox slot="start"/>
                            <IonLabel>{bl.title}</IonLabel>
                        </IonItem>
                    )
                }) }

                
                <IonListHeader>
                    <IonTitle>Data</IonTitle>
                </IonListHeader>
                
            </IonList>
            </IonContent>
        </IonModal>
    </>
}

export default LayerDrawer