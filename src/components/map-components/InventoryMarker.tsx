import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel } from "@ionic/react"
import { InfoWindow, Marker } from "@react-google-maps/api"
import { useState } from "react"
import { InventoryFeature } from "../../context/data.model"

import * as geo from '../../util/geo'

const InventoryMarker: React.FC<{feature: InventoryFeature}> = ({ feature }) => {
    // component state
    const [showInfo, setShowInfo] = useState<boolean>(false)

    // use history to navigate to the list page
    // const history = useHistory()
    
    return (
        <Marker
            position={geo.featureToLngLat(feature)}
            //onMouseOver={() => !showInfo ? setShowInfo(true) : null}
            // onMouseOut={() => setShowInfo(false)}
            onClick={() => setShowInfo(true)}
            // onClick={() => history.push(`/list/${feature.id}`)}
        >
            {showInfo ? (
                <InfoWindow>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Tree ID:{ feature.id }</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <img src={`http://geowwd.uni-freiburg.de/img/${feature.properties.image}`} alt="img" style={{width: '100%', height: '150px'}} />
                            <IonLabel>Height: {feature.properties.height}</IonLabel><br />
                            <IonLabel>Radius: {feature.properties.radius}</IonLabel>
                        </IonCardContent>
                        {/* <Link to={`/list/${feature.id}`}>{`/list/${feature.id}`}</Link> */}
                        <IonButton fill="solid" routerLink={`/list/${feature.id}`} routerDirection="forward">More info</IonButton>
                    </IonCard>
                </InfoWindow>
            ) : null}
        </Marker>
    )
}

export default InventoryMarker