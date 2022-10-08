import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { triangle, ellipse, square, mapOutline } from 'ionicons/icons'
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router"

// import pages
import MainMapTab from "./pages/MainMapTab"


/**
 * Builds the main navigation for the application.
 * 
 * @returns 
 */
const Navigation: React.FC = () => {
    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/map">
                    <MainMapTab />
                    </Route>
                    <Route exact path="/">
                    <Redirect to="/map" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="map" href="/map">
                    <IonIcon icon={mapOutline} />
                    <IonLabel>Map</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
      </IonReactRouter>
  
    )
}

export default Navigation