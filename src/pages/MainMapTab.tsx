import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainMap from '../components/MainMapGoogle';
//import MainMap from '../components/MainMapMapbox';

const MainMapTab: React.FC = () => {
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
        
        <MainMap />

      </IonContent>
    </IonPage>
  );
};

export default MainMapTab;
