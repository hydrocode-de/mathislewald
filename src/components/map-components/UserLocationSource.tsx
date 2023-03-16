import { IonFab, IonFabButton, IonIcon } from "@ionic/react"
import { locateOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { Layer, Source, useMap } from "react-map-gl"
import { useSettings } from "../../context/settings"

const UserLocationSource: React.FC = () => {
    // get the settings
    const { positionEnabled, position, activatePosition } = useSettings()
    const [userPos, setUserPos] = useState<GeoJSON.Feature<GeoJSON.Point>>()

    // get a map reference
    const map = useMap()

    // if the button is pressed, either enable and center, or center only
    const onButton = () => {
        if (!positionEnabled) {
            activatePosition()
        } 
        if (position) {
            map.current?.flyTo({
                center: {lng: position?.coords.longitude, lat: position?.coords.latitude}
            })
        }

    }

    // update the geojson whenever the position updates
    useEffect(() => {
        if (position) {
            setUserPos({
                type: 'Feature',
                geometry: {type: 'Point', coordinates: [position.coords.longitude, position.coords.latitude]},
                properties: {}
            })
        } else {
            setUserPos(undefined)
        }
    }, [position])

    return (
        <>
            <IonFab slot="fixed" horizontal="end" vertical="top" style={{marginTop: '4rem'}}>
                <IonFabButton color="light" disabled={!map.current} onClick={onButton}>
                    <IonIcon icon={locateOutline} />
                </IonFabButton>
            </IonFab>

            <Source id="user-position" type="geojson" data={userPos}>
                <Layer id="user-position" type="circle" source="user-position" paint={{
                    "circle-color": "blue", 
                    "circle-radius": 9,
                    "circle-stroke-color": "white",
                    "circle-stroke-width": 2.2,
                    "circle-opacity": 0.6
                }}></Layer>
            </Source>
        </>
    )
}

export default UserLocationSource