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
import VarialbeSelector from "../VariableSelector";

const VariableSelectionModal: React.FC<{
  modal: React.RefObject<HTMLIonModalElement>;
}> = ({ modal }) => {
  return (
    <IonModal
      ref={modal}
      trigger="open-variable-selector"
      initialBreakpoint={0.4}
    >
      <IonToolbar>
        <IonTitle>Select Variable</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => modal.current?.dismiss()}>
            <IonIcon icon={closeCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent class="ion-padding">
        <VarialbeSelector />
      </IonContent>
    </IonModal>
  );
};

export default VariableSelectionModal;
