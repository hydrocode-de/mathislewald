import { IonBadge, IonButton, IonIcon, IonLabel } from "@ionic/react";
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
  const { activeVariable, inventoryCount } = useData();

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <IonButton color={"light"} id="open-variable-selector">
        {activeVariable === "height" ? "Height" : "BHD"}
        <IonIcon icon={chevronDownOutline} slot="end" />
      </IonButton>
      <div>
        <IonButton
          color={"light"}
          id="open-range-filter"
          style={{
            paddingLeft: padding,
            paddingRight: padding,
          }}
        >
          <IonBadge
            style={{
              marginRight: 6,
            }}
          >
            {inventoryCount.filtered}
          </IonBadge>
          Filter
          <IonIcon icon={chevronDownOutline} slot="end" />
        </IonButton>
      </div>
      <IonButton color={"light"} disabled>
        Selection
        <IonIcon icon={bookmarks} slot="end"></IonIcon>
      </IonButton>
    </div>
  );
};
export default MapButtonGroup;
