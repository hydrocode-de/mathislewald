import {
  IonBackButton,
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
  IonLabel,
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
import {
  bookmarks,
  chevronDown,
  chevronDownOutline,
  chevronDownSharp,
  layers,
  map,
  options,
  settingsOutline,
} from "ionicons/icons";
import React from "react";
import InventoryList from "../components/InventoryList";
import MainMap from "../components/MainMapMaplibre";
import { BaseLayerPopover } from "../components/BaseLayerSelector";
import { Route, RouteComponentProps, Switch } from "react-router";
import TreeDetails from "../components/TreeDetails";
import Settings from "../components/Settings";

const DesktopPage: React.FC = () => {
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
            <IonCol sizeMd="4" sizeXl="3">
              <div style={{ height: "100vh", overflowY: "auto" }}>
                <InventoryList />
              </div>
            </IonCol>
            <IonCol>
              <div
                style={{
                  position: "absolute",
                  zIndex: 99,
                  padding: 10,
                  paddingLeft: 20,
                }}
              >
                <IonButton>
                  <IonLabel>Height</IonLabel>
                  <IonIcon icon={chevronDownOutline} />
                </IonButton>
                <IonButton class="ion-padding-horizontal">
                  <IonIcon icon={options} />
                  <IonLabel>Filter</IonLabel>
                  <IonIcon icon={chevronDownOutline} />
                </IonButton>
                <IonButton>
                  <IonLabel>Selection</IonLabel>
                  <IonIcon icon={bookmarks}></IonIcon>
                </IonButton>
              </div>
              <MainMap />
              <BaseLayerPopover />

              <Switch>
                {/* Tree detail card  */}
                <Route
                  exact
                  path="/list/:id"
                  render={(props) => (
                    <IonCard
                      style={{
                        position: "absolute",
                        top: 0,
                        width: "33vw",
                        maxWidth: "400px",
                        height: "90%",
                        zIndex: 999,
                        overflowY: "auto",
                      }}
                    >
                      <IonCardHeader>
                        <IonToolbar>
                          <IonButtons slot="start">
                            <IonBackButton />
                          </IonButtons>
                          <IonButtons slot="end">
                            <IonButton routerLink="/" routerDirection="root">
                              CLOSE
                            </IonButton>
                          </IonButtons>
                        </IonToolbar>
                      </IonCardHeader>
                      <IonCardContent>
                        <TreeDetails treeID={Number(props.match.params.id)} />
                      </IonCardContent>
                    </IonCard>
                  )}
                />

                {/* Settings card */}
                <Route exact path="/settings">
                  <IonCard
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "90%",
                      maxWidth: "90%",
                      height: "90%",
                      zIndex: 999,
                    }}
                  >
                    <IonCardHeader>
                      <IonToolbar>
                        <IonButtons slot="end">
                          <IonButton routerLink="/" routerDirection="root">
                            CLOSE
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                    </IonCardHeader>
                    <IonCardContent>
                      <Settings />
                    </IonCardContent>
                  </IonCard>
                </Route>

                <Route path="/">
                  <></>
                </Route>
              </Switch>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DesktopPage;
