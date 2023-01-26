import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import DataLayerDrawer from "./components/DataLayerDrawer";
import MainMap from "./components/MainMapMaplibre";
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

                        <IonPage>
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start">
                                        <IonMenuButton />
                                    </IonButtons>
                                    <IonTitle>Mathislewand</IonTitle>
                                </IonToolbar>
                            </IonHeader>

                            <IonContent fullscreen>
                                
                                <MainMap />

                            </IonContent>
                        </IonPage>

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