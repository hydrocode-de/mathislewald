import { useEffect, useState } from "react"
import { useGoogleMap } from "@react-google-maps/api"
import cloneDeep from "lodash.clonedeep"

import * as geo from '../../util/geo'
import { useData } from "../../context/data"
import { InventoryData } from "../../context/data.model"
import InventoryMarker from "./InventoryMarker"


const InventorySource: React.FC = () => {
    // get a reference to the map 
    const map = useGoogleMap()

    // create component state
    const [inventory, setInventory] = useState<InventoryData>()
    
    // use the Data context
    const { inventory: contextInventory } = useData()
    
    // clone the inventory as the Map fails to set context data directly
    useEffect(() => {
        if (contextInventory) setInventory(cloneDeep(contextInventory))
    }, [contextInventory])

    // zoom to the inventory data
    useEffect(() => {
        if (inventory && inventory.bbox) {
            // map?.fitBounds(inventory.bbox)
            map?.fitBounds(geo.bboxToLngLat(inventory.bbox), 90)
        }
    }, [map, inventory])
    
    // if the inventory is not loaded, return nothing
    if (!inventory) return null

    // if inventory is loaded, map the features to markers
    return <>
        { inventory.features.map(feature => <InventoryMarker key={feature.id} feature={feature} />) }
    </>
}

export default InventorySource