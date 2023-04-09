import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import React from "react";
import InventoryList from "../components/InventoryList";
import MainMap from "../components/MainMapMaplibre";
import BaseLayerPopover from "../components/popover/BaseLayerPopover";
import { Route, Switch } from "react-router";
import TreeDetails from "../components/TreeDetails";
import Settings from "../components/Settings";
import FilterBarPopover from "../components/popover/RangeFilterPopover";
import MapButtonGroup from "../components/MapButtonGroup";
import ActiveMapSelectionButton from "../components/ActiveMapSelectionButton";
import VariableSelectionPopover from "../components/popover/VariableSelectionPopover";

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
        <IonGrid class="ion-no-padding">
          <IonRow>
            <IonCol sizeMd="5" sizeLg="3.8" sizeXl="3">
              <div style={{ height: "95vh", overflowY: "auto" }}>
                <InventoryList />
              </div>
            </IonCol>
            <IonCol>
              <div
                style={{
                  position: "absolute",
                  zIndex: 4,
                  top: 12,
                  left: 20,
                }}
              >
                <MapButtonGroup padding={10} />
              </div>
              <div
                style={{
                  position: "absolute",
                  zIndex: 99,
                  bottom: 20,
                  left: 20,
                }}
              >
                <ActiveMapSelectionButton height={100} width={100} />
              </div>
              <MainMap />
              <BaseLayerPopover />
              <FilterBarPopover />
              <VariableSelectionPopover />

              <Switch>
                <Route
                  exact
                  path="/list/:id"
                  render={(props) => (
                    <IonCard
                      style={{
                        position: "absolute",
                        margin: "0px",
                        top: 60,
                        left: 20,
                        // width: "33vw",
                        width: "400px",
                        maxWidth: "80%",
                        height: "calc(100% - 60px - 20px)",
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

                <Route path="/"></Route>
              </Switch>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DesktopPage;
