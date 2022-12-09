import { IonSpinner } from '@ionic/react';
import { GoogleMap, useJsApiLoader, GroundOverlay } from '@react-google-maps/api'
import React, { useCallback, useState } from 'react';

import LayerDrawer from './map-components/LayerDrawer';
import { LayersProvider } from '../context/layers';
import InventorySource from './map-components/InventorySource';
import BaseLayerSource from './map-components/BaseLayerSource';

const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;


const MainMap: React.FC = () => {
    // store the map somewhere
    const [map, setMap] = useState<google.maps.Map>()

    // get the prefered color settings to load correct mapId
    const prefer = window.matchMedia('(prefers-color-scheme: dark)')

    // load the JS for googlemaps
    const { isLoaded } = useJsApiLoader({
        mapIds: ['6060cca46b3b8e75',],
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY as string,
    })

    // callback run when the maps JS has been loaded and initialized
    const onLoad = useCallback((_map: google.maps.Map) => {
        if (!_map) setMap(_map)
        _map.setZoom(12)
        _map.setCenter({lat: 48., lng: 7.843});
    
        // dev
        (window as any).map = _map
    }, [])

    const onUnmount = useCallback(() => {}, [])

    const options: google.maps.MapOptions = {
        mapId: prefer.matches ? '6060cca46b3b8e75' : '',
        zoomControlOptions: {
            position: 5 // google.maps.ControlPosition.LEFT_TOP
        },
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
    }

    if (isLoaded) {
        return <>
            <LayersProvider>
                <GoogleMap
                mapContainerStyle={{height: '100%', width: '100%'}}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
                >
                    <LayerDrawer />
                    <InventorySource />
                    <BaseLayerSource />
                </GoogleMap>
            </LayersProvider>
        </>
    } else {
        return <IonSpinner name="circular" /> 
    }
}

export default MainMap;