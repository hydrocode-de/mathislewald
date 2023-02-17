import {
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import "./FilterBar.css";

const GenerateQueryCombination = () => {
  let operators = [">", "<", "="];
  let variables = ["radius", "height", "tree_id"];
  let values = [20];

  let queries = [];
  for (let i = 0; i < variables.length; i++) {
    for (let j = 0; j < operators.length; j++) {
      for (let k = 0; k < values.length; k++) {
        queries.push(`${variables[i]} ${operators[j]} ${values[k]}`);
      }
    }
  }
  return queries;
};

const FilterBar: React.FC = () => {
  const data = GenerateQueryCombination();

  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState([...data]);
  const [query, setQuery] = useState([]);

  const toggleActive = (activate: boolean) => {
    setIsActive(activate);
    console.log("set active", activate);
  };
  const handleChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
  };

  const handleAddFilter = (ev: Event) => {
    let newQuery = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) newQuery = target.value!.toLowerCase();
    setQuery([...query, newQuery] as any);
    console.log("query", query);
  };

  const handleCloseQuery = (closeQuery: string) => {
    console.log("close", closeQuery);
    const newQuery = query.filter((q) => q !== closeQuery);
    setQuery(newQuery);
  };

  const handleAddFilterList = (newQuery: string) => {
    setQuery([...query, newQuery] as any);
  };

  return (
    <>
      <div
        style={{
          background: isActive ? "white" : "transparent",
          borderRadius: "8px",
        }}
      >
        <IonSearchbar
          mode="ios"
          class="custom"
          //   animated={true}
          placeholder="Filter data"
          showCancelButton="focus"
          cancelButtonText="Add Filter"
          onIonFocus={() => toggleActive(true)}
          onIonBlur={() => toggleActive(false)}
          onIonChange={(ev) => handleChange(ev)}
          onIonCancel={(ev) => handleAddFilter(ev)}
        ></IonSearchbar>
        <div style={{ paddingLeft: "10px" }}>
          {query.map((q) => (
            <IonChip style={{ backgroundColor: "#f4f5f8" }}>
              <IonLabel>{q}</IonLabel>
              <IonIcon icon={closeCircle} onClick={() => handleCloseQuery(q)} />
            </IonChip>
          ))}
        </div>
        <IonList
          inset
          class={isActive ? "" : "ion-hide"}
          //   style={{ position: "absolute" }}
        >
          {results.slice(0, 10).map((q) => (
            <IonItem lines="none" button onClick={() => handleAddFilterList(q)}>
              <IonLabel>{q}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </div>
    </>
  );
};

export default FilterBar;
