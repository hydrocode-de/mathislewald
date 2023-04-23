import { IonItem, IonLabel, IonRadio, IonRadioGroup } from "@ionic/react";
import { useData } from "../context/data";

const VarialbeSelector: React.FC = () => {
  const { activeVariable, setActiveVarialbeHandler } = useData();
  return (
    <IonRadioGroup
      //   value="space-between"
      // allowEmptySelection={true}
      value={activeVariable === "height" ? "height" : "radius"}
    >
      <IonItem>
        <IonLabel>Height</IonLabel>
        <IonRadio
          slot="end"
          value="height"
          onClick={() => {
            setActiveVarialbeHandler("height");
          }}
        ></IonRadio>
      </IonItem>

      <IonItem>
        <IonLabel>BHD</IonLabel>
        <IonRadio
          slot="end"
          value="radius"
          onClick={() => {
            setActiveVarialbeHandler("radius");
          }}
        ></IonRadio>
      </IonItem>
    </IonRadioGroup>
  );
};

export default VarialbeSelector;
