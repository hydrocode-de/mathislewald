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
import { Redirect, Route } from "react-router";
import DataLayerDrawer from "./components/DataLayerDrawer";
import MainTabs from "./components/MainTabs";
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
          <Redirect exact from="/" to="/tabs" />
          <Route path="/tabs">
            <MainTabs />
          </Route>
          <Route path="/list/:id" component={TreeOverviewPage} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default SplitPaneNavigation;
