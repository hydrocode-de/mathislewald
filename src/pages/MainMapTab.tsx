import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useCallback } from 'react';

import ExploreContainer from '../components/ExploreContainer';

const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;

const MainMapTab: React.FC = () => {
  // load the JS for googlemaps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY as string
  })

  // callback run when the maps JS has been loaded and initialized
  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(14)
    map.setCenter({lat: 48., lng: 7.843})
  }, [])

  const onUnmount = useCallback(() => {}, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mathislewald</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        { isLoaded ? (
          <GoogleMap
            mapContainerStyle={{height: '100%', width: '100%'}}
            onLoad={onLoad}
            onUnmount={onUnmount}
          ></GoogleMap>
        ) : <IonSpinner name="circular" /> }

      </IonContent>
    </IonPage>
  );
};

export default MainMapTab;
