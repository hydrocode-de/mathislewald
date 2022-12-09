import { IonSpinner } from '@ionic/react';
import { GoogleMap, useJsApiLoader, GroundOverlay } from '@react-google-maps/api'
import React, { useCallback, useState } from 'react';

import LayerDrawer from './map-components/LayerDrawer';
import { LayersProvider } from '../context/layers';
import InventorySource from './map-components/InventorySource';

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
                    {/* <GroundOverlay 
                        key={'url'} 
                        url="http://geowwd.uni-freiburg.de/geoserver/Baselayer/wms?service=wms&request=GetMap&version=1.1.1&format=image/png&layers=Baselayer:ortho&styles=raster&height=768&width=676&transparent=true&bbox=8.087004650932549%2C47.8836823330856%2C8.089897671665396%2C47.8858838151575&srs=EPSG:4326" 
                        bounds={{
                            north: 47.8858838151575,
                            south: 47.8836823330856,
                            east: 8.089897671665396,
                            west: 8.087004650932549
                        }}
                    /> */}
                </GoogleMap>
            </LayersProvider>
        </>
    } else {
        return <IonSpinner name="circular" /> 
    }
}

export default MainMap;