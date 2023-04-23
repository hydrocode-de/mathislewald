import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonThumbnail,
} from "@ionic/react";
import {
  bookmarkOutline,
  banOutline,
  navigate,
  swapVerticalOutline,
  arrowDownOutline,
  arrowUpOutline
} from "ionicons/icons";
import { useHistory } from "react-router";

import distance from "@turf/distance";

import { useData } from "../context/data";
import { useSettings } from "../context/settings";
import { InventoryFeature } from "../context/data.model";

import "./InventoryList.css";
import { useSelection } from "../context/selection";

const InventoryList: React.FC = () => {
  // load the filtered inventory list
  const {
    filteredInventory,
    activeVariable,
    setSelectedInventoryTreeIDHandler,
    sortDirection,
    setSortDirection
  } = useData();

  // get selection functions
  const { addToActiveSelection, removeFromActiveSelection, activeSelection } = useSelection()

  // get a history context
  const history = useHistory();

  // get the current position from the Settings
  const { position } = useSettings();

  // we need to close the modal on navigate
  const onNavigate = (path: string) => {
    // navigate forward
    history.push(path);
  };

  // handler for changing sort direction
  const onSortDirectionChange = () => {
    if (sortDirection === "none") {
      setSortDirection("ascending");
    } else if (sortDirection === "ascending") {
      setSortDirection("descending");
    } else {
      setSortDirection("none");
    }
  }

  const distString = (feature: InventoryFeature) => {
    if (!position) return " - ";
    const d = distance(
      feature.geometry.coordinates,
      [position.coords.longitude, position.coords.latitude],
      { units: "meters" }
    );
    if (d < 100) {
      return `${d.toFixed(1)} m`;
    }
    if (d < 10000) {
      return `${d.toFixed(0)} m`;
    } else {
      return `${(d / 1000).toFixed(0)} km`;
    }
  };

  const addToBookmarksHandler = (
    event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>,
    treeId: number
  ) => {
    // stop event propagation
    event.stopPropagation();

    // check if this treeId is already in the selection
    if (activeSelection?.selection.treeIds.includes(treeId)) {
      removeFromActiveSelection(treeId)
    } else {
      addToActiveSelection(treeId)
    }

    //console.log("add to bookmarks");
  };

  return (
    <IonContent color={"light"}>
      <IonList>
        <IonListHeader>
          <IonLabel>List View</IonLabel>
          <IonButton class="ion-padding-horizontal" onClick={onSortDirectionChange}>
            <IonIcon icon={sortDirection === "none" ?  swapVerticalOutline : sortDirection === "ascending" ? arrowUpOutline : arrowDownOutline} color={sortDirection === "none" ? "dark" : "primary"}></IonIcon>
          </IonButton>
        </IonListHeader>

        {filteredInventory?.features.map((f) => {
          return (
            <IonItem
              key={f.id}
              button
              onClick={() => {
                setSelectedInventoryTreeIDHandler(
                  f.properties.treeid.toString()
                );
                onNavigate(`/list/${f.properties.treeid}`);
              }}
            >
              <IonThumbnail slot="start" style={{ borderRadius: "15px" }}>
                <img
                  alt="Silhouette of mountains"
                  src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                  // src={`data:image/png;base64,${f.id}`}
                />
              </IonThumbnail>
              <IonLabel>
                <p style={{ fontSize: 12, paddingBottom: 0, fontWeight: 400 }}>
                  ID {f.properties.treeid}
                </p>
                {activeVariable === "height" ? (
                  <div style={{ display: "flex", alignItems: "end" }}>
                    <h1>{f.properties.height.toFixed(1)}</h1>
                    <p>{""}m</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "end" }}>
                    <h1>{(f.properties.radius * 100).toFixed(0)}</h1>
                    <p>{""}cm</p>
                  </div>
                )}
              </IonLabel>
              <IonLabel>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IonIcon
                    style={{
                      position: "relative",
                      bottom: -2,
                      left: -3,
                    }}
                    icon={navigate}
                  ></IonIcon>
                  {distString(f)}
                </p>
              </IonLabel>
              <IonButton 
                fill="clear" 
                onClick={e => addToBookmarksHandler(e, f.properties.treeid)}
              >
                <IonIcon icon={activeSelection?.selection.treeIds.includes(f.properties.treeid) ? banOutline : bookmarkOutline}></IonIcon>
              </IonButton>
            </IonItem>
          );
        })}
      </IonList>
    </IonContent>
  );
};

export default InventoryList;
