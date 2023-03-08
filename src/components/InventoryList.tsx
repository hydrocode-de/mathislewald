import {
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
  IonSearchbar,
} from "@ionic/react";
import {
  arrowForwardOutline,
  caretForwardOutline,
  fileTray,
  filterOutline,
  navigateOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { useData } from "../context/data";
import FilterBar from "./FilterBar";

const InventoryList: React.FC = () => {
  // load the filtered inventory list
  const { filteredInventory } = useData();
  console.log(filteredInventory);

  // get a history context
  const history = useHistory();

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
      <IonList
        // color="light"
        style={{ overflowY: "scroll" }}
        // class="ion-padding"
        inset
      >
        <IonGrid fixed>
          {filteredInventory?.features.map((f) => {
            return (
              <IonItem
                button
                lines="inset"
                onClick={() => onNavigate(`/list/${f.properties.treeid}`)}
              >
                <IonCol size="6" size-md="4">
                  <IonLabel>
                    <p>TREE ID</p>
                    <h1>{f.properties.treeid}</h1>
                  </IonLabel>
                </IonCol>
                <IonCol size="6" size-md="4">
                  <IonLabel>
                    <p>DINSTACE</p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <IonIcon icon={navigateOutline} />
                      &nbsp;42m away
                    </p>
                  </IonLabel>
                </IonCol>
                <IonCol size-md="4">
                  <IonLabel>
                    <p>RADIUS</p>
                    <h1>{f.properties.radius.toFixed(1)}</h1>
                  </IonLabel>
                </IonCol>
              </IonItem>
            );
          })}
        </IonGrid>
      </IonList>
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
