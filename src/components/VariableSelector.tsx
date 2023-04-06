import { IonItem, IonLabel, IonRadio, IonRadioGroup } from "@ionic/react";
import { useData } from "../context/data";

const VarialbeSelector: React.FC = () => {
  const { activeVariable, setActiveVariable } = useData();
  return (
    <IonRadioGroup
      //   value="space-between"
      allowEmptySelection={true}
      value="Height"
    >
      <IonItem>
        <IonLabel>Height</IonLabel>
        <IonRadio
          slot="end"
          value="Height"
          onClick={() => {
            setActiveVariable("Height");
          }}
        ></IonRadio>
      </IonItem>

      <IonItem>
        <IonLabel>BHD</IonLabel>
        <IonRadio slot="end" value="BHD"></IonRadio>
      </IonItem>
    </IonRadioGroup>
  );
};

export default VarialbeSelector;
