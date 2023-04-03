import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonPopover,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { layers, map, settingsOutline } from "ionicons/icons";
import React from "react";
import InventoryList from "../components/InventoryList";
import MainMap from "../components/MainMapMaplibre";
import { BaseLayerPopover } from "../components/BaseLayerSelector";
import { Route, RouteComponentProps, Switch } from "react-router";
import TreeOverviewPage from "./TreeOverviewPage";
import TreeDetails from "../components/TreeDetails";

// import "./DesktopPage.css";

//const DesktopPage: React.FC<RouteComponentProps<{id: string}>> = ({ match }) => {
const DesktopPage: React.FC = () => {
  //console.log(match)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="forward">
              <IonIcon icon={settingsOutline} color="primary" />
            </IonButton>
          </IonButtons>
          <IonTitle>Mathislewald</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab slot="fixed" horizontal="end" vertical="top">
          <IonFabButton id="open-modal">
            <IonIcon icon={map} />
          </IonFabButton>
        </IonFab>
        <IonGrid class="ion-no-padding">
          <IonRow>
            <IonCol size="3">
              <div style={{ height: "100vh", overflowY: 'auto' }}>
                {/* <IonContent> */}
                  <InventoryList />
                {/* </IonContent> */}
              </div>
            </IonCol>
            <IonCol>
              <MainMap />
              <BaseLayerPopover />

              {/* {match.url.startsWith('/list/') ? ( */}
              
                <Switch>
                <Route exact path="/list/:id" render={props => (
                  <IonCard style={{position: 'absolute', top: 0, width: '33vw', maxWidth: '400px', height: '85vh', zIndex: 999, overflowY: 'auto'}}>
                    <IonCardHeader>
                      <IonToolbar>
                      <IonButtons slot="end">
                        <IonButton routerLink="/" routerDirection="root">CLOSE</IonButton>
                      </IonButtons>
                      </IonToolbar>
                    </IonCardHeader>
                    <IonCardContent>
                      <TreeDetails treeID={Number(props.match.params.id)} />
                    </IonCardContent>
                  </IonCard>
                )} />

                <Route path="/">
                  <></>
                </Route>
                </Switch>
                
                {/* ) : null} */}
              
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DesktopPage;
