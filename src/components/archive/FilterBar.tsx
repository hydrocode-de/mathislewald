import {
  IonChip,
  IonIcon,
  IonItem,
  IonItemDivider,
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
  const [searchText, setSearchText] = useState("");

  const toggleActive = (activate: boolean) => {
    setIsActive(activate);
    // console.log("set active", activate);
  };
  const handleChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
    setSearchText(query);
  };

  const handleAddFilter = (ev: Event) => {
    let newQuery = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) newQuery = target.value!.toLowerCase();
    setQuery([...query, newQuery] as any);
    console.log("query", query);
  };

  const handleCloseQuery = (closeQuery: string) => {
    const newQuery = query.filter((q) => q !== closeQuery);
    setQuery(newQuery);
  };

  const handleAddFilterList = (newQuery: string) => {
    setQuery([...query, newQuery] as any);
  };

  const handleOnEnter = (ev: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (ev.key === "Enter") {
      console.log("enter:", searchText);
      setQuery([...query, searchText] as any);
      setSearchText("");
    }
  };

  return (
    <>
      <div
        style={{
          background: isActive ? "#f4f5f8" : "transparent",
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
          value={searchText}
          // enterkeyhint="enter"
          onKeyPress={(ev) => handleOnEnter(ev)}
        ></IonSearchbar>
        <div style={{ paddingLeft: "10px", paddingTop: "0px" }}>
          {query.map((q) => (
            <IonChip style={{ backgroundColor: "white" }}>
              <IonLabel>{q}</IonLabel>
              <IonIcon icon={closeCircle} onClick={() => handleCloseQuery(q)} />
            </IonChip>
          ))}
        </div>
        <IonList
          inset
          class={isActive ? "ion-padding" : "ion-hide"}
          lines="inset"
          // color="transparent"
        >
          {/* <IonItemDivider /> */}
          {results.slice(0, 10).map((q) => (
            <IonChip
              key={q}
              // color="light"
              // lines="none"
              // button
              onClick={() => handleAddFilterList(q)}
            >
              {/* <IonChip>{q}</IonChip> */}
              {/* <IonLabel>
                </IonLabel> */}
              {q}
            </IonChip>
          ))}
        </IonList>
      </div>
    </>
  );
};

export default FilterBar;
