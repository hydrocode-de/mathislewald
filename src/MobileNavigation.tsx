import {
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";
import InventoryListPage from "./pages/InventoryListPage";
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import TreeOverviewPage from "./pages/TreeOverviewPage";

const MobileNavigation: React.FC = () => {
  console.log("Running Mobile Navigation");
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Redirect exact from="/" to="/map" />
        <Route exact path="/map">
          <MapPage />
        </Route>
        <Route exact path="/list">
          <InventoryListPage />
        </Route>
        <Route exact path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/list/:id" component={TreeOverviewPage} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default MobileNavigation;
