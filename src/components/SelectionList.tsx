import { IonBadge, IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react"
import { trashOutline } from "ionicons/icons"
import { useOffline } from "../context/offline"
import { useSelection } from "../context/selection"

const SelectionList: React.FC = () => {
    // load the selection-related functions from the offline context
    // TODO: replace with data context, once implemented
    const { createSelection, dropSelection } = useOffline()
    const { selections } = useSelection()
    
    // create random selection - DEBUG ONLY
    const onCreateNewSelection = () => {
        createSelection(
            [42, 43, 44],
            'Deleopment Selection',
        )
    }

    return (
        <IonList>
            {selections?.map((s) => (
                <IonItem key={s.id} lines="none">
                    <IonLabel>{s.title}</IonLabel>
                    <IonBadge slot="start">{s.treeIds.length}</IonBadge>
                    <IonButton slot="end" fill="clear" onClick={() => dropSelection(s.id)}>
                        <IonIcon icon={trashOutline} slot="icon-only" />
                    </IonButton>
                </IonItem>
            ))}
            {/* <IonButton fill="solid" expand="block" color="success" onClick={onCreateNewSelection}>NEW SELECTION</IonButton> */}
            <IonButton fill="clear" expand="block" color="danger" disabled>DELETE ALl</IonButton>
        </IonList>
    )
}

export default SelectionList