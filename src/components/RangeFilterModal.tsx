import {
  IonButton,
  IonButtons,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import RangeFilter from "./RangeFilter";

const RangeFilterSheetModal: React.FC<{
  modal: React.RefObject<HTMLIonModalElement>;
}> = ({ modal }) => {
  return (
    <IonModal ref={modal} trigger="open-range-filter" initialBreakpoint={0.55}>
      <IonToolbar>
        <IonTitle>Filter Data</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => modal.current?.dismiss()}>
            <IonIcon icon={closeCircle} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <RangeFilter />
    </IonModal>
  );
};

export default RangeFilterSheetModal;
