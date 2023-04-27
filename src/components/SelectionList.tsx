import { IonBadge, IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPopover } from "@ionic/react"
import { trashOutline, eyeOutline, chevronForward, downloadOutline, addCircleOutline, checkmark } from "ionicons/icons"
import { useOffline } from "../context/offline"
import { useSelection } from "../context/selection"
import SelectionActionDetail from "./SelectionActionDetail"

const SelectionList: React.FC = () => {
    // load the selection-related functions from the offline context
    const { createSelection } = useOffline()
    const { selections, setActiveSelection } = useSelection()
    
    // controller for adding new selections
    const onNewSelection = () => {
        createSelection([]).then(newSelection => {
            setActiveSelection(newSelection.id)
        })
    }

    return (
        <IonList>
            {selections?.map((s) => (
                <SelectionActionDetail selection={s} key={s.id} />
            ))}
            <IonButton fill="clear" expand="full" onClick={onNewSelection}>
                <IonIcon icon={addCircleOutline} slot="icon-only" />
            </IonButton>
        </IonList>
    )
}

export default SelectionList