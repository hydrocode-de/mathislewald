import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuToggle, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { layersOutline, ellipsisHorizontal } from 'ionicons/icons'
import DataLayerDrawer from '../components/DataLayerDrawer';

//import MainMap from '../components/MainMapGoogle';
//import MainMap from '../components/MainMapMapbox';
import MainMap from '../components/MainMapMaplibre';

const MainMapTab: React.FC = () => {
  return <>
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Data Layer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <DataLayerDrawer />
      </IonContent>
    </IonMenu>
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuToggle>
              <IonButton>
                <IonIcon icon={layersOutline} slot="icon-only" />
              </IonButton>
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>Mathislewald</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled>
              <IonIcon icon={ellipsisHorizontal} slot="icon-only" />
            </IonButton>
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
  </>
};

export default MainMapTab;
