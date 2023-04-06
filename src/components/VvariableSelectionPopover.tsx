import { IonPopover } from "@ionic/react";
import React from "react";
import VarialbeSelector from "./VariableSelector";

const VariableSelectionPopover: React.FC = () => {
  return (
    <IonPopover
      trigger="open-variable-selector"
      triggerAction="click"
      reference="trigger"
      side="bottom"
      arrow={false}
      showBackdrop={false}
      style={{
        // "--offset-x": "16px",
        "--offset-y": "20px",
        "--min-width": "250px",
      }}
    >
      <VarialbeSelector />
    </IonPopover>
  );
};

export default VariableSelectionPopover;
