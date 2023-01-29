import {  IonContent, IonHeader, IonMenu, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import DataLayerDrawer from "./components/DataLayerDrawer";
import MainPage from "./pages/MainPage";
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
                    <Route exact path="/map">
                        <MainPage />
                    </Route>

                    <Route path="/list/:id" component={TreeOverviewPage} /> 

                    <Route exact path="/">
                        <Redirect to="/map" />
                    </Route>
                </IonRouterOutlet>

            </IonSplitPane>
        </IonReactRouter>
    )
}

export default SplitPaneNavigation;