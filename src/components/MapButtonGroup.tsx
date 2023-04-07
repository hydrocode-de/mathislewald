import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { bookmarks, chevronDownOutline } from "ionicons/icons";
import { useData } from "../context/data";

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
  const { activeVariable } = useData();

  return (
    <div>
      <IonButton color={"light"} id="open-variable-selector">
        <IonLabel>{activeVariable}</IonLabel>
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
      <IonButton color={"light"} disabled>
        <IonLabel>Selection</IonLabel>
        <IonIcon icon={bookmarks}></IonIcon>
      </IonButton>
    </div>
  );
};
export default MapButtonGroup;
