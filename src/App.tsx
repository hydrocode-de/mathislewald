import {IonApp, IonGrid, IonRow, IonSpinner, setupIonicReact} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// import application wide Navigation
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './DesktopNavigation';
import { useSettings } from './context/settings';

setupIonicReact();

const App: React.FC = () => {
  // get the screenSize from  settings context
  const { screenSize } = useSettings();
  
  // if screenSize is still undefined return IonGrid with centered IonSpinner
  if (!screenSize) {
    return (
      <IonApp>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonSpinner name="crescent" />
          </IonRow>
        </IonGrid>
      </IonApp>
    )
  }

  // return MobileNavigation if the screenSize is smaller than md
  return (
  <IonApp>
    { screenSize?.width < 768 ? <MobileNavigation /> : <DesktopNavigation /> }
  </IonApp>
)};

export default App;
