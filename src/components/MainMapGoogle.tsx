import {  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonSpinner } from '@ionic/react';
import { GoogleMap, useJsApiLoader, Marker, InfoBox, InfoWindow } from '@react-google-maps/api'
import React, { useCallback, useEffect, useState } from 'react';
import { useData } from '../context/data';
import { useHistory } from 'react-router';
import { InventoryData, InventoryFeature } from '../context/data.model';
import * as geo from '../util/geo'
import cloneDeep from 'lodash.clonedeep';
import { Link } from 'react-router-dom';

const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;


const InventoryMarker: React.FC<{feature: InventoryFeature}> = ({ feature }) => {
    // component state
    const [showInfo, setShowInfo] = useState<boolean>(false)

    // use history to navigate to the list page
    // const history = useHistory()
    
    return (
        <Marker
            position={geo.featureToLngLat(feature)}
            //onMouseOver={() => !showInfo ? setShowInfo(true) : null}
            // onMouseOut={() => setShowInfo(false)}
            onClick={() => setShowInfo(true)}
            // onClick={() => history.push(`/list/${feature.id}`)}
        >
            {showInfo ? (
                <InfoWindow>
                    <>
                        <IonCardHeader>
                            <IonCardTitle>Tree ID:{ feature.id }</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonLabel>Height: {feature.properties.height}</IonLabel><br />
                            <IonLabel>Radius: {feature.properties.radius}</IonLabel>
                        </IonCardContent>
                        {/* <Link to={`/list/${feature.id}`}>{`/list/${feature.id}`}</Link> */}
                        <IonButton fill="solid" routerLink={`/list/${feature.id}`} routerDirection="forward">More info</IonButton>
                    </>
                </InfoWindow>
            ) : null}
        </Marker>
    )
}

const InventorySource: React.FC<{map: google.maps.Map | undefined}> = ({ map }) => {
    // create component state
    const [inventory, setInventory] = useState<InventoryData>()
    
    // use the Data context
    const { inventory: contextInventory } = useData()
    
    // clone the inventory as the Map fails to set context data directly
    useEffect(() => {
        if (contextInventory) setInventory(cloneDeep(contextInventory))
    }, [contextInventory])

    // zoom to the inventory data
    useEffect(() => {
        if (inventory && inventory.bbox) {
            // map?.fitBounds(inventory.bbox)
            map?.fitBounds(geo.bboxToLngLat(inventory.bbox), 90)
        }
    }, [map, inventory])
    
    // if the inventory is not loaded, return nothing
    if (!inventory) return null

    // if inventory is loaded, map the features to markers
    return <>
        { inventory.features.map(feature => <InventoryMarker key={feature.id} feature={feature} />) }
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
        map.setZoom(12)
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