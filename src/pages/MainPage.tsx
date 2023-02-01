import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { listSharp, map } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import InventoryListPage from "./InventoryListPage";
// import { Route } from "workbox-routing";
import MapPage from "./MapPage";

const MainPage = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact from="/tabs" to="/tabs/map" />
        <Route path="/tabs/map" exact>
          <MapPage></MapPage>
        </Route>
        <Route exact path="/tabs/list">
          <InventoryListPage></InventoryListPage>
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="map" href="/tabs/map">
          <IonLabel>Map</IonLabel>
          <IonIcon icon={map}></IonIcon>
        </IonTabButton>
        <IonTabButton tab="list" href="/tabs/list">
          <IonLabel>Map</IonLabel>
          <IonIcon icon={listSharp}></IonIcon>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainPage;
