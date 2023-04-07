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
        {activeVariable}
        <IonIcon icon={chevronDownOutline} slot="end" />
      </IonButton>
      <IonButton
        color={"light"}
        id="open-range-filter"
        style={{
          paddingLeft: padding,
          paddingRight: padding,
        }}
      >
        Filter
        <IonIcon icon={chevronDownOutline} slot="end" />
      </IonButton>
      <IonButton color={"light"} disabled>
        Selection
        <IonIcon icon={bookmarks} slot="end"></IonIcon>
      </IonButton>
    </div>
  );
};
export default MapButtonGroup;
