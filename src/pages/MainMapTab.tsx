import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

//import MainMap from '../components/MainMapGoogle';
//import MainMap from '../components/MainMapMapbox';
import MainMap from '../components/MainMapMaplibre';

const MainMapTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">

          </IonButtons>
          <IonTitle>Mathislewald</IonTitle>
          <IonButtons slot="end">

          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <MainMap />

      </IonContent>
    </IonPage>
  );
};

export default MainMapTab;
