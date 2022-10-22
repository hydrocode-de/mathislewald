import { IonSpinner } from '@ionic/react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useCallback } from 'react';

const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;

const MainMap: React.FC = () => {

    // get the prefered color settings to load correct mapId
    const prefer = window.matchMedia('(prefers-color-scheme: dark)')

    // load the JS for googlemaps
    const { isLoaded } = useJsApiLoader({
        mapIds: ['6060cca46b3b8e75',],
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY as string,
    })

    // callback run when the maps JS has been loaded and initialized
    const onLoad = useCallback((map: google.maps.Map) => {
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
            ></GoogleMap>
        )
    } else {
        return <IonSpinner name="circular" /> 
    }
}

export default MainMap;