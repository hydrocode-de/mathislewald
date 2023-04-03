import {
  IonContent,
  IonHeader,
  IonMenu,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonListHeader,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { listSharp, map } from "ionicons/icons";
import DataLayerDrawer from "./components/DataLayerSelector";
import TreeOverviewPage from "./pages/TreeOverviewPage";
import InventoryListPage from "./pages/InventoryListPage";
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import DesktopPage from "./pages/DesktopPage";

const MobileNavigation: React.FC = () => {
  console.log("Running Desktop Navigation");
  return (
    <IonReactRouter>
      <DesktopPage />
    </IonReactRouter>
  )

};

export default MobileNavigation;

// const MainTabs: React.FC = () => {
//   return (
//     <IonTabs>
//       <IonRouterOutlet>
//         <Redirect exact from="/tabs" to="/tabs/map" />
//         <Route path="/tabs/map" exact>
//           <MapPage />
//         </Route>
//         <Route exact path="/tabs/list">
//           <InventoryListPage />
//         </Route>
//       </IonRouterOutlet>
//       <IonTabBar slot="bottom">
//         <IonTabButton tab="map" href="/tabs/map">
//           <IonLabel>Map</IonLabel>
//           <IonIcon icon={map}></IonIcon>
//         </IonTabButton>
//         <IonTabButton tab="list" href="/tabs/list">
//           <IonLabel>List</IonLabel>
//           <IonIcon icon={listSharp}></IonIcon>
//         </IonTabButton>
//       </IonTabBar>
//     </IonTabs>
//   );
// };

// const SplitPaneNavigation: React.FC = () => {
//   return (
//     <IonReactRouter>
//       <IonSplitPane when="md" contentId="main">
//         <IonMenu contentId="main">
//           <IonHeader>
//             <IonToolbar>
//               <IonTitle>Data Layer</IonTitle>
//             </IonToolbar>
//           </IonHeader>
//           <DataLayerDrawer />
//         </IonMenu>
//         <IonRouterOutlet id="main">
//           <Redirect exact from="/" to="/tabs" />
//           <Route path="/tabs">
//             <MainTabs />
//           </Route>
//           <Route path="/list/:id" component={TreeOverviewPage} />
//           <Route exact path="/settings">
//             <SettingsPage />
//           </Route>
//         </IonRouterOutlet>
//       </IonSplitPane>
//     </IonReactRouter>
//   );
// };

// export default SplitPaneNavigation;
