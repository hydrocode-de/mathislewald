import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { bookmarks, chevronDownOutline } from "ionicons/icons";

interface MapButtonGroupProps {
  padding: number;
}

const MapButtonGroup: React.FC<MapButtonGroupProps> = ({ padding }) => {
  return (
    <div
      style={
        {
          // position: "absolute",
          // zIndex: 99,
        }
      }
    >
      <IonButton color={"light"}>
        <IonLabel>Height</IonLabel>
        <IonIcon icon={chevronDownOutline} />
      </IonButton>
      <IonButton
        color={"light"}
        id="open-filterbar-popover"
        style={{
          paddingLeft: padding,
          paddingRight: padding,
        }}
      >
        {/* <IonIcon icon={options} /> */}
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
