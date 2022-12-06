import {  IonSpinner } from '@ionic/react';
import { GoogleMap, useJsApiLoader, Marker, InfoBox } from '@react-google-maps/api'
import React, { useCallback, useEffect, useState } from 'react';
import { useData } from '../context/data';
import { useHistory } from 'react-router';
import { InventoryFeature } from '../context/data.model';

const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;


const InventorySource: React.FC<{map: google.maps.Map | undefined}> = ({ map }) => {
    // create infoBox state
    const [showBox, setShowBox] = useState<boolean>(false);
    const [boxFeature, setBoxFeature] = useState<InventoryFeature>()
    
    // use the Data context
    const { inventory } = useData()

    // use history to navigate to the list page
    const history = useHistory()

    useEffect(() => {
        if (inventory && inventory.bbox) {
            // map?.fitBounds(inventory.bbox)
            map?.fitBounds(new google.maps.LatLngBounds({lng: inventory.bbox[0], lat: inventory.bbox[1]}, {lng: inventory.bbox[2], lat: inventory.bbox[3]}), 90)
        }
    }, [map, inventory])

    const onMarkerEnter = (f: InventoryFeature) => {
        setBoxFeature(f)
        setShowBox(true)
    }
    const onMarkerLeave = () => setShowBox(false)
    
    return <>
        { showBox && boxFeature ? (
            <InfoBox position={new google.maps.LatLng({lng: boxFeature.geometry.coordinates[0], lat: boxFeature.geometry.coordinates[1]})}>
                <div style={{backgroundColor: 'white', padding: '0.3rem', color: 'black', boxShadow: '0 2px 4px silver'}}>
                    <h3>{boxFeature?.id}</h3>
                </div>
            </InfoBox>
        ) : null }
        {inventory?.features.map((feature, idx) => <Marker key={idx} onClick={() => history.push(`/list/${feature.id}`)} onMouseOver={() => onMarkerEnter(feature)} onMouseOut={onMarkerLeave} position={new google.maps.LatLng({lng: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1]})} />)}
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