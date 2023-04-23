import cloneDeep from "lodash.clonedeep"
import { useEffect, useState } from "react"
import { Layer, Source } from "react-map-gl"
import { InventoryData } from "../../context/data.model"
import { useSelection } from "../../context/selection"

const SelectionSource: React.FC = () => {
    // define a component state for the selection GeoJSON
    const [src, setSrc] = useState<InventoryData | undefined>()

    // subscribe to the current active selection
    const { activeSelection } = useSelection()

    // update component state when activeSelection changes
    useEffect(() => {
        if (activeSelection) {
            setSrc(cloneDeep(activeSelection.geoJSON))
        } else {
            setSrc(undefined)
        }
    }, [activeSelection])

    // if there is no source, return null
    if (!src) {
        return (
            null
        )
    } else {
        return (
            <Source id="selection" type="geojson" data={src}>
                <Layer 
                    id="selection"
                    source="selection"
                    type="circle"
                    paint={{
                        "circle-radius": 10,
                        "circle-color": "yellow"
                    }}
                />
            </Source>
        )
    }
}

export default SelectionSource