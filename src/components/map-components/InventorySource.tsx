import { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { CirclePaint, CircleLayout } from 'mapbox-gl';
import { Source, Layer, useMap } from 'react-map-gl';

import { useData } from "../../context/data";
import { InventoryData } from "../../context/data.model";
import { useLayers } from "../../context/layers";


const InventoryLayer: React.FC = () => {
    // component state
    const [source, setSource] = useState<InventoryData>()

    // load needed contexts
    const { filteredInventory } = useData()
    const layers = useLayers()
    const map = useMap()

    // load source into component
    useEffect(() => {
        if (filteredInventory) {
            setSource(cloneDeep(filteredInventory))
        }
    }, [filteredInventory])

    // zoom to layer
    useEffect(() => {
        if (map.current && source?.bbox) {
            map.current.fitBounds(source.bbox as [number, number, number, number], {padding: 90})
        }
    }, [map, source])

    // build paint and layout
    const paint = {
        'circle-color': 'red',
        'circle-opacity': 0.8,
        'circle-radius': 6,
        'circle-stroke-width': 0.8,
        'circle-stroke-color': 'white'
    } as CirclePaint

    const layout = {
        // TODO: NEED TO CHANGE THE FORMAT OF INVENTORY LAYER
        visibility: layers.activeInventoryLayer.length > 0 ? 'visible' : 'none'
    } as CircleLayout
    
    return <>
        { source ? (
            <Source id="inventory" type="geojson" data={source}>
                <Layer id="inventory" source="inventory" type="circle" paint={paint} layout={layout} />
            </Source>
        ) : null}
    </>
}

export default InventoryLayer;