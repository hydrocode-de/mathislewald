import {
  IonContent,
  IonHeader,
  IonMenu,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router";
import DataLayerDrawer from "./components/DataLayerDrawer";
import MainMap from "./components/MainMapMaplibre";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import TreeOverviewPage from "./pages/TreeOverviewPage";

const SplitPaneNavigation: React.FC = () => {
  return (
    <IonReactRouter>
      <IonSplitPane when="md" contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Data Layer</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <DataLayerDrawer />
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Switch>
            <Redirect exact from="/" to="/tabs" />
            <Route path="/tabs">
              {/* <MapPage /> */}
              {/* <MainMap></MainMap> */}
              <MainPage></MainPage>
            </Route>
            <Route path="/list/:id" component={TreeOverviewPage} />
          </Switch>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default SplitPaneNavigation;
