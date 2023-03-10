import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import {
  arrowForwardOutline,
  caretForwardOutline,
  fileTray,
  filterOutline,
  navigateOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { useData } from "../context/data";
import FilterBar from "./FilterBar";

const InventoryList: React.FC = () => {
  const [hovered, setHovered] = useState(0);
  // load the filtered inventory list
  const { filteredInventory } = useData();
  console.log(filteredInventory);

  // get a history context
  const history = useHistory();

  const handleOnHover = (id: number) => {
    setHovered(id);
    console.log(id);
  };

  // we need to close the modal on navigate
  const onNavigate = (path: string) => {
    // navigate forward
    history.push(path);
  };

  return (
    <>
      <IonListHeader mode="ios">
        <IonLabel>List View</IonLabel>
        <IonButton class="ion-padding-horizontal">
          <IonIcon icon={filterOutline} color={"primary"}></IonIcon>
        </IonButton>
      </IonListHeader>

      <IonGrid>
        {filteredInventory?.features.map((f) => {
          return (
            <IonCard
            // onClick={() => onNavigate(`/list/${f.properties.treeid}`)}
            >
              <IonRow class="ion-padding ion-align-items-center">
                <IonCol>
                  <IonCardSubtitle>TREE ID</IonCardSubtitle>
                  <IonCardTitle>{f.properties.treeid}</IonCardTitle>
                </IonCol>
                <IonCol class="ion-text-center">
                  <IonCardSubtitle>DINSTANCE</IonCardSubtitle>
                  <IonCardTitle>
                    <IonIcon icon={navigateOutline} size="small" />
                    &nbsp;42m
                  </IonCardTitle>
                </IonCol>
                <IonCol class="ion-text-center ion-hide-sm-down">
                  <IonCardSubtitle>RADIUS</IonCardSubtitle>
                  <IonCardTitle>{f.properties.radius.toFixed(1)}</IonCardTitle>
                </IonCol>
                <IonCol class="ion-text-end">
                  <IonButton
                    // fill="outline"
                    onClick={() => onNavigate(`/list/${f.properties.treeid}`)}
                  >
                    <IonIcon icon={arrowForwardOutline} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCard>
          );
        })}
      </IonGrid>
    </>
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
