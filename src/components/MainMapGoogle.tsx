import { IonIcon, IonSpinner } from '@ionic/react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useData } from '../context/data';
import { walkOutline } from 'ionicons/icons';

const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;


const InventorySource: React.FC<{map: google.maps.Map | undefined}> = ({ map }) => {
    // use the Data context
    const { inventory } = useData()

    useEffect(() => {
        if (inventory && inventory.bbox) {
            // map?.fitBounds(inventory.bbox)
        }
    }, [map, inventory])

    return <>
        {inventory?.features.map((feature, idx) => <Marker key={idx}  onClick={() => console.log(feature)} position={new google.maps.LatLng({lng: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1]})} />)}
    </>
}
const MainMap: React.FC = () => {
    const [map, setMap] = useState<google.maps.Map>()
    
    // get the prefered color settings to load correct mapId
    const prefer = window.matchMedia('(prefers-color-scheme: dark)')

    // load the JS for googlemaps
    const { isLoaded } = useJsApiLoader({
        mapIds: ['6060cca46b3b8e75',],
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY as string,
    })

    // callback run when the maps JS has been loaded and initialized
    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map)
        map.setZoom(14)
        map.setCenter({lat: 48., lng: 7.843});
    
        // dev
        (window as any).map = map
    }, [])

    const onUnmount = useCallback(() => {}, [])

    if (isLoaded) {
        return (
            <GoogleMap
              mapContainerStyle={{height: '100%', width: '100%'}}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{ mapId: prefer.matches ? '6060cca46b3b8e75' : '' }}
            >
                <InventorySource map={map}/>
            </GoogleMap>
        )
    } else {
        return <IonSpinner name="circular" /> 
    }
}

export default MainMap;