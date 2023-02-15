import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import {
  arrowForwardOutline,
  fileTray,
  filterOutline,
  navigateOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { useData } from "../context/data";

const InventoryList: React.FC = () => {
  // load the filtered inventory list
  const { filteredInventory } = useData();

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
        <IonButton>
          <IonIcon icon={filterOutline} />
        </IonButton>
      </IonListHeader>
      <IonList style={{ overflowY: "scroll", background: "#f4f5f8" }} inset>
        {filteredInventory?.features.map((f) => {
          return (
            <IonItem
              button
              lines="inset"
              onClick={() => onNavigate(`/list/${f.id}`)}
            >
              <IonLabel>
                <h5>TREE ID</h5>
                <h1>{f.id}</h1>
                <p>
                  <IonIcon icon={navigateOutline} />
                  &nbsp;&nbsp;42m away
                </p>
              </IonLabel>
              <IonButton
                slot="end"
                //   onClick={() => onNavigate(`/list/${f.id}`)}
              >
                <IonIcon icon={arrowForwardOutline} />
              </IonButton>
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
