import { IonBadge, IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPopover } from "@ionic/react"
import { trashOutline, eyeOutline, chevronForward, downloadOutline, checkmark } from "ionicons/icons" 
import { useEffect, useState } from "react"

import { InventorySelection } from "../context/inventory-selection.model"
import { useOffline } from "../context/offline"
import { useSelection } from "../context/selection"

const SelectionActionDetail: React.FC<{selection: InventorySelection}> = ({ selection }) => {
    // context to handle the name changes
    const [currentTitle, setCurrentTitle] = useState<string>('')

    // subscribe to the current active selection
    const { activeSelection, setActiveSelection } = useSelection()

    // get some selection context functions
    const { dropSelection, updateSelection } = useOffline()

    // add a handler to change the title
    const onUpdateTitle = () => {
        updateSelection({...selection, title: currentTitle})
    }

    useEffect(() => {
        if (selection.title) {
            setCurrentTitle(selection.title)
        }
    }, [selection])

    return (
        <IonItem lines="none" color={activeSelection?.selection.id === selection.id ? 'primary' : 'light'}>
            <IonLabel>{selection.title}</IonLabel>
            <IonBadge slot="start" color={activeSelection?.selection.id === selection.id ? 'light' : 'primary'}>{selection.treeIds.length}</IonBadge>
            { activeSelection?.selection.id === selection.id ?  (<>
                <IonButton slot="end" fill="clear" color="light" id={`selecion-menu-${selection.id}`}>
                    <IonIcon icon={chevronForward} slot="icon-only" />
                </IonButton>
                <IonPopover trigger={`selecion-menu-${selection.id}`} triggerAction="click" side="right" alignment="center" reference="trigger" animated>
                    <IonContent>
                        <IonItem lines="none" color="primary">
                            <IonInput type="text" value={currentTitle} onIonChange={e => setCurrentTitle(e.target.value as string)} />
                            <IonButton slot="end" fill="clear" color="light" disabled={currentTitle==='' || selection.title===currentTitle}>
                                <IonIcon icon={checkmark} slot="icon-only" />
                            </IonButton>
                        </IonItem>
                        <IonItem lines="none" color="primary">
                            <IonButton slot="end" fill="clear" color="light" disabled>
                                <IonIcon icon={downloadOutline} slot="icon-only" />
                            </IonButton>
                            <IonButton slot="end" fill="clear" color="danger" onClick={() => dropSelection(selection.id)}>
                                <IonIcon icon={trashOutline} slot="icon-only" />
                            </IonButton>                                
                        </IonItem>
                    </IonContent>
                </IonPopover>
            </>) :  (
                <IonButton slot="end" fill="clear" onClick={() => setActiveSelection(selection.id)}>
                    <IonIcon icon={eyeOutline} slot="icon-only" />
                </IonButton>
            )}
        </IonItem>
    )
}

export default SelectionActionDetail