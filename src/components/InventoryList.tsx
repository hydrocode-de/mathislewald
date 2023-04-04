import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import {
  arrowForwardOutline,
  bookmark,
  bookmarkOutline,
  filterOutline,
  navigateOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";

import distance from "@turf/distance";

import { useData } from "../context/data";
import { useSettings } from "../context/settings";
import { InventoryFeature } from "../context/data.model";

import "./InventoryList.css";

const InventoryList: React.FC = () => {
  const [hovered, setHovered] = useState(0);

  // load the filtered inventory list
  const { filteredInventory } = useData();

  // get a history context
  const history = useHistory();

  // get the current position from the Settings
  const { positionEnabled, position } = useSettings();

  const handleOnHover = (id: number) => {
    setHovered(id);
  };

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
              {/* <IonBadge>Height</IonBadge> */}
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

{
  /* <IonButton */
}
{
  /* slot="end" */
}
{
  /* //   onClick={() => onNavigate(`/list/${f.id}`)} */
}
{
  /* > */
}
{
  /* <IonIcon icon={caretForwardOutline} /> */
}
{
  /* </IonButton> */
}

// <IonCard key={f.id}>
//   <IonRow class="ion-padding ion-align-items-center">
//     <IonCol>
//       <IonCardSubtitle>TREE ID</IonCardSubtitle>
//       <IonCardTitle>{f.properties.treeid}</IonCardTitle>
//     </IonCol>
//     {positionEnabled && position ? (
//       <IonCol class="ion-text-center">
//         <IonCardSubtitle>DISTANCE</IonCardSubtitle>
//         <IonCardTitle>
//           <IonIcon icon={navigateOutline} size="small" />
//           &nbsp; {distString(f)}
//         </IonCardTitle>
//       </IonCol>
//     ) : null}
//     <IonCol class="ion-text-center ion-hide-sm-down">
//       <IonCardSubtitle>RADIUS</IonCardSubtitle>
//       <IonCardTitle>{f.properties.radius.toFixed(1)}</IonCardTitle>
//     </IonCol>
//     <IonCol class="ion-text-end">
//       <IonButton
//         // fill="outline"
//         onClick={() => onNavigate(`/list/${f.properties.treeid}`)}
//       >
//         <IonIcon icon={arrowForwardOutline} slot="icon-only" />
//       </IonButton>
//     </IonCol>
//   </IonRow>
// </IonCard>

// <IonCard
//   key={f.id}
//   onClick={() => onNavigate(`/list/${f.i`}`)}
//   style={{
//     marginBottom: "1.3rem",
//     padding: "1rem 3rem",
//     display: "flex",
//     justifyContent: "space-between",
//   }}
// >
//   <div>
//     <IonCardSubtitle>TREE ID</IonCardSubtitle>
//     <IonCardTitle>{f.id}</IonCardTitle>
//     <IonCardSubtitle>
//       <IonIcon icon={navigateOutline} />
//       &nbsp;&nbsp;42m away
//     </IonCardSubtitle>
//   </div>
//   <div>
//     <IonButton size="small">
//       <IonIcon icon={arrowForwardOutline} slot="icon-only" />
//     </IonButton>
//   </div>
// </IonCard>
