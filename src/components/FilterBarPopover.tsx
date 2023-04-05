import { IonPopover } from "@ionic/react";
import React from "react";
import RangeFilter from "./RangeFilter";

const FilterBarPopover: React.FC = () => {
  return (
    <IonPopover
      trigger="open-filterbar-popover"
      triggerAction="click"
      reference="trigger"
      side="bottom"
      arrow={false}
      showBackdrop={false}
      style={{
        "--offset-x": "16px",
        "--offset-y": "20px",
        "--min-width": "350px",
      }}
    >
      <RangeFilter />
    </IonPopover>
  );
};

export default FilterBarPopover;
