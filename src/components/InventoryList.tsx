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
      <IonList style={{ overflowY: "scroll" }}>
        <IonListHeader mode="ios">
          <IonLabel>List View</IonLabel>
        </IonListHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <FilterBar />
            </IonCol>
            <IonCol style={{ paddingTop: "10px" }}>
              <IonButton fill="outline" class="ion-float-right">
                <IonIcon icon={filterOutline}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {filteredInventory?.features.map((f) => {
          return (
            <IonItem
              button
              lines="inset"
              onClick={() => onNavigate(`/list/${f.properties.treeid}`)}
            >
              <IonLabel>
                <p>
                  &nbsp;42m away
                  <IonIcon icon={navigateOutline} />
                </p>
                {/* <p>TREE ID</p> */}
                <h1>{f.properties.treeid}</h1>
              </IonLabel>
              {/* <IonButton */}
              {/* slot="end" */}
              {/* //   onClick={() => onNavigate(`/list/${f.id}`)} */}
              {/* > */}
              {/* <IonIcon icon={caretForwardOutline} /> */}
              {/* </IonButton> */}
            </IonItem>
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
          );
        })}
      </IonList>
    </>
  );
};

export default InventoryList;
