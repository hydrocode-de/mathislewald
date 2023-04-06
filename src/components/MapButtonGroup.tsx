import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { bookmarks, chevronDownOutline } from "ionicons/icons";

interface MapButtonGroupProps {
  padding: number;
  //   top: number;
  //   left: number;
}

const MapButtonGroup: React.FC<MapButtonGroupProps> = ({
  padding,
  //   top,
  //   left,
}) => {
  return (
    <div>
      <IonButton color={"light"}>
        <IonLabel>Height</IonLabel>
        <IonIcon icon={chevronDownOutline} />
      </IonButton>
      <IonButton
        color={"light"}
        id="open-range-filter"
        style={{
          paddingLeft: padding,
          paddingRight: padding,
        }}
      >
        <IonLabel>Filter</IonLabel>
        <IonIcon icon={chevronDownOutline} />
      </IonButton>
      <IonButton color={"light"}>
        <IonLabel>Selection</IonLabel>
        <IonIcon icon={bookmarks}></IonIcon>
      </IonButton>
    </div>
  );
};
export default MapButtonGroup;
