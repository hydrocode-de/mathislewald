import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import RangeFilter from "../RangeFilter";

const RangeFilterSheetModal: React.FC<{
  modal: React.RefObject<HTMLIonModalElement>;
}> = ({ modal }) => {
  return (
    <IonModal ref={modal} trigger="open-range-filter" initialBreakpoint={0.5}>
      <IonToolbar>
        <IonTitle>Filter Data</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => modal.current?.dismiss()}>
            <IonIcon icon={closeCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent class="ion-padding">
        <RangeFilter />
      </IonContent>
    </IonModal>
  );
};

export default RangeFilterSheetModal;
