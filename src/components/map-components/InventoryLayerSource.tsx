import { Data, useGoogleMap } from "@react-google-maps/api"
import { useEffect } from "react"
import { useData } from "../../context/data"

const InventoryLayerSource: React.FC = () => {
    const map = useGoogleMap()

    const { inventory } = useData()
    
    useEffect(() => {
        if (inventory) {
            map?.data.addGeoJson(inventory)
        }
    }, [inventory])
    
    return (
        null
    )
}

export default InventoryLayerSource