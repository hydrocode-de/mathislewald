import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { mapOutline, listOutline } from 'ionicons/icons'
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router"

// import pages
import MainMapTab from "./pages/MainMapTab"
import InventoryListTab from "./pages/InventoryListTab"
import TreeOverviewPage from "./pages/TreeOverviewPage"


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
                    
                    <Route exact path="/list">
                        <InventoryListTab />
                    </Route>

                    <Route path="/list/:id" component={TreeOverviewPage} /> 

                    <Route exact path="/">
                        <Redirect to="/map" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    
                    <IonTabButton tab="map" href="/map">
                        <IonIcon icon={mapOutline} />
                        <IonLabel>Map</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="list" href="/list">
                        <IonIcon icon={listOutline} />
                        <IonLabel>List</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
      </IonReactRouter>
  
    )
}

export default Navigation