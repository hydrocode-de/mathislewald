import { useEffect } from "react"
import { useMap } from "react-map-gl"
import { useData } from "../../context/data"
import { useLayers } from "../../context/layers"

// TODO: we can discuss if this should end up in the InventorySource component
const LayerInteraction: React.FC = () => {
    // get the layers
    const { flyHandler } = useLayers()
    const map = useMap()

    const { filteredInventory } = useData()

    // subscribe to fly events
    useEffect(() => {
        const subscription = flyHandler.subscribe(layerName => {
            if (map.current && filteredInventory && filteredInventory!.bbox && layerName === 'inventory') {
                map.current.fitBounds(filteredInventory.bbox as [number, number, number, number])
            }
        })
        return () => subscription.unsubscribe()
    }, [map, filteredInventory])

    return (
        null
    )
}

export default LayerInteraction