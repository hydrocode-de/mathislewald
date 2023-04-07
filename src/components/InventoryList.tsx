import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonThumbnail,
} from "@ionic/react";
import { bookmarkOutline, filterOutline } from "ionicons/icons";
import { useHistory } from "react-router";

import distance from "@turf/distance";

import { useData } from "../context/data";
import { useSettings } from "../context/settings";
import { InventoryFeature } from "../context/data.model";

import "./InventoryList.css";

const InventoryList: React.FC = () => {
  // load the filtered inventory list
  const { filteredInventory } = useData();

  // get a history context
  const history = useHistory();

  // get the current position from the Settings
  const { position } = useSettings();

  // we need to close the modal on navigate
  const onNavigate = (path: string) => {
    // navigate forward
    history.push(path);
  };

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

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>List View</IonLabel>
        <IonButton class="ion-padding-horizontal">
          <IonIcon icon={filterOutline} color={"primary"}></IonIcon>
        </IonButton>
      </IonListHeader>

      {filteredInventory?.features.map((f) => {
        return (
          <IonItem
            key={f.id}
            button
            onClick={() => onNavigate(`/list/${f.properties.treeid}`)}
          >
            <IonThumbnail slot="start" style={{ borderRadius: "15px" }}>
              <img
                alt="Silhouette of mountains"
                src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                // src={`data:image/png;base64,${f.id}`}
              />
            </IonThumbnail>
            <IonLabel>
              <p> ID: {f.properties.treeid}</p>
              <div style={{ display: "flex", alignItems: "end" }}>
                <h1>{f.properties.height.toFixed(1)}</h1>
                <p>{""}m</p>
              </div>
            </IonLabel>
            <IonLabel>
              <p>{distString(f)} away</p>
            </IonLabel>
            <IonButton fill="clear">
              <IonIcon icon={bookmarkOutline}></IonIcon>
            </IonButton>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default InventoryList;
