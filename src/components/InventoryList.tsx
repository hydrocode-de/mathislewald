import { IonItem, IonList } from "@ionic/react"
import { useHistory } from "react-router"
import { useData } from "../context/data"

const InventoryList: React.FC<{modalRef:React.RefObject<HTMLIonModalElement>}> = ({ modalRef }) => {
    // load the filtered inventory list
    const { inventory } = useData()

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
        <IonList>
            { inventory?.features.map(f => {
                return (
                    <IonItem key={f.id} onClick={() => onNavigate(`/list/${f.id}`)}>
                        {f.id}
                    </IonItem>
                )
            }) }   
        </IonList>
    )
}

export default InventoryList