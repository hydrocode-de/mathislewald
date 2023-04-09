import { IonPopover } from "@ionic/react";
import React from "react";
import RangeFilter from "../RangeFilter";

const FilterBarPopover: React.FC = () => {
  return (
    <IonPopover
      trigger="open-range-filter"
      triggerAction="click"
      reference="trigger"
      side="bottom"
      arrow={true}
      // mode="md"
      showBackdrop={true}
      style={{
        "--offset-x": "10px",
        "--offset-y": "20px",
        "--min-width": "350px",
      }}
    >
      <RangeFilter />
    </IonPopover>
  );
};

export default FilterBarPopover;
