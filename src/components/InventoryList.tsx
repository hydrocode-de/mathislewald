import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonList } from "@ionic/react"
import { arrowForwardOutline, navigateOutline } from 'ionicons/icons'
import { useHistory } from "react-router"
import { useData } from "../context/data"

const InventoryList: React.FC<{modalRef:React.RefObject<HTMLIonModalElement>}> = ({ modalRef }) => {
    // load the filtered inventory list
    const { filteredInventory } = useData()

    // get a history context
    const history = useHistory()

    // we need to close the modal on navigate
    const onNavigate = (path: string) => {
        // if a modelRef is given, close it
        if (modalRef) modalRef.current?.setCurrentBreakpoint(0)
        
        // navigate forward
        history.push(path)
    }
    
    return (
        <IonList style={{overflowY: 'scroll'}}>
            { filteredInventory?.features.map(f => {
                return (
                    <IonCard 
                        key={f.id} 
                        onClick={() => onNavigate(`/list/${f.id}`)} 
                        style={{marginBottom: '1.3rem', padding: '1rem 3rem', display: 'flex', justifyContent: 'space-between'}}
                    >
                        <div>
                        <IonCardSubtitle>TREE ID</IonCardSubtitle>
                        <IonCardTitle>{f.id}</IonCardTitle>
                        <IonCardSubtitle>
                            <IonIcon icon={navigateOutline} />
                            &nbsp;&nbsp;42m away
                        </IonCardSubtitle>
                        </div>
                        <div>
                            <IonButton>
                                <IonIcon icon={arrowForwardOutline} slot="icon-only"/>
                                </IonButton>
                        </div>
                    </IonCard>
                )
            }) }   
        </IonList>
    )
}

export default InventoryList