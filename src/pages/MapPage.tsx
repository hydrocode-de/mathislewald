import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { listSharp } from "ionicons/icons";
import { useRef } from "react";
import InventoryList from "../components/InventoryList";

import MainMap from "../components/MainMapMaplibre";
import { useSettings } from "../context/settings";

const MapPage: React.FC = () => {
  // modal reference
  const modalRef = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mathislewand</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton id="list-modal">
              <IonIcon icon={listSharp} slot="icon-only" />
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <MainMap />

        {/* <IonModal
          ref={modalRef}
          breakpoints={[0, 1.0]}
          initialBreakpoint={1.0}
          trigger="list-modal"
          backdropBreakpoint={1.0}
          style={{
            maxWidth: "600px",
            left: "calc(100% - 600px)",
            position: "absolute",
            marginTop: "46px",
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Inventory List</IonTitle>
              <IonButtons
                slot="end"
                onClick={() => modalRef.current?.dismiss()}
              >
                <IonButton>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <InventoryList />
          </IonContent>
        </IonModal> */}
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
