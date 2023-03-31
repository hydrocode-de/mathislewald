import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { layers, listSharp, map, settingsOutline } from "ionicons/icons";
import { useRef } from "react";

import MainMap from "../components/MainMapMaplibre";
import {
  BaseLayerPopover,
  BaseLayerSheetModal,
} from "../components/BaseLayerSelector";
import "./MapPage.css";

// const MapButton: React.FC = () => {
//   return (
//     <IonButton id="open-modal" className="mapButton" size="small">
//       <IonIcon icon={layers} />
//     </IonButton>
//   );
// };

const MapPage: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton>
              <IonIcon icon={layers} color="primary" />
            </IonMenuButton>
          </IonButtons>
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
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton routerLink="/list" routerDirection="none">
            <IonIcon icon={listSharp} />
          </IonFabButton>
        </IonFab>

        <MainMap />
        {window.innerWidth > 768 ? (
          <BaseLayerPopover />
        ) : (
          <BaseLayerSheetModal modal={modal}></BaseLayerSheetModal>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MapPage;

// {/*
//       <IonGrid style={{ position: "absolute", zIndex: 4, width: "100%" }}>
//         <IonRow class="ion-align-items-top">
//           <IonCol
//             size="6"
//             class="ion-float-left"
//             size-md="6"
//             size-xs="9"
//             size-lg="5"
//             size-xl="4"
//           >
//             <FilterBar />
//           </IonCol>
//           <IonCol style={{ paddingTop: "10px" }}>
//             <IonButton
//               id="open-modal"
//               class="ion-float-right"
//               // style={{ width: "40px", height: "40px" }}
//             >
//               <IonIcon icon={layers} />
//             </IonButton>
//           </IonCol>
//         </IonRow>
//       </IonGrid> */}
//       {/* </div> */}
//       {/* <IonSearchbar
//         style={{
//           position: "absolute",
//           zIndex: 4,
//           width: "80%",
//           top: "51px",
//         }}
//         mode="ios"
//         animated={true}
//         placeholder="Filter the data"
//         showCancelButton="focus"
//         cancelButtonText="Add Filter"
//         // onClick={() => console.log("test")}
//       ></IonSearchbar> */}
//       {/* <MapButton /> */}
